export {Get, Post, Put, Delete};

/*
 * module http implements the basic http verbs
 *
 * all verbs return the same kind of object:
 * { 
 *   ok  : boolean // 2xx successes all return an "ok" value of "true"
 *   obj : any     // if (ok === true) then "obj" is a parsed js object from the json body
 *                 // else, "obj" contains the status code of the failure, e.g. 404
 * }
 * 
 * functions "Post" and "Put" expect "obj" to be a js object, which they will stringify
 * 
 * example usage:
 *
 * import * as http from "/path/to/this/http.js"
 * async myFuncAttachedToSomeHandlerThatWantsServerData() {
 *   // await stalls until we receive the stuffs
 *   let myData = await http.Get("api/stuffs");
 *   myData.ok ? doDomThings(data.get) : doGracefulRecovery(data.get)
 * }
 */

// constructors for the data return type model
const pass = obj => ({ok: true,  get : obj});
const fail = obj => ({ok: false, get : obj});

// defines the api
// sadly, capital letters were needed since "delete" is reserved by js
const Get    = async (url)      => await makeRequest("GET", url);
const Post   = async (url, obj) => await makeRequest("POST", url, obj);
const Put    = async (url, obj) => await makeRequest("PUT", url, obj );
const Delete = async (url)      => await makeRequest("DELETE", url);

// implementation
function makeRequest(verb, url, obj = '') {
	return new Promise(function (resolve, reject) {
		let xhr = new XMLHttpRequest();
		xhr.open(verb, url);
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				if (xhr.status == 204) {
					resolve(pass(204))         // successful delete
				}
				else if (xhr.status >= 200 && xhr.status < 300) {
					let data = JSON.parse(xhr.responseText);
					resolve(pass(data));       // successful transfer
				} 
				else {
					resolve(fail(xhr.status)); // failed
				}
			}
		}
		xhr.send(JSON.stringify(obj));
	});
}