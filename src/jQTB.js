/**@license
 *
 * Licensed under GNU GPL Version 3 license
 * Copyright (c) 2014 Przemysław Królik
 *
 */

(function($){
    "use strict";
    var data, numberOfTeams, options;

    var log2 = function (val) {
        return Math.log(val)/Math.LN2;
    };
    
    var createBrackets = function (mainContainer) {
        data = options.data;
        numberOfTeams = data.teams.length;
        var i;
        for ( i = 1 ; i <= log2(numberOfTeams) + 1 ; i++ ) {
            var bracketsContainer = $(document.createElement('div')).addClass('bracketsContainer');
            $(mainContainer).append(bracketsContainer);
            for ( var j = 0 ; j < Math.floor( numberOfTeams / i ) ; j++ ) {
                var bracket = $(document.createElement('div')).addClass('bracket');
                if( i == 1 ) {
                    bracket.text(data.teams[j]);
                }
                bracketsContainer.append(bracket);
            }
        }
        fillResults(mainContainer);
    };

    var fillResults = function (mainContainer) {
        var cursor = 0;
        $(mainContainer).children('.bracketsContainer').each(function(bracketContainerIndex, bracketContainer) {
            $(bracketContainer).children('.bracket').each(function(bracketIndex, bracket) {
                var currResult = data.results[cursor][bracketIndex%2];
                var textToDisplay = currResult.teamName + ' ';
                textToDisplay += currResult.points === undefined ? '' : currResult.points;
                $(bracket).text(textToDisplay);
                if (bracketIndex % 2 == 1)
                    cursor++;
            });
        });
    };
    
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
        init: function (userOptions){
            options = $.extend({}, $.fn.bracket.defults, userOptions);
            // if (options.url) {
            //     callData(this);
            // }
            // else {
                createBrackets(this);
            // }
            return this;
        }
    };
    
    $.fn.bracket = function (methodOrOptions){
        if ( methods[methodOrOptions] ) {
            return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.bracket' );
        }    
    };

    $.fn.bracket.defults = {
        data: {
            teams: ['teamA','teamB','teamC','teamD'],
            results: [ [{teamName: 'teamA', points: 2},{teamName: 'teamB', points: 3}], [{teamName: 'teamC', points: 5},{teamName: 'teamD', points: 2}], [{teamName: 'teamB', points: 3},{teamName: 'teamC', points: 2}], [{teamName: 'teamB'}]]
        }
    };

}( jQuery ));