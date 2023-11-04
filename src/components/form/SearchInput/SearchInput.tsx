import type {FC, FormEvent, ChangeEvent} from "react";
import {SearchIcon} from "../../../assets/SearchIcon";
import styles from './SearchInput.module.scss';

interface ISearchInputProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  value: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  className?: string;
}

export const SearchInput: FC<ISearchInputProps> = ({onSubmit, value, handleChange, placeholder, className}) => {
  return (
    <form onSubmit={onSubmit}>
      <label className={`${styles.searchInput} ${className ? className : ''}`}>
        <input type="text" placeholder={placeholder} value={value} onChange={handleChange}/>
        <button type='submit'>
          <SearchIcon />
        </button>
      </label>
    </form>
  )
}