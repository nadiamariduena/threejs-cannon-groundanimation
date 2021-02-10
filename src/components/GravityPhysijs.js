import React, { Component } from "react";
import * as THREE from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
//
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
//
//

import "cannon/build/cannon.min.js";
import * as CANNON from "cannon";
import cannon from "cannon";
/*



import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "cannon/build/cannon.min.js";
import * as CANNON from "cannon";
import cannon from "cannon";



*/
//
const style = {
  height: 600, // we can control scene size by setting container dimensions
};
//
let raycaster;

/*


*/
class CannonAndGroundAnima extends Component {
  componentDidMount() {
    this.sceneSetup();
    this.addCustomSceneObjects();
    this.startAnimationLoop();
    //
    window.addEventListener("resize", this.handleWindowResize);
  }
  //
  //
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
    // right now with the first person control,
    // we dont need this dispose as it s already included inside the three folder, check the read me, in the
    // beginning you will find a copy of the code inside the threejs that I am using.
    this.controls.dispose();
  }
  /*



  */
  // 1
  sceneSetup = () => {
    //
    // ----------------
    this.objects = [];
    //----------------

    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;
    this.canJump = false;

    this.prevTime = performance.now();
    this.velocity = new THREE.Vector3();
    this.direction = new THREE.Vector3();
    this.vertex = new THREE.Vector3();
    this.color = new THREE.Color();
    // background color scene
    // this.lemonChiffon = "rgb(240, 224, 190)";
    //
    //
    //

    //
    //                WIDTH/HEIGHT
    // --------------------------------------------
    //
    const width = this.tropicalOblivionAnimation.clientWidth;
    const height = this.tropicalOblivionAnimation.clientHeight;
    //
    // --------------------------------------------
    //
    //
    // ---------------
    // Create a camera
    // ---------------
    //
    // 	Set a Field of View (FOV) of 75 degrees
    // 	Set an Apsect Ratio of the inner width divided by the inner height of the window
    //	Set the 'Near' distance at which the camera will start rendering scene objects to 2
    //	Set the 'Far' (draw distance) at which objects will not be rendered to 1000
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.y = 10;
    //
    //
    this.scene = new THREE.Scene();
    // this.scene.background = new THREE.Color(0xffffff);
    // ---------------
    // this.SetGravity(new THREE.Vector3(0, -10, 0));
    // (0, -10, 0)); , here you are setting the gravity: 0 to the x axis, -10 to the Y axis and 0 to the Z axis.
    // So all the objects will be subjected to a Gravity "PULL DOWNwards"
    //
    //
    //
    // ---------------------------------------
    //                  RENDERER
    // ---------------------------------------
    //
    this.renderer = new THREE.WebGL1Renderer({
      // alpha: true,
      // will make the edges smooth

      antialias: true,
    });
    //

    //
    //
    this.renderer.setSize(width, height);
    //
    //
    // shadowMap is connected to the shadows in any object/model
    this.renderer.shadowMap.enabled = true;
    // if you dont add the line below "THREE.PCFSoftShadowMap" you will have the shadow but...
    // BUT the shadow will be pixelated and UGLY
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    //
    //
    //
    // here you append it to the jsx
    this.tropicalOblivionAnimation.appendChild(this.renderer.domElement); // mount using React ref
    // document.appendChild(this.renderer.domElement);  //before
    //
    this.blockerSceneTropicalOblivion.appendChild(this.renderer.domElement);

    //
    //
    //---------------------------
    //     PointerLockControl
    //---------------------------
    // this.controls = new PointerLockControls(this.camera, this.tropicalOblivionAnimation);
    this.controls = new PointerLockControls(
      this.camera,
      this.tropicalOblivionAnimation
    );
    // Create First Person Controls
    //
    //

    //
    //

    //
    //
    //
    //
    //
    //
    //

    this.tropicalOblivionAnimation.addEventListener("click", () => {
      this.controls.lock();

      console.log("I clicked");
    });
    //

    this.controls.addEventListener("lock", () => {
      this.tropicalOblivionAnimation.style.display = "none";
    });
    //

    this.controls.addEventListener("unlock", () => {
      this.tropicalOblivionAnimation.style.display = "block";
      this.tropicalOblivionAnimation.style.target = "_blank";
    });

    //
    //
    this.scene.add(this.controls.getObject());
    //-------------------------------
    //             KEYS
    //-------------------------------
    const onKeyDown = (event) => {
      switch (event.code) {
        case "ArrowUp":
        case "KeyW":
          this.moveForward = true;
          break;

        case "ArrowLeft":
        case "KeyA":
          this.moveLeft = true;
          break;

        case "ArrowDown":
        case "KeyS":
          this.moveBackward = true;
          break;

        case "ArrowRight":
        case "KeyD":
          this.moveRight = true;
          break;

        case "Space":
          if (this.canJump === true) this.velocity.y += 350;
          this.canJump = false;
          break;
      }
    };
    const onKeyUp = (event) => {
      switch (event.code) {
        case "ArrowUp":
        case "KeyW":
          this.moveForward = false;
          break;

        case "ArrowLeft":
        case "KeyA":
          this.moveLeft = false;
          break;

        case "ArrowDown":
        case "KeyS":
          this.moveBackward = false;
          break;

        case "ArrowRight":
        case "KeyD":
          this.moveRight = false;
          break;
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    //
    //
    // What is RAYCAST?
    // In a shooter game like counter strike, when you shoot,
    // the bullet is no a gameObject travelling fast, but is a
    // "Ray" from the gun to N distance. And every player in this ray get damaged.
    raycaster = new THREE.Raycaster(
      new THREE.Vector3(),
      new THREE.Vector3(0, -1, 0),
      0,
      10
    );

    //
    //
  };

  /*










  */
  // 2
  addCustomSceneObjects = () => {
    //
    //
    this.normalMaterial = new THREE.MeshNormalMaterial();
    this.phongMaterial = new THREE.MeshPhongMaterial();
    //
    //----------------------------------
    //         BLENDER  MODELS
    //----------------------------------
    //
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("myDecoder/");
    loader.setDRACOLoader(dracoLoader);

    // --------------------
    //  lemon tree
    // --------------------
    // lemon-tree_normalize-4.glb
    // 128.1kb
    //
    loader.load("./models/lemon-tree/lemon-tree_normalize-4.glb", (gltf) => {
      gltf.scene.traverse((model) => {
        if (model.material) model.material.metalness = 0.08;

        model.receiveShadow = true;
        model.scale.set(3, 3, 3);

        model.position.x = -20;
        model.position.y = 30;
        model.position.z = -15;
      });

      this.scene.add(gltf.scene);
    });
    //
    //

    //
    //
    //-----------------
    //    FLOOR
    //-----------------
    //
    //
    const planeGeometry = new THREE.PlaneGeometry(1000, 1000, 100, 55); //PLANE  w , h , segments
    const planeMaterial = new THREE.MeshLambertMaterial({
      color: 0xf11338, //0xf11338, //nice pink
      // wireframe: true,
    });
    // var planeMaterial = new THREE.MeshLambertMaterial((color: 0xff0000));
    this.plane = new THREE.Mesh(planeGeometry, planeMaterial);
    this.plane.rotation.x = -0.5 * Math.PI;
    this.plane.position.y = 0;
    //
    //
    // *** RECEIVE SHADOW
    this.plane.receiveShadow = true;
    this.scene.add(this.plane);
    //
    //
    //
    //
    //
    //
    //
    //---------------------
    //   Directional Light
    //---------------------
    //
    // //
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.autoUpdate = true;
    this.renderer.gammaFactor = 2.2;

    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(5, -1, 100);

    // position as follow , the light comes from x:-1000, comes from: y and the last comes from : z
    directionalLight.position.set(1000, 1000, 1000);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera = new THREE.OrthographicCamera(
      -100,
      200,
      -200,
      200,
      0.5,
      5000
    );
    // //
    this.scene.add(directionalLight);
    // The light points to the flat ground
    // this.directionalLight.target = this.plane;  //dont add this
    //
    //
    //THIS LIGHT IS ON THE BOTTOM
    //---------------------
    //     spotLight FF5733
    //---------------------
    //

    // With the light you can see the colors you added to each geometry in the materials
    this.spotLight = new THREE.SpotLight(0xffffff, 0.5); //intensity:   0.5);
    // spotLight.position.set( 0 , 10 , 0 );
    this.spotLight.position.set(5, -50, 0); //x, y , z   original (5, -50, 0);
    // (2, 32, 32); with this settings the light will be on the front
    this.spotLight.castShadow = true;
    //
    // this will remove the shadows
    this.spotLight.visible = true;
    //
    this.scene.add(this.spotLight);
    // //
    //
    //
    //
    //
    //
    //
    //--------------------------
    //          STATS
    //
    // this.stats = Stats();
    // document.body.appendChild(this.stats.dom);
    //
    //
    //
  };
  //
  //
  //

  // 3
  startAnimationLoop = () => {
    //
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);

    // Save the current time
    this.time = performance.now();
    //// Are the controls enabled? (Does the browser have pointer lock?)
    if (this.controls.isLocked === true) {
      //
      raycaster.ray.origin.copy(this.controls.getObject().position);
      // A ray that emits from an origin in a certain direction.
      raycaster.ray.origin.y -= 10;

      this.intersections = raycaster.intersectObjects(this.objects);

      this.onObject = this.intersections.length > 0;
      // Create a delta value based on current time
      this.delta = (this.time - this.prevTime) / 1000;
      //
      //
      //
      // Set the velocity.x and velocity.z using the calculated time delta
      this.velocity.x -= this.velocity.x * 10.0 * this.delta;
      this.velocity.z -= this.velocity.z * 10.0 * this.delta;
      // As velocity.y is our "gravity," calculate delta
      this.velocity.y -= 9.8 * 100.0 * this.delta; // 100.0 = mass
      //

      //
      this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
      this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
      this.direction.normalize(); // this ensures consistent movements in all directions

      if (this.moveForward || this.moveBackward)
        this.velocity.z -= this.direction.z * 400.0 * this.delta;
      if (this.moveLeft || this.moveRight)
        this.velocity.x -= this.direction.x * 400.0 * this.delta;
      // ------------------- //

      //              *****
      //

      //
      if (this.onObject === true) {
        this.velocity.y = Math.max(0, this.velocity.y);
        this.canJump = true;
      }

      this.controls.moveRight(-this.velocity.x * this.delta);
      this.controls.moveForward(-this.velocity.z * this.delta);
      this.controls.getObject().position.y += this.velocity.y * this.delta; // new behavior
      //
      //
      // Prevent the camera/player from falling out of the 'world'
      if (this.controls.getObject().position.y < 10) {
        this.velocity.y = 0;
        this.controls.getObject().position.y = 10;

        this.canJump = true;
      }

      //
      //
      //
    }
    //
    //
    this.prevTime = this.time;

    //
    //
    // this.stats.update();

    this.renderer.render(this.scene, this.camera);
  };

  /*



  */
  handleWindowResize = () => {
    const width = this.tropicalOblivionAnimation.clientWidth;
    const height = this.tropicalOblivionAnimation.clientHeight;
    //
    // updated renderer
    this.renderer.setSize(width, height);
    // updated **camera** aspect ratio
    this.camera.aspect = width / height;
    // That is the Three.js optimization: you can group multiple camera changes into a block with only one
    this.camera.updateProjectionMatrix();
  };
  /*


  */

  render() {
    return (
      <div className="sceneTropicalOblivionAnima">
        {/* --------------------- */}
        <div
          className="blockerSceneTropicalOblivion"
          ref={(ref) => (this.blockerSceneTropicalOblivion = ref)}
        ></div>
        {/* --------------------- */}
        {/* --------------------- */}
        <div
          className="tropicalOblivionAnimation"
          style={style}
          ref={(ref) => (this.tropicalOblivionAnimation = ref)}
        >
          <div className="circlePlay">
            <h3>ENTER</h3>

            <ul>
              <li>Move: WASD</li>
              <li> Jump: SPACE</li>
              <li>Look: MOUSE</li>
            </ul>

            {/* Move: WASD
            <br />
            Jump: SPACE
            <br />
            Look: MOUSE */}
          </div>
        </div>
        {/* --------------------- */}
        {/* --------------------- */}
        {/* --------------------- */}
      </div>
    );
  }
}

export default CannonAndGroundAnima;
