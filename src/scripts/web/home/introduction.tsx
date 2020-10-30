import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ProfilePic from '../../../asset/profile.jpg';
import Avatar from '@material-ui/core/Avatar';
import {Link} from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import EmailIcon from '@material-ui/icons/Email';
import SettingsIcon from '@material-ui/icons/Settings';
import CodeIcon from '@material-ui/icons/Code';

import {primaryColorBlue, secondaryLightGrey, secondaryDarkGrey} from '../../css/commonCss'

export default function () {
	return <div style={{display:"flex", flexDirection:"column"}}>

		<section className="firstContainer" style={firstContainerStyle}>
			<div className="introGreet" style={{ padding: "0 5vw", ...marginCenterVertical }}>
				<div style={{fontSize:"4vw", marginBottom: "5vh"}}>Hi !</div>
				<div style={{fontSize:"6vw"}}> I'm Kevin, <br /> a Frontend Developer from LA</div>
			</div>
		</section>

		<section className="secondContainer" style={sections}>
			<div className="introCol1" style={{flexBasis:"25vw"}}>

				<Avatar alt="profile" src={ProfilePic} style={{width:"200px", height: "200px", borderRadius:0}}/> 

				<div style={experienceContactStyle}>
					<div>EXPERIENCE - </div>
					<Link 
						style={emailResumeStyle}
						variant="body2"
						target="_blank"
						rel="noreferrer"
						href="https://docs.google.com/document/d/1E-UWbVjpd_JZqTFcSvqRHecnXkh4fecWvnRWhsI4xaY/edit?usp=sharing"> 
							RESUME 
					</Link>
				</div>
				<div style={experienceContactStyle}>
					<div>GET IN TOUCH -</div>
					<Link 
						style={emailResumeStyle}
						variant="body2"
						target="_blank"
						rel="noreferrer"
						href="mailto:kevin074@gmail.com"> 
							CONTACT 
					</Link>
				</div>
			</div>
			<div className="introCol2" style={{flexBasis:"45vw"}}>
				<Card style={{boxShadow:"none"}}><CardContent>
					<div>{ IntroText() }</div>
				</CardContent></Card>
			</div>
		</section>

		<section className="thirdContainer" style={{height:"50vh"}}>
			<div style={{display:"flex", justifyContent: "space-evenly", height: "100%", background:secondaryLightGrey}}>
				<div style={footerColumns}>
					<h4 style={h4Style}><SettingsIcon style={footerIconStyle}/>Skills</h4>
					<FooterList>Frontend Development</FooterList>
					<FooterList>Agile Sprints</FooterList>
					<FooterList>Browser Compatibility</FooterList>
					<FooterList>Mentorship</FooterList>
					<FooterList>Code Reviews</FooterList>
				</div>
				<div style={footerColumns}>
					<h4 style={h4Style}><CodeIcon style={footerIconStyle}/>Tech Stacks</h4>
					<FooterList>React</FooterList>
					<FooterList>Typescript</FooterList>
					<FooterList>KnockoutJS</FooterList>
					<FooterList>Webpack</FooterList>
					<FooterList>Highcharts</FooterList>
				</div>
			</div>
		</section>

	</div>
}

function FooterList (props:any) {
	return <div style={{marginBottom: "10px"}}>{props.children}</div>
}

const h4Style = {
	marginBottom:"25px"
}


const experienceContactStyle = {
	marginTop:"20px"
}

const emailResumeStyle = {
	color:secondaryDarkGrey
}
const marginCenterVertical = { marginTop: "-25vh" }

const sections = { 
	display:"flex",
    justifyContent: "center",
    alignItems: "center",
	height:"100vh" 
}

const footerColumns = {
	display:"flex", 
	flexDirection:"column" as "column", 
	justifyContent:"center" as "center"
}

const footerIconStyle = {
	position:"absolute" as "absolute", 
	top:"4px", 
	fontSize:"1em",
    left: "-1.2em",
}

const firstContainerStyle = Object.assign( {}, sections, {
	background:"linear-gradient(166deg, rgba(38,39,59,1) 0%, rgba(166,170,233,1) 69%, rgba(154,202,242,0.82) 100%)", 
	color:"white",
	fontWeight:200,
})


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