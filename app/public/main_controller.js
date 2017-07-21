mainApp.controller("main_controller", ['$scope', '$http', function($scope, $http) {
    $scope.placeholder_toggle = true;
    $scope.input_url = "";
    $scope.results = {};
    $scope.tester = "Failed"
    $scope.retrieve = function(){
        $scope.tester = "Trying"
        var s = $scope.input_url
        $http.get('/find', {params: {'input_url': $scope.input_url}})
            .success(function(data) {
                $scope.tester = data;
                console.log(data)
            })
            .error(function(data) {
                console.log('Error: ' + data)
            });
        var article = {
            title: "Ian McDonald Wins Trashman of the Year, for the 20th time in a row!",
            url: "https://www.facebook.com/profile.php?id=100008926356605",
            imgurl: "https://vignette3.wikia.nocookie.net/grouches/images/b/be/Trash_Can.jpg/revision/latest?cb=20120409143605",
            source: "Fox News",
            sourceurl: "google.com",
            date: "september"
        };
        $scope.results = {article};
        $scope.placeholder_toggle = false;
    }
}]);