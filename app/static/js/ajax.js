
/**
* @description
* Vanilla Javascript AJAX implementation
*
* @class
* AJAX
*/

AJAX = function() {}


/**
* @description
* Static method of class AJAX
* Use vanillar JS implemented AJAX GET method, wraps XMLHttpRequest
*
* @param {string}       - Specifies url for HTTP GET API
* @param {function}     - Specified callback handler for HTTP response processing
*/
AJAX.get = function(url, callback) {
    var r = new XMLHttpRequest();
    r.responseType = 'json';
    r.open('GET', url, true);
    r.onreadystatechange = function() {
        if(r.readyState != 4 || r.status != 200) return;
        callback(r.response);
    }
    r.send();
}
