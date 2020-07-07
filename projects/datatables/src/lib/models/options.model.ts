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
    edited?: (response?: any) => void;
    added?: (response?: any) => void;
    deleted?: () => void;
    error?: (error?: any) => void;
  };
}
