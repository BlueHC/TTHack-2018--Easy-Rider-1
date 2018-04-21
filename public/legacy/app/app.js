var easyRiderApp = angular.module('easyRider', []);

// Define the `PhoneListController` controller on the `phonecatApp` module
easyRiderApp.controller('easyRiderController', function easyRiderController($scope) {
  $scope.easyRider = [
    {
      name: 'Nexus S',
      snippet: 'Fast just got faster with Nexus S.'
    }, {
      name: 'Motorola XOOM™ with Wi-Fi',
      snippet: 'The Next, Next Generation tablet.'
    }, {
      name: 'MOTOROLA XOOM™',
      snippet: 'The Next, Next Generation tablet.'
    }
  ];
});