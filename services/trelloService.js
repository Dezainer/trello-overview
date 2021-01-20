import axios from 'axios'

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TRELLO_URL,
  params: {
    key: process.env.NEXT_PUBLIC_TRELLO_KEY,
    token: process.env.NEXT_PUBLIC_TRELLO_TOKEN
  }
})

const getBoards = () => (
  API.get('/members/me/boards')
)

const getBoardLists = id => (
  API.get(`/boards/${id}/lists`)
)

const getListCards = id => (
  API.get(`/lists/${id}/cards`)
)

export default { getBoards, getBoardLists, getListCards }
