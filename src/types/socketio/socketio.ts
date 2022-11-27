export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  messaage: () => void;
  hello: any;
  notification: (data: any) => void;
  notification_order_shop: (message: any) => void;
  notification_order_all: (message: any) => void;
  notification_progress: (data: { message: string; status: number; code_order: string }) => void;
  notification_follow: (data: { message: string; code_user: string }) => void;
  notification_messenger_shop: (data: { message: string; code_shop: string }) => void;
  notification_messenger_user: (data: { message: string; code_shop: string }) => void;
  unauthorized: () => void;
}

export interface ClientToServerEvents {
  hello: () => void;
  notification: (data: any) => void;
  notification_order: (data: { code_shop: CodeShopData[]; data: any }) => void;
  notification_order_shop: (data: { code_shop: CodeShopData[]; data: any }) => void;
  notification_progress_1: (data: { message: string; item: any }) => void;
  notification_progress_2: (data: { message: string; item: any }) => void;
  notification_progress_3: (data: { message: string; item: any }) => void;
  notification_progress_4: (data: { message: string; item: any }) => void;
  notification_progress_cancel: (data: { message: string; item: any }) => void;
  notification_follow: (data: { message: string; code_shop: string }) => void;
  messenger_send_to_shop: (data: { message: string; code_shop: string; code_user: string }) => void;
  messenger_send_to_user: (data: { message: string; code_user: string; code_shop: string }) => void;
  unauthorized: () => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
  auth_isLogin: boolean;
  auth_data: any;
}

export type CodeShopData = {
  code_shop: string;
  cartItem: any[];
};
