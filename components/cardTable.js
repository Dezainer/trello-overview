import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import moment from 'moment'

import ReportService from 'services/reportService'

const CardTable = ({ date, cards }) => (
  <TableContainer component={Paper} className='mt-8'>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell style={{ width: '5%' }}/>
          <TableCell colSpan={2}>
            {date}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {cards.map(card => (
          <TableRow key={card.id}>
            <TableCell>
              <div
                className='w-4 h-4 rounded-full'
                style={{ backgroundColor: ReportService.getStatusColor(card) }}
              />
            </TableCell>
            <TableCell style={{ width: '20%' }}>
              <a href={card.board.url} target='_blank'>
                <Chip
                  style={{
                    cursor: 'pointer',
                    backgroundColor: card.board.prefs.backgroundTopColor,
                    color: 'white'
                  }}
                  label={card.board.name}
                />
              </a>
            </TableCell>
            <TableCell>
              <a href={card.url} target='_blank'>
                {card.name}
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)

export default CardTable
