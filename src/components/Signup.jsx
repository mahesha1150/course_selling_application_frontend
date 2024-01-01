import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { Card, Grid, Typography, CircularProgress, Box } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { BASE_URL } from "../config";
import '../App.css';


function SignUp() {
    const [fullname, setFullName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [userImage, setUserImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    /* const [successMessage, setSuccessMessage] = useState();
    const [displayedMessage, setDisplayedMessage] = useState(''); */
    const navigate = useNavigate();
    const index = useRef(0);

    localStorage.removeItem('token');

    const handleFileChange = (event) => {
        const userImageFile = event.target.files[0];
        setUserImage(userImageFile);

        // Create a preview URL for the selected image
        const previewURL = URL.createObjectURL(userImageFile);
        setImagePreview(previewURL);
    };

    /* useEffect(() => {
        if (successMessage && index.current < successMessage.length) {
            function tick() {
                setDisplayedMessage(prev => prev + successMessage[index.current]);
                index.current++;
            }

            if (index.current < successMessage.length - 1) {
                let addChar = setInterval(tick, 40);
                return () => clearInterval(addChar);
            }
        }
    }, [successMessage, displayedMessage]); */

    return <div>
        {loading && <div className="overlay"> <Box sx={{ display: 'flex', justifyContent: "center"/* , marginTop: 30 */ }}>
            <CircularProgress />
        </Box> </div>}
        <Grid container >
            <Grid item xs={12} md={12} lg={8}>
                <div>
                    <img src={"https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"} width={"100%"} />
                </div>
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
                <div style={{ marginRight: "5%" }}>
                    <div style={{ display: "flex", justifyContent: "center"/* , paddingTop: 150 */, marginTop: "10%", marginBottom: 10 }}>
                        <Typography variant={"h6"} style={{ color: "#22168d", fontWeight: 'bold' }}>
                            Welcome to the KnowledgeHub. SignUp Below
                        </Typography>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Card variant="outlined" style={{ width: 500, padding: 20, border: "2px solid rgb(34, 22, 141)" }}>
                            <TextField fullWidth={true} label="Full Name" variant="outlined" autoComplete='off' onChange={(e) => { setFullName(e.target.value) }} /><br /><br />
                            <TextField fullWidth={true} label="Email" variant="outlined" autoComplete='off' onChange={(e) => { setEmail(e.target.value) }} /><br /><br />
                            <TextField fullWidth label="Password" variant="outlined" type="password" onChange={(e) => { setPassword(e.target.value) }} /><br /><br />
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <input accept="image/*" style={{ display: 'none' }} id="upload-image" type="file" onChange={handleFileChange} />
                                <label htmlFor="upload-image"> <Button variant="contained" size="medium" component="span" startIcon={<CloudUploadIcon />}>User Image</Button></label>
                                {imagePreview && <img src={imagePreview} alt="Preview" className='userImage' style={{ marginLeft: 20 }} />}
                            </div><br />
                            <Button size='large' variant="contained" style={{ backgroundColor: "#22168d" }} onClick={signUpAPI}>SignUp</Button>
                        </Card>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "2%" }}>
                        {/* {successMessage && <Typography variant='subtitle1'>{displayedMessage}</Typography>} */}
                    </div>
                </div>
            </Grid>
        </Grid>
    </div >

    async function signUpAPI() {
        setLoading(true);
        try {
            let userBase64Image;
            if (userImage) {
                const reader = new FileReader();
                userBase64Image = await new Promise((resolve) => {
                    reader.onload = (event) => {
                        resolve(event.target.result);
                    };
                    reader.readAsDataURL(userImage);
                });
            }

            let response = await axios.post(`${BASE_URL}/users/signup`, {
                fullname,
                username: email,
                password,
                userimage: userBase64Image
            });
            let data = response.data;
            /* localStorage.setItem("token", data.accessToken); */
            setLoading(false);
            alert(data.message);
            /* setSuccessMessage(data.message); */
            window.location = "/signin"
            setTimeout(() => {
                /* setSuccessMessage('');
                setDisplayedMessage(''); */
                /* window.location = "/signin" */
            }, 5000);
        } catch (err) {
            setLoading(false);
            alert(err.response.data.message);
        }
        finally {
            /* setLoading(false); */
        }
    }
}


export default SignUp