angular.module('google', [])
.controller('MainController', function($scope, $http) {
	var params = {}, queryString = location.hash.substring(1),
	    regex = /([^&=]+)=([^&]*)/g, m;
	while (m = regex.exec(queryString)) {
	  params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
	}
	if (params.access_token) {
		$scope.accessToken = params.access_token;
		$http({
			'url': 'https://www.googleapis.com/analytics/v3/management/accounts',
			'headers': {
				'Authorization': 'Bearer '+params.access_token
			}
		}).success(function(data){
			$scope.accounts = data.items;
			console.log(data);
		});
		$scope.getProperties = function(account){
			$scope.data = null;
			$scope.activeProperty = null;
			$scope.activeAccount = account;
			$http({
				'url': account.selfLink+'/webproperties',
				'headers': {
					'Authorization': 'Bearer '+params.access_token
				}
			}).success(function(data){
				$scope.properties = data.items;
				console.log(data);
			});
			return false;
		}
		$scope.getProperty = function(property){
			$scope.activeProperty = property;
			$http({
				'url': property.selfLink,
				'headers': {
					'Authorization': 'Bearer '+params.access_token
				}
			}).success(function(data){
				console.log(data);
				$scope.data = data;
			});
			return false;
		}
	}
	
	
	
	
})