import Cart from "./CartButton";
import styles from "./Header.module.scss";
import Auth from "./AuthButton";
import {
  HomeIcon,
  BookOpenIcon,
  MapIcon,
} from "@heroicons/react/outline";

import MenuMobile from "./MenuMobile";
import { useAppSelector } from "../../app/hooks/hooks";
import { Link } from "react-router-dom";

let Links = [
  { name: "Главная", link: "/", icon: <HomeIcon className="w-8 h-8" /> },
  { name: "Услуги", link: "/category", icon: <BookOpenIcon className="w-8 h-8" /> },
  { name: "О нас", link: "/about", icon: <MapIcon className="w-8 h-8" /> },
];

const Header = () => {
  const { isUser } = useAppSelector(state => state.user)
  const user = useAppSelector(state => state.user.isAuth)
  return (
    <header className={styles.header}>
      <div className={styles.navbar}>
        <Link to='/' className={styles.logo}>Autohelp</Link>
        <ul className={styles.nav}>
          {Links.map((item) => (
            <Link to={item.link} key={item.name} className={styles.item}>
              {item.name}
            </Link>
          ))}
        </ul>
        <div className={styles.user_action}>
          <Auth />
          {user && isUser ? <Cart /> : <></>}
        </div>
        <MenuMobile links={Links} />
      </div>
    </header>
  );
};

export default Header;
