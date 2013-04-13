/**
 * User: Ken
 * Date: 04/04/2013
 * Time: 04:20
 */
module.exports = function api_module(cfg){
    // procedures
    var url = {
        'calc:square': function(args, cb) {
            var result = squre(args);
            cb(null, result);
        }
    };

    var init = function(cfg,callback){
        if (callback && isFunction(callback)){
            callback();
        }
    }

    if(cfg) {init(cfg);}

    function squre(args){
        return args*args;
    }

    function string(args){

    }

    return {
        url : {
            getContent : function(){

            }
        }
    };
}