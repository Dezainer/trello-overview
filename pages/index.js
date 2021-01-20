import { useState, useEffect } from 'react'

import CardTableHeader from 'components/cardTableHeader'
import CardTable from 'components/cardTable'
import ReportService from 'services/reportService'

const Index = () => {
  const [cards, setCards] = useState()

  const fetchCards = async () => {
    const cards = await ReportService.getListCards(['Sprint'])
    const grouped = await ReportService.groupCardsByDate(cards)

    setCards(grouped)
  }

  useEffect(() => {
    fetchCards()
  }, [])

  return (
    <div className='container max-w-screen-lg mx-auto'>
      <div className='pt-8'>
        <h1 className='text-2xl font-bold'>Trello Overview</h1>
      </div>
      <div className='py-8'>
        <CardTableHeader
          loading={!cards}
        />
        {cards && Object.keys(cards).map((key) => (
          <CardTable
            date={key}
            cards={cards[key]}
          />
        ))}
      </div>
    </div>
  )
}

export default Index
