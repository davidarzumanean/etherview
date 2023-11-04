import type {FC, ButtonHTMLAttributes} from "react";
import styles from './Button.module.scss';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: FC<IButtonProps> = ({children, className, ...rest}) => {
    return (
      <button className={`${styles.button} ${className}`} {...rest}>
          {children}
      </button>
    )
}
