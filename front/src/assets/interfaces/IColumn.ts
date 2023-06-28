import { eDataType } from "../enums";

export interface IColumn {
  name: String;
  field: String;
  type: eDataType;
  filterProperty: String;
  orderable: Boolean;
  hidden: Boolean;
}
