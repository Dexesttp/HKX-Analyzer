'use strict';
			
var popupWindow = document.getElementById('popup_background');
var dropZone = document.getElementById('drop_zone');
var loadZone = document.getElementById('load_zone');
var errZone = document.getElementById('error_zone');
var logs = document.getElementById('log');
var textZones = [];

function clean(array) {
	array = array.replace(/\n(\t*)/g, " ");
	array = array.split(" ");
	array.shift(1);
	return array;
}

function setError(err) {
	let out = '';
	out += 'There has been an error while reading the file. Click to retry.';
	out += "<br />[" + "?" + "] " + err.name + " : " + err.message;
	errZone.innerHTML = out;
	throw err;
}



function handleFileSelect(evt) {
	evt.stopPropagation();
	evt.preventDefault();
	
	let fileList =evt.dataTransfer.files;
	
	// Visuals : Display loading message, remove drop message
	displayPopup(loadZone);

	for (var i = 0, f; f = fileList[i]; i++) {
		var reader = new FileReader();
		var parser = new DOMParser();
		reader.onloadend = function(event) {
			var text = event.target.result;
			try {
				let data = parser.parseFromString(text, "text/xml");
				loadData(data);
				popupWindow.style.display = "none";
			}
			catch(err) {
				displayPopup(errZone);
				setError(err)
			}
		}
		reader.readAsText(f);
	}
}

// Visuals : display a Pop Up
function displayPopup(zone) {
	var zoneList = popupWindow.getElementsByClassName("zone");
	 for (var i = 0; i < zoneList.length; i++) {
		zoneList[i].style.display = "none";
	}
	zone.style.display = "block";
	popupWindow.style.display="block";
}


// Visuals : Change the mouse cursor to the "move" symbol on hover with a file.
function handleDragOver(evt) {
	evt.stopPropagation();
	evt.preventDefault();
	evt.dataTransfer.dropEffect = 'move';
}

// Delete the file
function handleDelete(evt) {
	textZones.forEach(function(zone) {zone.innerHTML = ""});
	displayPopup(dropZone);
}

// Listeners
dropZone.addEventListener('dragover', handleDragOver, false);	// Visuals
dropZone.addEventListener('drop', handleFileSelect, false);	// On Drop File event
errZone.addEventListener('click', handleDelete, false);	// Clicking on an error message

document.getElementById('clear_file').addEventListener('click', handleDelete, false); // Delete a file
