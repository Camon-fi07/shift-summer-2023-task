import "./style.scss";
export const Image = (props: {
  path: string;
  width: number;
  height: number;
}) => {
  return (
    <div
      className="image"
      style={{ padding: `${props.height}% ${props.width}% 0 0` }}
    >
      <img src={props.path} alt="" />
    </div>
  );
};
