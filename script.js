$(document).ready(function () {
	if(navigator.userAgent.indexOf('Chrome')<0) alert('Hi I coded only for Chrome in mind :)')
	var currentMode; 
	var FRIENDSMODE = 'friends'
	var RECRUITERSMODE = 'recruiters'
	
	//init hides
	$('.hiddenChild').hide()
	$('.contents').hide()
	$('.content').hide()
	$('.modes').hide()
	$('.title.myName').hide()
	$('.detail.indent.myInfo').hide()
	//init hides

	var tabSwitch = function(toMode, changeMode, ease){
		//show the tab = to the mode
		//change the mode-cliker to !mode
		var easeConfig   = ease   === 'easeIn'  ? [400, 'easeOutQuad'] : null
		var oppositeMode = toMode === 'friends' ? RECRUITERSMODE:FRIENDSMODE
		var modeTap 	 = toMode === 'friends' ? '.forFriends'    : '.forRecruiters';
		var oppositeTab  = toMode === 'friends' ? '.forRecruiters' : '.forFriends';

		$(oppositeTab).show(easeConfig)
		$('.tabs.'+toMode).find('.hiddenChild').show(easeConfig)
		
		$(modeTap).hide()
		$('.tabs.'+oppositeMode).find('.hiddenChild').hide()
		$('.contents').hide()
		$('.content').hide()

		if(changeMode) currentMode = toMode
	}

	$('.hiddenParent').click(function(){
		if($(this)[0].className.indexOf('profile')>-1){
			
			$(this).find('.hiddenChild').toggle(400, 'easeOutQuad') //showing info
			$(this)[0].className = $(this)[0].className.split('animate').join('paused')// stop animation

			var isAnythingShowing = currentMode && $('.tabs.'+currentMode).find('.hiddenChild').css('display') === 'inline-block'
			if(isAnythingShowing){
		 		$('.contents').hide()
	 			$('.modes').hide()
				$('.tabs').find('.hiddenChild').hide()
			}

			else{
				switch(currentMode) {
					case 'recruiters': tabSwitch(RECRUITERSMODE); break;
					case 'friends':    tabSwitch(FRIENDSMODE); break;
					default:           tabSwitch(RECRUITERSMODE, 'changeMode', 'easeIn'); break;
				}
			}
			$('#profilePointer').toggle();
		}
		else{
			$(this).find('.hiddenChild').toggle(400, 'easeOutQuad')
		}
	})

	$('.forRecruiters').click(function(){tabSwitch(RECRUITERSMODE, 'changeMode')})
	$('.forFriends').click(function(){	 tabSwitch(FRIENDSMODE,    'changeMode')})
	$('.printMode').click(function(){
		$('.title.myName').toggle()
		$('.detail.indent.myInfo').toggle()
	})

	var tabs = [
		'.tabChild.resume',
		'.tabChild.story',
		'.tabChild.meetMe',
		'.tabChild.hi'
	]
	tabs.forEach(function(tab){
		$(tab).click(function(){
			$('.contents').show()
			var correspond = tab.substring(tab.indexOf('.tabChild')+9, 999)
			$('.content').each(function(index, content){
				if(content.className!=='.content'+correspond)$(content).hide()
			})
			$('.content'+correspond).show()
		})
	})





});
