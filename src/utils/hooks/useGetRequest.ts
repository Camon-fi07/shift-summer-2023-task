import axios from "axios";
import { useEffect, useState } from "react";

export const useGetRequest = <T>(
  url: string,
  pathToData?: string,
  changeData?: (value: T) => T,
): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>] => {
  const [data, setData] = useState<T>();
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        if (changeData) setData(changeData(pathToData ? res.data[pathToData] : res.data));
        else setData(pathToData ? res.data[pathToData] : res.data);
      })
      .catch((err) => {
        console.log(err);
        setData(undefined);
      });
  }, []);
  return [data, setData];
};
