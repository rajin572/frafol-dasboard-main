import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { persistor, store } from "../../redux/store";
import { PersistGate } from "redux-persist/lib/integration/react";
import router from "../../Routes/Routes";
import { RouterProvider } from "react-router-dom";
import { mainTheme } from "../../theme";
import { Toaster } from "sonner";
import { SocketProvider } from "../../context/SocketProvider";

const Main = () => {
  return (
    <div>
      <ConfigProvider theme={mainTheme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SocketProvider>
              <Toaster position="top-center" richColors />
              <RouterProvider router={router} />
            </SocketProvider>
          </PersistGate>
        </Provider>
      </ConfigProvider>
    </div>
  );
};

export default Main;
