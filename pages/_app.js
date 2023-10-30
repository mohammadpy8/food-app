import "@/styles/globals.css";
import Layout from "@/components/layout/Layout";
import { Provider } from "react-redux";
import store from "@/features/store";
import { SkeletonTheme } from "react-loading-skeleton";
import { InMemoryCache, ApolloProvider, ApolloClient } from "@apollo/client";
import "react-loading-skeleton/dist/skeleton.css";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

export default function App({ Component, pageProps }) {
  const client = new ApolloClient({
    uri: "https://flyby-router-demo.herokuapp.com/",
    cache: new InMemoryCache(),
  });

  return <Component {...pageProps} />;
}
