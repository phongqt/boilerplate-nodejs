(function () {
	'use strict';
	angular
		.module('app')
		.config(appConfig);

	appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

	function appConfig($stateProvider, $urlRouterProvider) {
		$urlRouterProvider
			.otherwise('/app/dashboard');

		$stateProvider
			.state('app', {
				abstract: true,
				url: '/app',
				templateUrl: './views/index.html'
			})
			.state('app.dashboard', {
				url: '/dashboard',
				templateUrl: './views/dasboard.html',
				data: {
					title: 'Dashboard'
				},
				controller: "DashboardCtrl"
			});
	}
})();