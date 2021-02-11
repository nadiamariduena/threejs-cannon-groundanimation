/*

AFTER HOURS OF SEARCHING THE REASON FOR THE GEOMETRY OR VERTICES UNDEFINED
, I COULD FINALLY MAKE IT WORK







*/

import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Perlin from "phaser3-rex-plugins/plugins/perlin.js";

//phaser3-rex-notes/master/dist/rexperlinplugin.min.js', true);
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
    // https://rexrainbow.github.io/phaser3-rex-notes/docs/site/perlin/
    this.noise = new Perlin();
    //
    //
    const loader = new THREE.TextureLoader();
    //
    //
    // var sphere_geometry = new THREE.SphereGeometry(1, 128, 128);
    // var material = new THREE.MeshNormalMaterial();

    // var sphere = new THREE.Mesh(sphere_geometry, material);
    // this.scene.add(sphere);

    //
    //
    //
    //
    //
    // THREE.PlaneGeometry(5, 3); the 5 stands for width and 3 for height
    //const geometry = new THREE.PlaneGeometry(5, 2.5, 20, 15);
    this.geometry = new THREE.SphereGeometry(1, 128, 128);
    // it will increase the segments in the geometry
    // its related to this   const waveX1 = 0.1 * Math.sin(dots_vertices.x * 2 + t_timeClock);
    //
    //
    this.material = new THREE.MeshBasicMaterial({
      // color: 0x00ff00,
      map: loader.load("/img/NataliaSamoilova_metalmagazine-10.jpg"),
    });
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
    this.camera.position.z = 5;
    //
    //
    //by default its not doing anything, however inside the animate function you will be using it
    // its going tclassName="flagTwo"smoothly
    // this.clock = new THREE.Clock();

    //
  };
  /*
 
                4
 
 
 */

  startAnimationLoop = () => {
    // in the old flag  :   const t_timeClock = this.clock.getElapsedTime();
    // in this version i only have to use "this.t_timeClock"
    this.t_timeClock = performance.now() * 0.003;
    //
    //

    //
    //--------------------------------
    //      The waves
    // -------------------------------
    //
    var k = 3;
    for (var i = 0; i < this.cube.geometry.vertices.length; i++) {
      var p = this.cube.geometry.vertices[i];
      p.normalize().multiplyScalar(
        1 +
          0.3 * this.noise.perlin3(p.x * k + this.t_timeClock, p.y * k, p.z * k)
      );
    }
    // noise related
    // https://rexrainbow.github.io/phaser3-rex-notes/docs/site/perlin/
    this.cube.geometry.computeVertexNormals();
    this.cube.geometry.normalsNeedUpdate = true;
    this.cube.geometry.verticesNeedUpdate = true;
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
