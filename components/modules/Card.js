import style from "./Card.module.css";
import Location from "../icons/Location";
import Dollar from "../icons/Dollar";
import Link from "next/link";

const Card = ({ food }) => {
  const { id, name, price, details, discount } = food;

  return (
    <div className={style.container}>
      <img src={`/images/${id}.jpeg`} alt={name} />
      <div className={style.details}>
        <h4>{name}</h4>
        <div>
          <Location />
          {details[0].Cuisine}
        </div>
      </div>
      <div className={style.price}>
        <Dollar />
        {discount ? (
          <span className={style.discount}>
            ${(price * (100 - discount)) / 100}
          </span>
        ) : (
          <span>${price}</span>
        )}
        {discount ? <div className={style.badge}>{discount}%</div> : null}
      </div>
      <Link href={`/menu/${id}`}>See Details</Link>
    </div>
  );
};

export default Card;
