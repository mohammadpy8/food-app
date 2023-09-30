import { Suspense, useEffect, useState, cache } from "react";
import axios from "axios";

const calculateNorm = cache((vector))


const Currying = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(async() => {

        const { data } = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setData(data);

        document.addEventListener("onscroll", function() {
            const scroll = s
        })
      
    }, 3000);

  }, []);

  console.log(data);

  return (
    <div>
      <Suspense fallback={<Loading />}>
        {isLoading &&
          data.map((item) => {
            const { id, name, username } = item;
            return (
              <div key={id}>
                <h1>{name}</h1>
                <h2>{username}</h2>
              </div>
            );
          })}
      </Suspense>
      <button onClick={() => setIsLoading(true)}>ok!</button>
    </div>
  );
};

export default Currying;

const Loading = () => {
  return <p>Loading....!</p>;
};
