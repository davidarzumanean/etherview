import React, {useState} from 'react';
import type {FC} from 'react';
import {CopyIcon, CheckIcon} from "../../assets";
import styles from './TruncatedText.module.scss';
import {Link} from "../Link";

interface TruncatedTextProps {
  text: string;
  href?: string;
}

export const TruncatedText: FC<TruncatedTextProps> = ({text, href}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    });
  };

  return (
    <div className={styles.truncatedTextContainer}>
      {href ? (
        <Link href={href} className={`${styles.text} truncated-text`}>{text}</Link>
        ) : (
        <div className={`${styles.text} truncated-text`}>{text}</div>
      )}
      <button
        type='button'
        onClick={handleCopyClick}
        className={styles.copyButton}
      >
          {isCopied ? <CheckIcon className={styles.checkIcon} /> : <CopyIcon />}
        </button>
    </div>
  );
};
