import * as http from "/js/http.js";

/* this is even nicer! it makes it so that
   an object gets put right into the slot without needing to grab all the params manually
*/

const make = objTargetId => ({bind : bindObjectTarget(objTargetId)});

const bindObjectTarget = objTargetId => obj => {
	let dupe = document.getElementById(objTargetId).cloneNode(true);
	dupe.removeAttribute("id");
	dupe.classList.remove("objectTarget");
	for (let key in obj) {
		let param = dupe.querySelector(`param[name="${key}"`);
		param ? param.replaceWith(obj[key]) : 0;
	}
	return dupe;
}


window.addEventListener('load', () => {
	
	loadAllQuotes();
	
});

async function loadAllQuotes() {
	let quotes = await http.Get('/api/quotes');
	quotes.ok ? showAllQuotes(quotes.get) : console.log(quotes.get);
}

// will need to add event listeners and such
function showAllQuotes(quotes) {
	let target = document.getElementById("quoteList");
	quotes.forEach((quote, i) => {
		let q = make("quote").bind(quote);
		target.appendChild(q);
	});
}







