import * as http from "/js/http.js";

// looks like js modules dont' work with tomcat.
// try to make a wrapper object instead


/*
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

const http = ( () => ({
	Get : Get, 
	Post : Post,
	Put : Put, 
	Delete : Delete
}))()

*/

// array of quotes
let model = [];

// we rely on unique ids on the quotes to swap between edit and read-only views
const makeQuoteId  = num => `quote-${num}`;
const getQuoteById = num => document.getElementById(`quote-${num}`); 

window.addEventListener('load', () => {
	console.log("smoke test")
	requestAndDiplayAllQuotes();
	let addButton = document.getElementById("addQuote");
	addButton.addEventListener('click', () => handleAdd());
});

/* data fetchers, one async for each C.R.U.D */
async function requestAndDiplayAllQuotes() {
	document.getElementById("quoteList").textContent = ''; // reset 
	let quotes = await http.Get('api/quotes');
	
	// todo: better errors
	quotes.ok ? handleQuotes(quotes.get) : console.log(quotes.get);
}
async function confirmAdd(e) {
	e.preventDefault();
	let data = new FormData(e.target.form);
	let obj = Object.fromEntries(data.entries())
	let added = await http.Post('api/quotes/', obj);
	
	if (!added.ok) {
		console.log(add.get)
	} else {
		requestAndDiplayAllQuotes();
		unhideQuotes();
	}
}
async function makeUpdate(e, index) {
	e.preventDefault();
	
	let obj = objectFromForm(e.target.form);
	let updated = await http.Put(`api/quotes/${model[index].id}`, obj);
	
	// TODO come back later to add some error handling
	if (!updated.ok) {
		console.log(updated.get)
	}
	// just reflow everything.... think of something better later
	requestAndDiplayAllQuotes();	
}

async function sendDelete(e, index) {

	let deleted = await http.Delete(`api/quotes/${model[index].id}`);
	
	if (!deleted.ok) {
		console.log(deleted.get)
	}
	requestAndDiplayAllQuotes();
}


/* handlers and view logic */
function handleAdd() {

	hideQuotes();
	
	
	let theEmptyQuote = textAreaObject({content : '', author : ''});
	let form = make("editView").bind(theEmptyQuote);
	
	let confirm = form.getElementsByClassName("editConfirm").item(0);
	
	confirm.addEventListener("click", e => confirmAdd(e));
	
	let cancel = form.getElementsByClassName("editCancel").item(0);
	
	document.getElementById("addSection").appendChild(form);
	
}

function showEditView(index) {
	let target = getQuoteById(index);
	
	let form = make("editView").bind(textAreaObject(model[index]));
	
	let confirm = form.getElementsByClassName("editConfirm").item(0)
	
	confirm.addEventListener('click', (e) => makeUpdate(e, index));
	
	let cancel = form.getElementsByClassName("editCancel").item(0)
	
	target.replaceWith(form)
}

function handleQuotes(quotes) {
		
	model = quotes;

	let target = document.getElementById("quoteList");
	quotes.forEach((quote, i) => {

		let q = make("quote").bind(quote);
		
		let editButton = q.getElementsByClassName("quoteEdit").item(0);
		let deleteButton = q.getElementsByClassName("quoteDelete").item(0);
		
		editButton.addEventListener('click', () => showEditView(i))
		deleteButton.addEventListener('click', (e) => sendDelete(e, i))
		
		q.id = makeQuoteId(i);
		target.appendChild(q);
	});
}

/* dom state manipulators */
function hideQuotes() {
	document.getElementById("quoteList").classList.add("objectTarget");
	document.getElementById("addQuote").classList.add("objectTarget");
}

function unhideQuotes() {
	document.getElementById("quoteList").classList.remove("objectTarget");
	document.getElementById("addQuote").classList.remove("objectTarget");
	document.getElementById("addSection").innerText = '';
}

/* dom helpers */
const objectFromForm = f => Object.fromEntries((new FormData(f)).entries());


const textAreaObject = obj => {
	let textAO = {};
	for (let key in obj) {
		let ta = document.createElement('textarea');
		ta.innerText = obj[key];
		ta.setAttribute("name", key);
		textAO[key] = ta;
	}
	return textAO;
}

const make = objTargetId => ({bind : bindObjectTarget(objTargetId)});

const bindObjectTarget = objTargetId => obj => {
	let dupe = document.getElementById(objTargetId).cloneNode(true);
	dupe.removeAttribute("id");
	dupe.classList.remove("objectTarget");
	for (let key in obj) {
		let param = dupe.querySelector(`[name="${key}"`);
		param ? param.replaceWith(obj[key]) : 0;
	}
	return dupe;
}
