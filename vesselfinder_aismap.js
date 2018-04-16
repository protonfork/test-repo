function parseBoolValue(value) {
	var new_value;
	if (value === undefined) new_value = false;
	if (value === 'true' || value == true) new_value = true;
	else if (value === 'false' || value == false) new_value = false;
	else new_value = false;
	return new_value;
};
(function() {
var rh=window.location.href;
if (rh.indexOf('file://') >= 0 || rh.indexOf('file%3A%2F%2F') >= 0) rh = 'testingonly';
rh=encodeURIComponent(rh);
var w = window.width; if (w === undefined) w = 800;
var ws = w.toString();
if ((parseInt(w) < 480 && ws.charAt(ws.length-1) !=='%')) w = 480;
if (ws.charAt(ws.length-1) === '%') window.width = ws; else window.width = parseInt(w);

var h = window.height;  if (h === undefined) h = 600;
var height = parseInt(h);
if (height < 400) window.height = 400; else window.height = height;

if (window.names === undefined) window.names = false; else
window.names = parseBoolValue(window.names);

window.show_track = parseBoolValue(window.show_track);

window.click_to_activate = parseBoolValue(window.click_to_activate);
var f = (typeof(window.fleet) === 'undefined') ? false : window.fleet;
if (f!==false && f.indexOf('@') >= 0) {f = false;}

if (window.store_position === undefined) window.store_position=true; else
window.store_position = parseBoolValue(window.store_position);
if(window.mmsi!==undefined && parseInt(window.mmsi)!=window.mmsi)window.mmsi=undefined;
if(window.imo!==undefined && parseInt(window.imo)!=window.imo)window.imo=undefined;
if(window.latitude!==undefined && parseFloat(window.latitude)!=window.latitude)window.latitude=undefined;
if(window.longitude!==undefined && parseFloat(window.longitude)!=window.longitude)window.longitude=undefined;
document.getElementById("map-vf-embeded").innerHTML =
	'<iframe name="vesselfinder" id="vesselfinder" '
	+ ' width="' + window.width + '"'
	+ ' height="' + window.height + '"'
	+ ' frameborder="0"'
	+ ' src="https://www.vesselfinder.com/aismap?'
	+ 'zoom=' + ((window.zoom === undefined) ? 'undefined' : window.zoom)
	+ ((window.latitude === undefined) ? '&amp;lat=undefined' : '&amp;lat='+window.latitude)
	+ ((window.longitude === undefined) ? '&amp;lon=undefined' : '&amp;lon='+window.longitude)
	+ '&amp;width=' + window.width
	+ '&amp;height=' + window.height
	+ '&amp;names='+window.names
	+ ((window.mmsi === undefined) ? '' : '&amp;mmsi=' + window.mmsi)
	+ ((window.imo === undefined) ? '' : '&amp;imo=' + window.imo)
	+ '&amp;track=' + window.show_track
	+ ((window.fleet === undefined) ? '&amp;fleet=false' : '&amp;fleet='+f)
	+ ((window.fleet_hide_old_positions === undefined) ? '&amp;fleet_hide_old_positions=false' : '&amp;fleet_hide_old_positions='+window.fleet_hide_old_positions)
	+ '&amp;clicktoact=' + window.click_to_activate
	+ '&amp;store_pos=' + window.store_position
	+ ((window.fil === undefined) ? '' : '&amp;fil=' + window.fil)
	+ ((window.default_maptype === undefined) ? '' : '&amp;default_maptype=' + window.default_maptype)
	+ '&amp;ra='+rh
    + '">Browser does not support embedded objects.<br/>Visit directly <a href="https://www.vesselfinder.com" target="_blank">www.vesselfinder.com</a>'
    + '</iframe>';
})();