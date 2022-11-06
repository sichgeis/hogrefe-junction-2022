import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { JournalProvider } from "../components/journalprovider/journalprovider";
import Layout from "../components/layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    function onRouteChangeComplete() {
      console.log('route changed')
    }
    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, [router.events]);

  const theme = extendTheme({
    "colors": {
      "gray": {
        "50": "#F1F2F3",
        "100": "#D9DADE",
        "200": "#C0C2C8",
        "300": "#A8ABB3",
        "400": "#8F939D",
        "500": "#777B88",
        "600": "#5F636D",
        "700": "#474A52",
        "800": "#303136",
        "900": "#18191B"
      },
      "orange": {
        "50": "#FEF1E6",
        "100": "#FDD8B9",
        "200": "#FCBF8C",
        "300": "#FBA65F",
        "400": "#FB8C32",
        "500": "#FA7305",
        "600": "#C85C04",
        "700": "#964503",
        "800": "#642E02",
        "900": "#321701"
      },
      "red": {
        "50": "#FFEEE6",
        "100": "#FFD0B8",
        "200": "#FEB18A",
        "300": "#FE935D",
        "400": "#FE742F",
        "500": "#FE5601",
        "600": "#CB4501",
        "700": "#983301",
        "800": "#662200",
        "900": "#331100"
      }
    }
  })

  return (
    <ChakraProvider theme={theme}>
      <JournalProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </JournalProvider>
    </ChakraProvider>
  )
}

export default MyApp;
