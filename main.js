//To actually be able to display anything with three.js, we need three things: scene, camera, and renderer, so that we can render the scene with camera

// 1) Create Scene
const scene = new THREE.Scene();
const canvasContainer = document.querySelector('#canvasContainer');
// 2) Create Camera
let camera = new THREE.PerspectiveCamera( 75, canvasContainer.offsetWidth / canvasContainer.offsetHeight, 0.1, 1000 );
// 3) Create Renderer			
const renderer = new THREE.WebGLRenderer(
    {
        antialias: true, // smooths edges of sphere
        canvas: document.querySelector('canvas')
    }
);
renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Adding a shape
const globesizing = 3;
const geometry = new THREE.SphereGeometry(globesizing,500,500);
const material = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load('photos/2_no_clouds_4k.jpeg'),
    bumpMap: new THREE.TextureLoader().load('photos/elev_bump_4k.jpeg'),
    bumpScale:   0.005,
    specularMap: new THREE.TextureLoader().load('photos/water_4k.png'),
    specular: new THREE.Color('grey')      
});
const sphere = new THREE.Mesh( geometry, material );

//Adding clouds with slightly larger mesh
const clouds = new THREE.Mesh(
    new THREE.SphereGeometry(globesizing + .02, 500, 500),
    new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load('photos/fair_clouds_4k.png'),
      transparent: true
    })
  );
scene.add(clouds);

//Adding stars with new mesh
const starGeometry =  new THREE.BufferGeometry();
const loader = new THREE.TextureLoader();
const starMaterial = new THREE.PointsMaterial({
    size: 1,
    map: loader.load(
      "photos/starshape.png"
    ),
    transparent: true
});
const starVertices = [];
for (let i = 0; i < 10000; i++) {
     const x = (Math.random() - 0.5) * 2000;
     const y = (Math.random() - 0.5) * 2000;
     const z = -Math.random() * (5000) + 1000;
     starVertices.push(x,y,z);
 }
 
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices,3))
const stars = new THREE.Points( starGeometry, starMaterial);
scene.add(stars)

//Adding to group
const group = new THREE.Group();
group.add(sphere);
group.add(clouds);
scene.add(group);

//Add Light;
scene.add(new THREE.AmbientLight(0xfdfbd3, .5));
const light = new THREE.DirectionalLight(0xfdfbd3, .75);
light.position.set(20,12,20);
scene.add(light);

// Adjusts Camera Positions
camera.position.z = 8;













//Adding Colors:
 const blue = 0x92D2E2
 const red = 0xFF00000
 const green = 0x00FF00
 const orange = 0xFF8B3D
 const yellow = 0xFDFD66
 const gray = 0xBEBEBE
 const white = 0xFFFFFF

 //Functions to add pins
function createBox(lat, lng, country, name, col) {
    const box = new THREE.Mesh(
        new THREE.BoxGeometry(.05, .05, .5),
        new THREE.MeshBasicMaterial({
            color: col,
            opacity: .4,
            transparent: true
        })
    )
    const latitude = (lat / 180) * Math.PI
    const longitude = (lng / 180) * Math.PI
    const radius = globesizing + .2
  
    const x = radius * Math.cos(latitude) * Math.sin(longitude)
    const y = radius * Math.sin(latitude)
    const z = radius * Math.cos(latitude) * Math.cos(longitude)
  
    box.position.x = x
    box.position.y = y
    box.position.z = z
    box.lookAt(0,0,0)

    group.add(box)

    box.country = country
    box.name = name
}


//Function to add cone
function createCone(lat, lng, country, name, col) {
  const cone = new THREE.Mesh(
      new THREE.ConeGeometry(.6, 1, 30),
      new THREE.MeshBasicMaterial({
          color: col,
          opacity: .0005,
          transparent: true
          

      })
  )
  const latitude = (lat / 180) * Math.PI
  const longitude = (lng / 180) * Math.PI
  const radius = globesizing + .4
  const x = radius * Math.cos(latitude) * Math.sin(longitude)
  const y = radius * Math.sin(latitude)
  const z = radius * Math.cos(latitude) * Math.cos(longitude)
  cone.position.x = x
  cone.position.y = y
  cone.position.z = z
  cone.lookAt(0,0,0)
  cone.rotateX(-Math.PI * 0.5)
  group.add(cone)
  cone.country = country
  cone.name = name
}

//Function to create ISS
function createCap(lat, lng, country, name, col) {
  const cap = new THREE.Mesh(
      new THREE.CapsuleGeometry(.05, .05, 5, 10),
      new THREE.MeshBasicMaterial({
          color: col,
      })
  )
  const latitude = (lat / 180) * Math.PI
  const longitude = (lng / 180) * Math.PI
  const radius = globesizing + .9
  const x = radius * Math.cos(latitude) * Math.sin(longitude)
  const y = radius * Math.sin(latitude)
  const z = radius * Math.cos(latitude) * Math.cos(longitude)
  cap.position.x = x
  cap.position.y = y
  cap.position.z = z
  cap.lookAt(0,0,0)
  cap.rotateY(-Math.PI * 0.5)
  group.add(cap)
  cap.country = country
  cap.name = name
}





//GROUND FACILITIES: https://www.nasa.gov/mission_pages/station/behindscenes/index.html
createBox(38.895112, -77.036366, 'USA', 'NASA Headquarters (HQ)', blue)
createBox(29.552348, -95.093708, 'USA', 'Johnson Space Center (JSC)', blue)
createBox(28.515157, -80.682949, 'USA', 'Kennedy Space Center (KSC)', blue)
createBox(34.661501, -86.67186, 'USA', 'Marshall Space Flight Center (MSFC)', blue)
createBox(37.4090, -122.0423,'USA', 'Ames Research Center (ARC)', blue)
createBox(41.505493, -81.68129,'USA','Glenn Research Center (GRC)', blue)
createBox(55.9124968, 37.8101449, 'Russia', 'Moscow Mission Control Center (TsUP)', red)
createBox(38.1124178, 55.8781275, 'Russia', 'Gagarin Cosmonaut Training Center (GCTC)', red)
createBox(45.92, 63.342, 'Russia', 'Baikonur Cosmodrome', red)
createBox(45.498332, -73.406507, 'Canada', 'Payload Telescience Operations Centre (PTOC)', orange)
createBox(43.6859, -79.759941, 'Canada', 'Space Station Remote Manipulator System (SSRMS) Design and Development', orange)
createBox(52.23999, 4.450009, 'Europe', 'European Space Research and Technology Center (ESTEC)', yellow)
createBox(48.0744, 11.2622, 'Europe', 'Columbus Control Center (COL-CC) and Automated Transfer Vehicle Control Center (ATV-CC)', yellow)
createBox(50.935173, 6.953101, 'Europe', 'European Astronaut Center (EAC)', yellow)
createBox(4.9372, -53.326,'Europe', 'Guiana Space Center (GSC)', yellow)
createBox(36.0683, 140.1267, 'Japan', 'Tskuba Space Center (TKSU)', green)
createBox(30.3999984, 130.9686627, 'Japan', 'Tanegashima Space Center (TNSC)', green)


const postsPromise = fetch('http://api.open-notify.org/iss-now.json');
postsPromise
  .then(data => data.json()) //converting response to JSON
  .then(data => {
    createCone(data.iss_position.latitude, data.iss_position.longitude, 'ISS', 'SpaceStation', gray)
    createCap(data.iss_position.latitude, data.iss_position.longitude, 'ISS', 'SpaceStation', white)
  });
;



sphere.rotation.y = -Math.PI / 2

group.rotation.offset = {
    x: 0,
    y: 0
}

const mouse = {
    x: undefined,
    y: undefined,
    down: false,
    xPrev: undefined,
    yPrev: undefined
}

//Adding dynamic points
const raycaster = new THREE.Raycaster()
const popUpEl = document.querySelector('#popUpEl')
const popUpEl2 = document.querySelector('#popUpEl2')
const stationCountry =  document.querySelector('#stationCountry')
const stationName = document.querySelector('#stationName')

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  group.rotation.y += 0.0002

  //Raycaster to hover over objects
  raycaster.setFromCamera(mouse, camera)


  //Pop up box for pins
  const intersects = raycaster.intersectObjects(
    group.children.filter((mesh) => {
      return mesh.geometry.type === 'BoxGeometry'
    })
  )
  group.children.forEach((mesh) => {
    mesh.material.opacity = .7
  })
  gsap.set(popUpEl, {
    display: 'none'
  })
  for (let i = 0; i < intersects.length; i++) {
    const box = intersects[i].object
    box.material.opacity = 1
    gsap.set(popUpEl, {
      display: 'block'
    })
    stationCountry.innerHTML = box.country
    stationName.innerHTML = box.name
  }


  //Pop up box for ISS
  const intersects2 = raycaster.intersectObjects(
    group.children.filter((mesh) => {
      return mesh.geometry.type === 'CapsuleGeometry'
    })
  )
  gsap.set(popUpEl2, {
    display: 'none'
  })
  for (let i = 0; i < intersects2.length; i++) {
    const cone = intersects2[i].object
    cone.material.opacity = 1
    gsap.set(popUpEl2, {
      display: 'block'
    })
    stationCountry.innerHTML = cone.country
    stationName.innerHTML = cone.name
  }
  renderer.render(scene, camera)
  
}
animate()


//Event Listeners
canvasContainer.addEventListener('mousedown', ({ clientX, clientY }) => {
    mouse.down = true
    mouse.xPrev = clientX
    mouse.yPrev = clientY
  })
  addEventListener('mousemove', (event) => {
    if (innerWidth >= 1280) {
      mouse.x = ((event.clientX - innerWidth/ 2) / (innerWidth / 2)) * 2 - 1
      mouse.y = -(event.clientY / innerHeight) * 2 + 1
    } else {
      const offset = canvasContainer.getBoundingClientRect().top
      mouse.x = (event.clientX / innerWidth) * 2 - 1
      mouse.y = -((event.clientY - offset) / innerHeight) * 2 + 1
    }
    gsap.set(popUpEl, {
      x: event.clientX,
      y: event.clientY
    })
    gsap.set(popUpEl2, {
      x: event.clientX,
      y: event.clientY
    })
    if (mouse.down) {
      event.preventDefault()
      const deltaX = event.clientX - mouse.xPrev
      const deltaY = event.clientY - mouse.yPrev
  
      group.rotation.offset.x += deltaY * 0.005
      group.rotation.offset.y += deltaX * 0.005
  
      gsap.to(group.rotation, {
        y: group.rotation.offset.y,
        x: group.rotation.offset.x,
        duration: 2
      })
      mouse.xPrev = event.clientX
      mouse.yPrev = event.clientY
    }
  })
  
  addEventListener('mouseup', (event) => {
    mouse.down = false
  })

  
  
  addEventListener('resize', () => {
    renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight)
    camera = new THREE.PerspectiveCamera(
      75,
      canvasContainer.offsetWidth / canvasContainer.offsetHeight,
      0.1,
      1000
    )
    camera.position.z = 8
  })
  
  addEventListener(
    'touchmove',
    (event) => {
      event.clientX = event.touches[0].clientX
      event.clientY = event.touches[0].clientY
      const doesIntersect = raycaster.intersectObject(sphere)
      if (doesIntersect.length > 0) mouse.down = true
      if (mouse.down) {
        const offset = canvasContainer.getBoundingClientRect().top
        mouse.x = (event.clientX / innerWidth) * 2 - 1
        mouse.y = -((event.clientY - offset) / innerHeight) * 2 + 1
        gsap.set(popUpEl, {
          x: event.clientX,
          y: event.clientY
        })
        event.preventDefault()
        const deltaX = event.clientX - mouse.xPrev
        const deltaY = event.clientY - mouse.yPrev
        group.rotation.offset.x += deltaY * 0.005
        group.rotation.offset.y += deltaX * 0.005
        gsap.to(group.rotation, {
          y: group.rotation.offset.y,
          x: group.rotation.offset.x,
          duration: 2
        })
        mouse.xPrev = event.clientX
        mouse.yPrev = event.clientY
      }
    },
    { passive: false }
  )
  addEventListener('touchend', (event) => {
    mouse.down = false
  })