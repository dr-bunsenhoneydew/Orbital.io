//Teseting imports
import WeatherData from './SatelliteJSON/WeatherAndEarthResources/Weather.json' assert {type: 'json'};
import EarthResourcesData from './SatelliteJSON/WeatherAndEarthResources/EarthResources.json' assert {type: 'json'};
import TrackingAndDataRelaySatelliteSystemData from './SatelliteJSON/WeatherAndEarthResources/TrackingAndDataRelaySatelliteSystem.json' assert {type: 'json'};
import ARGOSData from './SatelliteJSON/WeatherAndEarthResources/ARGOS.json' assert {type: 'json'};
import NOAAData from './SatelliteJSON/WeatherAndEarthResources/NOAA.json' assert {type: 'json'};
import DisasterMonitoringData from './SatelliteJSON/WeatherAndEarthResources/DisasterMonitoring.json' assert {type: 'json'};
import GOESData from './SatelliteJSON/WeatherAndEarthResources/GOES.json' assert {type: 'json'};
import PlanetData from './SatelliteJSON/WeatherAndEarthResources/Planet.json' assert {type: 'json'};
import SearchAndRescueData from './SatelliteJSON/WeatherAndEarthResources/SearchAndRescue.json' assert {type: 'json'};
import SpireData from './SatelliteJSON/WeatherAndEarthResources/Spire.json' assert {type: 'json'};
import AmateurRadioData from './SatelliteJSON/Communications/AmateurRadio.json' assert {type: 'json'};
import ExperimentalCommsData from './SatelliteJSON/Communications/ExperimentalComms.json' assert {type: 'json'};
import GEOProtectedZoneData from './SatelliteJSON/Communications/GEOProtectedZone.json' assert {type: 'json'};
import GEOProtectedZonePlusData from './SatelliteJSON/Communications/GEOProtectedZonePlus.json' assert {type: 'json'};
import GeosynchronousData from './SatelliteJSON/Communications/Geosynchronous.json' assert {type: 'json'};
import GlobalstarData from './SatelliteJSON/Communications/Globalstar.json' assert {type: 'json'};
import GorizontData from './SatelliteJSON/Communications/Gorizont.json' assert {type: 'json'};
import IntelsatData from './SatelliteJSON/Communications/Intelsat.json' assert {type: 'json'};
import IridiumData from './SatelliteJSON/Communications/Iridium.json' assert {type: 'json'};
import IridiumNEXTData from './SatelliteJSON/Communications/IridiumNEXT.json' assert  {type: 'json'};
import MolniyaData from './SatelliteJSON/Communications/Molniya.json' assert {type: 'json'};
import OneWebData from './SatelliteJSON/Communications/OneWeb.json' assert {type: 'json'};
import OrbcommData from './SatelliteJSON/Communications/Orbcomm.json' assert {type: 'json'};
import RadugaData from './SatelliteJSON/Communications/Raduga.json' assert {type: 'json'};
import SatNOGSData from './SatelliteJSON/Communications/SatNOGS.json' assert {type: 'json'};
import SESData from './SatelliteJSON/Communications/SES.json' assert {type: 'json'};
import StarlinkData from './SatelliteJSON/Communications/Starlink.json' assert {type: 'json'};
import SwarmData from './SatelliteJSON/Communications/Swarm.json' assert {type: 'json'};
import BeidouData from './SatelliteJSON/Navigation/Beidou.json' assert {type: 'json'};
import GalileoData from './SatelliteJSON/Navigation/Galileo.json' assert {type: 'json'};
import GLONASSOperationalData from './SatelliteJSON/Navigation/GLONASSOperational.json' assert {type: 'json'};
import GNSSData from './SatelliteJSON/Navigation/GNSS.json' assert {type: 'json'};
import GPSOperationalData from './SatelliteJSON/Navigation/GPSOperational.json' assert {type: 'json'};
import NavyNavigationSatelliteSystemData from './SatelliteJSON/Navigation/NavyNavSatSystem.json' assert {type: 'json'};
import RussianLEONavigationData from './SatelliteJSON/Navigation/RussianLEONav.json' assert {type: 'json'};
import SatelliteBasedAugmentationSystemData from './SatelliteJSON/Navigation/SatBasedAugSystem.json' assert {type: 'json'};
import EducationData from './SatelliteJSON/Scientific/Education.json' assert {type: 'json'};
import EngineeringData from './SatelliteJSON/Scientific/Engineering.json' assert {type: 'json'};
import GeodeticData from './SatelliteJSON/Scientific/Geodetic.json' assert {type: 'json'};
import SpaceAndEarthScienceData from './SatelliteJSON/Scientific/SpaceAndEarthScience.json' assert {type: 'json'};


//Initiate Threejs Scene
const scene = new THREE.Scene();
const canvasContainer = document.querySelector('#canvasContainer');
let camera = new THREE.PerspectiveCamera(75, canvasContainer.offsetWidth / canvasContainer.offsetHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer(
  {
    antialias: true,
    canvas: document.querySelector('canvas')
  }
);
renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
renderer.setPixelRatio(window.devicePixelRatio);
const globesizing = 2.5
const geometry = new THREE.SphereGeometry(globesizing, 500, 500);
const material = new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load('photos/2_no_clouds_4k.jpeg'),
  bumpMap: new THREE.TextureLoader().load('photos/elev_bump_4k.jpeg'),
  bumpScale: 0.005,
  specularMap: new THREE.TextureLoader().load('photos/water_4k.png'),
  specular: new THREE.Color('grey')
});
const sphere = new THREE.Mesh(geometry, material);
const clouds = new THREE.Mesh(
  new THREE.SphereGeometry(globesizing + .02, 500, 500),
  new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load('photos/fair_clouds_4k.png'),
    transparent: true
  })
);
scene.add(clouds);
const starGeometry = new THREE.BufferGeometry();
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
  starVertices.push(x, y, z);
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3))
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars)
//Adding to group
const group = new THREE.Group();
group.add(sphere);
group.add(clouds);
scene.add(group);
//Add Light;
scene.add(new THREE.AmbientLight(0xfdfbd3, .5));
const light = new THREE.DirectionalLight(0xfdfbd3, .75);
light.position.set(20, 12, 20);
scene.add(light);
// Adjusts Camera Positions
camera.position.z = 8;

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


//Adding Colors:
const maroon = 0x800000
const brown = 0x9A6324
const teal = 0x469990
const magenta = 0xf032e6
const lime = 0xbfef45
const cyan = 0x42d4f4
const lavender = 0xdcbeff
const beige = 0xfffac8
const apricot = 0xfffac8
const pink = 0xfabed4
const blue = 0x42A5F5
const red = 0xFF00000
const green = 0x00FF00
const orange = 0xFF8B3D
const yellow = 0xFDFD66
const gray = 0xbebebe
const white = 0XFFFFFFF
const purple = 0x911eb4
const mint = 0xaaffc3
//Set color list
let colors = [magenta, lime, cyan, lavender, beige, apricot, pink, blue, red, green, orange, yellow, gray, white, purple, mint, maroon, brown, teal];


//Functions of how to add pins
function createCap(subgroup, lat, lng, alt, name, ident, type, col) {
  const cap = new THREE.Mesh(
    new THREE.CapsuleGeometry(.035, .04, 5, 10),
    new THREE.MeshBasicMaterial({
      color: col,
      opacity: .7,
      transparent: true
    })
  )
  const latitude = (lat / 180) * Math.PI
  const longitude = (lng / 180) * Math.PI
  const radius = globesizing + .9 + (alt / 60000)
  const x = radius * Math.cos(latitude) * Math.sin(longitude)
  const y = radius * Math.sin(latitude)
  const z = radius * Math.cos(latitude) * Math.cos(longitude)
  cap.position.x = x
  cap.position.y = y
  cap.position.z = z
  cap.lookAt(0, 0, 0)
  cap.rotateY(-Math.PI * 0.5)
  subgroup.add(cap)
  cap.name = name
  cap.ident = ident
  cap.type = type
}
;

//Establish dictionaries
var WeatherAndEarthResourcesDict = {
  "Weather": WeatherData,
  "Earth Resources": EarthResourcesData,
  "Tracking & Data Relay System": TrackingAndDataRelaySatelliteSystemData,
  "ARGOS": ARGOSData,
  "NOAA": NOAAData,
  "Disaster Monitoring": DisasterMonitoringData,
  "GOES": GOESData,
  "Planet": PlanetData,
  "Search & Rescue": SearchAndRescueData,
  "Spire": SpireData
}
var CommunicationsDict = {
  "Amateur Radio": AmateurRadioData,
  "Experimental Comms": ExperimentalCommsData,
  "GEO Protected Zone": GEOProtectedZoneData,
  "GEO Protected Zone Plus": GEOProtectedZonePlusData,
  "Geosynchronous": GeosynchronousData,
  "Globalstar": GlobalstarData,
  "Gorizont": GorizontData,
  "Intelsat": IntelsatData,
  "Iridium": IridiumData,
  "Iridium NEXT": IridiumNEXTData,
  "Molniya": MolniyaData,
  "OneWeb": OneWebData,
  "Orbcomm": OrbcommData,
  "Raduga": RadugaData,
  "SatNOGS": SatNOGSData,
  "SES": SESData,
  "Starlink": StarlinkData,
  "Swarm": SwarmData
}
var NavigationDict = {
  "Beidou": BeidouData,
  "Galileo": GalileoData,
  "GLONASS Operational": GLONASSOperationalData,
  "GNSS": GNSSData,
  "GPS Operational": GPSOperationalData,
  "Navy Navigation Satellite System": NavyNavigationSatelliteSystemData,
  "Russian LEO Navigation System": RussianLEONavigationData,
  "Satellite Based Augmentation System": SatelliteBasedAugmentationSystemData
}
var EducationDict = {
  "Educational": EducationData,
  "Engineering": EngineeringData,
  "Geodetic": GeodeticData,
  "Space & Earth Science": SpaceAndEarthScienceData
}

//Establish groups
const SatelliteGroup = new THREE.Group();
const WeatherGroup = new THREE.Group();
const CommunicationsGroup = new THREE.Group();
const NavigationGroup = new THREE.Group();
const EducationGroup = new THREE.Group();

//Function to put satellite dicitonary in group
function putDictInGroup(subgroup, dict, col) {
  for (var key in dict) {
    for (const obj of dict[key]) {
      let SATELLITE_NAME = obj.OBJECT_NAME;
      let OBJECT_ID = obj.OBJECT_ID;
      let i = radian(obj.INCLINATION);
      let o = radian(obj.RA_OF_ASC_NODE);
      const e = radian(obj.ECCENTRICITY);
      let w = radian(obj.ARG_OF_PERICENTER);
      const M = radian(obj.MEAN_ANOMALY);
      let n = rev_per_day_to_rad_per_sec(obj.MEAN_MOTION);
      let grav = 398600441800000;
      let a = Math.cbrt(grav / (n * n));
      let E = iterate_E(5, obj.MEAN_ANOMALY, obj.ECCENTRICITY);
      let f = calculate_f(e, E);
      let m = Math.asin(Math.sin(i) * Math.sin(w + f));
      let k = o + Math.atan((Math.tan(m) * cot(i)) / (Math.cos(w + f) / Math.cos(m)));
      let r = a * (1 - e * e) / (1 + e * Math.cos(f));
      let X = r * Math.cos(k) * Math.cos(m);
      let Y = r * Math.sin(k) * Math.cos(m);
      let Z = r * Math.sin(m);
      let lat = twodp(degree(Math.asin(Z / r)));
      let long = twodp(degree(Math.atan2(Y, X)));
      let alt = twodp(r / 1000 - 6371);
      createCap(subgroup, lat, long, alt, SATELLITE_NAME, OBJECT_ID, key, col);
    }
  }
}

//Link dictionaries to groups
putDictInGroup(WeatherGroup, WeatherAndEarthResourcesDict, blue);
putDictInGroup(CommunicationsGroup, CommunicationsDict, white);
putDictInGroup(NavigationGroup, NavigationDict, yellow);
putDictInGroup(EducationGroup, EducationDict, red);
group.add(SatelliteGroup); //Add main group to scene.group


//Checks for checkboxes & adds to screen
let DictionarySet = new Set();
DictionarySet.add(1);
SatelliteGroup.add(WeatherGroup);
let weatherCheck = document.getElementById('weatherToggle');
let commsCheck = document.getElementById('commsToggle');
let navCheck = document.getElementById('navToggle');
let eduCheck = document.getElementById('eduToggle');

weatherCheck.addEventListener('change', function (e) {
  if (weatherCheck.checked) {
    DictionarySet.add(1);
    SatelliteGroup.add(WeatherGroup);
    console.log(DictionarySet);
  }
  else {
    DictionarySet.delete(1);
    SatelliteGroup.remove(WeatherGroup);
    console.log(DictionarySet);
  }
})
commsCheck.addEventListener('change', function (e) {
  if (commsCheck.checked) {
    DictionarySet.add(2);
    SatelliteGroup.add(CommunicationsGroup);
  }
  else {
    DictionarySet.delete(2);
    SatelliteGroup.remove(CommunicationsGroup);
  }
})
navCheck.addEventListener('change', function (e) {
  if (navCheck.checked) {
    DictionarySet.add(3);
    SatelliteGroup.add(NavigationGroup);
  }
  else {
    DictionarySet.delete(3);
    SatelliteGroup.remove(NavigationGroup);
  }
})
eduCheck.addEventListener('change', function (e) {
  if (eduCheck.checked) {
    DictionarySet.add(4);
    SatelliteGroup.add(EducationGroup);
  }
  else {
    DictionarySet.delete(4);
    SatelliteGroup.remove(EducationGroup);
  }
})


//Adding dynamic points
const raycaster = new THREE.Raycaster()
const popUpEl3 = document.querySelector('#popUpEl3')
const satelliteName = document.querySelector('#satelliteName')
const satelliteIdent = document.querySelector('#satelliteIdent')
const satelliteClassif = document.querySelector('#satelliteClassif')




function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  group.rotation.y += 0.0002

  //Update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera)

  //Calculate objects intersecting the picking ray
  //Pop up box for satellites
  const intersects3 = raycaster.intersectObjects(SatelliteGroup.children
  );

  SatelliteGroup.children.forEach((child) => {
    child.children.forEach((mesh) => {
      mesh.material.opacity = .6
    })}
  )

  gsap.set(popUpEl3, {
    display: 'none'
  })

  for (let i = 0; i < intersects3.length; i++) {
    const sat = intersects3[i].object
    sat.material.opacity = 1
    gsap.set(popUpEl3, {
      display: 'block'
    })

    satelliteName.innerHTML = sat.name
    satelliteIdent.innerHTML = sat.ident
    satelliteClassif.innerHTML = sat.type
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
  const offset = canvasContainer.getBoundingClientRect().top
  mouse.x = (event.clientX / innerWidth) * 2 - 1
  mouse.y = -((event.clientY - offset) / innerHeight) * 2 + 1

  gsap.set(popUpEl3, {
    x: event.clientX,
    y: event.clientY
  })

  if (mouse.down) {
    event.preventDefault()
    // console.log('turn the earth')
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
    window.innerWidth / window.innerHeight,
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
      gsap.set(popUpEl3, {
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




//------------------------------------------
//Mathmatical functions to get lat, long, and alt from TLE
//------------------------------------------

function calculate_f(e, E) {
  return 2 * atan2(Math.sqrt(1 + e) * Math.sin(E / 2), Math.sqrt(1 - e) * Math.cos(E / 2));
}

function atan2(y, x) {
  if (x > 0) return Math.atan(y / x);
  if (y >= 0 && x < 0) return Math.atan(y / x) + Math.PI;
  if (y < 0 && x < 0) return Math.atan(y / x) - Math.PI;
  if (y > 0 && x == 0) return Math.PI / 2;
  if (y < 0 && x == 0) return - Math.PI / 2;
  if (y == 0 && x == 0) return null;
}

function iterate_E(limit, M, f) {
  let En = M;
  let e = f;
  for (let i = 0; i < limit; i++) {
    En = En - (En - e * Math.sin(En) - M) / (1 - e * Math.cos(En));
  }
  return En;
}

function rev_per_day_to_rad_per_sec(n) {
  return n * 2 * Math.PI / 86400;
}

function cot(x) {
  return 1 / Math.tan(x);
}

function radian(deg) {
  return deg / 180 * Math.PI;
}

function degree(rad) {
  return rad * 180 / Math.PI;
}

function twodp(x) {
  return Math.round(x * 100) / 100;
}

function eightdp(x) {
  return Math.round(x * 100000000) / 100000000;
}

function checksum(str, num_minuses) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] == '-') count++;
  }
  if (count == num_minuses) return true;
  return false;
}
;

function print_out(name, id, classif, a, e, i, o, w, f, r, X, Y, Z) {
  console.log("Satellite: " + name);
  console.log("Object ID: " + id);
  console.log("Classification Type: " + classif);
  console.log("");
  console.log("a: " + twodp(a / 1000) + " km");
  console.log("e: " + eightdp(e));
  console.log("i: " + twodp(degree(i)) + " \xB0");
  console.log("o: " + twodp(degree(o)) + " \xB0");
  console.log("w: " + twodp(degree(w)) + " \xB0");
  console.log("f: " + twodp(degree(f)) + " \xB0");
  console.log("");
  console.log("r: " + twodp(r / 1000) + " km");
  console.log("X: " + twodp(X / 1000) + " km");
  console.log("Y: " + twodp(Y / 1000) + " km");
  console.log("Z: " + twodp(Z / 1000) + " km");
  console.log("");
  console.log("Altitude: " + twodp(r / 1000 - 6371) + " km");
  console.log("Latitude: " + twodp(degree(Math.asin(Z / r))) + " \xB0");
  console.log("Longitude: " + twodp(degree(Math.atan2(Y, X))) + " \xB0");
}
;