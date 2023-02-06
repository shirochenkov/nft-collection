import { forwardRef, useCallback } from "react";

import { SearchIcon, CrossIcon } from "@/components/icons";

import styles from "./Input.module.css";

interface InputProps extends React.ComponentProps<"input"> {
  hasValue: boolean;
  clearValue: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ hasValue, clearValue, ...restProps }, ref) => {
    const handleClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault;
      clearValue();
    }, []);

    return (
      <div className={styles.container}>
        <SearchIcon />
        <input ref={ref} {...restProps} className={styles.input} />
        {hasValue && (
          <a onClick={handleClick} className={styles.clear}>
            <CrossIcon />
          </a>
        )}
      </div>
    );
  }
);
