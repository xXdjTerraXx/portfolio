import { io } from 'socket.io-client'

const socket = io(`${process.env.API_BASE_URL}/lastfm`)

export default socket