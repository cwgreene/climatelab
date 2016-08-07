var renderer = new THREE.WebGLRenderer();
renderer.setSize( 800, 640 );
document.body.appendChild( renderer.domElement );

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
    35,         // Field of view
    800 / 640,  // Aspect ratio
    0.1,        // Near
    10000       // Far
);
camera.position.set( 0, 0, 40 );
camera.lookAt( scene.position );

var light = new THREE.PointLight( 0xFFFFFF );
light.position.set( 0, 10, 0 );
scene.add( light );

var ambient = new THREE.AmbientLight(0x404040);
scene.add( ambient );

var geometry = new THREE.SphereGeometry( 5, 32, 32);
var material = new THREE.MeshPhongMaterial( {color: 0x00FF00} );
var sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

renderer.render(scene, camera);
