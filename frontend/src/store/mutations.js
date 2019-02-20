import Vue from 'vue'
import { API_SERVER } from '../api.js'
export default {
	SOCKET_CONNECTED: (state,  socketID) => {
        state.socketID = socketID;
    }
}