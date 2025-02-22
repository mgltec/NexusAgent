import { transformNumber } from "src/app/Utils/number";
import { IResponsiveTableColumn } from "./responsive-table.types";

export const calculateClasses = (value: number): string => {
  if (Number(value) > 0) return "NumPositive";
  else if (Number(value) < 0) return "NumNegative";
  else return "NumZero";
};


export const NUMERIC_COLUMN = {
  classes: (value: any) => calculateClasses(value),
  pipe: (value: any) => transformNumber(value, '1.2-2')
}