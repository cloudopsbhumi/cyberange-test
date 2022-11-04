import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';


export default function NewtorkDialog(funRender) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({})
  // const [id, setId] = React.useState(0)
  // console.log(id)




  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = async() => {
    setOpen(false);
    const res= await (axios.post('http://127.0.0.1:8000/api/resources/networks/', { name: data.name }))
    console.log(res.data.id)
   
    console.log("Subnet Called")
    let resp=await axios.post('http://127.0.0.1:8000/api/resources/subnets/', { name: `${data.name}_subnet`, network_id: res.data.id, cidr: data.cidr })
      
      console.log(resp);
      // try{
      //   funRender(resp)
      // }catch(e){
      //   console.log(e)
      // }
     
     window.location.reload(false);
    
  };
 
  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Create new network
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Network</DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Network name"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => { setData((state) => ({ ...state, name: e.target.value })) }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Subnet CIDR"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => { setData((state) => ({ ...state, cidr: e.target.value })) }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleOpen}>Done</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
