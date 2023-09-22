import style from "./Layout.module.css";
import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <>
      <header className={style.header}>
        <div className={style.left}>
          <Link href="/">FoodApp</Link>
        </div>
        <div className={style.right}>
          <Link href="/menu">Menu</Link>
          <Link href="/categories">Categories</Link>
        </div>
      </header>
      <div className={style.container}>{children}</div>
      <footer className={style.footer}>
        <a href="#" rel="noreferrer">
          Food-App &copy;
        </a>
      </footer>
    </>
  );
};

export default Layout;
