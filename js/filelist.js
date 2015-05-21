"use strict";

angular.module('CloutFileManager', [])
.value('pointer', 0)
.config(['$locationProvider', function($locationProvider){
    $locationProvider.html5Mode(true);
}])
.filter('look', function() {
  return function(arr, start, end) {
    return (arr || []).slice(start, end);
  };
})
.factory('data', ['$log', function($log){
    return {
        //
    }
}])
.controller('FileListController', ['$scope', '$http', '$log', 'pointer', function($scope, $http, $log, pointer) {

    // syncs to app folder IDs
    $scope.getItem = ['uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'dies', 'once', 'dose', 'trece', 'catorce', 'quince', 'diesiseis'];

    var urlSelect = '.../../src/parser.php?pointer=' + pointer;

    $scope.select = function() {
        $http.get(urlSelect)
            .success(function(data) {  
                if (data.items){
                    $scope.items = data.items,
                        $scope.items.concat($scope.items.splice(0,2));
                    
                     // Arrange items in cell grid 
                    $scope.rows = [];
                    var size = Math.ceil($scope.items.length /3);
                    for (var i=0; i<$scope.items.length; i+=size) {
                        var chunk = $scope.items.slice(i,i+size);
                        $scope.rows.push(chunk);
                        if(i == 0){
                            var extra = angular.copy($scope.rows[0][3]);
                            $scope.rows[0] = $scope.rows[0].slice(0,3);
                        }
                    }; 
                    $scope.rows.push(new Array(extra));
                
                } // END Data Call
            })
            .error(function(data, status, headers, config) {
                throw new Error('Something went wrong with the file manager parsing!');
            });
    };
    
    // execute
    $scope.select();

    $scope.goToDir = function(dir){
        //TODO: Go to specified directory
    }

}])
.directive('tooltip', function(){
    return {
        restrict: 'A',
        link: function (scope, element, attr){
            element.bind('mouseenter', function(evt){
                var $el = angular.element(evt.target).find('.hint-' + attr.direction);
                if($el.length){
                    angular.element($el).addClass('hint-persist');
                }
            }).bind('mouseleave', function(evt){
                var $el = angular.element(evt.target).find('.hint-' + attr.direction);
                if($el.length){
                    angular.element($el).removeClass('hint-persist');
                    $el = null;
                }
            });

            angular.element('.app-folders-container').on('mouseleave', function(evt){
                angular.element('.app-folders-container').find('.hint-' + attr.direction).removeClass('hint-persist');
            });
        }
    }
});