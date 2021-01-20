import TrelloService from 'services/trelloService'

const getListCards = async listName => {
  const boards = await TrelloService.getBoards()
  const starredBoards = boards.data.filter(board => board.starred)

  const boardLists = await Promise.all(starredBoards.map(board => (
    TrelloService.getBoardLists(board.id)
  )))

  const lists = boardLists
    .flatMap(lists => lists.data)
    .filter(list => list.name === listName)

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

export default { getListCards }
