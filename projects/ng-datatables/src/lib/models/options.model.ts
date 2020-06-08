export interface Options {
  baseAPIUrl: string;
  get?: string;
  add?: string;
  edit?: string;
  dataTableOptions?: any;
  theme?: 'bootstrap';
  events?: {
    added?: () => void;
    edited?: () => void;
    deleted?: () => void;
  };
}
