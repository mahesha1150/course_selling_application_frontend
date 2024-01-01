import React from 'react'
import { useRecoilValue } from 'recoil';
import { userState } from "../store/atoms/RecoilState";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QueueIcon from '@mui/icons-material/Queue';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import { useNavigate } from "react-router-dom";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { userRoleSelector } from '../store/selectors/RecoilSelectors';

function SideBarMenu() {
  const navigate = useNavigate();
  /* const user = useRecoilValue(userState);
  const userRole = user.userRole; */
  /* const userRole = useRecoilValue(userState).userRole; */
  const userRole = useRecoilValue(userRoleSelector);

  const commonMenuList = [{
    text: "Courses",
    icon: <LibraryBooksIcon />,
    onClick: "/courses"
  }]

  const menuList = {
    admin: [
      {
        text: "AddCourse",
        icon: <QueueIcon />,
        onClick: "/addcourse"
      }
    ],
    user: [
      {
        text: "Purchased Courses",
        icon: <LibraryAddCheckIcon />,
        onClick: "/purchasedcourses"
      },
    ],
    default: [
      {
        text: "Courses",
        icon: <LibraryBooksIcon />,
        onClick: "/courses"
      }
    ]
  }

  menuList.admin.splice(1, 0, ...commonMenuList);
  menuList.user.splice(0, 0, ...commonMenuList);

  const sideBarMenuList = userRole ? menuList[userRole] : menuList["default"];
  return (
    <List>
      {sideBarMenuList.map((item, index) => {
        const { text, icon, onClick } = item;
        return (
          <ListItem key={text} disablePadding sx={{ display: 'block' }} onClick={() => { navigate(onClick) }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {icon}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  )
}

export default SideBarMenu