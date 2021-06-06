import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
// icons
import BookIcon from '@material-ui/icons/Book';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import FolderIcon from '@material-ui/icons/Folder';
import CalendarTodaySharpIcon from '@material-ui/icons/CalendarTodaySharp';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Divider } from '@material-ui/core';

export default function DashboardMenu({ selectedIndex, setSelectedIndex, user }) {

    const intervieweeItems = ["Book an interview", "Interview calendar"]
    const intervieweeIcons = [<BookIcon />, <CalendarTodaySharpIcon />]
    const solicitantItems = ["Plan de Versionamiento", "Paquete de programación", "Calendario de programación", "Documentación"]
    const solicitantIcons = [<DeviceHubIcon />, <FolderIcon />, <CalendarTodaySharpIcon />, <AssignmentIcon />]
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    const intervieweeListItems = intervieweeItems.map((item, index) => {
        return (
            <ListItem
                onClick={(event) => handleListItemClick(event, index)}
                selected={selectedIndex === index}
                button>
                <ListItemIcon>
                    {intervieweeIcons[index]}
                </ListItemIcon>
                <ListItemText
                    primaryTypographyProps={{ style: { whiteSpace: "normal" } }}
                    primary={item} />
            </ListItem>
        )
    });

    const solicitantListItems = solicitantItems.map((item, index) => {
        return (
            <ListItem
                onClick={(event) => handleListItemClick(event, index)}
                selected={selectedIndex === index}
                key={index}
                button>
                <ListItemIcon>
                    {solicitantIcons[index]}
                </ListItemIcon>
                <ListItemText
                    primaryTypographyProps={{ style: { whiteSpace: "normal" } }}
                    primary={item} />
            </ListItem>
        )
    });
    return (
        <div>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <AccountCircleIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primaryTypographyProps={{ style: { whiteSpace: "normal" } }}
                    primary={user} />
            </ListItem>
            <Divider />
            {intervieweeListItems}
        </div>
    )
}