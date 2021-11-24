import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid, Badge} from '@material-ui/core';
import { useProblems } from '../hooks/useProblems';


export default function Problems() {
  const [selected, setSelected] = useState("all");
  const { data: problems } = useProblems();
  
  const mockData = [
  {
    name:"Test2",
    level:"medium",
    description:"test",
    url:"google.com"
  },
  {
    name:"Test3",
    level:"hard",
    description:"test",
    url:"google.com"
  }]

  const levels = {
    'easy': 'Easy',
    'medium': 'Medium',
    'hard': 'Hard',
  }


  const filterData = (data) => {
    if(data){
      if(selected === 'all') return data;
      let res = data.filter((problem) => problem.level === selected);
      return res;
    }
  }

  return (
    <Container component="main">
      <div style={{marginBottom: 25}}>
        <Button style={{ backgroundColor:selected === "all" ? "#1f4a78" : "grey", marginRight: 10, color:'white'}} onClick={() => setSelected("all")}>All</Button>
        <Button style={{ backgroundColor:selected === "easy" ? "#1f4a78" : "grey", marginRight: 10,  color:'white'}} onClick={() => setSelected("easy")}>Easy</Button>
        <Button style={{ backgroundColor:selected === "medium" ? "#1f4a78" : "grey",  marginRight: 10, color:'white'}} onClick={() => setSelected("medium")}>Medium</Button>
        <Button style={{ backgroundColor:selected === "hard" ? "#1f4a78" : "grey",  marginRight: 10, color:'white'}} onClick={() => setSelected("hard")}>Hard</Button>
      </div>
      <Grid container spacing={2}>
       {problems.problems && filterData(problems.problems).length <= 0 && <p>Currently there are no problems</p>}
       {problems.problems && filterData(problems.problems).map((problem)=>{
           return(
             <Grid item xs={12} md={4}>
            <Badge badgeContent={levels[problem.level]} color="primary">
              <Card>
            <CardContent style={{width:"250px"}}>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {problem.name}
              </Typography>
              <Typography variant="body2">
                {problem.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" href={problem.url} target="_new" style={{backgroundColor: 'grey', color: 'white'}}>Go to problem</Button>
            </CardActions>
          </Card>   
          </Badge>

          </Grid>
           );
        })}
      </Grid>
    </Container>
  );
}

