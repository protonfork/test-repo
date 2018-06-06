	function getinfobox(resolve, reject){
	var myURL = "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&origin=*&titles="+mytag; //window.location.href 

	var query = [
	 "PREFIX dbpedia-owl: <http://dbpedia.org/ontology/>",
	 "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>",
	 	 "SELECT DISTINCT * {",
	 "?iri a dbpedia-owl:Company ;",
	 "dbpedia-owl:abstract ?description ;",
	 "dbpedia-owl:foundingYear ?foundingYear ;",
	 "dbpedia-owl:netIncome ?netIncome ;",
	 "dbpedia-owl:numberOfEmployees ?numberOfEmployees ;",
	 "dbpedia-owl:type ?type ;",
	 "dbpedia-owl:product ?product ;",
	 "dbpedia-owl:revenue ?revenue;",
	 "     rdfs:label ?lbl .",
	 "?lbl bif:contains \"'"+mytag+"'\"@en  .",
	 "FILTER( langMatches(lang(?description),\"en\") )",
	 "}"].join(" ");
	
	var url = "https://dbpedia.org/sparql";
	var queryUrl = url+"?query="+ encodeURIComponent(query) +"&format=json";
	infodbpedia = $.ajax({
        dataType: "json",  
        url: queryUrl,
        success: console.log("dbpedia data loaded")
    });
	$.when(infodbpedia).done(function() {
            var results = infodbpedia.responseJSON.results.bindings;
		if (results.length > 0)  {
			firstr = results[0];
			resolve(firstr);}
		else {
			reject('error')}
			});

}
