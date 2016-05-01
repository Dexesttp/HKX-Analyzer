'use strict';

var boneList = document.getElementById('boneList');
var particleList = document.getElementById('particleList');
var standardConstraints = document.getElementById('standardConstraints');
var stretchConstraints = document.getElementById('stretchConstraints');
var bendConstraints = document.getElementById('bendConstraints');

textZones.push(boneList);
textZones.push(particleList);
textZones.push(standardConstraints);
textZones.push(stretchConstraints);
textZones.push(bendConstraints);

// Load all data from a hkaSkeleton node
function loadSkeleton(allData) {
	let
		data = allData.querySelector("hkobject.hkaSkeleton"),
		parents = data.querySelector("hkparam[name='parentIndices']").childNodes[0].nodeValue,
		bones = data.querySelectorAll("hkparam[name='bones'] hkobject"),
		out = '';
	
	parents = clean(parents);
		
	out += '<h4>' + data.getAttribute("class") + ' / ' + data.getAttribute("name") + '</h4>';
	out += '<h2>Bones (x' + bones.length + ')</h2>';
	out += '<table><tr>';
	out += '<th>id</th>';
	out += '<th>boneName</th>';
	out += '<th>boneParent</th>';
	out += '</tr>';
	
	for(let i = 0; i < bones.length; i++) {
		out += '<tr id="boneNode' + i + '">'
		out += '<td><a href="#boneNode' + i + '">' + i + '</a></td>';
		out += '<td>' + bones[i].childNodes[1].childNodes[0].nodeValue + '</td>';
		out += '<td><a href="#boneNode' + parents[i] + '">' + parents[i] + '</a></td>';
		out += '</tr>';
	}
	out += '</table>';
	boneList.innerHTML = out;
}

// Load all particles data from the hclSimClothData node
function loadParticles(allData) {
	let
		data = allData.querySelector("hkobject.hclSimClothData"),
		particles = data.querySelectorAll("hkparam[name='particleDatas'] hkobject"),
		fixedParticles = data.querySelector("hkparam[name='fixedParticles']").childNodes[0].nodeValue,
		staticCollisionMasks = data.querySelector("hkparam[name='staticCollisionMasks']").childNodes[0].nodeValue,
		out = '';
	
	fixedParticles = clean(fixedParticles);
	fixedParticles = fixedParticles.map(function(part) {return +part;});
	
	staticCollisionMasks = clean(staticCollisionMasks);
	staticCollisionMasks = staticCollisionMasks.map(function(part) {return +part;});
	
	out += '<h4>' + data.getAttribute("class") + ' / ' + data.getAttribute("name") + '</h4>';
	out += '<h2>Particles (x' + particles.length + ')</h2>';
	out += '<table><tr>';
	out += '<th>id</th>';
	out += '<th>radius</th>';
	out += '<th>mass</th>';
	out += '<th title="Static Collision Masks">SCM</th>';
	out += '<th>fixed?</th>';
	out += '</tr>';
	
	let totalMass = 0;
	
	for(let i = 0; i < particles.length; i++) {
		let
			radius = +particles[i].querySelector("hkparam[name='radius']").innerHTML,
			mass = +particles[i].querySelector("hkparam[name='mass']").innerHTML,
			isFixed = ((fixedParticles.indexOf(i) == -1) ? '' : 'x');
		out += '<tr id="particle' + i + '">';
		out += '<td><a href="#particle' + i + '">' + i + '</a></td>';
		out += '<td>' + radius.toFixed(2) + '</td>';
		out += '<td>' + mass.toFixed(2) + '</td>';
		out += '<td>' + staticCollisionMasks[i] + '</td>';
		out += '<td>' + isFixed + '</td>';
		out += '</tr>';
		totalMass += mass;
	}
	
	console.log(totalMass);
	
	out += '</table>';
	particleList.innerHTML = out;
}

function loadStandardConstraints(allData) {
	let 
		data = allData.querySelector("hkobject.hclStandardLinkConstraintSet"),
		constraints = data.querySelectorAll("hkparam[name='links'] hkobject"),
		out = '';
	
	out += '<h4>' + data.getAttribute("class") + ' / ' + data.getAttribute("name") + '</h4>';
	out += '<h2>Standard Constraints (x' + constraints.length + ')</h2>';
	out += '<table><tr>';
	out += '<th>id</th>';
	out += '<th>particle A</th>';
	out += '<th>particle B</th>';
	out += '<th title="rest length">rest</th>';
	out += '<th>stiffness</th>';
	out += '</tr>';
	
	for(let i = 0; i < constraints.length; i++) {
		let
			particleA = +constraints[i].querySelector("hkparam[name='particleA']").innerHTML,
			particleB = +constraints[i].querySelector("hkparam[name='particleB']").innerHTML,
			restLength = +constraints[i].querySelector("hkparam[name='restLength']").innerHTML,
			stiffness = +constraints[i].querySelector("hkparam[name='stiffness']").innerHTML;
		out += '<tr id="stdCont' + i + '">';
		out += '<td><a href="#stdCont' + i + '">' + i + '</a></td>';
		out += '<td><a href="#particle' + particleA + '">' + particleA + '</a></td>';
		out += '<td><a href="#particle' + particleB + '">' + particleB + '</a></td>';
		out += '<td>' + restLength.toFixed(2) + '</td>';
		out += '<td>' + stiffness.toFixed(2) + '</td>';
		out += '</tr>';
	}
	
	out += '</table>';
	standardConstraints.innerHTML = out;
}

function loadStretchConstraints(allData) {
	let
		data = allData.querySelector("hkobject.hclStretchLinkConstraintSet"),
		constraints = data.querySelectorAll("hkparam[name='links'] hkobject"),
		out = '';
	
	out += '<h4>' + data.getAttribute("class") + ' / ' + data.getAttribute("name") + '</h4>';
	out += '<h2>Stretch Link Constraints (x' + constraints.length + ')</h2>';
	out += '<table><tr>';
	out += '<th>id</th>';
	out += '<th>particle A</th>';
	out += '<th>particle B</th>';
	out += '<th title="rest length">rest</th>';
	out += '<th>stiffness</th>';
	out += '</tr>';
	
	for(let i = 0; i < constraints.length; i++) {
		let
			particleA = +constraints[i].querySelector("hkparam[name='particleA']").innerHTML,
			particleB = +constraints[i].querySelector("hkparam[name='particleB']").innerHTML,
			restLength = +constraints[i].querySelector("hkparam[name='restLength']").innerHTML,
			stiffness = +constraints[i].querySelector("hkparam[name='stiffness']").innerHTML;
		out += '<tr id="stdCont' + i + '">';
		out += '<td><a href="#stdCont' + i + '">' + i + '</a></td>';
		out += '<td><a href="#particle' + particleA + '">' + particleA + '</a></td>';
		out += '<td><a href="#particle' + particleB + '">' + particleB + '</a></td>';
		out += '<td>' + restLength.toFixed(2) + '</td>';
		out += '<td>' + stiffness.toFixed(2) + '</td>';
		out += '</tr>';
	}
	
	out += '</table>';
	stretchConstraints.innerHTML = out;
}

function loadBendConstraints(allData) {
	let
		data = allData.querySelector("hkobject.hclBendStiffnessConstraintSet"),
		constraints = data.querySelectorAll("hkparam[name='links'] hkobject"),
		out = '';
	
	out += '<h4>' + data.getAttribute("class") + ' / ' + data.getAttribute("name") + '</h4>';
	out += '<h2>Bend Constraints (x' + constraints.length + ')</h2>';
	out += '<table><tr>';
	out += '<th>id</th>';
	out += '<th>weights</th>';
	out += '<th title="bend stiffness">bend</th>';
	out += '<th title="rest curvature">rest</th>';
	out += '<th>particle A</th>';
	out += '<th>particle B</th>';
	out += '<th>particle C</th>';
	out += '<th>particle D</th>';
	out += '</tr>';
	
	for(let i = 0; i < constraints.length; i++) {
		console.log(constraints[i]);
		let
			weightA = +constraints[i].querySelector("hkparam[name='weightA']").innerHTML,
			weightB = +constraints[i].querySelector("hkparam[name='weightB']").innerHTML,
			weightC = +constraints[i].querySelector("hkparam[name='weightC']").innerHTML,
			weightD = +constraints[i].querySelector("hkparam[name='weightD']").innerHTML,
			bendStiffness = +constraints[i].querySelector("hkparam[name='bendStiffness']").innerHTML,
			restCurvature = +constraints[i].querySelector("hkparam[name='restCurvature']").innerHTML,
			particleA = +constraints[i].querySelector("hkparam[name='particleA']").innerHTML,
			particleB = +constraints[i].querySelector("hkparam[name='particleB']").innerHTML,
			particleC = +constraints[i].querySelector("hkparam[name='particleC']").innerHTML,
			particleD = +constraints[i].querySelector("hkparam[name='particleD']").innerHTML;
		out += '<tr id="stdCont' + i + '">';
		out += '<td><a href="#stdCont' + i + '">' + i + '</a></td>';
		out += '<td>' + weightA + ' // ' + weightB + " // " + weightC + " // " + weightD + '</td>';
		out += '<td>' + bendStiffness + '</td>';
		out += '<td>' + restCurvature + '</td>';
		out += '<td><a href="#particle' + particleA + '">' + particleA + '</a></td>';
		out += '<td><a href="#particle' + particleB + '">' + particleB + '</a></td>';
		out += '<td><a href="#particle' + particleC + '">' + particleC + '</a></td>';
		out += '<td><a href="#particle' + particleD + '">' + particleD + '</a></td>';
	}
	
	out += '</table>';
	bendConstraints.innerHTML = out;
}

// Entry point
function loadData(data) {
	loadSkeleton(data);
	loadParticles(data);
	loadStandardConstraints(data);
	loadStretchConstraints(data);
	loadBendConstraints(data);
}
