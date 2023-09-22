import style from "./MenuPage.module.css";
import Card from "../modules/Card";

const MenuPage = ({ data }) => {
  return (
    <div className={style.container}>
      <h2>Menu</h2>
      <div className={style.subContainer}>
        {data.map((food) => (
          <Card key={food.id} food={food} />
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
