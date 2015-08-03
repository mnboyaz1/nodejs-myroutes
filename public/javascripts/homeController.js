mainApp.controller("homeController", function($scope){
	$scope.home = {
		pageName: "Fish'n Around",
		elements: [
			{name: 'Lodging & Hotels'},
			{name: 'Bait Shops'},
			{name: 'Restaurants'},
			{name: 'Information Centers'}
		]
	};
});