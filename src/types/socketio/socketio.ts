export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  messaage: () => void;
  hello: any;
  notification: (data: any) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
  notification: (data: any) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
