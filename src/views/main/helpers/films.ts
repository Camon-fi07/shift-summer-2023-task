import axios from "axios";

export const getFilms = async () => {
  try {
    const res = await axios({
      url: "https://shift-backend.onrender.com/cinema/today/",
      method: "GET",
    });
    sessionStorage.setItem("films", JSON.stringify(res.data.films));
    console.log(res.data);
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
};

// axios({
//   url: "https://shift-backend.onrender.com/cinema/today/",
//   method: "GET",
// });
