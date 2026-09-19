import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CinematicFacility3DProps {
  scrollProgress?: number;
}

export const CinematicFacility3D: React.FC<CinematicFacility3DProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. SCENE CREATION
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    // Deep atmospheric fog disappearing gradually into total darkness
    scene.fog = new THREE.FogExp2(0x000000, 0.016);

    // 2. CAMERA SETUP
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(52, width / height, 0.1, 180);
    // Human eye-level standing in the central aisle of the facility
    camera.position.set(0, 0.4, 16);

    // 3. RENDERER SETUP
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 4. MATERIALS (Physically-based industrial brushed steel, chrome, dark matte metal)
    const steelMaterial = new THREE.MeshStandardMaterial({
      color: 0x888888,
      metalness: 0.92,
      roughness: 0.28,
    });

    const darkMetalMaterial = new THREE.MeshStandardMaterial({
      color: 0x222222,
      metalness: 0.85,
      roughness: 0.45,
    });

    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xd8d8d8,
      metalness: 0.98,
      roughness: 0.12,
    });

    const glassTubeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.05,
      roughness: 0.08,
      transmission: 0.88,
      transparent: true,
      opacity: 0.65,
      ior: 1.5,
    });

    const flangeMaterial = new THREE.MeshStandardMaterial({
      color: 0x555555,
      metalness: 0.9,
      roughness: 0.35,
    });

    const whiteIndicatorMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    // 5. CINEMATIC LIGHTING
    // Ambient light - low intensity to keep shadows pure black and contrast high
    const ambientLight = new THREE.AmbientLight(0x161616, 1.2);
    scene.add(ambientLight);

    // Main Light: Huge soft white overhead industrial light angled from behind/above
    const mainLight = new THREE.DirectionalLight(0xffffff, 2.8);
    mainLight.position.set(5, 14, -15);
    scene.add(mainLight);

    // Secondary Rim Light: Crisp white highlights along cylinder curves and steel edges
    const rimLight = new THREE.DirectionalLight(0xffffff, 1.6);
    rimLight.position.set(-8, 6, 10);
    scene.add(rimLight);

    // Distant depth accent light
    const backFill = new THREE.PointLight(0xffffff, 3.5, 60, 1.2);
    backFill.position.set(0, 4, -45);
    scene.add(backFill);

    // 6. VOLUMETRIC LIGHT BEAMS (Realistic soft downward angled haze cones)
    const beamGeo = new THREE.ConeGeometry(5.5, 26, 32, 1, true);
    beamGeo.translate(0, -13, 0);
    beamGeo.rotateX(Math.PI * 0.08);
    beamGeo.rotateZ(-Math.PI * 0.05);

    const beamMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.035,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const volumetricBeam1 = new THREE.Mesh(beamGeo, beamMat);
    volumetricBeam1.position.set(3, 14, -10);
    scene.add(volumetricBeam1);

    const volumetricBeam2 = new THREE.Mesh(beamGeo, beamMat);
    volumetricBeam2.position.set(-6, 15, -35);
    volumetricBeam2.scale.set(1.4, 1.4, 1.4);
    scene.add(volumetricBeam2);

    // 7. INDUSTRIAL ARCHITECTURE & INFRASTRUCTURE

    // --- A. Structural Ceiling Girders and Columns ---
    const girderGeo = new THREE.BoxGeometry(0.35, 0.7, 140);
    const girder1 = new THREE.Mesh(girderGeo, darkMetalMaterial);
    girder1.position.set(-6.5, 8, -40);
    scene.add(girder1);

    const girder2 = new THREE.Mesh(girderGeo, darkMetalMaterial);
    girder2.position.set(6.5, 8, -40);
    scene.add(girder2);

    // Horizontal truss rafters crossing the ceiling at regular intervals
    const crossBeamGeo = new THREE.BoxGeometry(14, 0.4, 0.4);
    for (let z = 15; z > -90; z -= 12) {
      const crossBeam = new THREE.Mesh(crossBeamGeo, darkMetalMaterial);
      crossBeam.position.set(0, 8, z);
      scene.add(crossBeam);

      // Hanging industrial luminaire fixture
      const lampHousingGeo = new THREE.CylinderGeometry(0.6, 0.8, 0.4, 16);
      const lamp = new THREE.Mesh(lampHousingGeo, darkMetalMaterial);
      lamp.position.set(0, 7.6, z);
      scene.add(lamp);

      // Small point light under some fixtures
      if (z === 3 || z === -33 || z === -69) {
        const fixtureLight = new THREE.PointLight(0xffffff, 1.5, 20, 2);
        fixtureLight.position.set(0, 7.2, z);
        scene.add(fixtureLight);
      }
    }

    // Heavy vertical support columns along the aisle
    const columnGeo = new THREE.BoxGeometry(0.6, 12, 0.6);
    for (let z = 10; z > -90; z -= 18) {
      const colL = new THREE.Mesh(columnGeo, darkMetalMaterial);
      colL.position.set(-7, 2, z);
      scene.add(colL);

      const colR = new THREE.Mesh(columnGeo, darkMetalMaterial);
      colR.position.set(7, 2, z);
      scene.add(colR);
    }

    // --- B. Massive Vertical Cryogenic Tanks ---
    // Function to create realistic cryogenic storage vessel with domed caps & flanges
    const createCryoTank = (radius: number, height: number, x: number, y: number, z: number) => {
      const group = new THREE.Group();

      // Main cylinder body
      const bodyGeo = new THREE.CylinderGeometry(radius, radius, height, 36);
      const body = new THREE.Mesh(bodyGeo, steelMaterial);
      group.add(body);

      // Top hemispherical dome
      const topDomeGeo = new THREE.SphereGeometry(radius, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
      const topDome = new THREE.Mesh(topDomeGeo, steelMaterial);
      topDome.position.y = height / 2;
      group.add(topDome);

      // Circumferential reinforcing ribs / rings
      const ringCount = 4;
      const ringGeo = new THREE.TorusGeometry(radius + 0.05, 0.06, 12, 36);
      for (let i = 0; i < ringCount; i++) {
        const ring = new THREE.Mesh(ringGeo, flangeMaterial);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = -height / 2 + (height / (ringCount + 1)) * (i + 1);
        group.add(ring);
      }

      // Vertical level indicator gauge tube
      const gaugeTubeGeo = new THREE.CylinderGeometry(0.04, 0.04, height * 0.8, 12);
      const gaugeTube = new THREE.Mesh(gaugeTubeGeo, chromeMaterial);
      gaugeTube.position.set(radius + 0.15, 0, 0);
      group.add(gaugeTube);

      // Sturdy structural base legs
      const legGeo = new THREE.CylinderGeometry(0.18, 0.25, 2, 12);
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 2) {
        const leg = new THREE.Mesh(legGeo, darkMetalMaterial);
        leg.position.set(Math.cos(a) * (radius * 0.8), -height / 2 - 1, Math.sin(a) * (radius * 0.8));
        group.add(leg);
      }

      group.position.set(x, y, z);
      scene.add(group);
      return group;
    };

    // Huge Primary Oxygen Vessel (Left)
    createCryoTank(2.4, 9, -5.8, 3.5, 0);
    // Secondary Oxygen Vessel (Left deep)
    createCryoTank(2.2, 8.5, -6.2, 3.2, -22);
    // Distant Oxygen Vessel 3 (Left far)
    createCryoTank(2.6, 10, -6.5, 4, -48);

    // Massive Carbon Dioxide Cryogenic Storage Tank (Right)
    createCryoTank(2.6, 9.5, 5.8, 3.8, -8);
    // Secondary CO₂ Vessel (Right deep)
    createCryoTank(2.3, 8.5, 6.2, 3.3, -32);
    // Distant CO₂ Vessel 3 (Right far)
    createCryoTank(2.7, 10.5, 6.8, 4.2, -60);

    // --- C. Massive Stainless-Steel Oxygen Pipelines & Valve Manifolds ---
    // 1. Overhead Main Longitudinal Oxygen Header Pipe (Brushed Stainless Steel)
    const headerPipeGeo = new THREE.CylinderGeometry(0.55, 0.55, 120, 24);
    const mainHeaderPipe = new THREE.Mesh(headerPipeGeo, steelMaterial);
    mainHeaderPipe.rotation.x = Math.PI / 2;
    mainHeaderPipe.position.set(-2.8, 4.8, -35);
    scene.add(mainHeaderPipe);

    // Flange joints along the main header pipe
    const pipeFlangeGeo = new THREE.CylinderGeometry(0.72, 0.72, 0.14, 24);
    for (let z = 12; z > -85; z -= 8) {
      const flange = new THREE.Mesh(pipeFlangeGeo, flangeMaterial);
      flange.rotation.x = Math.PI / 2;
      flange.position.set(-2.8, 4.8, z);
      scene.add(flange);
    }

    // 2. Midground CO₂ High-Pressure Pipeline (Right Side)
    const co2PipeGeo = new THREE.CylinderGeometry(0.42, 0.42, 110, 24);
    const co2Pipe = new THREE.Mesh(co2PipeGeo, steelMaterial);
    co2Pipe.rotation.x = Math.PI / 2;
    co2Pipe.position.set(2.8, 3.2, -30);
    scene.add(co2Pipe);

    for (let z = 10; z > -80; z -= 10) {
      const flange = new THREE.Mesh(pipeFlangeGeo, flangeMaterial);
      flange.rotation.x = Math.PI / 2;
      flange.scale.set(0.75, 1, 0.75);
      flange.position.set(2.8, 3.2, z);
      scene.add(flange);
    }

    // 3. Pipe Junctions, Drops, and Industrial Valve Wheels
    const createValveAssembly = (x: number, y: number, z: number, rotationY = 0) => {
      const valveGroup = new THREE.Group();

      // Valve body T-junction
      const teeGeo = new THREE.CylinderGeometry(0.48, 0.48, 1.2, 16);
      const tee = new THREE.Mesh(teeGeo, darkMetalMaterial);
      tee.rotation.z = Math.PI / 2;
      valveGroup.add(tee);

      // Bonnet stem
      const stemGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.8, 12);
      const stem = new THREE.Mesh(stemGeo, chromeMaterial);
      stem.position.y = 0.55;
      valveGroup.add(stem);

      // Industrial handwheel
      const wheelRingGeo = new THREE.TorusGeometry(0.5, 0.05, 8, 24);
      const handwheel = new THREE.Mesh(wheelRingGeo, chromeMaterial);
      handwheel.rotation.x = Math.PI / 2;
      handwheel.position.y = 0.95;
      valveGroup.add(handwheel);

      // Handwheel spokes
      const spokeGeo = new THREE.CylinderGeometry(0.03, 0.03, 1.0, 8);
      const spoke1 = new THREE.Mesh(spokeGeo, chromeMaterial);
      spoke1.rotation.z = Math.PI / 2;
      spoke1.position.y = 0.95;
      valveGroup.add(spoke1);

      const spoke2 = spoke1.clone();
      spoke2.rotation.y = Math.PI / 2;
      valveGroup.add(spoke2);

      // Circular Analog Pressure Gauge
      const gaugeHousingGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.1, 24);
      const gaugeHousing = new THREE.Mesh(gaugeHousingGeo, darkMetalMaterial);
      gaugeHousing.rotation.x = Math.PI / 2;
      gaugeHousing.position.set(0.45, 0.45, 0.35);
      valveGroup.add(gaugeHousing);

      const gaugeFaceGeo = new THREE.CircleGeometry(0.25, 24);
      const gaugeFace = new THREE.Mesh(
        gaugeFaceGeo,
        new THREE.MeshBasicMaterial({ color: 0xdddddd })
      );
      gaugeFace.position.set(0.45, 0.45, 0.41);
      valveGroup.add(gaugeFace);

      // Needle pointer
      const needleGeo = new THREE.BoxGeometry(0.015, 0.2, 0.01);
      const needle = new THREE.Mesh(
        needleGeo,
        new THREE.MeshBasicMaterial({ color: 0x111111 })
      );
      needle.position.set(0.45, 0.48, 0.42);
      needle.rotation.z = 0.6;
      valveGroup.add(needle);

      valveGroup.position.set(x, y, z);
      valveGroup.rotation.y = rotationY;
      scene.add(valveGroup);
      return valveGroup;
    };

    // Add prominent valves at key processing nodes
    createValveAssembly(-2.8, 3.6, 6);
    createValveAssembly(2.8, 2.2, -4);
    createValveAssembly(-2.8, 3.6, -18);
    createValveAssembly(2.8, 2.2, -26);
    createValveAssembly(0, 1.8, -42, Math.PI / 2);

    // --- D. FOREGROUND LAYER (Very large, slightly blurred pipes close to camera) ---
    // Massive foreground pipe crossing from left to overhead
    const fgPipeGeo = new THREE.CylinderGeometry(1.2, 1.2, 18, 28);
    const fgPipe = new THREE.Mesh(fgPipeGeo, steelMaterial);
    fgPipe.position.set(-3.8, 2.5, 11);
    fgPipe.rotation.set(0.3, 0.4, 0.8);
    scene.add(fgPipe);

    // Foreground top-right intake conduit
    const fgPipeTopGeo = new THREE.CylinderGeometry(0.9, 0.9, 14, 24);
    const fgPipeTop = new THREE.Mesh(fgPipeTopGeo, steelMaterial);
    fgPipeTop.position.set(4.2, 4.2, 12);
    fgPipeTop.rotation.set(-0.2, -0.3, -0.6);
    scene.add(fgPipeTop);

    // --- E. TRANSPARENT INSPECTION TUBES WITH FLOWING O₂ & CO₂ MOLECULES ---
    // Transparent inspection sight tube for Oxygen (Left Midground)
    const sightTubeGeo = new THREE.CylinderGeometry(0.38, 0.38, 12, 24);
    const sightTubeO2 = new THREE.Mesh(sightTubeGeo, glassTubeMaterial);
    sightTubeO2.rotation.x = Math.PI / 2;
    sightTubeO2.position.set(-1.6, 1.4, 0);
    scene.add(sightTubeO2);

    // O₂ Molecules: Array of paired spheres
    const o2Count = 18;
    const o2Group = new THREE.Group();
    const atomGeo = new THREE.SphereGeometry(0.045, 12, 12);
    const atomMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x333333,
    });

    const o2Pairs: THREE.Group[] = [];
    for (let i = 0; i < o2Count; i++) {
      const pair = new THREE.Group();
      const a1 = new THREE.Mesh(atomGeo, atomMat);
      a1.position.x = -0.04;
      const a2 = new THREE.Mesh(atomGeo, atomMat);
      a2.position.x = 0.04;
      pair.add(a1);
      pair.add(a2);

      // Distribute along tube
      pair.position.set(
        (Math.random() - 0.5) * 0.3,
        1.4 + (Math.random() - 0.5) * 0.3,
        -5 + (10 / o2Count) * i
      );
      pair.rotation.set(Math.random(), Math.random(), Math.random());
      o2Group.add(pair);
      o2Pairs.push(pair);
    }
    o2Group.position.x = -1.6;
    scene.add(o2Group);

    // Transparent inspection sight tube for CO₂ (Right Midground)
    const sightTubeCO2 = new THREE.Mesh(sightTubeGeo, glassTubeMaterial);
    sightTubeCO2.rotation.x = Math.PI / 2;
    sightTubeCO2.position.set(1.6, 1.4, -6);
    scene.add(sightTubeCO2);

    // CO₂ Molecules: Triatomic structures (O = C = O)
    const co2Count = 14;
    const co2Group = new THREE.Group();
    const co2Triplets: THREE.Group[] = [];
    const carbonGeo = new THREE.SphereGeometry(0.048, 12, 12);
    const carbonMat = new THREE.MeshStandardMaterial({
      color: 0x666666,
      metalness: 0.9,
      roughness: 0.3,
    });

    for (let i = 0; i < co2Count; i++) {
      const triplet = new THREE.Group();
      // Center Carbon
      const c = new THREE.Mesh(carbonGeo, carbonMat);
      // Dual Oxygens
      const oLeft = new THREE.Mesh(atomGeo, atomMat);
      oLeft.position.x = -0.075;
      const oRight = new THREE.Mesh(atomGeo, atomMat);
      oRight.position.x = 0.075;

      triplet.add(c);
      triplet.add(oLeft);
      triplet.add(oRight);

      triplet.position.set(
        (Math.random() - 0.5) * 0.3,
        1.4 + (Math.random() - 0.5) * 0.3,
        -11 + (10 / co2Count) * i
      );
      triplet.rotation.set(Math.random(), Math.random(), Math.random());
      co2Group.add(triplet);
      co2Triplets.push(triplet);
    }
    co2Group.position.x = 1.6;
    scene.add(co2Group);

    // --- F. High-Pressure Cylinder Banks & Manifold Racks ---
    const cylinderGeo = new THREE.CylinderGeometry(0.18, 0.18, 2.2, 16);
    const cylCapGeo = new THREE.SphereGeometry(0.18, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.5);

    const createCylinderBundle = (startX: number, startZ: number, countX = 4, countZ = 3) => {
      const bundleGroup = new THREE.Group();
      for (let ix = 0; ix < countX; ix++) {
        for (let iz = 0; iz < countZ; iz++) {
          const cyl = new THREE.Mesh(cylinderGeo, darkMetalMaterial);
          cyl.position.set(ix * 0.42, 1.1, iz * 0.42);
          const cap = new THREE.Mesh(cylCapGeo, steelMaterial);
          cap.position.set(ix * 0.42, 2.2, iz * 0.42);
          bundleGroup.add(cyl);
          bundleGroup.add(cap);
        }
      }
      bundleGroup.position.set(startX, -1, startZ);
      scene.add(bundleGroup);
    };

    createCylinderBundle(-4.2, -12, 3, 2);
    createCylinderBundle(3.2, -18, 3, 2);
    createCylinderBundle(-4.5, -36, 4, 3);
    createCylinderBundle(3.5, -45, 4, 3);

    // --- G. Industrial Floor Grating / Catwalk ---
    const floorGeo = new THREE.PlaneGeometry(24, 150, 1, 1);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.9,
      roughness: 0.5,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, -1, -50);
    scene.add(floor);

    // Center walkway guide lines (tactile industrial striping)
    const stripeGeo = new THREE.BoxGeometry(0.08, 0.02, 140);
    const stripeMat = new THREE.MeshBasicMaterial({ color: 0x444444 });
    const stripeL = new THREE.Mesh(stripeGeo, stripeMat);
    stripeL.position.set(-1.8, -0.98, -50);
    scene.add(stripeL);
    const stripeR = new THREE.Mesh(stripeGeo, stripeMat);
    stripeR.position.set(1.8, -0.98, -50);
    scene.add(stripeR);

    // --- H. Distant Practical Lights (Tiny twinkling industrial indicators) ---
    const distantLightCount = 45;
    const distantLightsGeo = new THREE.BufferGeometry();
    const distantPositions = new Float32Array(distantLightCount * 3);

    for (let i = 0; i < distantLightCount; i++) {
      distantPositions[i * 3] = (Math.random() - 0.5) * 16;
      distantPositions[i * 3 + 1] = Math.random() * 8 - 0.5;
      distantPositions[i * 3 + 2] = -25 - Math.random() * 75; // deep in the distance
    }

    distantLightsGeo.setAttribute('position', new THREE.BufferAttribute(distantPositions, 3));
    const distantLightsMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.12,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const distantPoints = new THREE.Points(distantLightsGeo, distantLightsMat);
    scene.add(distantPoints);

    // --- I. Subtle Atmospheric Floating Dust/Mist Particles ---
    const mistCount = 120;
    const mistGeo = new THREE.BufferGeometry();
    const mistPositions = new Float32Array(mistCount * 3);
    for (let i = 0; i < mistCount; i++) {
      mistPositions[i * 3] = (Math.random() - 0.5) * 14;
      mistPositions[i * 3 + 1] = Math.random() * 8 - 0.5;
      mistPositions[i * 3 + 2] = 14 - Math.random() * 60;
    }
    mistGeo.setAttribute('position', new THREE.BufferAttribute(mistPositions, 3));
    const mistMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const mistParticles = new THREE.Points(mistGeo, mistMat);
    scene.add(mistParticles);

    // 8. ANIMATION LOOP & SCROLL CAMERA DOLLY
    let targetZ = 16;
    let targetX = 0;
    let targetY = 0.4;
    let currentZ = 16;
    let currentX = 0;
    let currentY = 0.4;
    let clock = new THREE.Clock();

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;

      // Scroll camera trajectory deep into the facility:
      // Hero (progress = 0)   -> z = 16 (Facility Entrance)
      // Oxygen/CO2 (0.2-0.4) -> z = 4 to -12 (Main Processing Columns)
      // Quality/Stats (0.5-0.7)-> z = -24 to -42 (Testing & Valve Manifolds)
      // Safety/CTA (0.8-1.0) -> z = -58 to -72 (Central Reactor Chamber)
      targetZ = 16 - progress * 86;
      targetX = Math.sin(progress * Math.PI * 2.5) * 0.8;
      targetY = 0.4 + Math.sin(progress * Math.PI) * 0.5;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth camera damping / interpolation
      currentZ += (targetZ - currentZ) * 0.06;
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      // Extremely subtle filmic camera breathing sway
      const swayX = Math.sin(elapsedTime * 0.35) * 0.08;
      const swayY = Math.cos(elapsedTime * 0.45) * 0.05;

      camera.position.set(currentX + swayX, currentY + swayY, currentZ);
      // Look slightly forward into the deep vanishing point
      camera.lookAt(currentX * 0.3, currentY * 0.5, currentZ - 20);

      // Animate flowing O₂ molecules
      o2Pairs.forEach((pair, idx) => {
        pair.position.z += 0.025;
        pair.rotation.x += 0.01;
        pair.rotation.y += 0.015;
        if (pair.position.z > 5) {
          pair.position.z = -5;
        }
      });

      // Animate flowing CO₂ molecules
      co2Triplets.forEach((triplet, idx) => {
        triplet.position.z += 0.022;
        triplet.rotation.y += 0.012;
        triplet.rotation.z += 0.008;
        if (triplet.position.z > -1) {
          triplet.position.z = -11;
        }
      });

      // Subtle slow pulsing of volumetric light beam & distant beacons
      const pulse = Math.sin(elapsedTime * 1.5) * 0.008;
      beamMat.opacity = 0.032 + pulse;

      // Slow upward drift of dust/mist
      const mistPosAttr = mistGeo.attributes.position as THREE.BufferAttribute;
      const mistArr = mistPosAttr.array as Float32Array;
      for (let i = 1; i < mistArr.length; i += 3) {
        mistArr[i] += 0.002;
        if (mistArr[i] > 8) {
          mistArr[i] = -0.5;
        }
      }
      mistPosAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 9. RESIZE HANDLER
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // 10. CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="cinematic-3d-industrial-canvas"
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-black"
    >
      {/* Subtle cinematic film grain & camera lens vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-40 mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.85) 100%)`,
        }}
      />

      {/* Atmospheric depth contrast gradient */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
    </div>
  );
};
