import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { CourseCard } from "./Courses";
import { Typography, Box, CircularProgress } from '@mui/material';
import '../App.css';
import { BASE_URL } from "../config";

function PurchasedCourses(/* { userRole } */) {
    const [purchasedCourses, setPurchasedCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    if (localStorage.getItem('token')) {
        useEffect(() => {
            setLoading(true);
            fetch(`${BASE_URL}/users/purchasedcourses`, {
                headers: {
                    "authorization": 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                if (response.status !== 401 && response.status !== 403) {
                    return response.json();
                } else {
                    window.location = '/signin';
                }
            }).then(response => {
                if (response.purchasedCourses) {
                    setPurchasedCourses(response.purchasedCourses);
                }
                setLoading(false);
            });
        }, [])


        return <div>
            {loading && <div className="overlay"> <Box sx={{ display: 'flex', justifyContent: "center" }}>
                <CircularProgress />
            </Box> </div>}
            <div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Typography variant="h5" style={{ color: "#22168d", fontWeight: 'bold', marginLeft: 10 }}>Purchased Courses</Typography>
                </div>
                <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                    {purchasedCourses.map(course => <CourseCard course={course}></CourseCard>)}
                </div>
            </div>
        </div>
    } else {
        window.location = "/signin"
    }
}

export default PurchasedCourses;