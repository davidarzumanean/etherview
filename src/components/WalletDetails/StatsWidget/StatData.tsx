import type {FC} from "react";
import {RequestStatus} from "../../../types";
import {Skeleton} from "../../Skeleton";

interface IStatDataProps {
  reqStatus: RequestStatus;
  value: string;
}

export const StatData: FC<IStatDataProps> = ({reqStatus, value}) => {
  const randomNumber = Math.random() * 50 + 100;

  if (reqStatus === RequestStatus.LOADING) {
    return (
      <Skeleton width={`${randomNumber}px`}/>
    )
  } else if (!value) {
    return <div>-</div>;
  }

  return <div>{value}</div>;
}
