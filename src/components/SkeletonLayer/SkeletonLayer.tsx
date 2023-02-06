import { FC } from "react";
import { Skeleton } from "@/components/Skeleton";

export type SkeletonLayerType = {
  count: number;
};

export const SkeletonLayer: FC<SkeletonLayerType> = ({ count }) => {
  return (
    <>
      {[...new Array(count)].map((_, index) => (
        <Skeleton key={index} />
      ))}
    </>
  );
};
