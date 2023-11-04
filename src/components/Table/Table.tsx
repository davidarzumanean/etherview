import type {FC} from "react";
import styles from './Table.module.scss';

interface TableProps {
  data: object[];
}

export const Table: FC<TableProps> = ({data}) => {
  if (!data || data.length === 0) {
    return <div>No data to display.</div>;
  }

  const columns = Object.values(data[0]).map((value) => value.label);

  return (
    <table className={styles.tableContainer}>
      <thead>
      <tr>
        {columns.map((column) => (
          <th key={column}>{column}</th>
        ))}
      </tr>
      </thead>
      <tbody>
      {data.map((row, index) => (
        <tr key={index}>
          {Object.values(row).map((cell, index) => (
            <td key={index}>{cell.value}</td>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  )
}