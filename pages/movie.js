import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = "https://api.api-ninjas.com/v1/randomimage?category=";
const category = "nature";
const headers = {
  "X-Api-Key": "ut+NbmA/EKK968op1AnF4g==gbttNolq2hDA7Wbj",
  // Accept: "image/jpg",
};

const Movie = () => {

  const [data, setData] = useState([]);

  useEffect(() => {

    // const formatData = new FormData();
    
    const fetchData = async () => {
      try {
          const { data } = await axios.get(BASE_URL + category, {
              headers,
          });
          // return data;
          setData(data);
      } catch (err) {
          console.log(err);
          return err;
      }
  };

  fetchData();

  }, []);

  console.log(data);

  return <div>
    {/* <img  src={`data:${data}`}/> */}
    <h1>mmmm</h1>
  </div>;
};

export default Movie;
