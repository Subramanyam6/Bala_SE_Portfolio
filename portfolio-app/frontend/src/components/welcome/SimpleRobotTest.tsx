import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const MODEL_URL = 'https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/RobotExpressive/glTF-Binary/RobotExpressive.glb';

const SimpleRobotTest: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const mouseRef = useRef(new THREE.Vector2());
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Basic Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    
    camera.aspect = containerWidth / containerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(containerWidth, containerHeight);
    containerRef.current.appendChild(renderer.domElement);
    
    // Basic lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);
    
    // Camera position
    camera.position.set(0, 2, 5);
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    
    // Variables for robot and interaction
    let robot: THREE.Group | null = null;
    const raycaster = new THREE.Raycaster();
    const mouse = mouseRef.current;
    
    // Load robot
    const loader = new GLTFLoader();
    loader.load(
      MODEL_URL,
      (gltf) => {
        robot = gltf.scene;
        robot.scale.set(1, 1, 1);
        robot.position.set(0, 0, 0);
        scene.add(robot);
        
        console.log('Robot loaded successfully');
      },
      (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
      },
      (error) => {
        console.error('Error loading robot:', error);
        
        // Fallback cube
        const geometry = new THREE.BoxGeometry(1, 2, 1);
        const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
        robot = new THREE.Group();
        const cube = new THREE.Mesh(geometry, material);
        cube.position.y = 1;
        robot.add(cube);
        scene.add(robot);
        
        console.log('Using fallback cube');
      }
    );
    
    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      // Simple raycasting
      raycaster.setFromCamera(mouse, camera);
      
      if (robot) {
        const intersects = raycaster.intersectObject(robot, true);
        const hovering = intersects.length > 0;
        
        if (hovering !== isHovering) {
          setIsHovering(hovering);
          console.log('Hover state changed:', hovering);
        }
        
        // Update cursor
        if (containerRef.current) {
          containerRef.current.style.cursor = hovering ? 'pointer' : 'default';
        }
      }
    };
    
    // Add event listener
    containerRef.current.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      controls.update();
      
      // Simple floating animation
      if (robot) {
        robot.position.y = Math.sin(Date.now() * 0.001) * 0.1;
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
        if (renderer.domElement && containerRef.current.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement);
        }
      }
      renderer.dispose();
    };
  }, [isHovering]);
  
  return (
    <div className="w-full h-96 relative border-2 border-gray-300 rounded-lg">
      <div 
        ref={containerRef} 
        className="w-full h-full"
      />
      
      {/* Debug info */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white p-2 rounded">
        <div>Hovering: {isHovering ? 'YES' : 'NO'}</div>
        <div>Mouse: ({mouseRef.current.x.toFixed(2)}, {mouseRef.current.y.toFixed(2)})</div>
      </div>
    </div>
  );
};

export default SimpleRobotTest; 