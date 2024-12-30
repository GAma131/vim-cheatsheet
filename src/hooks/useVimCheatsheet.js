import { useState, useEffect } from "react";
import axios from "axios";

export const useVimCheatsheet = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("https://vim-cheatsheet.onrender.com/api/vim-cheatsheet");
        setData(response.data.data);
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
