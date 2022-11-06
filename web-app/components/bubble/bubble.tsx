import React from "react";
import style from "./bubble.module.css";

type Props = {
  color: String
} & React.HTMLProps<HTMLButtonElement>;

export function Bubble(props: Props) {
  return (
    <div className={style.wrap}>
      <div className={style.thought}>
        {props.children}
      </div>
    </div>

  );
}
