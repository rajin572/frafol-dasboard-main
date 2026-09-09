import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tagTypes";
import Cookies from "js-cookie";
import { getBaseUrl } from "../../helpers/config/envConfig";

const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  timeout: 60000,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = Cookies.get("frafoldashboard_accessToken");
    const resendOtptoken = Cookies.get("frafoldashboard_forgetToken");
    const resetPasswordToken = Cookies.get("frafoldashboard_forgetOtpMatchToken");

    if (token) {
      headers.set("token", `${token}`);
    }
    if (resendOtptoken) {
      headers.set("token", `${resendOtptoken}`);
    }
    if (resetPasswordToken) {
      headers.set("token", `${resetPasswordToken}`);
    }

    return headers;
  },
});

// Mutex: only one refresh request in-flight at a time.
// All concurrent 403s await the same promise instead of each firing their own refresh call.
let refreshPromise: Promise<string | null> | null = null;

const refreshAccessToken = async (): Promise<string | null> => {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    const refreshToken = Cookies.get("frafoldashboard_refreshToken");

    if (!refreshToken) {
      Cookies.remove("frafoldashboard_accessToken");
      return null;
    }

    try {
      const res = await fetch(`${getBaseUrl()}/auth/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          refreshtoken: refreshToken,
        },
      });

      const data = await res.json();

      // Server returns { data: { accessToken, refreshToken } }
      const accessToken = data?.data?.accessToken ?? data?.accessToken;

      if (accessToken) {
        Cookies.set("frafoldashboard_accessToken", accessToken, {
          path: "/",
          expires: 365,
          secure: false,
        });
        return accessToken;
      }

      // Refresh failed — clear everything so ProtectedRoute redirects to sign-in
      Cookies.remove("frafoldashboard_accessToken");
      Cookies.remove("frafoldashboard_refreshToken");
      return null;
    } finally {
      // Release the lock so the next genuine expiry can refresh again
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 404) {
    Cookies.remove("frafoldashboard_accessToken");
    Cookies.remove("frafoldashboard_refreshToken");
    window.location.href = "/sign-in";
    return result;
  }

  if (result?.error?.status === 403 || result?.error?.status === 401) {
    const newToken = await refreshAccessToken();

    if (newToken) {
      // Retry the original request — prepareHeaders will now read the new cookie
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
