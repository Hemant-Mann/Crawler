/*!
 * Crawler
 * https://github.com/hemant-mann/crawler
 *
 * Copyright Hemant Mann
 * Released under the GNU GENERAL PUBLIC LICENSE
 */
var util = require('util'),
    request = require('request'),
    Document = require('./document');

(function (util, request) {
    function Crawler(opts) {
        this.urls = [];
        this.documents = [];
        this.ua = opts.ua || "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.63 Safari/537.36";
        this.lang = "en-US,en;q=0.8";

        this.requestDefaults = {
            headers: {
                'Cache-Control': 'max-age=0',
                'User-Agent': this.ua,
                'Accept-Language': this.lang,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Connection': 'keep-alive'
            }
        };
    }

    Crawler.prototype = {
        get: function (url, cb) {
            if (util.isArray(url)) {
                this.urls = url;
            } else {
                this.urls = [url];
            }

            this._fetch(cb);
        },
        _fetch: function (cb) {
            var self = this, doc;
            self.urls.forEach(function (el) {
                request.defaults(self.requestDefaults);
                request(el, function (error, response, html) {
                    var opts = {
                        statusCode: response.statusCode,
                        uri: el,
                        contentType: response.headers['content-type'],
                        body: html
                    };

                    if (error) {
                        opts.error = error;
                    }
                    doc = new Document(opts);
                    self.documents.push(doc);

                });
            });

            cb.call(self);
        }
    };

    module.exports = Crawler;
}(util, request));
