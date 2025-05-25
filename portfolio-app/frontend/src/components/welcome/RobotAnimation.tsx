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
      setError("WebGL is not supported. Please try Chrome, Firefox, or Safari on desktop.");
      return;
    }
    
    logDebug(`Attempting to load model from: ${MODEL_URLS[loadingAttempt % MODEL_URLS.length]}`);
    
    // Scene / camera / renderer setup
    const scene = new THREE.Scene();
    
    // Create camera with adjusted position for compact view
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 1.5, 5.0); // Closer position for smaller container
    
    // Set up renderer with proper size - constrained to container
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    // Sync camera aspect to container
    camera.aspect = containerWidth / containerHeight;
    camera.updateProjectionMatrix();
    
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
      // For older versions of Three.js - use fallback
      else if ('outputEncoding' in renderer) {
        (renderer as any).outputEncoding = 3001; // THREE.sRGBEncoding fallback value
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

    const fillLight = new THREE.DirectionalLight(0xffffff, 5.5);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);

    const planeGeo = new THREE.PlaneGeometry(50, 50); // Just enough for shadow without grid
    const planeMat = new THREE.ShadowMaterial({ opacity: 0.2 });
    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = 0;
    plane.receiveShadow = true;
    scene.add(plane);
    
    // Grid removed - only keeping the shadow plane

    // Controls with adjusted settings for compact view
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = true;  // Enable zoom
    controls.minDistance = 1;    // Allow closer zoom
    controls.maxDistance = 10;   // Allow further zoom
    controls.target.set(0.6, 1.1, -2.0); // Target at robot's center
    controls.update();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.4; // Slightly faster for more dynamic feel

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
    let robotModel: THREE.Object3D | null = null;

    // Load robot with improved error handling
    const loadModel = (urlIndex: number) => {
      if (urlIndex >= MODEL_URLS.length) {
        fallbackCube();
        setError('⚠️ Model load failed—displaying a stylized placeholder instead.');
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
        
        // Position and scale adjustments for compact space next to text
        robot.scale.set(0.8, 0.8, 0.8);  // Slightly larger scale for better visibility in compact space
        robot.position.y = 0;            // Center position for compact container
        
        scene.add(robot);

        // Simple approach - no complex interaction meshes needed

        robot.traverse((obj: THREE.Object3D) => {
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
      cube.position.y = 0.8; // Position at center
      cube.castShadow = true;
      cube.receiveShadow = true;
      scene.add(cube);
      
      
      // Set robotModel to reference the cube for consistent interaction handling
      robotModel = cube;
      
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

      // Use container dimensions for compact view
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      
      camera.aspect = containerWidth / containerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerWidth, containerHeight);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      
      // Check if hovering over robot to trigger wave
      ray.setFromCamera(mouse, camera);
      
      // Simple raycasting like the working test - check robot directly
      let isHoveringRobot = false;
      if (robotModel) {
        const intersects = ray.intersectObject(robotModel, true);
        isHoveringRobot = intersects.length > 0;
      }
      const nowHovering = isHoveringRobot;
      
      // Only trigger wave on hover start and if not already waving or rotating
      if (nowHovering && !hoverObj && waveAction && !waveTriggered && !isRotating) {
        waveAction.reset().play().setLoop(THREE.LoopOnce, 1);
        waveAction.clampWhenFinished = true;
        waveTriggered = true;
        setTimeout(() => {
          waveTriggered = false;
        }, 2000); // Prevent retrigger for 2 seconds
              }
        
        hoverObj = isHoveringRobot ? robotModel : null;
      
      // Update cursor based on hover state
      if (containerRef.current) {
        containerRef.current.style.cursor = isHoveringRobot ? 'pointer' : 'default';
      }
    };

        const handleClick = () => {
      // Check if clicking on robot using the same logic as hover
      ray.setFromCamera(mouse, camera);
      
      // Simple raycasting like the working test - check robot directly
      let isClickingRobot = false;
      if (robotModel) {
        const intersects = ray.intersectObject(robotModel, true);
        isClickingRobot = intersects.length > 0;
      }
      
      // If clicking on robot and not already rotating, start rotation
      if (isClickingRobot && robotModel && !isRotating) {
        isRotating = true;
        rotationAngle = 0;
      }
    };

    // Add event listeners
    window.addEventListener('resize', handleResize);
    if (containerRef.current) {
      containerRef.current.addEventListener('pointermove', handlePointerMove);
      containerRef.current.addEventListener('click', handleClick);
    }

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
        robotModel.position.y = 0 + Math.sin(clock.elapsedTime * 0.5) * 0.08; // Slightly more float for visual appeal
        
        // Simple approach - robot moves naturally with its position
      }

      ray.setFromCamera(mouse, camera);
      
      // Simple raycasting like the working test - check robot directly
      let isHovering = false;
      if (robotModel) {
        const intersects = ray.intersectObject(robotModel, true);
        isHovering = intersects.length > 0;
      }
      
      hoverObj = isHovering ? robotModel : null;
      
      // Update cursor based on hover state
      if (containerRef.current) {
        containerRef.current.style.cursor = hoverObj ? 'pointer' : 'default';
      }

      renderer.render(scene, camera);
      return animationId;
    };

    const animationId = animate();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      
      // Store reference for cleanup
      const container = containerRef.current;
      if (container) {
        container.removeEventListener('pointermove', handlePointerMove);
        container.removeEventListener('click', handleClick);
        container.style.cursor = 'default';
        
        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
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
    <div className="h-full w-full relative overflow-hidden">
      {/* Enhanced gradient background that matches the website design */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.2) 0%, rgba(99, 102, 241, 0.15) 50%, transparent 70%)'
        }}
      />
      
      <div 
        ref={containerRef} 
        className="absolute inset-0 rounded-2xl overflow-hidden" 
        style={{ width: '100%', height: '100%' }} // Fill the container provided by parent
      />
      
      {error && (
        <div className="absolute bottom-16 w-full flex justify-center px-4">
          <div className="max-w-md w-full bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded-lg shadow-md flex items-start space-x-3">
            <p className="font-medium text-xl text-gray-900 tracking-wide animate-pulse">
              {error}
            </p>
            <button
              onClick={handleRetryLoad}
              className="ml-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-300 ease-in-out transform hover:scale-105 animate-bounce"
            >
              Retry Model
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