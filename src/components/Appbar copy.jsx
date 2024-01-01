import { Button, Typography, AppBar, Box, Toolbar, IconButton } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import axios from "axios";
import MenuIcon from '@mui/icons-material/Menu';
import VerticalNavbar from '../components/VerticalNavBar';

function Appbar() {
const navigate = useNavigate();
const [userName, setUsername] = useState();

if (localStorage.getItem('token')) {
const init = async () => {
    const response = await axios.get(`${BASE_URL}/admin/profile`, {
        headers: {
            'authorization': 'Bearer '+ localStorage.getItem('token')
        }
    });
    setUsername(response.data.username);
}

useEffect(() => {
    init();
}, []);
}

    if(userName){
        return <div style={{ display: "flex", justifyContent: "space-between", padding: 10 }}>
        <div>
            <Typography variant={"h6"}>KnowledgeHub</Typography>
        </div>
        <div style={{display: "flex"}}>
            <Typography variant="h5" style={{marginRight: "10px"}}>{userName}</Typography>
            <Button variant="contained" onClick={() => {localStorage.removeItem('token'), window.location = "/signin"}}>LogOut</Button>
        </div>
    </div>
    }
    return <div>
        
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="medium" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} >
                        <MenuIcon />
                    </IconButton>
                    <VerticalNavbar />
                    {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}> News </Typography> */}
                    {/* <div sx={{ flexGrow: 1 }} /> */}
                    <div style={{ marginLeft: 'auto' }}>
                    <Button color="inherit" onClick={() => navigate("/signup")}>SignUp</Button>
                    <Button color="inherit" onClick={() => {navigate("/signin")}}>SignIn</Button>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    </div>
}

export default Appbar