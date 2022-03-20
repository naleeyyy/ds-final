const scene = new THREE.Scene();
let aspectRatio = window.innerWidth / window.innerHeight
const camera = new THREE.PerspectiveCamera( 75, aspectRatio, 0.1, 1000 )
const canvas = document.querySelector('#c')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
})

const main = document.querySelector('main')

renderer.setPixelRatio( window.devicePixelRatio / 1 ) // change number to set quality
renderer.setSize( window.innerWidth, window.innerHeight ) 

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; 

window.addEventListener('resize', () => {
    let width = window.innerWidth
    let height = window.innerHeight
    renderer.setSize( width, height )
    camera.aspect = width / height
    camera.updateProjectionMatrix()
})

const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
const material = new THREE.MeshPhongMaterial({ wireframe: true, color: 'white' })
const obj = new THREE.Mesh( geometry, material );

obj.castShadow = true
obj.receiveShadow = true

scene.add( obj );

const lightcolor = 0xffffff
// second number is light intensity
const light = new THREE.PointLight(lightcolor, 0.625)
light.position.set(0, 0, 30)
light.castShadow = true; 
scene.add( light )

light.shadow.mapSize.width = 512; 
light.shadow.mapSize.height = 512;
light.shadow.camera.near = 1;
light.shadow.camera.far = 500;

const planeGeometry = new THREE.PlaneGeometry(100, 100);
const planeMaterial = new THREE.MeshStandardMaterial( { color: 0x000000 } )
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.receiveShadow = true;
scene.add( plane );

const lighthelper = new THREE.PointLightHelper( light )
// scene.add (lighthelper)

camera.position.z = 25;

let mouseX = 0;
let mouseY = 0;
    
document.onmousemove = (event) => {
    mouseX = (event.pageX / window.innerWidth - 0.5) * 4;
    mouseY = ((event.pageY / window.innerHeight - 0.5) * (-1)) * 4;
}

// factor for light and ammount of x movement
let factor = 2.5;

function animate() {
	requestAnimationFrame( animate );
    
    light.position.set(mouseX * factor, mouseY , 30)
    light.intensity = mouseX < 0 ? factor - (mouseX * - 1) : factor - mouseX

    camera.position.x = mouseX / -2;
    camera.position.y = mouseY / -2;

    obj.rotateX(0.005);
    obj.rotateY(0.005);
    obj.rotateZ(0.005);

 	renderer.render( scene, camera );
}

animate();
