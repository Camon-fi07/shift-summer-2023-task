import axios from "axios";

export const postRequest = async <T1, T2>(url: string, sentData: T1): Promise<T2> => {
  try {
    const response = await axios.post(url, sentData);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
