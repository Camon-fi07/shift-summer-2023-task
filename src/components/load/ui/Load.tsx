import style from "./style.module.scss";
import cat from "assets/love-cat.gif";
export const Load = () => {
  return (
    <div className={style.load}>
      <img src={cat} alt="" />
    </div>
  );
};
