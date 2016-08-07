var renderer;
var scene;
var camera;

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
    return { camera, renderer, scene, render: (...a) =>renderer.render(...a) };
}
var world = setup();
console.log(world);
world.render(world.scene, world.camera);
