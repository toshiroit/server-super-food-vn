export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  messaage: () => void;
  hello: any;
  notification: (data: any) => void;
  notification_order_shop: (message: any) => void;
  notification_order_all: (message: any) => void;
  unauthorized: () => void;
}

export interface ClientToServerEvents {
  hello: () => void;
  notification: (data: any) => void;
  notification_order: (data: { code_shop: CodeShopData[], data: any }) => void;
  notification_order_shop: (data: { code_shop: CodeShopData[], data: any }) => void;
  unauthorized: () => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
  auth_isLogin: boolean
  auth_data: any
}


export type CodeShopData = {
  code_shop: string
}
