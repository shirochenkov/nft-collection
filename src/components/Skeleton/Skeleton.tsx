import { PackIcon } from "@/components/icons";

import styles from "./Skeleton.module.css";

export const Skeleton = () => {
  return (
    <div className={styles.border}>
      <div className={styles.container}>
        <PackIcon />
      </div>
    </div>
  );
};
