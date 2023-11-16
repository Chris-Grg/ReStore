import { Box, IconButton, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Add, Delete, Remove } from '@mui/icons-material';
import { useStoreContext } from '../../app/context/StoreContext';
import { useState } from 'react';
import agent from '../../app/api/agent';
import { LoadingButton } from '@mui/lab';


const BasketPage = () => {
    const {basket, setBasket, removeItem} = useStoreContext();
    const [loading, setLoading] = useState(false);
    function handleAddItem(productId: number){
        setLoading(true);
        agent.Basket.addItem(productId)
            .then(basket=> setBasket(basket))
            .catch(error=> console.log(error))
            .finally(()=>setLoading(false))
    }
    function handleRemoveItem(productId: number, quantity=1 ){
      setLoading(true);
      agent.Basket.removeItem(productId,quantity)
          .then(()=> removeItem(productId, quantity))
          .catch(error=> console.log(error))
          .finally(()=>setLoading(false))
  }
    if (!basket) return <Typography variant="h3">Your basket is empty</Typography>;

    return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {basket.items.map(item => (
            <TableRow
              key={item.productId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              <Box display='flex' alignItems='center'>
                  <img src={item.pictureUrl} alt={item.name} style={{height:50, marginRight:20}} />
                  <span>{item.name}</span>
              </Box>
              </TableCell>
              <TableCell align="right">{(item.price/100).toFixed(2)}</TableCell>
              <TableCell align="center">
                <LoadingButton loading={loading} onClick={()=>handleRemoveItem} color='error'>
                    <Remove/>
                </LoadingButton>
                {item.quantity}
                <LoadingButton loading={loading} onClick={()=>handleAddItem} color='secondary'>
                    <Add/>
                </LoadingButton>
              </TableCell>
              <TableCell align="right">{(item.price * item.quantity).toFixed(2)}</TableCell>
              <TableCell align="right">
                <LoadingButton loading={loading} onClick={()=>handleRemoveItem(item.productId, item.quantity)} color='error'>
                    <Delete/>
                </LoadingButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>)
}

export default BasketPage