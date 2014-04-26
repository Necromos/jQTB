'use strict';
(function($){
    
    var data, numberOfTeams;

    var log2 = function (val) {
        return Math.log(val)/Math.LN2;
    };
    
    var createBrackets = function (mainContainer) {
        data = $.fn.bracket.defults.data;
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
                bracketIndex % 2 == 1 ? cursor++ : null;
            });
        });
    };
    
    $.fn.bracket = function (options){
        $.fn.bracket.defults = $.extend({}, $.fn.bracket.defults, options);
        createBrackets(this);
        return this;
    };

    $.fn.bracket.defults = {
        data: {
            teams: ['teamA','teamB','teamC','teamD'],
            results: [ [{teamName: 'teamA', points: 2},{teamName: 'teamB', points: 3}], [{teamName: 'teamC', points: 5},{teamName: 'teamD', points: 2}], [{teamName: 'teamB', points: 3},{teamName: 'teamC', points: 2}], [{teamName: 'teamB'}]]
        }
    };

}( jQuery ));