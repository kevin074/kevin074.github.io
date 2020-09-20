
import React from "react";
import ModalComp from "../../components/modals"

export default function ({open, onclose} : {open:boolean, onclose:any}) {
	return <ModalComp open={open} onclose={onclose}>
		<div> 1.) Fully Typescript and React </div>
		<div> 2.) material ui </div>
		<div> 3.) algorithm for the game: BFS (alike leetcode number of islands) and DFS (Surrounded Regions).</div>
		<div> 4.) animation in rules </div>
		<div> 5.) refacotrs for code usage but also keeping it simple: ex in rules modal, the modal is reused but not individual rules </div>
	</ModalComp>
}

