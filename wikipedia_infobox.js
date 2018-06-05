	function getinfobox(mytag){
	var myURL = "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&origin=*&titles="+mytag; //window.location.href 
	
	var infowiki = $.ajax( {
    url: myURL,
    dataType: 'json',
    type: 'GET',
    headers: { 'Api-User-Agent': 'Example/1.0' },
	success: console.log("Cable data successfully loaded."),
	error: function (xhr) {alert(xhr.statusText)}
	});
	$.when(infowiki).done(function() {
	
	var pages = infowiki.responseJSON.query.pages;
	
	var result = { info: []};

	for (var key in pages){
		console.log(key);
		if (key != "-1"){
			var wikitext = Object.values(pages)[0].revisions[0]["*"];
			var splittedwiki = wikitext.split("}}\n")
			for (l = 0; l < splittedwiki.length; l++){
				if(splittedwiki[l].match(/^{{Infobox/)) {
					var infobox = splittedwiki[l].split("| ");
					infobox.map(function(item) {
						if(item.match(/ = /)) {
						   val = item.split(" = ")[1].replace(/(\r\n\t|\n|\r\t)/gm,"");
						   val = val.replace(/(\{\{|\}\}|\[\[|\]\])/g,"");
						   val = val.replace(/<br>/g," ");						   
						   val = val.replace(/\|/g,", ");						   
						   result.info.push({ 
								name : item.split(" = ")[0],
								value : val
							});
						}
					});
				}
			}
		}
	}
	
	console.log("stophere")
	});
}
