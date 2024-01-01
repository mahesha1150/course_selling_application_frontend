import { Typography, TextField, Switch, FormControlLabel, Card, Button, InputAdornment, CircularProgress, Box } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import '../App.css';

function AddCourse(){
    const navigate = useNavigate();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [imageLink, setImageLink] = useState();
    const [published, setPublished] = useState(false);
    const [loading, setLoading] = useState(false);

    if(localStorage.getItem('token')){
    return <div>
        {loading && <div className="overlay"> <Box sx={{ display: 'flex', justifyContent: "center"/* , marginTop: 30 */ }}>
            <CircularProgress />
        </Box> </div>}
        <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
           <Typography variant="h6" style={{ color: "#22168d", fontWeight: 'bold', marginBottom: 10 }}>Add Course</Typography>
        </div>
        <div style={{display: "flex", justifyContent: "center"}}>
        <Card variant="outlined" style={{ width: 500, padding: 20, border: "2px solid rgb(34, 22, 141)" }}>
        <TextField fullWidth label="Title" variant="outlined" onChange={(e) => {setTitle(e.target.value)}} style={{marginBottom: 10}} autoComplete="off" />
        <TextField fullWidth label="Description" variant="outlined" onChange={(e) => {setDescription(e.target.value)}} style={{marginBottom: 10}} autoComplete="off" />
        <TextField fullWidth label="Price" variant="outlined" type="number" onChange={(e) => {setPrice(e.target.value)}} style={{marginBottom: 10}} InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment>}} autoComplete="off" />
        <TextField fullWidth label="Imagelink" variant="outlined" onChange={(e) => {setImageLink(e.target.value)}} style={{marginBottom: 10}} autoComplete="off" />
        {/* <Switch label="published" checked={published} onChange={() => {setPublished(!published)}} style={{marginBottom: 10}} /> */}
        <FormControlLabel labelPlacement={"start"}  control={<Switch checked={published} onChange={() => {setPublished(!published)}} />} label="Published" style={{color: "green", marginLeft: "0px"}} /> <br/><br/>

        <Button size='large' variant="contained" style={{ backgroundColor: "#22168d" }} onClick={addCourse}>Add Course</Button>
        </Card>
        </div>
    </div>
    }else{
        //navigate("/signin");
        window.location = '/signin';
    }

    function addCourse() {
       /*  console.log(localStorage.getItem('token'));
        console.log(title);
        console.log(description);
        console.log(published); */
        setLoading(true);
        fetch(`${BASE_URL}/admin/courses`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+ localStorage.getItem('token')
            },
            body: JSON.stringify({
                title,
                description,
                price,
                imageLink,
                published
            })
        }).then(response => {
            setLoading(false);
            if(response.status !== 401 && response.status !== 403){       
               return response.json();
            }else{
                window.location = "/signin";
            }
        }).then((response) => {
            alert(response.message);
            /* navigate("/courses"); */
        });
    }
}

export default AddCourse