import style from "./style.module.scss";
import cat from "C:\\Users\\camon\\Desktop\\love-cat.gif";
export const Load = () => {
  return (
    <div className={style.load}>
      <img src={cat} alt="" />
    </div>
  );
};
