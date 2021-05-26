import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Collapse } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    background: 'rgba(0,0,0,0.5)',
    margin: '20px',
    padding: '2vh'
  },
  media: {
    height: 150,
    width: 150,
    margin: 'auto'
  },
  title: {
    color: 'white',
    fontFamily: 'Farro',
    textAlign: 'center'
  },
  desc: {
    color: 'white',
    fontFamily: 'Farro',
  },
});

export default function CardImg({ role, checked }) {
  const classes = useStyles();

  return (
    <Collapse in={checked} {... (checked ? { timeout: 1000 } : {})}>
      <Card className={classes.root}>
        <CardMedia className={classes.media}

          image={role.img}
          title="Interviewer"
        />
        <CardContent >
          <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
            {role.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.desc}>
            {role.desc}
          </Typography>
        </CardContent>
      </Card>
    </Collapse>
  );
}
