lakesApp.controller("lakesController",function($scope,$http){
		$scope.lakes=[];
		$http.get('http://localhost:3000/lakes').success(function(response){
		$scope.lakes=response;
		$scope.pageName="Lake";
		});
});