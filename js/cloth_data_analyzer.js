var boneList = document.getElementById('boneList');
var particleList = document.getElementById('particleList');
var constraints = document.getElementById('constraints');

textZones.push(boneList);
textZones.push(particleList);
textZones.push(constraints);

// Load all data from a hkaSkeleton node
function loadSkeleton(allData) {
	var
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
	
	logs.innerHTML = logs.innerHTML + bones;
	
	for(let i = 0; i < bones.length; i++) {
		out += '<tr id="boneNode' + i + '">'
		out += '<td>' + i + '</td>';
		out += '<td>' + bones[i].childNodes[1].childNodes[0].nodeValue + '</td>';
		out += '<td><a href="#boneNode' + parents[i] + '">' + parents[i] + '</a></td>';
		out += '</tr>';
	}
	out += '</table>';
	boneList.innerHTML = out;
}

// Load all particles data from the hclSimClothData node
function loadParticles(allData) {
	var
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
		out += '<td>' + i + '</td>';
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
// Load the constraints {todo}
function loadConstraints(allData) {
	var data = allData.querySelectorAll("hkobject.hkaSkeleton");
	// TODO
}

// Entry point
function loadData(data) {
	loadSkeleton(data);
	loadParticles(data);
	loadConstraints(data);
}
