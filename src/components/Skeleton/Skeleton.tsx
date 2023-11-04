import type {FC} from "react";
import styles from './Skeleton.module.scss'

interface ISkeletonProps {
  width?: string;
  height?: string;
}

export const Skeleton: FC<ISkeletonProps> = ({width, height = 16}) => {
  return (
    <div className={styles.skeleton} style={{width, height}} />
  )
}
