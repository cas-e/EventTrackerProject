import * as http from "/js/http.js";

window.addEventListener('load', () => {
	
	eventDiv("get all", testGet)
	
	eventDiv("post obj", testPost);
	
	eventDiv("put obj", testPut);
	
	eventDiv("delete by id", testDelete);
	
	eventDiv("get one by id", testGetOneById);
	
});

async function testGetOneById() {
	let url = 'api/sessions/1';
	
	let gotEm = await http.Get(url);
	
	
	if (gotEm.ok) {
		console.log("got em!")
		console.log(gotEm.get);
	} else {
		console.log("didnt get em");
		console.log(gotEm.get);
	}
}
async function testDelete() {
	
	let testId = 3;
	let url = 'api/sessions/' + testId;
	
	let response = await http.Delete(url);
	
	console.log(response);
	
}

async function testPut() {
	let obj = (await http.Get('api/sessions')).get[0];
	
	delete obj.id;
	
	obj.tag = "a brand new update";
	
	let targetId = 4;
	let url = 'api/sessions/' + targetId;
	
	let updated = await http.Put(url, obj)
	console.log(obj);
	console.log(updated);
}

async function testPost() {
	let obj = (await http.Get('api/sessions')).get[0];
	
	delete obj.id;
	
	obj.tag = "adga yo";
	console.log(obj)
	
	let resp = await http.Post('api/sessions', obj)
	console.log(resp)
	
}

async function testGet() {
	let data = await http.Get('api/sessions');
	console.log(data);
}

// helper to make tests
function eventDiv(content, handler) {
	
	let div = document.createElement('div');
	div.addEventListener('click', handler);
	let h1 = document.createElement('h1');
	h1.textContent = content
	div.appendChild(h1)
	
	document.body.appendChild(div);
}



