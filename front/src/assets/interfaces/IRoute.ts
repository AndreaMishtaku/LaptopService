export interface IRoute {
  path: string;
  element: any;
  children?: Array<IRoute>;
}
