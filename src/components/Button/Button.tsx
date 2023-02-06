import { forwardRef } from "react";

import styles from "./Button.module.css";

export const Button = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>((props, ref) => {
  return (
    <button type="button" ref={ref} {...props} className={styles.button}>
      Search
    </button>
  );
});
