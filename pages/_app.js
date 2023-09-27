import "@/styles/globals.css";
import Layout from "@/components/layout/Layout";
import { Provider } from "react-redux";
import store from "@/features/store";
import { SkeletonTheme } from "react-loading-skeleton";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <SkeletonTheme baseColor="#808080" highlightColor="#b1b1b1">
        <Component {...pageProps} />
      </SkeletonTheme>
    </Provider>
  );
}
