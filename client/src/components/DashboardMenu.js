import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
// icons
import BookIcon from '@material-ui/icons/Book';
import Assignment from '@material-ui/icons/Assignment'
import CalendarTodaySharpIcon from '@material-ui/icons/CalendarTodaySharp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Divider } from '@material-ui/core';

export default function DashboardMenu({ selectedIndex, setSelectedIndex, user }) {

    const intervieweeItems = ["Book an interview", "Interview calendar", "Practice problems"]
    const intervieweeIcons = [<BookIcon />, <CalendarTodaySharpIcon />, <Assignment/>]
    
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    const intervieweeListItems = intervieweeItems.map((item, index) => {
        return (
            <ListItem
                key={`menu-item-${index}`}
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