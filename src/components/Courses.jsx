import { useEffect, useState } from "react";
import { useRecoilValue } from 'recoil';
import { userState } from "../store/atoms/RecoilState";
import { Button, Card, Typography, CircularProgress, Box } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios';
import { BASE_URL } from "../config";
import '../App.css';

function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const user = useRecoilValue(userState);
    const userRole = user.userRole; 
    const location = useLocation();
    /* console.log(location); */
    const navigate = useNavigate();

    if (localStorage.getItem('token')) {
        useEffect(() => {
            setLoading(true);
            let coursesURL = null;
            if(userRole === "admin"){
                coursesURL = "admin/courses"
            }else{
                coursesURL = "users/courses"
            }
            fetch(`${BASE_URL}/`+coursesURL, {
                headers: {
                    "authorization": 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    window.location = '/signin';
                }
            }).then(response => {
                setCourses(response.courses);
                setLoading(false);
            });
        }, [])

        /* if (courses.length === 0) {
            return <Box sx={{ display: 'flex', justifyContent: "center", marginTop: 30 }}>
                <CircularProgress />
            </Box>
        } */

        async function deleteCourse(courseId) {
            const userInput = window.prompt("Type DELETE to delete the course:");
            if (userInput === "DELETE") {
                let response = await axios.delete(`${BASE_URL}/admin/courses/` + courseId, {
                    headers: {
                        'authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                });
                setCourses(courses.filter(course => course._id !== response.data.course._id));
            }
        }

        async function purchaseCourse(courseId) { //User Purchasing Course
            try {
                setLoading(true); // Start loading
                let response = await axios.post(`${BASE_URL}/users/courses/` + courseId, {}, {
                    headers: {
                        'authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                });
                /* alert(response.data.message); */
                const updatedCourses = courses.map(course => {
                    if (course._id.toString() === response.data.courseId) {
                      return { ...course, purchasedCourseCheck: true };
                    }
                    return course;
                  });                  
                  setCourses(updatedCourses);
            } catch (error) {
                // Handle 404 Not Found
                /* alert(error.response.data.message); */
            } finally{
                setLoading(false); // Stop loading
            }
            /* setCourses(courses.filter(course => course._id !== response.data.course._id)); */
        }

        return <div>
            {loading && <div className="overlay"> <Box sx={{ display: 'flex', justifyContent: "center"/* , marginTop: 30 */ }}>
                <CircularProgress />
            </Box> </div> }
            <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="h5" style={{ color: "#22168d", fontWeight: 'bold', marginLeft: 10 }}>Courses</Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                {courses.map(course => <CourseCard course={course} purchaseCourse={purchaseCourse} deleteCourse={deleteCourse} navigate={navigate}></CourseCard>)}
            </div>
            </div>
        </div>
    } else {
        window.location = "/signin"
    }
}

export function CourseCard(props) {
    const user = useRecoilValue(userState);
    const userRole = user.userRole;

    return <Card style={{ margin: 20, width: 300, borderRadius: "5px", backgroundColor: "#827e9a1c" }}>
        <img alt="No Image" src={props.course.imageLink} style={{ width: 300, minHeight: 180 }}></img>
        <div style={{ marginLeft: 10, marginTop: 4 }}>
            <Typography variant="h6" fontWeight={"bold"}>{props.course.title}</Typography>
            <Typography variant="subtitle2" style={{ marginTop: 4, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", lineHeight: 1.4 }}>{props.course.description}</Typography>
        </div>
        {/* {(location.pathname === "/courses" || location.pathname === "/purchasedcourses") &&  */}<div style={{ margin: "10px 12px 10px 12px" }}>
            {userRole === "admin" && location.pathname === "/courses" &&
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Button variant="contained" color="success" size="medium" onClick={() => { props.navigate("/courses/" + props.course._id) }}>Update</Button>
                    <Button variant="contained" color="error" size="medium" onClick={() => props.deleteCourse(props.course._id)} startIcon={<DeleteIcon />}>Delete</Button>
                    {/* <IconButton variant="contained" color="error" aria-label="delete" size="large"><DeleteIcon fontSize="inherit"/></IconButton> */}
                </div>}
                {userRole === "admin" && location.pathname === `/courses/${props.course._id}` &&
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                     <Typography textAlign={"center"} variant="subtitle1" fontWeight={"bold"}>${props.course.price}</Typography>
                </div>}
            {userRole === "user" && !props.course.purchasedCourseCheck && <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography textAlign={"center"} variant="subtitle1" fontWeight={"bold"}>${props.course.price}</Typography>
                <Button variant="contained" color="success" size="medium" onClick={() => props.purchaseCourse(props.course._id)}>Buy</Button>
            </div>}
            {userRole === "user" && props.course.purchasedCourseCheck && <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Typography textAlign={"center"} variant="subtitle1" style={{backgroundColor: "#22168d", padding: 4, paddingLeft: 11, paddingRight: 11, color: "white", borderRadius: 5}}>View Course</Typography>
                {/* <Button variant="contained" color="success" size="medium" onClick={() => props.purchaseCourse(props.course._id)}>Buy</Button> */}
            </div>
            }
        </div>{/* } */}
    </Card>
}

export default Courses;