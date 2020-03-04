import React, {useState} from 'react';
import SortView from './sorts/sortView';
import GraphView from './graphs/graphView';

const SORT = 'SORT';
const GRAPHS = 'GRAPHS';

function CurrentView (props){
	if(props.currentView === SORT) {
		return <SortView />
	}
	else if(props.currentView === GRAPHS){
		return <GraphView />
	}
}

export default function(){
	const [currentView, setCurrentView] = useState(SORT);

	return <div>
		<button onClick={setCurrentView.bind(null, SORT)}> Sort</button>
		<button onClick={setCurrentView.bind(null, GRAPHS)}> Graphs</button>

		<CurrentView currentView={currentView} />
	</div> 
}