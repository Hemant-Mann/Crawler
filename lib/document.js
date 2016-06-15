/*!
 * document.js
 * https://github.com/hemant-mann/crawler
 *
 * Copyright Hemant Mann
 * Released under the GNU GENERAL PUBLIC LICENSE
 */
var cheerio = require('cheerio');

(function (cheerio) {
    function Document(opts) {
        this.uri = null;
        this.statusCode = null;
        this.contentType = null;
        this.body = null;

        this.error = null;
    }

    Document.prototype = {
        jQuery: function () {
            var $ = cheerio.load(this.body);
            return $;
        }
    }

    module.exports = Document;
}(cheerio));
