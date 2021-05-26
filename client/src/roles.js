const roles = [
    {
        title: 'Interviewer',
        desc: "Sign up as an interviewer and be able to practice that role in a technical interview, guide and assess your peers, comment on their work and help them prepare for the big moment. ",
        img: process.env.PUBLIC_URL + 'Interviewer.png',
        direction: 'right',
        time: 1500,
    },
    {
        title: 'Interviewee',
        desc: "Sign up as an interviewee and get to practice your programming skills and time-management in a safe environment, guided by an interviewer who will help you throughout the exercise. ",
        img: process.env.PUBLIC_URL + 'Interviee.png',
        direction: 'left',
        time: 1500,
    },


];

export default roles;