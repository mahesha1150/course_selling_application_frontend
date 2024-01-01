import { Box } from "@mui/material"
import SideBar from './SideBar';

function Appbar() {
    return <div>
        
        <Box sx={{ flexGrow: 1 }}>
            <SideBar />
        </Box>
    </div>
}

export default Appbar