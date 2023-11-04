import {Skeleton} from "../Skeleton";
import styles from './TableSkeleton.module.scss'

export const TableSkeleton = () => {
  const numRows = 10;
  const numColumns = 5;

  const filledArray: any[][] = [];

  for (let i = 0; i < numRows; i++) {
    filledArray[i] = new Array(numColumns);
    for (let j = 0; j < numColumns; j++) {
      filledArray[i][j] = i * numColumns + j + 1;
    }
  }

  return (
    <table className={styles.skeletonContainer}>
      <tbody>
      {filledArray.map((row, index) => (
        <tr key={index}>
          {Object.values(row).map((cell) => (
            <td key={cell}><Skeleton width='100%' height='30px' /></td>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  )
}