import { useState, useEffect } from 'react'

import CardTable from 'components/cardTable'
import ReportService from 'services/reportService'

const Index = () => {
  const [listName, setListName] = useState('Sprint')
  const [cards, setCards] = useState()

  const fetchCards = async () => {
    const cards = await ReportService.getListCards(listName)
    setCards(cards)
  }

  useEffect(() => {
    fetchCards()
  }, [])

  return (
    <div className='container max-w-screen-lg mx-auto'>
      <div className='pt-8'>
        <h1 className='text-2xl font-bold'>Cards on Sprint</h1>
      </div>
      <div className='py-8'>
        <CardTable cards={cards} />
      </div>
    </div>
  )
}

export default Index
