import axios from "axios";
import { useState, useEffect } from "react";

const useFetch = (url, query = "") => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoaing] = useState(false);

  useEffect(() => {

    const controller = new AbortController();

    async function fetchApi() {
      try {
        setIsLoaing(true);
        const { data } = await axios.get(`${url}?${query}`);
        setData(data);
      } catch (error) {
        setData([])
      } finally {
        setIsLoaing(false);
      }
    };

    fetchApi();

    return () => controller.abort();

  }, [url, query]);

  return { data, isLoading };
};

export default useFetch;
