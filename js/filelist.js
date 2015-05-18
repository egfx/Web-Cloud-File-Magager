"use strict";

angular.module('CloutFileManager', [])
.value('pointer', 0)
.controller('FileListController', ['$scope', '$http', '$log', 'pointer', function($scope, $http, $log, pointer) {

    $scope.getItem = ['uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'dies', 'once', 'dose', 'trece', 'catorce', 'quince', 'diesiseis'];

    // change the hash in the URL, press ENTER and reload to change directories...
    // TODO: Link directories with clicks
    pointer = (Number.isInteger(location.hash)) ? pointer : location.hash.split('#')[1];

    if(history.pushState) {
        history.pushState(null, null, '#' + pointer);
    }
    else {
        location.hash = '#' + pointer;
    }

    var urlSelect = '.../../src/parser.php?pointer=' + pointer;

    $scope.select = function() {
        $http.get(urlSelect)
            .success(function(data) {  
                if (data.items){
                    $scope.items = data.items;
                    console.log($scope.items);
                }   
                if (data.types){
                    $scope.types = data.types;
                    $scope.type = $scope.types[0].id;
                }
            })
            .error(function(data, status, headers, config) {
                throw new Error('Something went wrong with the file manager parsing!');
            });
    };
    
    $scope.select();

    $scope.gohome = function(){
        //TODO: Go back to root directory
    }

    $scope.goToDir = function(dir){
        //TODO: Go to specified directory
    }

}])
.directive('tooltip', function(){
    return {
        restrict: 'A',
        link: function (scope, element, attr){
            element.bind('mouseover', function(evt){
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
                angular.element(evt.target).find('.hint-' + attr.direction).removeClass('hint-persist');     
            });
        }
    }
});