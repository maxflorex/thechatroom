import { io } from 'socket.io-client'
import React from 'react';
const SOCKET_URL = 'https://thechatroombymax.herokuapp.com';
export const socket = io(SOCKET_URL)

// APP CONTEXT
export const AppContext = React.createContext()