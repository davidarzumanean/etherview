import type {FC, ReactElement} from "react";
import styles from './Link.module.scss';

interface ILinkProps {
  href: string;
  target?: string;
  children: ReactElement | string;
  className?: string;
}

export const Link: FC<ILinkProps> = ({href, target = '_blank', children, className}) => {
  return (
    <a className={`${styles.link} ${className}`} href={href} target={target}>{children}</a>
  )
}
