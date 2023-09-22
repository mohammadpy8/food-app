import Dollar from "../icons/Dollar";
import Location from "../icons/Location";
import style from "./DetailPage.module.css";

const DetailPage = (props) => {
  const {
    id,
    name,
    price,
    discount,
    introduction,
    details,
    ingredients,
    recipe,
  } = props;

  return (
    <div className={style.container}>
      <h2>Details</h2>
      <div className={style.subContainer}>
        <div className={style.banner}>
          <img src={`/images/${id}.jpeg`} alt={name} />
          <div>
            <h3>{name}</h3>
            <span className={style.location}>
              <Location />
              {details[0].Cuisine}
            </span>
            <span className={style.price}>
              <Dollar />
              {discount ? (price * (100 - discount)) / 100 : price}$
            </span>
            {discount ? (
              <span className={style.discount}>{discount}% OFF</span>
            ) : null}
          </div>
        </div>
        <div className={style.introduction}>
          <p>{introduction}</p>
        </div>
        <div className={style.details}>
          <h4>Details</h4>
          <ul>
            {details.map((detail, index) => (
              <li key={index}>
                <p>{Object.keys(detail)[0]}: </p>
                <span>{Object.values(detail)[0]}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={style.details}>
          <h4>Ingredients</h4>
          <ul>
            {ingredients.map((item, index) => (
              <li key={index}>
                <p>{item}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className={style.recipe}>
          <h4>Recipe</h4>
          {recipe.map((item, index) => (
            <div key={index} className={index % 2 ? style.odd : style.even}>
              <span>{index + 1}</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
        <button>Add To Cart</button>
      </div>
    </div>
  );
};

export default DetailPage;
