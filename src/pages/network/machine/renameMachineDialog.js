import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';
import { Stack } from '@mui/system';
import { useFormik } from 'formik';
import axios from 'axios';

const initialValues={
    name:''
}

export default function RenameMachineDialog({item , reloadFlag}) {
    console.log(item)
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {values,errors,handleBlur,handleChange,handleSubmit}=useFormik({
    initialValues,
    onSubmit:(values)=>{
        console.log(values)
        // console.log('id',id.item)
        apicall()
    async function apicall(){
            let data=  await axios.put(`http://127.0.0.1:8000/api/resources/servers/${item.id}/rename-server/`,values).then((res)=>{
              alert('name has been changed please wait')    
            console.log(res)
                reloadFlag(res)
            })
       console.log(data)
    }
    }

  })
  return (
    <div>
      <IconButton variant="outlined" onClick={handleClickOpen}>
      <MoreVertIcon/>
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Machine Name--{item.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          {item.image_name}
          </DialogContentText>
          <form onSubmit={handleSubmit}>

         
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="New Name"
            type="name"
            name="name"
            fullWidth
            variant="standard"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Stack justifyContent='flex-end' border='1px solid black'maxWidth='100px'>
 <Button onClick={handleClose} type='submit' maxWidth='100px' variant='contained'>submit</Button>
 </Stack>
</form>
        </DialogContent>
        <DialogActions>
          
         
        </DialogActions>
      </Dialog>
    </div>
  );
}
