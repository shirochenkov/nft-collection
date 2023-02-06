import { FC } from "react";

import Image from "next/image";

import { PackIcon, ArrowRightIcon } from "@/components/icons";

import styles from "./Card.module.css";

export type CardProps = {
  updateAuthority: string;
  name?: string;
  imageSrc?: string;
};

export const Card: FC<CardProps> = ({ name, imageSrc }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        {imageSrc ? (
          <div
            className={styles.image}
            style={{ backgroundImage: `url(${imageSrc})` }}
          />
        ) : (
          <PackIcon />
        )}
      </div>
      <div className={styles.description}>
        <span>{name}</span>
        <a className={styles.link}>
          <ArrowRightIcon />
        </a>
      </div>
    </div>
  );
};
