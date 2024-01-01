import { useState } from "react";
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState, openState } from "../store/atoms/RecoilState";
import { styled, useTheme } from '@mui/material/styles';
import { Box, Button, Toolbar, Tooltip, Avatar, Menu, MenuItem } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./Signup";
import Signin from "./Signin";
import AddCourse from "./AddCourse";
import Courses from "./Courses";
/* import CoursesRecoil from "./CoursesRecoil"; */
import Course from './Course';
import { Landing } from './Landing';
import SideBarMenu from "./SideBarMenu";
import PurchasedCourses from "./PurchasedCourses";
import myImage from '../assets/2.jpg';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

/* const settings = {
  username: "ADMIN",
  role: "admin",
  logout: "Logout"
} */

export default function MiniDrawer() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  /* const {user, setUser, open, setOpen} = useContext(AppContext); */
  const user = useRecoilValue(userState);
  const [open, setOpen] = useRecoilState(openState);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  }

  const userRoleIcon = user.userRole === "admin" ? "<"+AdminPanelSettingsIcon +" />" : "<"+AccountCircleIcon +" />";

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" style={{ backgroundColor: "#22168d" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" style={{ cursor: "pointer" }} onClick={() => { navigate("/courses") }}>
            KnowledgeHub
          </Typography>

          {user.userName && <div style={{ display: 'flex', justifyContent: "flex-end", marginLeft: "auto" }}>
            {/* <Typography variant="h6" style={{marginRight: 12, marginTop: 1}}>{user.userName.toUpperCase()}</Typography>
            <Button color="inherit" onClick={() => { localStorage.removeItem('token'), window.location = "/signin" }}>LogOut</Button> */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.userFullName.toUpperCase()} src={`${localStorage.getItem("userImage")}`} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {/* {settings.map((setting) => (
                <MenuItem key={setting.username}>
                  <Typography textAlign="center">{setting.username}</Typography>
                </MenuItem>
              ))} */}
                <MenuItem key={user.userFullName}>
                  <Typography textAlign="center" color={"dark-grey"} fontWeight={"bold"}>{user.userFullName}</Typography>
                  {/* {user.userRole === "admin" && <AdminPanelSettingsIcon style={{color: "#22168d"}} />}
                  {user.userRole === "user" && <AccountCircleIcon  style={{color: "#22168d"}} />} */}
                </MenuItem>
                {/* <MenuItem key={settings.username}>
                  <Typography textAlign="center">Role: {settings.role}</Typography>
                </MenuItem> */}
                <MenuItem key={"logout"}>
                  <Typography textAlign="center" color={"black"} fontWeight={"bold"} onClick={() => { localStorage.removeItem('token'), window.location = "/signin" }}>Logout </Typography>
                  {/* <LogoutIcon  style={{color: "#22168d"}} /> */}
                </MenuItem>
              </Menu>
            </Box>
          </div>
          }

          {!user.userName && <div style={{ marginLeft: 'auto' }}>
            <Button color="inherit" onClick={() => navigate("/signup")}>SignUp</Button>
            <Button color="inherit" onClick={() => { navigate("/signin") }}>SignIn</Button>
          </div>
          }
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader />
        <Divider />
        <SideBarMenu />
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
          {/* <Route path="/" element={<Landing userName={user.userName} />} /> */}
          <Route path="/" element={<Courses />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/addcourse" element={<AddCourse />} />
          <Route path="/courses/:courseId" element={<Course />} />
          <Route path="/courses" element={<Courses />} />
          {/* <Route path="/courses" element={<CoursesRecoil />} /> */}
          <Route path="/purchasedcourses" element={<PurchasedCourses />} />
        </Routes>
      </Box>
    </Box>
  );
}