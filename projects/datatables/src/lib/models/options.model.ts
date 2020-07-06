export interface Options {
  baseAPIUrl: string;
  get?: string;
  edit?: string;
  add?: string;
  delete?: string;
  id?: string;
  datatableOptions: {
    columns: {
      name: string;
      data?: string;
      format?: 'text' | 'number' | 'amount';
    }[];
  };
  events?: {
    edited?: () => void;
    added?: () => void;
    deleted?: () => void;
  };
}
