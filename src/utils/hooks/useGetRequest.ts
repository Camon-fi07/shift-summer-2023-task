import axios from "axios";
import { useEffect, useState } from "react";

export const useGetRequest = <T>(
  url: string,
  pathToData: string,
  changeData?: (value: T) => T,
): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>] => {
  const [data, setData] = useState<T>();
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        if (changeData) setData(changeData(res.data[pathToData]));
        else setData(res.data[pathToData]);
      })
      .catch((err) => {
        setData(undefined);
      });
  }, []);
  return [data, setData];
};
