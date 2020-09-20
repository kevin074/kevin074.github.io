import React from 'react'
import Rules1 from './rules1';
import Rules2 from './rules2';
import Rules3 from './rules3';
import Rules4 from './rules4';
import Rules5 from './rules5';
import Rules6 from './rules6';
import Rules7 from './rules7';
import Rules8 from './rules8';
import Rules9 from './rules9';
import Rules10 from './rules10';
import "./rulesAnimation.scss" //for the rules

import ModalComp from '../../components/modals'



export default function ({open, onclose} : {open:boolean, onclose:any}) {
	return <ModalComp open={open} onclose={onclose}>
		<Rules1 />
		<Rules2 />
		<Rules3 />
		<Rules4 /> 
		<Rules5 />
		<Rules6 />
		<Rules7 />
		<Rules8 /> 
		<Rules9 />
		<Rules10 /> 
	</ModalComp>
}