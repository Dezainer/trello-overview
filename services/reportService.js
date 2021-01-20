import moment from 'moment'
import { red, yellow, green } from '@material-ui/core/colors'

import TrelloService from 'services/trelloService'

const getListCards = async listNames => {
  const boards = await TrelloService.getBoards()
  const starredBoards = boards.data.filter(board => board.starred)

  const boardLists = await Promise.all(starredBoards.map(board => (
    TrelloService.getBoardLists(board.id)
  )))

  const lists = boardLists
    .flatMap(lists => lists.data)
    .filter(list => listNames.includes(list.name))

  const listCards = await Promise.all(lists.map(list => (
    TrelloService.getListCards(list)
  )))

  return listCards
    .flat()
    .map(card => {
      card.board = starredBoards.find(board => board.id === card.idBoard)
      return card
    })
    .filter(card => (
      card.idMembers.length === 0 ||
      card.idMembers.includes(process.env.NEXT_PUBLIC_TRELLO_USER_ID)
    ))
}

const groupCardsByDate = cards => (
  cards
    .sort((a, b) => (a.due != null ? new Date(a.due) : Infinity) - (b.due != null ? new Date(b.due) : Infinity))
    .map(card => ({
      ...card,
      due: card.due && moment(card.due).format('YYYY-MM-DD')
    }))
    .reduce((groups, card) => {
      const label = getDateLabel(card.due)
      return { ...groups, [label]: [...(groups[label] || []), card] }
    }, {})
)

const getDateLabel = due => {
  if (moment(due).isBefore(moment().startOf('week'))) {
    return 'Semana Passada'
  }

  if (moment(due).endOf('day').isBefore(moment())) {
    return 'Essa Semana'
  }

  return moment(due).calendar().split(' ')[0]
}

const getStatusColor = ({ listName, due }) => {
  if (listName === 'Sprint' && due && moment(due).endOf('day').isBefore(moment)) {
    return red[500]
  }

  if (listName === 'Aguardando Aprovação') {
    return yellow[500]
  }

  if (listName === 'Feito') {
    return green[500]
  }

  return 'transparent'
}

export default { getListCards, groupCardsByDate, getStatusColor }
