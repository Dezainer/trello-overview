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

const getListCards = async list => {
  const { data } = await API.get(`/lists/${list.id}/cards`)
  return data.map(card => ({ ...card, listName: list.name }))
}

export default { getBoards, getBoardLists, getListCards }
