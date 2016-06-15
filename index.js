var Crawler = require('./lib/index');

var c = new Crawler({});

c.get('https://github.com', function () {
	console.log(this.documents);
});