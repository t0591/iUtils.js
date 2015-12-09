/**
 * Created by leiquan on 15/12/1.
 */

define(function (require, exports, module) {

    var ajax = require('./ajax');

    var ajaxGet = function (url, params, successCallback, failCallback) {
        ajax({
            method: "get",
            url: url,
            params: params,
            type: 'text',
            successCallback: successCallback,
            failCallback: failCallback
            });
    }

    module.exports = ajaxGet;


});