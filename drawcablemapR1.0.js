function drawcablemap(mycable){

	var geourl = "https://rawgit.com/protonfork/test-repo/master/TelegeoWithoutZ.geojson";


	function processData(allText) {
	    var allTextLines = allText.split(/\r\n|\n/);
	    var headers = allTextLines[0].split(',');
	    lines = [];

	    for (var i=1; i<allTextLines.length; i++) {
		var data = allTextLines[i].split(',');
		if (data.length == headers.length) {

		    var tarr = [];
		    for (var j=0; j<headers.length; j++) {
			tarr.push(headers[j]+":"+data[j]);
		    }
		    lines.push(tarr);
		}
	    }
	    // alert(lines);
	}
		
	
	var cables = $.ajax({
	  url:geourl,
	  beforeSend: function( xhr ) {xhr.overrideMimeType( "application/json" );},
	  success: console.log("Cable data successfully loaded."),
	  error: function (xhr) {alert(xhr.statusText)}
	})
		$.when(cables).done(function() {
		
		mapboxgl.accessToken = 'pk.eyJ1IjoicmVkc3VuIiwiYSI6ImNqZm5xczdkcjF2OGoycXFmanF6ODYxZWoifQ.YGWf_QZyswuIy6bHtbIwJg';

		var map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/redsun/cji0a9dd608ex2rnsw4pp3sx6',
			center: [0,0],
			zoom: 1
		});

		map.on('load', function () {

			var layers = map.getStyle().layers;
			// Find the index of the first symbol layer in the map style
			var firstSymbolId;
			for (var i = 0; i < layers.length; i++) {
				if (layers[i].type === 'symbol') {
					firstSymbolId = layers[i].id;
					break;
				}
			}
			var nav = new mapboxgl.NavigationControl();
			var fulls = new mapboxgl.FullscreenControl();
			map.addControl(fulls, 'top-left');
			
			map.addLayer({
				'id': 'subcables',
				'type': 'line',
				'source': {
					'type': 'geojson',
					'data': geourl
				},
				'layout': {
					'line-join': 'round',
					'line-cap': 'round'
				},
				'paint': {
					'line-color': '#FF0000',
					'line-width': 3
				}
			}, firstSymbolId);
			
			map.setFilter('subcables', ['==', 'cable_id', mycable]);
			
			var filtered = $.grep(cables.responseJSON.features, function(element, index) {
					return element.properties.cable_id == mycable;
				});
			var cablesfiltered = {type:'FeatureCollection',features:filtered};

			posset=-1
			negset=-1
			
			for (var i=0; i<cablesfiltered.features.length; i++) {
				for (var j=0; j<cablesfiltered.features[i].geometry.coordinates.length;j++){
					for (var k=0; k<cablesfiltered.features[i].geometry.coordinates[j].length;k++){
						if (cablesfiltered.features[i].geometry.coordinates[j][k][0]<0){
							if(negset<0){
								negbounds = new mapboxgl.LngLatBounds(cablesfiltered.features[i].geometry.coordinates[j][k],
																	  cablesfiltered.features[i].geometry.coordinates[j][k]);
								negset=0;
							}
							else{
								negbounds.extend( cablesfiltered.features[i].geometry.coordinates[j][k] );							
							}
						}						
						if (cablesfiltered.features[i].geometry.coordinates[j][k][0]>=0){
							if(posset<0){
								posbounds = new mapboxgl.LngLatBounds(cablesfiltered.features[i].geometry.coordinates[j][k],
																	  cablesfiltered.features[i].geometrycoordinates[j][k]);
								posset=0;
							}
							else{
								posbounds.extend( cablesfiltered.features[i].geometry.coordinates[j][k] );							
							}
						}	
					}
				}
			}		
			
			
			if (typeof negbounds !== 'undefined' && typeof posbounds !== 'undefined'){
			
				distnby180 = (180 - posbounds._ne.lng) + (negbounds._sw.lng+180)
				distnby0 =  (posbounds._sw.lng) - (negbounds._ne.lng)

				if (distnby0<=distnby180){
					// center bound arround 0  
					bounds = new mapboxgl.LngLatBounds([negbounds._sw.lng,Math.min(negbounds._sw.lat,posbounds._sw.lat)],
													   [posbounds._ne.lng,Math.max(negbounds._ne.lat,posbounds._ne.lat)]);
				}
				else{
					// center bound arround 180
					bounds = new mapboxgl.LngLatBounds([posbounds._sw.lng-360,Math.min(negbounds._sw.lat,posbounds._sw.lat)],
													   [negbounds._ne.lng,Math.max(negbounds._ne.lat,posbounds._ne.lat)]);
				}
			}
			else
			{
				if(typeof negbounds !=='undefined'){
					bounds=negbounds;
				}
				if(typeof posbounds !=='undefined'){
					bounds=posbounds;
				}
				
				
			}
			
					
		map.fitBounds(bounds, {
			padding: 40
			});
			
			
			
		});
	});
}
