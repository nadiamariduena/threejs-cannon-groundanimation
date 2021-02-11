const section = document.querySelector("section.flag");

// 1 CREATE the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  // 7 adding the alpha transparency
  alpha: true,
  antialias: true, //8 this will smooth the edges of the cube
});
renderer.setSize(window.innerWidth, window.innerHeight);
// 6 grab the section from step 5
section.appendChild(renderer.domElement);
/*





*/

const loader = new THREE.TextureLoader();

// 2 geometry related  ------------------
const geometry = new THREE.PlaneGeometry(5, 3, 50, 30);
// const geometry = new THREE.PlaneGeometry(5, 3, 50, 30);

const material = new THREE.MeshBasicMaterial({
  //   color: 0xff0000,
  //   wireframe: true,
  map: loader.load("NataliaSamoilova_metalmagazine-10.jpg"),
});
// you can change cube for FLAG later
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//
// new rotation
cube.rotation.set(-0.1, 0, 0);
// cube.rotation.set(0, 0, 0);
// x direction y axe and z

camera.position.z = 5;

//by default its not doing anything
// its going to wave the flag smoothly
const clock = new THREE.Clock();

/*



*/

// 3
//  Rendering the scene
function animate() {
  const t_timeClock = clock.getElapsedTime();
  //
  // With the vertices we are going to grab all the points /vertices withing the cube/flag
  //
  //
  cube.geometry.vertices.map((dots_vertices) => {
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
  cube.geometry.verticesNeedUpdate = true;
  //
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
