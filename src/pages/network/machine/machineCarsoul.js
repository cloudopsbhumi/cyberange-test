

import axios from "axios";
import { useEffect } from "react";

import "react-multi-carousel/lib/styles.css";
import {  FormControl, FormControlLabel, FormGroup, FormLabel, IconButton, Input, Typography } from "@mui/material"
import { Stack } from "@mui/system"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from "react";
import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';



// import { IconButton, Typography } from "@mui/material"
// import { Stack } from "@mui/system"
// import AddIcon from '@mui/icons-material/Add';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const MachineCarsoul=({network,reloadFlag})=>{
const [image,setImage] = useState()
const [data,setData]=useState(true)
const [server,setServer] = useState({})
    const [open, setOpen] = React.useState(false);
     const [imageId,setImageId] = useState()
     const [open1, setOpen1] = React.useState(false);
  
//     console.log('network-machinecard',network )
// console.log("network-carsoul",network)
  useEffect(()=>{
    axios.get("http://127.0.0.1:8000/api/resources/images/").then(res=>{
    setImage(res.data)
    })

   
  },[])

    const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 3000, min: 2000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 2000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const handleServer=(e)=>{
  setServer((state)=>({...state,[e.target.name]:e.target.value}))
   setServer((state)=>({...state,'networks':network.id}))
  //  setServer((state)=>({...state,'image_id':image.id}))
  //  console.log(server)
 
 }

 function creatingServer(item){
  setOpen1(!open1);
  for(let i=0;i<server.numberOfMachine;i++){
    setOpen(false);
    axios.post('http://127.0.0.1:8000/api/resources/servers/',{
      name:`${server.name} ${i+1}`,
      image_id:imageId,
      flavor_id:server.flavor,
      networks:server.networks,
      password:server.password
    }).then(res=>{
      reloadFlag(res)
      console.log(res)
      setOpen1(false);
    })
  }
 }

 const handleClose = (item) => {
  console.log(server)

  console.log('image_id',item)
   creatingServer(item)
  
  
};
const handleClose1 =() =>{
  setOpen(false)
  (data)?setData(true):setData(false)
}
const handleChange=(id)=>{
   
    (data)?setData(false):setData(true)
    setImageId(id)
    setOpen(true);
}
return(
<Stack direction="row" gap={4}>
<Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
  {
    image?.map((item)=>{
       
      return(
<div style={{maxWidth:"300px"}}>
<Stack style={{backgroundColor:'teal'}} p={2} color='white' justifyContent='flex-start' minWidth="250px" minHeight="80px">
            <Stack direction="row" justifyContent='space-between'>
                <Typography>{item?.name}</Typography>
                <IconButton onClick={()=>handleChange(item.id)}>
       {(data)?<AddIcon />:<RemoveIcon />} 
      </IconButton>
            </Stack>

            <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"  
        open={open}
        style={{minWidth:'600px'}}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose1}>
         Image for “{item?.name}”
        </BootstrapDialogTitle>
        <DialogContent dividers>
            <Stack my={2}>
        <TextField fullWidth label="Machine Name" name="name" id="fullWidth" style={{minWidth:"500px" }} onChange={(e)=>{handleServer(e)}}/>
        </Stack>
        <Stack my={2}>
        <TextField fullWidth label="Description" name="description" id="fullWidth" style={{minWidth:"500px" }} onChange={(e)=>{handleServer(e)}}/>
        </Stack>
        <Stack direction='row' justifyContent='space-around'>
        <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">flavor
            </FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="small"
        name="flavor"
        onChange={(e)=>{handleServer(e)}}
      >
        <FormControlLabel value="2" control={<Radio />} label="small" />
        <FormControlLabel value="3" control={<Radio />} label="Medium" />
        <FormControlLabel value="4" control={<Radio />} label="Large" />
      </RadioGroup>
    </FormControl>
    <Stack direction='row' gap={4}>
        <Stack gap={1.5} alignItems='center'>
            <Typography>RAM(GB)</Typography>
            <Typography>2</Typography>
            <Typography>4</Typography>
            <Typography>8</Typography>
        </Stack>
        <Stack gap={1.5} alignItems='center'>
            <Typography>Disk size(GB)</Typography>
            <Typography>28</Typography>
            <Typography>64</Typography>
            <Typography>128</Typography>
        </Stack>
        <Stack gap={1.5} alignItems='center'>
            <Typography>CPU</Typography>
            <Typography>2</Typography>
            <Typography>4</Typography>
            <Typography>8</Typography>
        </Stack>
       
    </Stack>
    
    </Stack>
    <Stack direction='row' justifyCotent="center" alignItems='center' gap={2} my={2}>
            <Typography>Available limit: 50GB</Typography>
            <Typography>Used:1GB</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" my={2} gap={2}>
          <Typography>No. of machines</Typography>
          <TextField id="outlined-basic" variant="outlined"  defaultValue='1' name="numberOfMachine" onChange={(e)=>{handleServer(e)}}/>

        </Stack>
        <TextField fullWidth label="password" name="password" id="fullWidth" style={{minWidth:"500px" }} onChange={(e)=>{handleServer(e)}}/>

        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>handleClose(item.id)} variant="contained" >
            Add Machine
          </Button>
        </DialogActions>
      </BootstrapDialog>
          </Stack>
  </div>
      )
    })
  }
  
 
 
  </Stack>
)
}

export default MachineCarsoul;