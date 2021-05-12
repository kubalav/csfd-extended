/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/classes/Csfd.js
class Csfd {

    constructor(csfdPage) {
        this.csfdPage = csfdPage
    }

    getImdbCode() {
        let imdbButton = this.csfdPage.find('a.button-imdb');

        return imdbButton.length > 0
            ? imdbButton.attr('href').match(/(tt\d+)/)[0]
            : null;
    }

    createImdbRatingBox(
        imdbRating,
        imdbVotes
    ) {
        let imdbVotesSpan = $('<span>')
            .css({
                'display': 'block',
                'font-size': '11px',
                'line-height': '15px',
                'padding-bottom': '10px'
            })
            .html(imdbVotes);

        let imdbRatingBox = $('<a>')
            .addClass('rating-average csfd-extended-imdb-rating')
            .css({
                'display': 'block',
                'background': '#f5c518',
                'color': '#000000',
                'cursor': 'pointer'
            })
            .attr('href', 'https://www.imdb.com/title/' + this.getImdbCode())
            .html(imdbRating)
            .append(imdbVotesSpan);

        imdbRatingBox.insertAfter(this.csfdPage.find('.rating-average-withtabs'));
    }

}

;// CONCATENATED MODULE: ./src/classes/OmdbApi.js
class OmdbApi {

    constructor(
        csfd,
        omdbApiKey
    ) {
        this.csfd = csfd;
        this.omdbApiKey = omdbApiKey;

        this.getResponse();
    }

    getResponse() {
        let imdbCode = this.csfd.getImdbCode();

        if (imdbCode === null) {
            return;
        }

        let request = $.ajax({
            method: 'GET',
            url: 'https://omdbapi.com/',
            data: {
                apikey: this.omdbApiKey,
                i: imdbCode,
                r: 'json'
            }
        });

        request.done((response) => {
            this.csfd.createImdbRatingBox(
                response.imdbRating,
                response.imdbVotes
            )

            this.response = response;
        });
    }

}

;// CONCATENATED MODULE: ./src/index.js



let csfd = new Csfd($('div.page-content'));
let omdbApi = new OmdbApi(csfd, 'ee2fe641');

/******/ })()
;