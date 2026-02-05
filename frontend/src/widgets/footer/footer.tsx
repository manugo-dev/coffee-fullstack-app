import Image from "next/image";

import styles from "./footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.background} />
      <div className={styles.background_overlay} />
      <div className={styles.content}>
        <Image
          src="/images/logo.svg"
          alt="MVST Coffee"
          width={167}
          height={25}
          className={styles.logo}
        />
      </div>
    </footer>
  );
}
