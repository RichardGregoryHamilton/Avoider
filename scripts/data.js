function checkStorage(key) {
	var arrays = ['achievements', 'scores', 'purchases'];
	
	if (!localStorage[key]) {
		localStorage[key] = arrays.indexOf(key) > -1 ? JSON.stringify([]): 0;
	}
}

checkStorage('achievements');
checkStorage('scores');
checkStorage('purchases');
checkStorage('coins');
checkStorage('gamesPlayed');

if (!localStorage['enemy']) {
	localStorage['enemy'] = 'enemy';
}
