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
rh=encodeURIComponent(rh);
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
document.getElementById("fullmap-vf-embeded").innerHTML =
	'<iframe name="vesselfinder" id="vesselfinder" '
	+ ' width="100%"'
	+ ' height="100%"'
	+ ' frameborder="0"'
	+ ' src="https://www.vesselfinder.com/aismap?'
	+ 'zoom=' + ((window.zoom === undefined) ? 'undefined' : window.zoom)
	+ ((window.latitude === undefined) ? '&amp;lat=undefined' : '&amp;lat='+window.latitude)
	+ ((window.longitude === undefined) ? '&amp;lon=undefined' : '&amp;lon='+window.longitude)
	+ '&amp;width=' + '"100%"'
	+ '&amp;height=' + '"100%"'
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
