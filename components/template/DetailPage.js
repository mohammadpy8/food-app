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
      </div>
    </div>
  );
};

export default DetailPage;
