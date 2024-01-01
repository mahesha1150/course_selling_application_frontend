import { useEffect, useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Appbar from "./components/Appbar";
import { userState } from "./store/atoms/RecoilState";
import axios from "axios";
import { BASE_URL } from "./config";
import { useRecoilState, useSetRecoilState } from 'recoil';

export const AppContext = createContext();

function App() {
  /* const [user, setUser] = useRecoilState(userState); */
  const setUser = useSetRecoilState(userState);

  if (localStorage.getItem('token')) {
    const init = async () => {
      try{
        const response = await axios.get(`${BASE_URL}/users/profile`, {
          headers: {
            'authorization': 'Bearer ' + localStorage.getItem('token')
          }
        });
        setUser({
          userFullName: response.data.fullname,
          userName: response.data.username,
          userRole: response.data.userrole
        });
      }catch(err){
        /* alert(err.response.data.message); */
        if(err.response.status === 403){
          window.location = "/signin";
        }
      }
      }

    useEffect(() => {
      init();
    }, []);
  }

  return (
      <div/*  style={{ width: "100vw", height: "100vh", backgroundColor: "#eeeeee" }} */>
        <Router>
          <Appbar />
        </Router>
      </div>
  )
}

export default App