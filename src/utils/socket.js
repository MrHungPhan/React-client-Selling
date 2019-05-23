import * as config from '../const/config'
import io from 'socket.io-client';
const socket = io(config.API_SOCKET_SERVER);
export default socket;
