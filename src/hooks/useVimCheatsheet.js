import { useState, useEffect } from "react";
import { fetchVimCheatsheet } from "../api/vimApi";

const useVimCheatsheet = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchVimCheatsheet();
        console.log(result);
        setData(result);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { data, loading, error };
};

export default useVimCheatsheet;
