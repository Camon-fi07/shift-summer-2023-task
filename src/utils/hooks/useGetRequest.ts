import axios from "axios";
import { useEffect, useState } from "react";

export const useGetRequest = <T>(
  url: string,
  pathToData: string,
): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>] => {
  const [data, setData] = useState<T>();
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setData(res.data[pathToData]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return [data, setData];
};
