export {Get, Post, Put, Delete};


// defines the return type data model. basically it is like Optional<T>,
// except that the failure option can house data. in this case, the status code of failure
const pass = obj => ({ok: true,  get : obj});
const fail = obj => ({ok: false, get : obj});

// defines the api. sadly, capital letters were needed since "delete" is reserved by js
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