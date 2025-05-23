export type ApiResponseInterface<T> = {
  status: number;
  message: string;
  data?: T;
  meta?: MetaType;
};

export type MetaType = {
  total: number;
  limit: number;
  offset: number;
  page: number;
  total_page: number;
  hasNext: boolean;
  hasPrev: boolean;
};
