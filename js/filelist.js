"use strict";

angular.module('CloutFileManager', [])
.value('pointer', 0)
.controller('FileListController', ['$scope', '$http', '$log', 'pointer', function($scope, $http, $log, pointer) {

    // syncs to app folder IDs
    $scope.getItem = ['uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'dies', 'once', 'dose', 'trece', 'catorce', 'quince', 'diesiseis'];

    var urlSelect = '.../../src/parser.php?pointer=' + pointer;

    $scope.select = function(segment) {
        var path = (segment) ? '&path=' + segment : '&path=';
        $http.get(urlSelect + path)
            .success(function(data) {  
                if (data.items){
                    $scope.seperator = data.seperator;
                    $scope.dir = data.filepath + $scope.seperator;
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
                
                }
            })
            .error(function(data, status, headers, config) {
                throw new Error('Something went wrong with the file manager parsing!');
            });
    };
    
    // execute
    $scope.select();

    $scope.goToDir = function(dir, idx){
        var index = $scope.items.map(function(el){
            return el.file;
        }).indexOf(dir.file);
        $scope.select($scope.dir + $scope.items[index].file);
        $scope.currentpath = $scope.setCurrentDir($scope.items[index].file);
    }

    $scope.setCurrentDir = function(path){
        return path + $scope.seperator;
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
})
.run(['$window', '$rootScope', function($window, $rootScope){
    $rootScope.path = $window.location;
}]);
