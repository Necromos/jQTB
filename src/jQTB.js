/**@license
 *
 * Licensed under GNU GPL Version 3 license
 * Copyright (c) 2014 Przemysław Królik
 *
 */

(function($){
    "use strict";
    var data, numberOfTeams, options;
    var createFlag = false;

    var log2 = function (val) {
        return Math.log(val)/Math.LN2;
    };
    
    var createBrackets = function (that, callback) {
        data = options.data;
        numberOfTeams = data.teams.length;
        var i;
        for ( i = 1 ; i <= log2(numberOfTeams) + 1 ; i++ ) {
            var bracketsContainer = $(document.createElement('div')).addClass('bracketsContainer');
            $(that).append(bracketsContainer);
            for ( var j = 0 ; j < Math.floor( numberOfTeams / i ) ; j++ ) {
                var bracket = $(document.createElement('div')).addClass('bracket');
                if( i == 1 ) {
                    bracket.text(data.teams[j]);
                }
                bracketsContainer.append(bracket);
            }
        }
        if(callback)
            callback(that)
    };

    var fillResults = function (that) {
        var cursor = 0;
        $(that).children('.bracketsContainer').each( function (bracketContainerIndex, bracketContainer) {
            $(bracketContainer).children('.bracket').each( function (bracketIndex, bracket) {
                var currResult = data.results[cursor][bracketIndex%2];
                var textToDisplay = currResult.teamName + ' ';
                textToDisplay += currResult.points === undefined ? '' : currResult.points;
                $(bracket).text(textToDisplay);
                if (bracketIndex % 2 == 1)
                    cursor++;
                // need special case of function for odd number of brackets
            });
        });
    };
    
    var prepareAutoFill = function () {
        var results = options.data.results;
        var newResults = [];
        $.each(results, function (index, value) {
            var tmpObject = {teamName: , points:}
        });
        options.data.results = results;
    };
    
    /*
    var autoFillResults = function (that) {
        var mainCursor = 0;
        var detailCursor = 0;
        $(that).children('.bracketsContainer').each( function (bracketContainerIndex, bracketContainer ) {
            $(bracketContainer).children('.bracket').each( function (bracketIndex, bracket) {
                var currTeam;
                if (data.teams[mainCursor][detailCursor])
                    currTeam = data.teams[mainCursor][detailCursor];
                else {
                    var prevResults = data.results[bracketIndex];
                    if ( prevResults[0] > prevResults[1] )
                        currTeam = data.teams[bracketIndex][0];
                    else
                        currTeam = data.teams[bracketIndex][1];
                }
                var textToDisplay = currTeam;
                textToDisplay += currTeam + data.results[mainCursor][detailCursor];
                if (bracketIndex % 2 == 1)
                    mainCursor++;
                if ( detailCursor === 0 )
                    detailCursor++;
                else
                    detailCursor--;
                // need special case of function for odd number of brackets
            });
        });
    };
    */
    //to be implemented
    // var callData = function (that) {
    //     $.getJSON(options.url)
    //     .done(function(callbackData){
    //         //validate data
    //         options.data = callbackData;
    //         $(that).empty();
    //         createBrackets(that);
    //     })
    // };
    
    var methods = {
        init: function () {
            options = $.extend({}, $.fn.bracket.defults, userOptions);
            // if (options.url) {
            //     callData(this);
            // }
            // else {
            createBrackets(this, fillResults);
            // }
            return this;
        },
        create: function () {
            createBrackets(this);
            createFlag = true;
            return this;
        },
        fill: function () {
            if (createFlag)
                fillResults(this);
            else
                $.error( 'Method fill requires first to create brackets. Run .bracket(\'create\') first.' );
            return this;
        },
        autoFill: function () {
            if (createFlag)
                autoFillResults(this);
            else
                $.error( 'Method autoFill requires first to create brackets. Run .bracket(\'create\') first.' );
            return this;
        },
        setup: function (userOptions) {
            options = $.extend({}, $.fn.bracket.defults, userOptions);
            return this;
        }
    };
    
    $.fn.bracket = function (method){
        if ( methods[methodOrOptions] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || !method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.bracket' );
        }    
    };

    $.fn.bracket.defults = {
        data: {
            teams: ['teamA','teamB','teamC','teamD'],
            results: [ [{teamName: 'teamA', points: 2},{teamName: 'teamB', points: 3}], [{teamName: 'teamC', points: 5},{teamName: 'teamD', points: 2}], [{teamName: 'teamB', points: 3},{teamName: 'teamC', points: 2}], [{teamName: 'teamB'}]]
        }
        /* //data sample for autofill
        data: {
            teams: [ 'teamA', 'teamB', 'teamC', 'teamD' ], //as matchups go
            results: [ [1, 2], [2, 1], [3, 1] ]  //keep it simple
        }
        */
    };

}( jQuery ));