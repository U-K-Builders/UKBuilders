import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function Christina3DViewer() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const frameRef = useRef(null);
  const [isNight, setIsNight] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Scene ────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a1828);
    scene.fog = new THREE.Fog(0x0a1828, 120, 280);
    sceneRef.current = scene;

    // ── Camera ───────────────────────────────────────────────────────
    const w = mount.clientWidth;
    const h = mount.clientHeight;
    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 500);
    camera.position.set(38, 28, 52);

    // ── Renderer ─────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // ── Controls ─────────────────────────────────────────────────────
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.7;
    controls.maxPolarAngle = Math.PI / 2.05;
    controls.minDistance = 20;
    controls.maxDistance = 120;
    controls.target.set(0, 20, 0);
    controls.update();
    controlsRef.current = controls;

    // ── Materials ────────────────────────────────────────────────────
    const facade    = new THREE.MeshStandardMaterial({ color: 0xe8dcc8, roughness: 0.55, metalness: 0.05 });
    const podiumMat = new THREE.MeshStandardMaterial({ color: 0xddd0b8, roughness: 0.6,  metalness: 0.02 });
    const glass     = new THREE.MeshStandardMaterial({ color: 0x8aafc0, roughness: 0.1,  metalness: 0.5, transparent: true, opacity: 0.75 });
    const fin       = new THREE.MeshStandardMaterial({ color: 0x7a5c3a, roughness: 0.55, metalness: 0.1 });
    const white     = new THREE.MeshStandardMaterial({ color: 0xfaf8f4, roughness: 0.6,  metalness: 0 });
    const greenMat  = new THREE.MeshStandardMaterial({ color: 0x4a7c4e, roughness: 0.9,  metalness: 0 });
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x1a2e1a, roughness: 1,    metalness: 0 });

    // ── Ground plane ─────────────────────────────────────────────────
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // ── Helper to build a box ────────────────────────────────────────
    const box = (w, h, d, mat, x = 0, y = 0, z = 0) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      m.position.set(x, y + h / 2, z);
      m.castShadow = true;
      m.receiveShadow = true;
      scene.add(m);
      return m;
    };

    // ── Podium (5 levels, wide) ───────────────────────────────────────
    // Ground + podium floors 1-4: 5 × 3.2m = 16m tall, 26m wide, 22m deep
    box(26, 16, 22, podiumMat, 0, 0, 0);

    // Podium front commercial band
    box(26, 4.5, 1.2, white, 0, 0, 11.6);

    // Podium terrace green (top of podium)
    box(24, 0.4, 20, greenMat, 0, 16, 0);

    // Terrace pergola structures
    const pergolaMat = fin;
    box(6, 0.2, 4, pergolaMat,  7, 16.6, -3);
    box(6, 0.2, 4, pergolaMat,  7, 17.4, -3);
    for (let i = -2.5; i <= 2.5; i += 1.25) {
      box(0.12, 1.5, 4, pergolaMat, 7 + i, 16.5, -3);
    }
    // Kids area (coloured slab)
    const kidsMat = new THREE.MeshStandardMaterial({ color: 0xe8c84a, roughness: 0.9 });
    box(7, 0.3, 6, kidsMat, -6, 16.2, -2);

    // ── Tower (13 levels above podium) ───────────────────────────────
    // Tower: 13 × 3.2m = 41.6m tall, 20m wide, 14m deep
    const towerY = 16;
    box(20, 41.6, 14, facade, 0, towerY, 0);

    // ── Window rows ──────────────────────────────────────────────────
    for (let floor = 0; floor < 13; floor++) {
      const floorY = towerY + 1.4 + floor * 3.2;
      // Front windows (4 per floor)
      for (let wx = -6.5; wx <= 6.5; wx += 4.5) {
        const win = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.8, 0.15), glass);
        win.position.set(wx, floorY, 7.08);
        scene.add(win);
      }
      // Back windows
      for (let wx = -6.5; wx <= 6.5; wx += 4.5) {
        const win = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.8, 0.15), glass);
        win.position.set(wx, floorY, -7.08);
        scene.add(win);
      }
      // Side windows
      for (const sx of [-10.08, 10.08]) {
        const win = new THREE.Mesh(new THREE.BoxGeometry(0.15, 1.8, 2.8), glass);
        win.position.set(sx, floorY, 0);
        scene.add(win);
      }
    }

    // ── Podium commercial windows ────────────────────────────────────
    for (let gx = -10; gx <= 10; gx += 5) {
      const win = new THREE.Mesh(new THREE.BoxGeometry(3.5, 2.8, 0.15), glass);
      win.position.set(gx, 1.8, 11.08);
      scene.add(win);
    }

    // ── Vertical bronze fins (front face) ────────────────────────────
    for (let fx = -8; fx <= 8; fx += 4) {
      const finMesh = new THREE.Mesh(new THREE.BoxGeometry(0.35, 38, 0.5), fin);
      finMesh.position.set(fx, towerY + 20, 7.3);
      scene.add(finMesh);
    }

    // ── Balcony railings / slab edges ────────────────────────────────
    for (let floor = 0; floor < 13; floor++) {
      const slabY = towerY + floor * 3.2;
      // Front balcony slab
      const slab = new THREE.Mesh(new THREE.BoxGeometry(22, 0.2, 1.2), white);
      slab.position.set(0, slabY, 7.6);
      scene.add(slab);
      // Railing top bar
      const rail = new THREE.Mesh(new THREE.BoxGeometry(22, 0.12, 0.06), white);
      rail.position.set(0, slabY + 1.0, 8.1);
      scene.add(rail);
    }

    // ── Top crown / parapet ──────────────────────────────────────────
    box(21.5, 1.2, 15, white, 0, towerY + 41.6, 0);
    // Roof slab
    box(20, 0.4, 14, white, 0, towerY + 42.8, 0);

    // ── Entrance gate pillars ─────────────────────────────────────────
    box(1.2, 6, 1.2, white,  12, 0, 14);
    box(1.2, 6, 1.2, white, -12, 0, 14);
    // Gate arch
    box(2.5, 0.4, 1.2, white, 12, 6, 14);
    box(2.5, 0.4, 1.2, white, -12, 6, 14);

    // ── Surrounding road plane ────────────────────────────────────────
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x1c1c1c, roughness: 1 });
    const road = new THREE.Mesh(new THREE.PlaneGeometry(200, 20), roadMat);
    road.rotation.x = -Math.PI / 2;
    road.position.set(0, 0.01, 22);
    scene.add(road);

    // ── Lighting ─────────────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0xfff5e0, 0.9);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xfff8e8, 2.2);
    sun.position.set(30, 60, 40);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 200;
    sun.shadow.camera.left = -60;
    sun.shadow.camera.right = 60;
    sun.shadow.camera.top = 80;
    sun.shadow.camera.bottom = -20;
    scene.add(sun);

    const fill = new THREE.DirectionalLight(0xb0c8ff, 0.4);
    fill.position.set(-20, 20, -30);
    scene.add(fill);

    // Store lights for day/night toggle
    scene.userData.ambient = ambient;
    scene.userData.sun = sun;
    scene.userData.fill = fill;

    // ── Window glow lights (night) ────────────────────────────────────
    const glowLights = [];
    for (let floor = 0; floor < 6; floor++) {
      const glow = new THREE.PointLight(0xffd580, 0, 8);
      glow.position.set(0, towerY + 5 + floor * 6, 6);
      scene.add(glow);
      glowLights.push(glow);
    }
    scene.userData.glowLights = glowLights;

    setLoaded(true);

    // ── Animate ──────────────────────────────────────────────────────
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ───────────────────────────────────────────────────────
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(frameRef.current);
      controls.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  // ── Day / Night toggle ──────────────────────────────────────────────
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const { ambient, sun, fill, glowLights } = scene.userData;
    if (isNight) {
      scene.background = new THREE.Color(0x060e1c);
      scene.fog = new THREE.Fog(0x060e1c, 80, 240);
      ambient.color.set(0x1a2a4a); ambient.intensity = 0.4;
      sun.intensity = 0;
      fill.intensity = 0.1;
      glowLights.forEach(l => { l.intensity = 1.8; });
    } else {
      scene.background = new THREE.Color(0x0a1828);
      scene.fog = new THREE.Fog(0x0a1828, 120, 280);
      ambient.color.set(0xfff5e0); ambient.intensity = 0.9;
      sun.intensity = 2.2;
      fill.intensity = 0.4;
      glowLights.forEach(l => { l.intensity = 0; });
    }
  }, [isNight]);

  // ── Auto-rotate toggle ──────────────────────────────────────────────
  useEffect(() => {
    if (controlsRef.current) controlsRef.current.autoRotate = autoRotate;
  }, [autoRotate]);

  return (
    <div className="relative w-full" style={{ height: '600px' }}>
      <div ref={mountRef} className="w-full h-full" />

      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-navy">
          <p className="text-gold text-xs uppercase tracking-[3px]">Building Model…</p>
        </div>
      )}

      {/* Controls overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
        <button
          onClick={() => setIsNight(n => !n)}
          className="bg-navy/80 backdrop-blur-sm border border-gold/40 text-gold text-[0.625rem] uppercase tracking-[2px] px-4 py-2 hover:bg-gold hover:text-white transition-all duration-300"
        >
          {isNight ? '☀ Day' : '🌙 Night'}
        </button>
        <button
          onClick={() => setAutoRotate(r => !r)}
          className="bg-navy/80 backdrop-blur-sm border border-gold/40 text-gold text-[0.625rem] uppercase tracking-[2px] px-4 py-2 hover:bg-gold hover:text-white transition-all duration-300"
        >
          {autoRotate ? '⏸ Pause' : '▶ Rotate'}
        </button>
      </div>

      <div className="absolute top-3 right-3 text-[0.5625rem] uppercase tracking-[1.5px] text-white/30">
        Drag · Scroll to zoom
      </div>
    </div>
  );
}
