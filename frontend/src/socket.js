import { io } from 'socket.io-client'

const socket = io(process.env.NODE_ENV == "development" ? 'http://localhost:3000' : 'portfolio_backend.railway.internal')

export default socket