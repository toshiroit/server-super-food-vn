export type NotifyType = {
  code_notify_shop: string;
  code_shop: string;
  code_user?: string;
  title: string;
  info: string;
  code_type_notify: string;
  createdAt: string;
};

export type NotifyTypeGet = 1 | 2 | 3 | 4 | 5 | -1 | undefined;
