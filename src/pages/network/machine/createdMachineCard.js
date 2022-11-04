import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgress from '@mui/material/CircularProgress';

import axios from 'axios';
import { Stack } from '@mui/system';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { Backdrop, Button } from '@mui/material';
import RenameMachineDialog from './renameMachineDialog';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CreadtedMachineCard(item) {
  const [flag,setFlag]=React.useState('')
  const [reload,setReload] = React.useState()
  const [expanded, setExpanded] = React.useState(false);
  const [server,setServer] = React.useState([])
  const [open, setOpen] = React.useState(false);
  
  const handleClose = () => {
    setOpen(false);
  };
  // const handleToggle = () => {
  //   setOpen(!open);
  // };

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  React.useEffect(()=>{
axios.get("http://127.0.0.1:8000/api/resources/servers/").then(res=>setServer(res.data))
  },[flag,item,reload])

  const handleServerStart=async(data)=>{
    console.log(data)
    setOpen(!open);
     let server=await axios.put(`http://127.0.0.1:8000/api/resources/servers/${data}/start/`)
     setReload(server)
    console.log(server)
    setOpen(false);
    
  }

  const handleServerStop=async(data)=>{
    console.log(data)
    setOpen(!open);
     let server=await axios.put(`http://127.0.0.1:8000/api/resources/servers/${data}/stop/`)
     setReload(server)
    console.log(server)
    setOpen(false);
  }

  const handleRename=async(id)=>{
    console.log(id)
  }

  const reloadFlag=(data)=>{
    setFlag(data)
  }
  return (
    <Stack direction="row" gap={3}>
       <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    {
    server.map((item)=>{
       return(
        
<Card sx={{ maxWidth: 345 }}>
      <CardHeader
      
        action={
          <IconButton aria-label="settings" onClick={()=>handleRename(item.id)}>
            <RenameMachineDialog item={item} reloadFlag={reloadFlag}/>
          </IconButton>
        }
        title={item.name}
        subheader={item.image_name}
        
      />
      <CardActions>
      <Button variant="contained" startIcon={<PlayArrowIcon />} disabled={(item.status=='ACTIVE')?true:false} onClick={()=>handleServerStart(item.id)}>
  start
</Button>
<Button variant="contained" startIcon={<StopCircleIcon />} disabled={(item.status=="SHUTOFF")?true:false} onClick={()=>handleServerStop(item.id)}>
  stop
</Button>
      </CardActions>
     
      <CardContent>
       
        <Typography>
        RAM: {item.ram}
        </Typography>
        <Typography>
        Disk size: {item.disk}
        </Typography>
        <Typography>
        CPU: {item.vcpus}
        </Typography>
        <Typography>
        STATUS: {item.status}
        </Typography>
        <Button variant='contained' onClick={()=>{window.location.href=item.console_url}}>console</Button>
      </CardContent>
      
    </Card>
      )
    })
  }
    </Stack>
  );
}
