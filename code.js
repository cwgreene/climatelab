var renderer;
var scene;
var camera;

// TODO: Bleh. The sphere geometry doesn't recognize that
// some vertices (like the ones at the poles) are all the same.
// This means, for a sphere of 32 x 32, we get 32 spikes at the
// top and bottom poles (single adjacent faces) and 60 'edge of the
// world' triangles, which have 2 neighbors.
//
// So we need to figure out which of these vertices touch one another.
function computeFaceAdjacency(geometry) {
  var inverse = new Map();
  var neighbors = new Map();
  // For each face, look at each vertex and
  // associate the face with that vertex.
  for (var face of geometry.faces) {
    var faceVertices = ["a", "b", "c"];
    for (var vertexIndex of faceVertices) {
      var vertex = face[vertexIndex];
      if (!(inverse.has(vertex))) {
        inverse.set(vertex, []);
      }
      inverse.get(vertex).push(face);
    }
  }
  for (face of geometry.faces) {
    neighbors.set(face, []);
  }
  for (var face of geometry.faces) {
    var faceVertices = ["a", "b", "c"];
    var adjacents = new Map();
    for (var vertexIndex of faceVertices) {
      var vertex = face[vertexIndex];
      for (var adjacentFace of inverse.get(vertex)) {
        if (!adjacents.has(adjacentFace)) {
          adjacents.set(adjacentFace, 0);
        }
        adjacents.set(adjacentFace, adjacents.get(adjacentFace) + 1);
      }
    }
    for (var entry of adjacents) {
      var adjacentFace = entry[0];
      var count = entry[1];
      if (count === 2) {
        neighbors.get(face).push(adjacentFace);
      }
    }
    if (neighbors.get(face).length !== 3) {
      console.log(neighbors.get(face).length);
    }
  }
  return neighbors;
}

function setup() {
  // Renderer
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( 800, 640 );
  document.body.appendChild( renderer.domElement );

  // Scene
  var scene = new THREE.Scene();

  // Camera
  var camera = new THREE.PerspectiveCamera(
      35,         // Field of view
      800 / 640,  // Aspect ratio
      0.1,        // Near
      10000       // Far
  );
  camera.name = "Camera";
  camera.position.set( 0, 0, 40 );
  camera.lookAt( scene.position );

  // Point light
  var light = new THREE.PointLight( 0xFFFFFF );
  light.name = "PointLight";
  light.position.set( 0, 10, 0 );
  scene.add( light );

  // Ambient
  var ambient = new THREE.AmbientLight(0x404040);
  ambient.name = "Ambient";
  scene.add( ambient );

  // Sphere
  var geometry = new THREE.SphereGeometry( 5, 32, 32);
  var material = new THREE.MeshPhongMaterial( {vertexColors: THREE.FaceColors} );
  var sphere = new THREE.Mesh( geometry, material );
  sphere.name = "Sphere";
  scene.add( sphere );

  for (var face of sphere.geometry.faces) {
    face.color.setRGB(Math.random(),Math.random(),Math.random());
  }

  var neighbors = computeFaceAdjacency(geometry);

  return {
    camera,
    renderer,
    scene,
    render: (...a) => renderer.render(...a),
    neighbors: neighbors,
    getNeighbors: (face) => neighbors.get(face)
  };
}

var world = setup();
console.log(world);
world.render(world.scene, world.camera);
