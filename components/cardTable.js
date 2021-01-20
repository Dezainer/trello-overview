import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import LinearProgress from '@material-ui/core/LinearProgress'

const CardTable = ({ cards }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell style={{ width: '20%' }}>Board</TableCell>
          <TableCell>Card</TableCell>
        </TableRow>
      </TableHead>
      {cards
        ? (
          <TableBody>
            {cards.map(card => (
              <TableRow key={card.id}>
                <TableCell>
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
        )
        : (
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>
                <LinearProgress />
              </TableCell>
            </TableRow>
          </TableBody>
        )}
    </Table>
  </TableContainer>
)

export default CardTable
