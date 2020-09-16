import React from 'react';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ProfilePic from '../../../asset/profile.jpg';
import Avatar from '@material-ui/core/Avatar';
import {Link} from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import EmailIcon from '@material-ui/icons/Email';

export default function () {
	return <div>
		<Avatar alt="profile" src={ProfilePic} style={{width:"100px", height: "100px", marginTop: "60px", marginLeft: "20px" }}/>
		<Link 
			variant="body2"
			target="_blank"
			rel="noreferrer"
			href="https://docs.google.com/document/d/1E-UWbVjpd_JZqTFcSvqRHecnXkh4fecWvnRWhsI4xaY/edit?usp=sharing"> 
				<DescriptionIcon />
				Resume 
		</Link>
		<Link 
			variant="body2"
			target="_blank"
			rel="noreferrer"
			href="mailto:kevin074@gmail.com"> 
				<EmailIcon />
				Email 
		</Link>

		<Card style={{width:"60%", margin:"50px auto"}}><CardContent>
			<div>{ IntroText() }</div>
		</CardContent></Card>
	</div>
}

function IntroText () {
	return IntroString.split('\n').map(function(string:string, index:number){
		if(!string) { return <br /> }

		return <Typography key={index}>{string}</Typography>
	})
}

const IntroString = `Hi I am a Frontend Developer who have been with Ace Metrix for several years. 
Throughout my years I have learned a lot.  This is the first job I have out of college, 
so I am forever grateful for those who interviewd me back then and took a leap of faith on me.
Through the mentorship of past coworkers, I have grown to become a fully dependable developer 
who is currently the lead developer of the only profitable and consumer facing app of the company. 
I have thanks to my team lead above me who do most scoping and sprint planning, as well as a newer coworker who help out with many of tasks.

Throughout the years, I have many thoughts about programming, which are elaborated in the articles section, please feel free to read them and criticize however you want.

For my future, I am looking to dive deeper into more complex programming topics, such as VR or machine learning. 
Both of these fields are currently seriously out of my reach, so I am working everyday however I can to demonstrate my competence as well as doing advance studies, such as algorithms in the Sample Wroks section

This website was also created to be my portfolio.
`
//to add... ?