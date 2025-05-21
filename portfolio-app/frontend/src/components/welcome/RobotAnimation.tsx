// src/components/layout/RobotAnimation.tsx
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Alternative robot model URLs in case the primary one fails
const MODEL_URLS = [
  // Primary source from KhronosGroup
  'https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/RobotExpressive/glTF-Binary/RobotExpressive.glb',
  // Alternative source from Threejs.org
  'https://threejs.org/examples/models/gltf/RobotExpressive/RobotExpressive.glb',
  // Another alternative (different robot model)
  'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/RobotExpressive/RobotExpressive.glb'
];

const RobotAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingAttempt, setLoadingAttempt] = useState(0);
  const [debugInfo, setDebugInfo] = useState<string>('');
  
  // Remove debug logs in production
  const isProduction = true;
  const logDebug = (message: string) => {
    if (!isProduction) {
      setDebugInfo(prevInfo => prevInfo + message + '\n');
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Check if WebGL is available
    if (!webglAvailable()) {
      setError('❌ WebGL unavailable in this browser.');
      return;
    }
    
    logDebug(`Attempting to load model from: ${MODEL_URLS[loadingAttempt % MODEL_URLS.length]}`);
    
    // Scene / camera / renderer setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff); // Set background to white to match the page
    
    // Create camera with adjusted position for better viewing angle
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 1.5, 7.0); // Positioned to fit the vertical layout
    
    // Set up renderer with proper size
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true // Allow transparent background if needed
    });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for better performance
    renderer.setSize(containerWidth, containerHeight);
    
    // Handle different Three.js versions without causing TypeScript errors
    try {
      // For newer versions of Three.js
      if ('colorSpace' in renderer) {
        (renderer as any).colorSpace = (THREE as any).SRGBColorSpace;
      } 
      // For older versions of Three.js
      else if ('outputEncoding' in renderer) {
        (renderer as any).outputEncoding = (THREE as any).sRGBEncoding;
      }
    } catch (err) {
      console.warn('Could not set color space/encoding:', err);
    }
    
    containerRef.current.appendChild(renderer.domElement);

    // Lights & grid
    scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 2.2));
    const dl = new THREE.DirectionalLight(0xffffff, 2.2);
    dl.position.set(5, 10, 7);
    dl.castShadow = true;
    scene.add(dl);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);

    const planeGeo = new THREE.PlaneGeometry(200, 200);
    const planeMat = new THREE.ShadowMaterial({ opacity: 0.2 });
    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = 0;
    plane.receiveShadow = true;
    scene.add(plane);
    
    // Update grid to be more subtle on white background
    const grid = new THREE.GridHelper(20, 20, 0x00ffff, 0x00ffff);
    const gridMaterial = grid.material as THREE.Material;
    gridMaterial.opacity = 0.5;
    gridMaterial.transparent = true;
    scene.add(grid);
    (grid.material as THREE.Material).color = new THREE.Color(0x888888);

    // Controls with adjusted settings
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.minDistance = 3;    // Prevents zooming in too close
    controls.maxDistance = 10;   // Allows zooming out further
    controls.target.set(0, 0.5, 0); // Target at robot's center
    controls.update();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.3;

    // Interaction helpers
    const mouse = new THREE.Vector2();
    const ray = new THREE.Raycaster();
    let hoverObj: THREE.Object3D | null = null;
    let mixer: THREE.AnimationMixer | null = null;
    let waveAction: THREE.AnimationAction | null = null;
    let isModelLoaded = false;
    let isRotating = false;
    let rotationAngle = 0;
    let waveTriggered = false;
    let robotModel: THREE.Group | null = null;

    // Load robot with improved error handling
    const loadModel = (urlIndex: number) => {
      if (urlIndex >= MODEL_URLS.length) {
        fallbackCube();
        setError('Robot model failed to load after trying all available URLs. Using fallback cube.');
        return;
      }

      const modelUrl = MODEL_URLS[urlIndex];
      logDebug(`Loading from ${modelUrl}...`);
      
      const loader = new GLTFLoader();
      loader.setCrossOrigin('anonymous');
      
      // Create a special fetch request with no-cors
      fetch(modelUrl, { mode: 'cors', cache: 'force-cache' })
        .then(response => {
          if (response.ok) {
            logDebug(`Fetch successful, status: ${response.status}`);
            return response.arrayBuffer();
          }
          throw new Error(`Network response was not ok: ${response.status}`);
        })
        .then(buffer => {
          logDebug(`Processing model data...`);
          loader.parse(
            buffer,
            '',
            (gltf) => onLoad(gltf),
            (error: unknown) => {
              console.error('Parse error:', error);
              logDebug(`Parse error: ${error instanceof Error ? error.message : String(error)}`);
              loadModel(urlIndex + 1);
            }
          );
        })
        .catch(error => {
          console.error('Fetch error:', error);
          logDebug(`Fetch error: ${error.message}`);
          
          // Try loading directly through GLTFLoader as backup approach
          loader.load(
            modelUrl, 
            (gltf) => onLoad(gltf),
            (xhr) => {
              // Loading progress
              const percentComplete = xhr.loaded / xhr.total * 100;
              logDebug(`Loading: ${Math.round(percentComplete)}%`);
            },
            (error: unknown) => {
              console.error('GLTFLoader error:', error);
              logDebug(`GLTFLoader error: ${error instanceof Error ? error.message : String(error)}`);
              loadModel(urlIndex + 1);
            }
          );
        });
    };
    
    const onLoad = (gltf: any) => {
      logDebug('Model loaded successfully!');
      isModelLoaded = true;
      
      try {
        const robot = gltf.scene;
        robotModel = robot;
        
        // Position and scale adjustments to ensure visibility
        robot.scale.set(0.6, 0.9, 0.6);  // Smaller scale for vertical layout
        robot.position.y = -0.5;         // Position to fit in the container
        
        scene.add(robot);
        robot.traverse((obj) => {
          if ((obj as THREE.Mesh).isMesh) {
            obj.castShadow = true;
            obj.receiveShadow = true;
          }
        });
  
        mixer = new THREE.AnimationMixer(robot);
        
        if (gltf.animations && gltf.animations.length > 0) {
          const idleClip = findClip(gltf, 'Idle');
          const waveClip = findClip(gltf, 'Wave');
          
          if (idleClip) {
            mixer.clipAction(idleClip).play();
          }
          
          if (waveClip) {
            waveAction = mixer.clipAction(waveClip);
          } else {
            logDebug('Wave animation not found');
          }
        } else {
          logDebug('No animations found in the model');
        }
      } catch (error: unknown) {
        console.error('Error setting up robot:', error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        logDebug(`Error setting up robot: ${errorMessage}`);
        fallbackCube();
      }
    };

    const findClip = (gltf: any, name: string) => {
      if (!gltf.animations || gltf.animations.length === 0) {
        return null;
      }
      return gltf.animations.find((a: any) => a.name === name) || gltf.animations[0];
    };

    const fallbackCube = () => {
      if (isModelLoaded) return;
      
      logDebug('Using fallback cube');
      const cubeGeometry = new THREE.BoxGeometry(0.8, 1.6, 0.8);
      const cubeMaterial = new THREE.MeshStandardMaterial({
        color: 0x66ccff,
        emissive: 0x0077ff,
        emissiveIntensity: 0.5,
        metalness: 0.3,
        roughness: 0.4
      });
      
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.position.y = 0.8; // Position at center of grid
      cube.castShadow = true;
      cube.receiveShadow = true;
      scene.add(cube);
      
      // Add a head
      const headGeometry = new THREE.SphereGeometry(0.4, 32, 32);
      const headMaterial = new THREE.MeshStandardMaterial({
        color: 0x99ddff,
        emissive: 0x0088ff,
        emissiveIntensity: 0.3,
        metalness: 0.2,
        roughness: 0.3
      });
      const head = new THREE.Mesh(headGeometry, headMaterial);
      head.position.y = 1.8;
      head.castShadow = true;
      head.receiveShadow = true;
      scene.add(head);
      
      // Add arms
      const armGeometry = new THREE.BoxGeometry(0.25, 0.8, 0.25);
      const armMaterial = new THREE.MeshStandardMaterial({ color: 0x66ccff });
      
      const leftArm = new THREE.Mesh(armGeometry, armMaterial);
      leftArm.position.set(-0.5, 1.2, 0);
      leftArm.castShadow = true;
      leftArm.receiveShadow = true;
      scene.add(leftArm);
      
      const rightArm = new THREE.Mesh(armGeometry, armMaterial);
      rightArm.position.set(0.5, 1.2, 0);
      rightArm.castShadow = true;
      rightArm.receiveShadow = true;
      scene.add(rightArm);
      
      // Simple animation for the fallback cube
      const cubeUpdate = (dt: number) => {
        cube.rotation.y += dt * 0.5;
        leftArm.rotation.x = Math.sin(Date.now() * 0.003) * 0.5;
        rightArm.rotation.x = Math.sin(Date.now() * 0.003 + Math.PI) * 0.5;
      };
      
      mixer = {
        update: cubeUpdate
      } as unknown as THREE.AnimationMixer;
    };

    // Start loading the model
    loadModel(loadingAttempt);

    // Event handlers
    const handleResize = () => {
      if (!containerRef.current) return;

      // Use container dimensions instead of window
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      
      camera.aspect = containerWidth / containerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerWidth, containerHeight);
    };

    const handlePointerMove = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      // Check if hovering over robot to trigger wave
      ray.setFromCamera(mouse, camera);
      const intersects = ray.intersectObjects(scene.children, true);
      const nowHovering = intersects.length > 0;
      
      // Only trigger wave on hover start and if not already waving or rotating
      if (nowHovering && !hoverObj && waveAction && !waveTriggered && !isRotating) {
        waveAction.reset().play().setLoop(THREE.LoopOnce, 1);
        waveAction.clampWhenFinished = true;
        waveTriggered = true;
        setTimeout(() => {
          waveTriggered = false;
        }, 2000); // Prevent retrigger for 2 seconds
      }
      
      hoverObj = nowHovering ? intersects[0].object : null;
    };

    const handleClick = () => {
      if (hoverObj && !isRotating && robotModel) {
        // Start 360 degree rotation
        isRotating = true;
        rotationAngle = 0;
      }
    };

    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('click', handleClick);

    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      const animationId = requestAnimationFrame(animate);
      const dt = clock.getDelta();
      
      if (mixer) mixer.update(dt);

      // Handle 360 rotation when clicked
      if (isRotating && robotModel) {
        rotationAngle += dt * 3; // Speed of rotation
        robotModel.rotation.y = rotationAngle;
        
        // Complete one rotation
        if (rotationAngle >= Math.PI * 2) {
          rotationAngle = 0;
          isRotating = false;
          robotModel.rotation.y = 0;
        }
      }

      if (robotModel) {
        robotModel.position.y = -0.5 + Math.sin(clock.elapsedTime * 0.5) * 0.05;
      }

      ray.setFromCamera(mouse, camera);
      const intersects = ray.intersectObjects(scene.children, true);
      hoverObj = intersects.length > 0 ? intersects[0].object : null;
      
      if (containerRef.current) {
        document.body.style.cursor = hoverObj ? 'pointer' : 'default';
      }

      renderer.render(scene, camera);
      return animationId;
    };

    const animationId = animate();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('click', handleClick);
      
      if (renderer.domElement && containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [loadingAttempt]);

  // Helper function to check WebGL availability
  const webglAvailable = (): boolean => {
    try {
      const canvas = document.createElement('canvas');
      return !!(
        window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch (e) {
      return false;
    }
  };

  // Allow retrying model loading with a different URL
  const handleRetryLoad = () => {
    setLoadingAttempt(prev => prev + 1);
    setDebugInfo('Retrying with next URL...\n');
    setError(null);
  };

  return (
    <div className="h-full w-full relative">
      <div 
        ref={containerRef} 
        className="absolute inset-0" 
        style={{ height: "min(60vh, 500px)" }} // Limit height for better vertical layout
      />
      
      {error && (
        <div className="absolute bottom-16 w-full text-center">
          <div className="inline-block bg-black bg-opacity-70 text-red-300 p-3 rounded-lg">
            <p>{error}</p>
            <button 
              onClick={handleRetryLoad}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Try Another Source
            </button>
          </div>
        </div>
      )}
      
      {/* Debug panel - only shown in development mode */}
      {!isProduction && debugInfo && (
        <div className="absolute top-4 right-4 max-w-xs max-h-48 overflow-auto bg-black bg-opacity-70 text-green-300 p-2 text-xs font-mono rounded">
          <pre>{debugInfo}</pre>
        </div>
      )}
    </div>
  );
};

export default RobotAnimation;