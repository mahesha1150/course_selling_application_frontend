import { Button, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import axios from "axios";

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
    return <div style={{ display: "flex", justifyContent: "space-between", padding: 10 }}>
        <div>
            <Typography variant={"h6"}>KnowledgeHub</Typography>
        </div>
        <div>
            <Button variant="contained" style={{marginRight: 10}} onClick={() => navigate("/signup")/* {window.location = "/signup"} */}>SignUp</Button>
            <Button variant="contained" onClick={() => {navigate("/signin")} /* {window.location = "/signin"} */}>SignIn</Button>
        </div>
    </div>
}

export default Appbar