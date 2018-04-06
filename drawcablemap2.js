function drawcablemap(mycable, myzoom, mycenter){

	import_js('https://cdn.rawgit.com/protonfork/test-repo/master/map.js');
	
	mapboxgl.accessToken = 'pk.eyJ1IjoicmVkc3VuIiwiYSI6ImNqZm5xczdkcjF2OGoycXFmanF6ODYxZWoifQ.YGWf_QZyswuIy6bHtbIwJg';

	var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/redsun/cja3z53v525b42sn4imlo6lim',
		center: mycenter,
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
		

		map.addLayer({
			'id': 'subcables',
			'type': 'line',
			'source': {
				'type': 'geojson',
				'data': 'https://raw.githubusercontent.com/protonfork/test-repo/master/map.geojson'
			},
			'layout': {
				'line-join': 'round',
				'line-cap': 'round'
			},
			'paint': {
				'line-color': '#FF0000',
				'line-width': myzoom
			}
		// This is the important part of this example: the addLayer
		// method takes 2 arguments: the layer as an object, and a string
		// representing another layer's name. if the other layer
		// exists in the stylesheet already, the new layer will be positioned
		// right before that layer in the stack, making it possible to put
		// 'overlays' anywhere in the layer stack.
		// Insert the layer beneath the first symbol layer.
		}, firstSymbolId);
		
		map.setFilter('subcables', ['==', 'name', mycable]);
		
	});
}
