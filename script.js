const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

var createScene = function() {
    const scene = new BABYLON.Scene(engine);

    // Add a camera to the scene and attach it to the canvas
    const camera = new BABYLON.FreeCamera("freeCam", new BABYLON.Vector3(0, 0, -10), scene);
    camera.attachControl(canvas, true);

    // Add a lights to the scene
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);

    // Add box
    const box = BABYLON.MeshBuilder.CreateBox("box", {
        size: 1
    }, scene);

    const boxMat = new BABYLON.StandardMaterial("groundMat");
    boxMat.diffuseColor = new BABYLON.Color3(1, 0, 1);
    box.material = boxMat; //Place the material property of the ground

    // Add sphere
    const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {}, scene);
    sphere.position = new BABYLON.Vector3(2, 0, 0);

    const sphereMat = new BABYLON.StandardMaterial("groundMat");
    sphereMat.diffuseColor = new BABYLON.Color3(0, 0, 1);
    sphere.material = sphereMat; //Place the material property of the ground

    // Add plane
    const plane = BABYLON.MeshBuilder.CreatePlane("plane", {}, scene);
    plane.position = new BABYLON.Vector3(-2, 0, 0);

    const planeMat = new BABYLON.StandardMaterial("groundMat");
    planeMat.diffuseColor = new BABYLON.Color3(1, 0, 0);
    plane.material = planeMat; //Place the material property of the ground

    plane.rotation.x = 1;

    // Add ground
    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 100, height: 100 }, scene);
    ground.position.y = -1;

    const groundMat = new BABYLON.StandardMaterial("groundMat");
    groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0);
    ground.material = groundMat; //Place the material property of the ground

    var gravityVector = new BABYLON.Vector3(0, -9.81, 0);
    var physicsPlugin = new BABYLON.CannonJSPlugin();

    scene.enablePhysics(gravityVector, physicsPlugin);

    sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, scene);
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 1 }, scene);


    return scene;
};

// Add your code here matching the playground format

const scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function() {
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function() {
    engine.resize();
});