export interface IFile {
  name: string;
  children?: IFile[];
  [key: string]: any;
}
