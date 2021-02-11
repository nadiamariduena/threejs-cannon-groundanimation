```javascript
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
    this.camera.position.x = 0;
    this.camera.position.y = 5;
    this.camera.position.z = 10; // origin: 50
    // this.camera.position.z = 2.6; // is used here to set some distance from a cube that is located at z = 0
    // // OrbitControls allow a camera to orbit around the object
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
    // THREE.PlaneGeometry(5, 3); the 5 stands for width and 3 for height
    //const geometry = new THREE.PlaneGeometry(5, 2.5, 20, 15);
    this.geometry = new THREE.SphereGeometry(20, 20, 20);
    // it will increase the segments in the geometry
    // its related to this   const waveX1 = 0.1 * Math.sin(dots_vertices.x * 2 + t_timeClock);
    //
    //
    this.material = new THREE.MeshBasicMaterial({
      color: 0x000000,
      wireframe: true,
      // map: loader.load("/img/NataliaSamoilova_metalmagazine-10.jpg"),
    });

    //
    this.cube = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.cube);
    //
    //
    // new rotation
    this.cube.rotation.x = -0.5 * Math.PI;
    // x direction y direction and z
    //

    //
    //

    this.clock = new THREE.Clock();

    //
  };
  /*
 
                4
 
 
 */

  startAnimationLoop = () => {
    const t_timeClock = this.clock.getElapsedTime();
    //
    // With the vertices we are going to grab all the points /vertices withing the cube/flag
    //
    //
    this.cube.geometry.vertices.map((dots_vertices) => {
      const waveX1 = 0.5 * Math.sin(dots_vertices.x * 2 + t_timeClock);
      // second wave
      const waveX2 = 0.25 * Math.sin(dots_vertices.x * 3 + t_timeClock * 2);
      // 3 wave but in the Y direction
      const waveY1 = 0.1 * Math.sin(dots_vertices.y * 5 + t_timeClock * 0.5); //to slowdown the time t_timeClock * 0.5);
      //
      //
      dots_vertices.z = waveX1 + waveX2 + waveY1;
    });

    //
    // // its going to wave the flag smoothly
    this.cube.geometry.verticesNeedUpdate = true;
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
```
