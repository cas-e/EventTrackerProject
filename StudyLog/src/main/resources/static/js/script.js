import * as http from "/js/http.js";

// array of quotes
let model = [];

// we rely on unique ids on the quotes to swap between edit and read-only views
const makeQuoteId  = num => `quote-${num}`;
const getQuoteById = num => document.getElementById(`quote-${num}`); 

window.addEventListener('load', () => {
	requestAndDiplayAllQuotes();
	let addButton = document.getElementById("addQuote");
	addButton.addEventListener('click', () => handleAdd());
});

/* data fetchers, one async for each C.R.U.D */
async function requestAndDiplayAllQuotes() {
	document.getElementById("quoteList").textContent = ''; // reset 
	let quotes = await http.Get('/api/quotes');
	
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
