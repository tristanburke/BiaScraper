/**
 * Created by tristanburke on 7/17/17.
 */
mainApp.controller("main_controller", function($scope) {
    $scope.placeholder_toggle = true;
    $scope.input_url = "";
    $scope.results = {};
    $scope.retrieve = function(){
        var article = {
            title: "Ian McDonald Wins Trashman of the Year, for the 20th time in a row!",
            url: "https://www.facebook.com/profile.php?id=100008926356605",
            imgurl: "https://vignette3.wikia.nocookie.net/grouches/images/b/be/Trash_Can.jpg/revision/latest?cb=20120409143605",
            source: "Fox News",
            sourceurl: "google.com",
            date: "september"
        };
        var article2 = {
            title: "McDoobies hits PR of 10oz Deadlift! Congrats kid!",
            url: "https://www.facebook.com/profile.php?id=100008926356605",
            imgurl: "https://vignette3.wikia.nocookie.net/grouches/images/b/be/Trash_Can.jpg/revision/latest?cb=20120409143605",
            source: "Fox News",
            sourceurl: "google.com",
            date: "september"
        };
        var article3 = {
            title: "Github user: iancmcdonald found guilty of advertising auto-download-porn crontab job",
            url: "https://www.facebook.com/profile.php?id=100008926356605",
            imgurl: "https://vignette3.wikia.nocookie.net/grouches/images/b/be/Trash_Can.jpg/revision/latest?cb=20120409143605",
            source: "Fox News",
            sourceurl: "google.com",
            date: "september"
        };
        var article4 = {
            title: "Ian C Mcdoublus Fights off Pack of Rabid Raccoons in local turf battle for Trash Areas",
            url:"https://www.facebook.com/profile.php?id=100008926356605",
            imgurl: "https://vignette3.wikia.nocookie.net/grouches/images/b/be/Trash_Can.jpg/revision/latest?cb=20120409143605",
            source: "Fox News",
            sourceurl: "google.com",
            date: "september"
        };
        $scope.results = {article, article2, article3, article4};
        $scope.placeholder_toggle = false;
    }
});