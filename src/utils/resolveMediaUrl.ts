import { getImageUrl } from "../helpers/config/envConfig";

// Server-stored photos/videos are relative ("/uploads/..."); anything else (an
// already-absolute URL, a blank value) is used as-is.
export const resolveMediaUrl = (path?: string | null): string => {
  if (!path) return "";
  return path.startsWith("/uploads") ? getImageUrl() + path : path;
};
