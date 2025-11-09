import styles from "@/styles/components/footer.module.scss";

export default function Footer(){
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.brand}>Url Shortener</div>
          <div className={styles.copy}>© {new Date().getFullYear()} Url Shortener — Made with care.</div>
        </div>
      </div>
    </footer>
  );
}
