import style from "./CategoriesPage.module.css";

const CategoriesPage = () => {
  return (
    <div className={style.container}>
      <h2>Categories</h2>
      <div className={style.subContainer}>
        <div className={style.select}>
          <select>
            <option>Difficulty</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          <select>
            <option>Cooking Time</option>
            <option>More than 30 min</option>
            <option>Les than 30 min</option>
          </select>
          <button>Search</button>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
