import { QueryResult } from 'pg';
export type CallbackHandler = (err: any | null, result: QueryResult<any> | null) => void | null;
export interface modelQuery {
  table: string | null;
  field: string | null;
  obj: {
    condition: string | null;
  };

  value: any[] | any;
  condition?: string | null;
}

export interface paginateList {
  page?: number | undefined;
  table: string;
  field?: string;
  value?: {};
  field2?: string | null;
  value2: -1;
  order_field: string;
  callback: () =>
    | {
        error: Error;
        result: QueryResult<any> | undefined;
      }
    | undefined;
}
