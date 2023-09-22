import style from "./MenuPage.module.css";

const MenuPage = ({ data }) => {
  return (
    <div className={style.container}>
      <h2>Menu</h2>
      <div className={style.subContainer}>
        {data.map((food) => (
          <p key={food.id}>{food.name}</p>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
