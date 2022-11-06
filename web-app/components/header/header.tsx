import { Center } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./header.module.css";

type Props = {
  title?: string;
  description?: string;
};

const translations = {
  en: {
    frontpage: "Frontpage",
    product: "Product",
    recruictment: "Recruictment",
    login: "Login",
  },
};

export function Header(props: Props) {
  const { locale, events } = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const trans = translations[locale] as typeof translations["en"];

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      setMenuOpen(false);
    };

    events.on("routeChangeStart", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <React.Fragment>
      <Head>
        <title>Hogrefe - {props.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={props.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className="flex-4" style={{ alignContent: 'center', flexDirection: 'column' }}>
          <Center>
            <div>

            </div>
          </Center>
        </div >
      </header>


      <div className={styles.pushtop}></div>
    </React.Fragment>
  );
}
