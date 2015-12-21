(function (ns, factory) {if (typeof define === 'function' && define.amd) {define(factory);}else if (typeof module === 'object' && module.exports) {module.exports = factory();}else {window[ns] = factory();}})('iUtils', function () {

  /**
   * @file randomNumber.js
   * @auther leiquan<leiquan@baidu.com>
   * @date 2015-12-1
   * @from self
   * @api Function
   * @return Number
   * @params Number  min, Number max
   * @runtime Browser Window, Require JS, Node.js
   * @dependencies none
   */
  var random_randomNumber = {}, type_getType = {}, ajax_ajax = {}, ajax_ajaxFile = {}, ajax_ajaxGet = {}, ajax_ajaxJsonp = {}, ajax_ajaxPost = {};
  random_randomNumber = function (exports) {
    function randomNumber(min, max) {
      return Math.floor(min + Math.random() * (max - min));
    }
    exports = randomNumber;
    return exports;
  }(random_randomNumber);
  type_getType = function (exports) {
    var toString = Object.prototype.toString;
    var getType = function (val) {
      switch (toString.call(val)) {
        case '[object Date]':
          return 'date';
        case '[object RegExp]':
          return 'regexp';
        case '[object Arguments]':
          return 'arguments';
        case '[object Array]':
          return 'array';
        case '[object Error]':
          return 'error';
      }
      if (val === null)
        return 'null';
      if (val === undefined)
        return 'undefined';
      if (val !== val)
        return 'nan';
      if (val && val.nodeType === 1)
        return 'element';
      val = val.valueOf ? val.valueOf() : Object.prototype.valueOf.apply(val);
      return typeof val;
    };
    exports = getType;
    return exports;
  }(type_getType);
  ajax_ajax = function (exports) {
    var randomNumber = random_randomNumber;
    var getType = type_getType;
    var myAjax = function (userOptions) {
      // 默认值
      var options = {
        method: 'get',
        // get, post,jsonp, file
        url: '',
        params: {},
        // key:value //当method为file的时候,params=formData, xmlHttpRequest 2.0 可利用formData对象来上传文件
        type: 'text',
        // text, json, xml
        contentType: null,
        header: null,
        // object: {name: value}
        success: function (data) {
        },
        fail: function () {
        }
      };
      // 更新option
      for (var pro in userOptions) {
        if (userOptions[pro]) {
          options[pro] = userOptions[pro];
        }
      }
      var method = options.method;
      var url = options.url;
      var params = options.params;
      var type = options.type;
      var header = options.header;
      var contentType = options.contentType;
      var success = options.success;
      var fail = options.fail;
      // xhr对象
      var createRequest = function () {
        var xmlhttp;
        try {
          xmlhttp = new ActiveXObject('Msxml2.XMLHTTP');  // IE6以上版本
        } catch (e) {
          try {
            xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');  // IE6以下版本
          } catch (e) {
            try {
              xmlhttp = new XMLHttpRequest();
              if (xmlhttp.overrideMimeType) {
                xmlhttp.overrideMimeType('text/xml');
              }
            } catch (e) {
              alert('您的浏览器不支持Ajax');
            }
          }
        }
        return xmlhttp;
      };
      // 格式化参数
      var formateParameters = function (params) {
        var paramsArray = [];
        var params = params;
        for (var pro in params) {
          var paramValue = params[pro];
          if (method.toUpperCase() === 'GET') {
            paramValue = encodeURIComponent(params[pro]);
          }
          paramsArray.push(pro + '=' + paramValue);
        }
        return paramsArray.join('&');
      };
      // 获取返回值
      var readystatechange = function (xmlhttp) {
        var returnValue;
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200 || xmlhttp.status == 0) {
            switch (type) {
              case 'xml':
                returnValue = xmlhttp.responseXML;
                break;
              case 'json':
                var jsonText = xmlhttp.responseText;
                if (jsonText) {
                  returnValue = eval('(' + jsonText + ')');
                }
                break;
              default:
                returnValue = xmlhttp.responseText;
                break;
            }
            if (returnValue) {
              if (success) {
                success(returnValue);
              }
            } else {
              if (fail) {
                fail();
              }
            }
          } else {
            if (fail) {
              fail();
            }
          }
        }
      };
      // 创建XMLHttpRequest对象
      var xmlhttp = createRequest();
      // 设置回调函数
      xmlhttp.onreadystatechange = function () {
        readystatechange(xmlhttp);
      };
      // 格式化参数
      var formateParams = formateParameters(params);
      // 类型判断
      if ('GET' === method.toUpperCase()) {
        url += '?' + formateParams;
        xmlhttp.open('get', url, true);
        if (header) {
          if (getType(header) === 'object') {
            for (h in header) {
              xmlhttp.setRequestHeader(h, header[h]);
            }
          }
        }
        xmlhttp.send(null);
      } else if ('POST' === method.toUpperCase()) {
        xmlhttp.open('post', url, true);
        // 如果是POST提交，设置请求头信息
        if (!contentType) {
          contentType = 'application/x-www-form-urlencoded';
        }
        xmlhttp.setRequestHeader('Content-Type', contentType);
        if (header) {
          if (getType(header) === 'object') {
            for (h in header) {
              xmlhttp.setRequestHeader(h, header[h]);
            }
          }
        }
        xmlhttp.send(formateParams);
      } else if ('JSONP' === method.toUpperCase()) {
        var callbackName = 'jsonp' + randomNumber(1000, 9999);
        // 创建script来请求jsonp
        var head = document.getElementsByTagName('head')[0] || document.documentElement;
        var script = document.createElement('script');
        url += '?' + formateParams;
        script.src = url + '&callback=' + callbackName;
        head.insertBefore(script, head.firstChild);
        script.onerror = fail();
        window[callbackName] = function (data) {
          if (success) {
            success(data);
          }
          delete window[callbackName];
          head.removeChild(script);
        };
      } else if ('FILE' === method.toUpperCase()) {
        xmlhttp.open('post', url, true);
        if (header) {
          if (getType(header) === 'object') {
            for (h in header) {
              xmlhttp.setRequestHeader(h, header[h]);
            }
          }
        }
        xmlhttp.send(params);  //此处params为formData对象
      }
    };
    exports = myAjax;
    return exports;
  }(ajax_ajax);
  ajax_ajaxFile = function (exports) {
    var ajax = ajax_ajax;
    // 注意,file对象要append到formData对象中,或者从form表单构造formdata,注意不要设置contenttype
    var ajaxFile = function (url, formData, header, success, fail) {
      ajax({
        method: 'file',
        url: url,
        params: formData,
        type: 'text',
        header: header,
        success: success,
        fail: fail
      });
    };
    exports = ajaxFile;
    return exports;
  }(ajax_ajaxFile);
  ajax_ajaxGet = function (exports) {
    var ajax = ajax_ajax;
    var ajaxGet = function (url, params, type, header, success, fail) {
      ajax({
        method: 'get',
        url: url,
        params: params,
        type: type,
        header: header,
        success: success,
        fail: fail
      });
      console.log(header);
    };
    exports = ajaxGet;
    return exports;
  }(ajax_ajaxGet);
  ajax_ajaxJsonp = function (exports) {
    var ajax = ajax_ajax;
    var ajaxJsonp = function (url, params, success, fail) {
      ajax({
        method: 'jsonp',
        url: url,
        params: params,
        type: 'text',
        success: success,
        fail: fail
      });
    };
    exports = ajaxJsonp;
    return exports;
  }(ajax_ajaxJsonp);
  ajax_ajaxPost = function (exports) {
    var ajax = ajax_ajax;
    var ajaxPost = function (url, params, type, contentType, header, success, fail) {
      ajax({
        method: 'post',
        url: url,
        params: params,
        type: type,
        contentType: contentType,
        header: header,
        success: success,
        fail: fail
      });
    };
    exports = ajaxPost;
    return exports;
  }(ajax_ajaxPost);

  return {ajax:ajax_ajax,ajaxFile:ajax_ajaxFile,ajaxGet:ajax_ajaxGet,ajaxJsonp:ajax_ajaxJsonp,ajaxPost:ajax_ajaxPost}
});