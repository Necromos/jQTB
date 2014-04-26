'use strict';
(function($){
    
    
    var createBrackets = function (that,opts) {
        for (var i=0;i<opts.data.length;i++)
    };
    
    $.fn.bracket = function(options){
        var opts = $.extend({
            data: {}
        }, options);
        createBrackets(this,opts);
        return this;
    };

}( jQuery ));