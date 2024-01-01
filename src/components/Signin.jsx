import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { Card, Grid, Typography, CircularProgress, Box } from '@mui/material';
import { useState, useContext } from "react";
import { AppContext } from "../App";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from "../config";
import '../App.css';

function Signin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    /* const { setUser } = useContext(AppContext); */
    const [loading, setLoading] = useState(false);

    localStorage.removeItem('token');

    return <div>
        <Grid container >
            <Grid item xs={12} md={12} lg={8}>
                <div>
                    <img src={"https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"} width={"100%"} />
                </div>
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
                <div style={{ display: "flex", justifyContent: "center"/* , paddingTop: 150 */, marginTop: "20%", marginBottom: 10 }}>
                    <Typography variant={"h6"} style={{ color: "#22168d", fontWeight: 'bold' }}>
                        Hello User! Please SignIn Below
                    </Typography>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Card variant="outlined" style={{ width: 400, padding: 20, border: "2px solid rgb(34, 22, 141)" }}>
                        <TextField fullWidth={true} id="email" label="Email" variant="outlined" autoComplete='off' onChange={(e) => setEmail(e.target.value)} /><br /><br />
                        <TextField fullWidth id="password" label="Password" variant="outlined" type="password" onChange={(e) => setPassword(e.target.value)} /><br /><br />
                        <Button size='large' variant="contained" style={{ backgroundColor: "#22168d" }} onClick={async () => {
                            let response = await axios.post(`${BASE_URL}/users/login`, {}, {
                                headers: {
                                    username: email,
                                    password
                                }
                            });
                            const data = response.data;
                            localStorage.setItem('token', data.accessToken);
                            localStorage.setItem('userImage', data.userimage);
                           
                            //Instead of Hard reload using window.location. We can use this code for navigate
                            /* setUser({
                                userFullName: response.data.fullname,
                                userName: response.data.username,
                                userRole: response.data.userrole
                              }) */
                            
                              if (data.userrole === "admin") {
                                /* navigate("/addcourse"); */
                                window.location = "/addcourse";
                            } else {
                                /* navigate("/courses"); */
                                window.location = "/courses";
                            }
                        }}>SignIn</Button>
                    </Card>
                </div>
            </Grid>
        </Grid>
    </div>
}


export default Signin