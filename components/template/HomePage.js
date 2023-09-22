import Attributes from "../modules/Attribute";
import Banner from "../modules/Banner";
import Definition from "../modules/Definition";
import style from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={style.container}>
      <Banner />
      <Attributes />
      <Definition />
    </div>
  );
};

export default HomePage;
