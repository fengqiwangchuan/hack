function closeNav(){
	document.getElementById('mySidenav').style.width = '0';
	document.getElementById('app').style.marginLeft = '0';
	document.getElementById('app').style.width = '100%';
}	
function openNav(){
	document.getElementById('mySidenav').style.width = '250px';
	document.getElementById('app').style.marginLeft = '250px';
	document.getElementById('app').style.width = '80%';
};

$(function(){
	$('#mySidenav').children('a').click(function(){
		$('#mySidenav').children('a').attr('class','');
		$('#app').children('.module').css('display','none');
		$(this).attr('class','active');
		$('#app').children('.module').eq($(this).index()-1).css('display','block');
	});
});
