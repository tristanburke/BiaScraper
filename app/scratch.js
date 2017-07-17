const request = require("request");
const unfluff = require("unfluff");

request('http://money.cnn.com/2017/07/15/news/us-womens-open-trump-bedminster/index.html', function (error, response, body) {
    var html = body;
    var data = unfluff(html);

    var options = { method: 'POST',
        url: 'https://news-api.lateral.io/documents/similar-to-text',
        headers:
            { 'content-type': 'application/json',
                'subscription-key': '309cc56b52a031dc7e505a3a91ddf7bf' },
        body: { text: data.text },
        json: true };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        body.forEach((article) => console.log(article.title) || console.log(article.url));
    });
});

