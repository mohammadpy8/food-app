import { useState } from "react";
import style from "./CategoriesPage.module.css";
import { useRouter } from "next/router";

const CategoriesPage = () => {
  const router = useRouter();

  const [query, setQuery] = useState({
    difficulty: "",
    time: "",
  });

  const changeHandler = (event) =>
    setQuery({ ...query, [event.target.name]: event.target.value });

  const searchHandler = () => {
    router.push({ pathname: "/categories", query });
  };

  return (
    <div className={style.container}>
      <h2>Categories</h2>
      <div className={style.subContainer}>
        <div className={style.select}>
          <select
            value={query.difficulty}
            name="difficulty"
            onChange={changeHandler}
          >
            <option value="">Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <select value={query.time} name="time" onChange={changeHandler}>
            <option value="">Cooking Time</option>
            <option value="more">More than 30 min</option>
            <option value="less">Les than 30 min</option>
          </select>
          <button onClick={searchHandler}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
