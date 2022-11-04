import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

import { Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddMachineDialog from './machine/addMachineDialog';
import Alert from '@mui/material/Alert';
import { useDispatch } from 'react-redux'
import { setNetwork } from '../../redux/action/action';
import CreadtedMachineCard from './machine/createdMachineCard';



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NetworkDetailsDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [subnet,setSubnet] = React.useState([])
  const [ del,setDelete] = React.useState(false);
  const [minion,setMinion] = React.useState(false)
  const [flag,setFlag] =React.useState('')
  const reloadFlag=(value)=>{
    setFlag(value)
  }
  const dispatch=useDispatch()
  console.log(subnet)
  console.log("network-networkDetails", props?.item)
  let sub=null;

  React.useEffect(()=>{
    axios.get('http://127.0.0.1:8000/api/resources/subnets/').then(res=>{
      setSubnet(res?.data)
      dispatch(setNetwork(res?.data))
    })

    axios.get('http://127.0.0.1:8000/api/resources/routers/').then(res=>{
      console.log(res)
    })
     },[])

     for(let i=0;i<subnet.length;i++){
        if(subnet[i]?.network_id===props?.item?.id){
             sub=subnet[i]
        }
     }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const networkHandle=async()=>{
    setDelete(true)
    let res= await axios.delete(`http://127.0.0.1:8000/api/resources/networks/${props?.item.id}`)
    setMinion(res)
    props.funRender('rishav')
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} style={{minWidth:'271px',minHeight:'153px',backgroundColor:'teal',color:"white"}}>
       
    {props?.item?.name}
    <br/>
    0 machine
      
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        {
          (!del) ?
        
        
        <><AppBar sx={{ position: 'relative' }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                  Network
                </Typography>
                <Button autoFocus color="inherit" onClick={handleClose}>
                  save
                </Button>
              </Toolbar>
            </AppBar><Stack p={4}>
                <Stack maxWidth="100%" borderBottom='1px solid black' direction='row' justifyContent="space-between" pt={4} px={4}>
                  <Stack mb={4}>
                    <Stack component="h2">{props?.item?.name}</Stack>
                    <Stack>subnet name: {sub?.name}</Stack>
                    <Stack>subnet CIDR: {sub?.cidr}</Stack>
                    <Stack>Router Name</Stack>
                  </Stack>
                  <Button variant="contained" startIcon={<DeleteIcon />} style={{ maxHeight: "30px" }} onClick={networkHandle}>
                    Delete Network
                  </Button>
                </Stack>
                <Stack maxWidth='100%' direction='row' justifyContent="space-between" p={4}>
                  <Typography variant="h4">Machines</Typography>
                  <AddMachineDialog  network={props?.item} reloadFlag={reloadFlag}/>
                </Stack>
                <Stack direction='row' gap={4}>
                  <Stack minWidth="300px">
                    <CreadtedMachineCard flag={flag}/>
                  </Stack>
                 

                </Stack>

              </Stack></>
       :
       
        (!minion)?
        <Stack style={{justifyContent:'center',alignItems:'center'}}>
          <Typography  variant="h3" style={{backgroundColor:'#824da6',color:'white'}}>Deleting the {props.item.name} network</Typography>
        <img src="https://cdn.dribbble.com/users/570218/screenshots/2218178/minion_nokeyframerig_old-pc.gif" alt="minion" style={{width:"80%",height:'70%'}}/>
        </Stack>
        :
      <Stack alignItems='center'>
       <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          network has been deleted!!!!!!
        </Alert>
        </Stack>
}
      </Dialog>
    </div>
  );
}
