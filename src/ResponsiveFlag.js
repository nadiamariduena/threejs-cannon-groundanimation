/*

AFTER HOURS OF SEARCHING THE REASON FOR THE GEOMETRY OR VERTICES UNDEFINED
, I COULD FINALLY MAKE IT WORK







*/
import React, { Component } from "react";
import reactDom from "react-dom";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//
const style = {
  height: 550, // we can control scene size by setting container dimensions
};
//
class App extends Component {
  //
  //
  componentDidMount() {
    this.sceneSetup();
    this.addCustomSceneObjects();
    this.startAnimationLoop();

    //
    //

    //
    // 7  ******
    //
    window.addEventListener("resize", this.handleWindowResize);
  }
  /*
 
                9
 
 
 */
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
  }
  /*
 
                2
 
 
 */
  // Standard scene setup in Three.js. Check "Creating a scene" manual for more information
  // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
  sceneSetup = () => {
    // get container dimensions and use them for scene sizing
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;
    //
    //
    //
    //
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75, // fov = field of view
      width / height, // aspect ratio
      0.1, // near plane
      1000 // far plane
    );
    //
    //
    // 6  ******
    //
    this.camera.position.z = 2.6; // is used here to set some distance from a cube that is located at z = 0
    // OrbitControls allow a camera to orbit around the object
    // https://threejs.org/docs/#examples/controls/OrbitControls
    this.controls = new OrbitControls(this.camera, this.el);
    //
    //
    //
    this.renderer = new THREE.WebGLRenderer({
      // set the transparency of the scene, otherwise its black
      alpha: true,
      // will make the edges smooth
      antialias: true,
    });
    this.renderer.setSize(width, height);
    // here you append it to the jsx
    this.el.appendChild(this.renderer.domElement); // mount using React ref
  };
  /*
 
                3
 
 
 */

  addCustomSceneObjects = () => {
    const loader = new THREE.TextureLoader();
    //
    //
    //
    // THREE.PlaneGeometry(5, 3); the 5 stands for width and 3 for height
    //const geometry = new THREE.PlaneGeometry(5, 2.5, 20, 15);
    this.geometry = new THREE.PlaneGeometry(5, 3, 50, 30);
    // it will increase the segments in the geometry
    // its related to this   const waveX1 = 0.1 * Math.sin(dots_vertices.x * 2 + t_timeClock);
    //
    //
    this.material = new THREE.MeshBasicMaterial({
      // color: 0x00ff00,
      map: loader.load("/img/NataliaSamoilova_metalmagazine-10.jpg"),
    });
    //
    //
    //
    //
    this.cube = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.cube);
    //
    //
    // new rotation
    this.cube.rotation.set(-0.1, 0, 0);
    // x direction y direction and z
    //
    // this will inclassName="flagTwo" actually is like zooming, the less the bigger
    this.camera.position.z = 4;
    //
    //
    //by default its not doing anything, however inside the animate function you will be using it
    // its going tclassName="flagTwo"smoothly
    this.clock = new THREE.Clock();

    //
  };
  /*
 
                4
 
 
 */

  startAnimationLoop = () => {
    // in the old flag  :   const t_timeClock = this.clock.getElapsedTime();
    // in this version i only have to use "this.t_timeClock"
    this.t_timeClock = this.clock.getElapsedTime();
    //
    //
    //
    //--------------------------------
    //      The waves
    // -------------------------------
    //
    this.cube.geometry.vertices.forEach((dots_vertices) => {
      // this.cube.rotation.x += 0.01; // for the cube
      // this.cube.rotation.y += 0.01; /// for the cube
      //
      // 1 WAVE  ***
      //
      //
      // // With the vertices we are going to grab all the points /vertices withing the cube/flag
      // We are going to move them in a sine "curve"
      // the map is going to make something for every single point, so each point is going to do a partcular thing, moving up down etc
      const waveX1 = 0.1 * Math.sin(dots_vertices.x * 2 + this.t_timeClock);
      // 2.5 will make the wave huge and very close to the user, 0.5 is flat , 0.1 even more flattened
      //
      //
      // 2 WAVE  ***
      //
      const waveX2 =
        0.15 * Math.sin(dots_vertices.x * 3 + this.t_timeClock * 2);
      // 0.15 is less than 0.25 , 0.25 corresponds to half of the first wave, so this 2nd wave is a "little one"
      // const waveX2 = 0.5 * Math.sin(dots_vertices.x * 3 + t_timeClock * 2);
      // the * 3 ,  multiplies the waves, so this wave runs on 3 in amplitude and moves twice as quick * 3 + t_timeClock * 2
      //
      //
      //
      // 3   *** third  wave | in the Y direction (i hid this one)
      // const waveY1 = 0.1 * Math.sin(dots_vertices.y * 6 + t_timeClock * 0.1); //to slowdown the time t_timeClock * 0.5);
      //
      //
      dots_vertices.z = waveX1 + waveX2;
    });
    //
    //
    //
    //
    //
    this.cube.geometry.verticesNeedUpdate = true;
    //
    //
    //

    this.renderer.render(this.scene, this.camera);

    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };
  /*
 
                8
 
 
 */
  handleWindowResize = () => {
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;

    // Note that after making changes to most of camera properties you have to call
    // .updateProjectionMatrix for the changes to take effect.
    this.camera.updateProjectionMatrix();
  };
  //
  //------------------
  //
  render() {
    return (
      <React.Fragment>
        <div className="wrapper-flagZoomBox">
          <div
            className="flagZoomBox"
            style={style}
            ref={(ref) => (this.el = ref)}
          />
        </div>
      </React.Fragment>
    );
  }
}

//
export default App;

/*

body {
  overflow: hidden;
  background-color: lemonchiffon;

  .wrapper-flagZoomBox {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .flagZoomBox {
    width: 90%;
    margin: 0 5%;
    background: transparent;
    text-align: center;
    max-width: 900px;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 20px;
    border: 2px solid #000;
  }
}

*/
