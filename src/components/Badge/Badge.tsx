import type {FC, ReactElement} from "react";
import styles from './Badge.module.scss';

interface IBadgeProps {
  children: ReactElement | string;
  variant?: 'warning' | 'success'
}

export const Badge: FC<IBadgeProps> = ({children, variant}) => {
  return (
    <div className={`${styles.badge} ${variant === 'success' ? styles.success : styles.warning}`}>
      {children}
    </div>
  )
}
