import * as React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import NetworkCard from './networkCard';
import { useDispatch } from 'react-redux'
import { Stack } from '@mui/system';
import NetworkDetailsDialog from './networkDetailsDialog';
import { setNetwork } from '../../redux/action/action';
import Networks from './topology';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function NetWorkTabs() {
  const [value, setValue] = React.useState(0);
  const [network,setNetworks]=React.useState([])
  const [render,setRender]=React.useState('')
  const dispatch=useDispatch()
console.log("network",network)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const funRender=(value)=>{
    setRender(value)
    console.log(value)
  }
  React.useEffect(()=>{
    axios.get('http://127.0.0.1:8000/api/resources/networks/').then(res=>{
      setNetworks(res.data)
      dispatch(setNetwork(res?.data))
    })
  },[render])
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Normal view" {...a11yProps(0)} />
          <Tab label="Topology view" {...a11yProps(1)} />
          
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Stack direction='row' gap={2}>
        {
          network.map((item)=><NetworkDetailsDialog item={item}  funRender={funRender}/>)
        }
       
    </Stack>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Networks/>
      </TabPanel>
      
    </Box>
  );
}
