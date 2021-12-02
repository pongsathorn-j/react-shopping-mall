import { useEffect, useState } from "react";
import axios from "axios";

function useSearch(query) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const resetState = () => {
    setIsLoading(false);
    setData([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      let cancel;
      try {
        setData([]);

        const res = await axios({
          method: "GET",
          url: process.env.REACT_APP_API_BASE + "/product/search/" + query,
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });
        setIsLoading(false);
        setData(res.data.data);
      } catch (e) {
        resetState();
        if (axios.isCancel(e)) return;
      }
      return () => cancel();
    };
    if (!query || query.length < 3) return resetState();
    setIsLoading(true);
    const timeOutId = setTimeout(() => fetchData(query), 500);
    return () => clearTimeout(timeOutId);
  }, [query]);

  return { data, isLoading };
}

export default useSearch;
