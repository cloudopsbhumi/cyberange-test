
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Stack } from '@mui/system';
import MachineCarsoul from './machineCarsoul';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddMachineDialog({network,reloadFlag}) {
  const [open, setOpen] = React.useState(false);
console.log('network-addmachine',network)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Machine 
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
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
             Add Machine
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Stack py={6} px={4}>
            <Typography py={2} variant="h4">Operating system</Typography>
            <MachineCarsoul network={network} reloadFlag={reloadFlag}/>
        </Stack>
        <Stack py={6} px={4}>
            <Typography py={2} variant="h4">Firewall</Typography>
            <MachineCarsoul network={network}/>
        </Stack>
        <Stack py={6} px={4}>
            <Typography py={2} variant="h4">Load balancer</Typography>
            <MachineCarsoul network={network}/>
        </Stack>
      </Dialog>
    </div>
  );
}
