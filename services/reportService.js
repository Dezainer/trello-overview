import moment from 'moment'

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
    TrelloService.getListCards(list.id)
  )))

  return listCards
    .flatMap(cards => cards.data)
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
    .reduce((groups, card) => ({
      ...groups,
      [card.due]: [...(groups[card.due] || []), card]
    }), {})
)

export default { getListCards, groupCardsByDate }
