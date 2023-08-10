import Navigation from "../Navigation/Navigation";
import s from "./Header.module.scss";

const Header = () => {
  return (
    <header className={s.header}>
      <div className="container">
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
