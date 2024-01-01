import { Card, Typography, TextField, FormControlLabel, Switch, Button, CircularProgress, Box, InputAdornment } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CourseCard } from "./Courses"
import { BASE_URL } from "../config";
import '../App.css';
import { useRecoilState } from "recoil";
import { courseState } from "../store/atoms/RecoilState";
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { courseTitleSelector, courseDescriptionSelector, courseImageSelector, coursePriceSelector } from "../store/selectors/courseSelector";


function Course() {
    let { courseId } = useParams();
    /* const [course, setCourse] = useState(); */
    /* const [course, setCourse] = useRecoilState(courseState); */ //Because of course here, it re-renders everything
    const setCourse = useSetRecoilState(courseState);
    const [loading, setLoading] = useState(false);

    if (localStorage.getItem('token')) {

        useEffect(() => {
            setCourse(null); //To remove previous course details from Recoilstate
            setLoading(true);

            fetch(`${BASE_URL}/admin/courses/` + courseId, {
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
                if (response.course) {
                    setTimeout(() => {
                        setCourse(response.course);
                        setLoading(false);
                    }, 2000);
                }
            });
        }, []);

        if (loading) {
            return <Box sx={{ display: 'flex', justifyContent: "center", marginTop: 30 }}>
                <CircularProgress />
            </Box>
        }

        return <div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
                <Typography variant="h5" style={{ color: "#22168d", fontWeight: 'bold', marginBottom: 10 }}>Update Course</Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                <UpdateCourse /* course={course} setCourse={setCourse} */></UpdateCourse>
                <div>
                    <CourseCardTemp /* course={course} */ />
                </div>
            </div>
        </div>

    } else {
        window.location = '/signin';
    }

}


function UpdateCourse(props) {
    const [course, setCourse] = useRecoilState(courseState);
    return <>
        {course && <Card style={{ width: 500, padding: 20, border: "2px solid rgb(34, 22, 141)" }}>
            <TextField className="UpdateCourseTextFields" size="small" label="Title" variant="outlined" onChange={(e) => setCourse((course) => ({ ...course, title: e.target.value }))} value={course.title} autoComplete="off" />
            <TextField className="UpdateCourseTextFields" size="small" label="Description" variant="outlined" onChange={(e) => setCourse((course) => ({ ...course, description: e.target.value }))} value={course.description} />
            <TextField className="UpdateCourseTextFields" size="small" label="Price" variant="outlined" type="number" onChange={(e) => setCourse((course) => ({ ...course, price: e.target.value }))} value={course.price} autoComplete="off" InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} />
            <TextField className="UpdateCourseTextFields" size="small" label="Imagelink" variant="outlined" onChange={(e) => setCourse((course) => ({ ...course, imageLink: e.target.value }))} value={course.imageLink} />
            <FormControlLabel labelPlacement={"start"} control={<Switch checked={course.published} onChange={() => setCourse((course) => ({ ...course, published: !course.published }))} />} label="Published" style={{ color: "green", margin: 10 }} /> <br />

            <Button size='medium' variant="contained" style={{ margin: 12, backgroundColor: "#22168d" }} onClick={() => updateCourse(course)}>Update Course</Button>
        </Card>}
    </>
}

function updateCourse(course) {
    /*  console.log(localStorage.getItem('token'));
     console.log(course.title);
     console.log(course.description);
     console.log(course.published); */
    if (localStorage.getItem('token')) {
        fetch(`${BASE_URL}/admin/courses/` + course._id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                title: course.title,
                description: course.description,
                price: course.price,
                imageLink: course.imageLink,
                published: course.published
            })
        }).then(response => {
            if (response.status !== 401 && response.status !== 403) {
                return response.json();
            } else {
                window.location = "/signin";
            }
        }).then(response => alert(response.message));
    } else {
        window.location = '/signin';
    }
}

function CourseCardTemp(/* props */) {
    const courseTitle = useRecoilValue(courseTitleSelector);
    const courseDescription = useRecoilValue(courseDescriptionSelector);
    const courseImage = useRecoilValue(courseImageSelector);
    
    return <Card style={{ margin: 20, width: 300, borderRadius: "5px", backgroundColor: "#827e9a1c" }}>
        <img alt="No Image" src={courseImage} style={{ width: 300, minHeight: 180 }}></img>
        <div style={{ marginLeft: 10, marginTop: 4 }}>
            <Typography variant="h6" fontWeight={"bold"}>{courseTitle}</Typography>
            <Typography variant="subtitle2" style={{ marginTop: 4, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", lineHeight: 1.4 }}>{courseDescription}</Typography>
        </div>
        <Price />
    </Card>
}

function Price(){ //If Price is changed in the form, only this component re-renders
    const coursePrice = useRecoilValue(coursePriceSelector);

    return <div style={{ margin: "10px 12px 10px 12px" }}>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
         <Typography textAlign={"center"} variant="subtitle1" fontWeight={"bold"}>${coursePrice}</Typography>
    </div>
</div>
}


export default Course;