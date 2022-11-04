
import { Stack } from "@mui/system";
import React, { useEffect } from "react";
import NewtorkDialog from "./networkDialog";
import NetWorkTabs from "./networkTabs";
import RouterDialog from "./router/routerDialog";


const Network=()=>{
    const [render,setRender]=React.useState([])

    const funRender=(value)=>{
        setRender(value)
        console.log(render)
      }
    return(
        <div>
          <Stack direction='row' justifyContent='space-around' pt={8}>
            <Stack component='h2'>
                <Stack>
            All networks
            </Stack>
            <Stack>
             <NetWorkTabs />
            </Stack>
            </Stack>
            <Stack direction="row" gap={2}>
            <RouterDialog/>
            <NewtorkDialog funRender={funRender}/>
            </Stack>
            </Stack>  
        </div>
    )
}

export default Network;