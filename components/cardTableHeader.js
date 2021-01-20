import Paper from '@material-ui/core/Paper'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import LinearProgress from '@material-ui/core/LinearProgress'

const CardTableHeader = ({ loading }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell style={{ width: '20%' }}>Board</TableCell>
          <TableCell>Card</TableCell>
        </TableRow>
      </TableHead>
      {loading &&
        <TableBody>
          <TableRow>
            <TableCell colSpan={2}>
              <LinearProgress />
            </TableCell>
          </TableRow>
        </TableBody>}
    </Table>
  </TableContainer>
)

export default CardTableHeader
