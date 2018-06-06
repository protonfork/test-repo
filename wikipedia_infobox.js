	function getinfobox(resolve, reject){
	var myURL = "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&origin=*&titles="+mytag; //window.location.href 

	var query = [
	 "PREFIX dbpedia-owl: <http://dbpedia.org/ontology/>",
	 "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>",
	 	 "SELECT DISTINCT * {",
	 "?iri a dbpedia-owl:Company ;",
	 "dbpedia-owl:wikiPageID ?wikiPageID;",
	 "dbpedia-owl:abstract ?description ;",
	 "rdfs:comment ?comment;",
	 "     rdfs:label ?lbl .",
	 "?lbl bif:contains \"'"+mytag+"'\"@en  .",
	 "FILTER( langMatches(lang(?description),\"en\") )",
	 "FILTER( langMatches(lang(?lbl),\"en\") ) .",
  	 "FILTER( langMatches(lang(?comment),\"en\") ) .",
  	 "OPTIONAL  {?iri dbpedia-owl:foundingYear ?foundingYear }",
  	 "OPTIONAL  {?iri dbpedia-owl:netIncome ?netIncome }",
   	 "OPTIONAL  {?iri dbpedia-owl:numberOfEmployees ?numberOfEmployees }",
  	 "OPTIONAL  {?iri dbpedia-owl:type ?type }",
  	 "OPTIONAL  {?iri dbpedia-owl:revenue ?revenue  FILTER ( datatype(?revenue) = xsd:usDollar)    }",
	 "}",
	 "ORDER BY ?wikiPageID"].join(" ");
	
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
