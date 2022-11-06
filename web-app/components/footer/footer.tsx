import { Center } from "@chakra-ui/react";
import { useRouter } from "next/router";
import styles from "./footer.module.css";


type Props = {};

export function Footer(props: Props) {
  const { locale } = useRouter();

  return (
    <header className={styles.footer}>
      <div className="flex-4" style={{ alignContent: 'center', flexDirection: 'column' }}>
        <Center>
          <div>

          </div>
        </Center>
      </div >
    </header>
  );
}
