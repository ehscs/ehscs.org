let searchURL = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&formatversion=2&redirects=resolve&search=";

function setup() {
    noCanvas();
    userInput = select("#userinput");
    userInput.changed(goWiki);
}

function goWiki() {
	removeElements();
    let term = userInput.value();
    //console.log(term);
    let url = searchURL + term;
    loadJSON(url, display, "jsonp");
}

function display(data){
	//console.log(data);
	for(i = 0; i<data[1].length; i++){
		createA(data[3][i],data[1][i]);
		createDiv(data[2][i]);
		createP("");
	}
}