import {Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";


export const Landing = ({ userName }) => {
    const navigate = useNavigate()
    return <div>
        <Grid container >
            <Grid item xs={12} md={12} lg={6}>
                <div>
                    <Typography variant={"h2"}>
                    KnowledgeHub Admin
                    </Typography>
                    <Typography variant={"h5"}>
                        A place to learn, earn and grow
                    </Typography>
                    {!userName && <div style={{display: "flex", marginTop: 20}}>
                        <div style={{marginRight: 10}}>
                            <Button
                                size={"large"}
                                variant={"contained"}
                                onClick={() => {
                                    navigate("/signup")
                                }}
                            >Signup</Button>
                        </div>
                        <div>
                            <Button
                                size={"large"}
                                variant={"contained"}
                                onClick={() => {
                                    navigate("/signin")
                                }}
                            >Signin</Button>
                        </div>
                    </div>}
                </div>
                <div>
                </div>
            </Grid>
            <Grid item xs={12} md={12} lg={6}  style={{marginTop: 30}}>
                <img src={"/class.jpeg"} width={"100%"} />
            </Grid>
        </Grid>
    </div>
}