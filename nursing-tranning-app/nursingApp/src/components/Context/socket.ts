import { io } from "socket.io-client";
import { API_SERVER } from "../../helpers/api";

// export const socket = io("http://localhost:3100/");
export const socket = io(API_SERVER);

// export const SocketContext = React.createContext(socket);
