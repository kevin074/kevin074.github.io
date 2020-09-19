import React from 'react';
import { FlexCenter } from '../../../css/commonCss';
import { RuleHeaderStyle } from './rules1'

export default function () {
	return <div style={{flexDirection:"column", ...FlexCenter}}>
		<h1 style={RuleHeaderStyle}> 
			10.) Winner is the one with more <br/>[# pieces on the board - # pieces taken offboard] 
		</h1>
	</div>
}