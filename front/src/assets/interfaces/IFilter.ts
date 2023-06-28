import { eOperation } from "../enums";

export interface IFilter {
  key: String;
  operation: eOperation;
  value: any;
}
