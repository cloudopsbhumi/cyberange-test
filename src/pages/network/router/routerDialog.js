import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import DialogTitle from '@mui/material/DialogTitle';

// import RouterNetworkSelector from './routerNetworkSelector';


export default function RouterDialog() {
  const [open, setOpen] = React.useState(false);
  const [subnet,setSubnet] = React.useState([])
  const[routerName,setRouterName]=React.useState('')
  const [network,setNetwork]=React.useState([])
  
 const subnet_id=[]
  // console.log('subnet',subnet)
  
  // console.log("network",selectedNetwork)
   
 React.useEffect(()=>{
axios.get('http://127.0.0.1:8000/api/resources/subnets/').then(res=>{
  setSubnet(res.data)
})
 },[])

 const subnetFunction=(value)=>{
  console.log("value",value[value.length-1].id)
  for(let i=0;i<subnet.length;i++){
    if(subnet[i].network_id==value[value.length-1].id){
      subnet_id.push(subnet[i].id)
    }
  }

 }
  const details=async()=>{
    setOpen(false);
    let res=await axios.post('http://127.0.0.1:8000/api/resources/routers/',{name:routerName})
    // console.log(res.data.id)
    // console.log("subnet_id",subnet_id)

for(let i=0;i<subnet_id.length;i++){
    axios.put(`http://127.0.0.1:8000/api/resources/routers/${res.data.id}/add-internal-interface/`,{subnet_id:subnet_id[i]}).then(res=>{
      console.log(res)
     })
}
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  
  
  React.useEffect(()=>{
    axios.get('http://127.0.0.1:8000/api/resources/networks/').then(res=>{
      setNetwork(res?.data)
     
    })
  },[])

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
      Create new router
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add router</DialogTitle>
        <DialogContent>
         
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Router name"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e)=>setRouterName(e.target.value)}
          />
          <Stack my={2}>Add interface</Stack>
          <Stack spacing={3} sx={{ width: 500 }}>
      
      <Autocomplete
      
        multiple
        id="tags-outlined"
        options={network}
        getOptionLabel={(option) => {
       
          // setSelectedNetwork((state)=>([...state,option.id]))
          return(option.name)}}
        filterSelectedOptions
        onChange={(event, value) => subnetFunction(value)} 
        renderInput={(params) =>{
          // console.log(params)
          return(
          <TextField
            {...params}
            label="Network Name"
            placeholder="Favorites"
          />
        )}}
      />
      
      
    </Stack>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={details}>Done</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
