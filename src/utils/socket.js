import * as config from '../const/config'
import io from 'socket.io-client';
const socket = io(config.URL_SOCKET);
export default socket;
