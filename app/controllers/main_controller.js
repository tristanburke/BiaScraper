mainApp.controller("studentController", function($scope) {
    $scope.retrieve = function(){
        var article = $scope.url
        var options = {
            mode: 'text',
            pythonPath: '/home/ian/.virtualenvs/spacy/bin/python',
            scriptPath: '/home/ian/Programming/projects/BiaScraper/app/',
            args: [article]
        };
        pythonShell.run('get_matches.py', options, function (err, results) {
            if (err) throw err;
            // results is an array consisting of messages collected during execution
            console.log('results: %j', results);
            res.render("index.ejs", {results: results});
        });
    }
    $scope.retrieve();
    $scope.results = {};
});