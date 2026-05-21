import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// ── Canvas facade texture ─────────────────────────────────────────────────────
// Draws a realistic window-grid facade that matches the building renders.
// cols/rows = windows per floor row / number of floors
function buildFacadeTexture(canvasW, canvasH, cols, rows, night) {
  const canvas = document.createElement('canvas');
  canvas.width  = canvasW;
  canvas.height = canvasH;
  const ctx = canvas.getContext('2d');

  const fH = canvasH / rows;   // floor strip height in pixels
  const cW = canvasW / cols;   // column width in pixels
  const mX = cW  * 0.22;       // horizontal window margin
  const mY = fH  * 0.26;       // vertical window margin

  if (night) {
    // ── Night: dark concrete, warm amber lit windows ──────────────────
    ctx.fillStyle = '#141e2d';
    ctx.fillRect(0, 0, canvasW, canvasH);

    // Floor seam lines
    for (let r = 0; r <= rows; r++) {
      ctx.fillStyle = '#1e2d45';
      ctx.fillRect(0, r * fH - 1.5, canvasW, 3);
    }

    // Lit windows
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const wx = c * cW + mX;
        const wy = r * fH + mY;
        const ww = cW - mX * 2;
        const wh = fH - mY * 2;
        const g = ctx.createLinearGradient(wx, wy, wx, wy + wh);
        g.addColorStop(0,    '#fce080');
        g.addColorStop(0.55, '#f0a838');
        g.addColorStop(1,    '#c47018');
        ctx.fillStyle = g;
        ctx.fillRect(wx, wy, ww, wh);
        // soft glow halo
        ctx.fillStyle = 'rgba(255, 210, 80, 0.07)';
        ctx.fillRect(wx - 4, wy - 4, ww + 8, wh + 8);
      }
    }
  } else {
    // ── Day: warm cream/beige facade, dark teal glass windows ────────
    ctx.fillStyle = '#ddd0b5';
    ctx.fillRect(0, 0, canvasW, canvasH);

    // Faint vertical texture striations (aggregate finish)
    for (let x = 16; x < canvasW; x += 16) {
      ctx.fillStyle = 'rgba(0,0,0,0.01)';
      ctx.fillRect(x, 0, 1, canvasH);
    }

    // Horizontal floor slab bands + underside shadow
    for (let r = 0; r <= rows; r++) {
      ctx.fillStyle = '#f3ece0';
      ctx.fillRect(0, r * fH - 3, canvasW, 6);
      ctx.fillStyle = 'rgba(0,0,0,0.052)';
      ctx.fillRect(0, r * fH + 3, canvasW, 5);
    }

    // Windows
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const wx = c * cW + mX;
        const wy = r * fH + mY;
        const ww = cW - mX * 2;
        const wh = fH - mY * 2;
        // dark teal glass
        ctx.fillStyle = '#2b4560';
        ctx.fillRect(wx, wy, ww, wh);
        // sky reflection top-left corner
        ctx.fillStyle = 'rgba(180, 220, 245, 0.2)';
        ctx.fillRect(wx, wy, ww * 0.44, wh * 0.52);
        // thin aluminium frame
        ctx.strokeStyle = 'rgba(200, 215, 225, 0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(wx, wy, ww, wh);
      }
    }
  }
  return new THREE.CanvasTexture(canvas);
}

// ── Canvas podium front texture ───────────────────────────────────────────────
// Stone-clad podium with ground-floor commercial glazing
function buildPodiumTexture(canvasW, canvasH, night) {
  const canvas = document.createElement('canvas');
  canvas.width  = canvasW;
  canvas.height = canvasH;
  const ctx = canvas.getContext('2d');
  const n  = 5;
  const sw = canvasW / n;
  const sh = canvasH * 0.42;

  if (night) {
    ctx.fillStyle = '#151f2e';
    ctx.fillRect(0, 0, canvasW, canvasH);
    for (let i = 0; i < n; i++) {
      const wx = i * sw + sw * 0.1;
      const wy = canvasH - sh - 4;
      const ww = sw * 0.8;
      const g  = ctx.createLinearGradient(wx, wy, wx, wy + sh);
      g.addColorStop(0, '#fce080');
      g.addColorStop(1, '#e09028');
      ctx.fillStyle = g;
      ctx.fillRect(wx, wy, ww, sh);
    }
  } else {
    // Stone base
    ctx.fillStyle = '#c4b89a';
    ctx.fillRect(0, 0, canvasW, canvasH);
    // Horizontal coursing joints
    for (let y = 0; y < canvasH; y += 18) {
      ctx.fillStyle = 'rgba(255,255,255,0.1)';
      ctx.fillRect(0, y, canvasW, 2);
    }
    // Commercial glazing (ground floor band)
    for (let i = 0; i < n; i++) {
      const wx = i * sw + sw * 0.1;
      const wy = canvasH - sh - 4;
      const ww = sw * 0.8;
      ctx.fillStyle = '#1e3c54';
      ctx.fillRect(wx, wy, ww, sh);
      ctx.fillStyle = 'rgba(180, 220, 245, 0.18)';
      ctx.fillRect(wx, wy, ww * 0.4, sh * 0.5);
    }
    // Cornice band at top
    ctx.fillStyle = '#e8e0cc';
    ctx.fillRect(0, 0, canvasW, 14);
  }
  return new THREE.CanvasTexture(canvas);
}

export default function Christina3DViewer() {
  const mountRef    = useRef(null);
  const sceneRef    = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const frameRef    = useRef(null);
  const [isNight, setIsNight]       = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [loaded, setLoaded]         = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Scene ─────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a1828);
    scene.fog = new THREE.Fog(0x0a1828, 120, 280);
    sceneRef.current = scene;

    // ── Camera ────────────────────────────────────────────────────────
    const W = mount.clientWidth, H = mount.clientHeight;
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 500);
    camera.position.set(38, 28, 52);

    // ── Renderer ──────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // ── Controls ──────────────────────────────────────────────────────
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping    = true;
    controls.dampingFactor    = 0.06;
    controls.autoRotate       = true;
    controls.autoRotateSpeed  = 0.7;
    controls.maxPolarAngle    = Math.PI / 2.05;
    controls.minDistance      = 20;
    controls.maxDistance      = 120;
    controls.target.set(0, 20, 0);
    controls.update();
    controlsRef.current = controls;

    // ── Pre-build day canvas textures ─────────────────────────────────
    // Tower front/back: 20 m wide × 41.6 m tall → aspect ~1:2.08
    const dayFront  = buildFacadeTexture(512, 1064, 4, 13, false);
    // Tower sides:     14 m deep × 41.6 m tall → aspect ~1:2.97
    const daySide   = buildFacadeTexture(256, 762,  2, 13, false);
    // Night canvas versions
    const nightFront = buildFacadeTexture(512, 1064, 4, 13, true);
    const nightSide  = buildFacadeTexture(256, 762,  2, 13, true);
    // Podium front:    26 m wide × 16 m tall → aspect ~1.625:1
    const dayPod    = buildPodiumTexture(512, 315, false);
    const nightPod  = buildPodiumTexture(512, 315, true);

    // Load the actual building render for the front face in night mode
    const loader = new THREE.TextureLoader();
    const nightRenderTex = loader.load(
      '/images/Building/Christina Night View.jpg',
      (tex) => { tex.colorSpace = THREE.SRGBColorSpace; }
    );

    scene.userData.tex = { dayFront, nightFront, daySide, nightSide, dayPod, nightPod, nightRenderTex };

    // ── Material helpers ──────────────────────────────────────────────
    const mkM  = (tex) => new THREE.MeshStandardMaterial({ map: tex, roughness: 0.55, metalness: 0.04 });
    const flatM = (hex, rough = 0.6) => new THREE.MeshStandardMaterial({ color: hex, roughness: rough });

    // ── Tower material array (per face: +x, -x, +y, -y, +z, -z) ──────
    const towerMats = [
      mkM(daySide),                   // right  (+x)
      mkM(daySide),                   // left   (-x)
      flatM(0xede5d2, 0.5),           // top    (+y)
      flatM(0xd8ccb4, 0.65),          // bottom (-y)
      mkM(dayFront),                  // front  (+z)
      mkM(dayFront),                  // back   (-z)
    ];
    scene.userData.towerMats = towerMats;

    const towerY = 16;
    const towerMesh = new THREE.Mesh(new THREE.BoxGeometry(20, 41.6, 14), towerMats);
    towerMesh.position.set(0, towerY + 41.6 / 2, 0);
    towerMesh.castShadow = towerMesh.receiveShadow = true;
    scene.add(towerMesh);

    // ── Podium material array ─────────────────────────────────────────
    const podiumSide  = flatM(0xc4b89a, 0.7);
    const podiumFront = mkM(dayPod);
    scene.userData.podiumFront = podiumFront;

    const podiumMats = [
      podiumSide, podiumSide,
      flatM(0xddd8c4, 0.6),
      podiumSide,
      podiumFront,
      podiumSide,
    ];
    const podiumMesh = new THREE.Mesh(new THREE.BoxGeometry(26, 16, 22), podiumMats);
    podiumMesh.position.set(0, 8, 0);
    podiumMesh.castShadow = podiumMesh.receiveShadow = true;
    scene.add(podiumMesh);

    // ── Box helper ────────────────────────────────────────────────────
    const box = (bw, bh, bd, mat, x = 0, y = 0, z = 0) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, bd), mat);
      m.position.set(x, y + bh / 2, z);
      m.castShadow = m.receiveShadow = true;
      scene.add(m);
      return m;
    };

    // ── Shared accent materials ───────────────────────────────────────
    const fin    = new THREE.MeshStandardMaterial({ color: 0x7a5c3a, roughness: 0.5, metalness: 0.18 });
    const white  = new THREE.MeshStandardMaterial({ color: 0xfaf8f4, roughness: 0.55 });
    const greenM = new THREE.MeshStandardMaterial({ color: 0x4a7c4e, roughness: 0.9 });
    const kidsM  = new THREE.MeshStandardMaterial({ color: 0xe8c84a, roughness: 0.9 });

    // ── Ground + road ─────────────────────────────────────────────────
    const gnd = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200),
      new THREE.MeshStandardMaterial({ color: 0x1a2e1a, roughness: 1 })
    );
    gnd.rotation.x = -Math.PI / 2;
    gnd.receiveShadow = true;
    scene.add(gnd);

    const road = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 20),
      new THREE.MeshStandardMaterial({ color: 0x1c1c1c, roughness: 1 })
    );
    road.rotation.x = -Math.PI / 2;
    road.position.set(0, 0.01, 22);
    scene.add(road);

    // ── Podium rooftop terrace ────────────────────────────────────────
    box(24, 0.4, 20, greenM, 0, 16, 0);
    // Pergola
    box(6, 0.2, 4, fin,  7, 16.6, -3);
    box(6, 0.2, 4, fin,  7, 17.4, -3);
    for (let i = -2.5; i <= 2.5; i += 1.25) box(0.12, 1.5, 4, fin, 7 + i, 16.5, -3);
    // Kids area
    box(7, 0.3, 6, kidsM, -6, 16.2, -2);

    // ── Vertical bronze fins (front + back, protruding from facade) ───
    const finGeo = new THREE.BoxGeometry(0.42, 41.0, 0.65);
    for (const fx of [-8, -4, 0, 4, 8]) {
      const mf = new THREE.Mesh(finGeo, fin);
      mf.position.set(fx, towerY + 41.6 / 2, 7.35);
      mf.castShadow = true;
      scene.add(mf);
      const mb = new THREE.Mesh(finGeo, fin);
      mb.position.set(fx, towerY + 41.6 / 2, -7.35);
      scene.add(mb);
    }

    // ── Balcony slabs + top railings ──────────────────────────────────
    for (let floor = 0; floor < 13; floor++) {
      const slabY = towerY + floor * 3.2;
      const slab  = new THREE.Mesh(new THREE.BoxGeometry(22, 0.22, 1.4), white);
      slab.position.set(0, slabY, 7.7);
      slab.castShadow = true;
      scene.add(slab);
      const rail = new THREE.Mesh(new THREE.BoxGeometry(22, 0.1, 0.06), white);
      rail.position.set(0, slabY + 1.05, 8.3);
      scene.add(rail);
    }

    // ── Parapet / crown ───────────────────────────────────────────────
    box(21.5, 1.2, 15, white, 0, towerY + 41.6, 0);
    box(20, 0.35, 14, white, 0, towerY + 42.8, 0);

    // ── Entrance pillars ──────────────────────────────────────────────
    box(1.2, 6, 1.2, white,  12, 0, 14);
    box(1.2, 6, 1.2, white, -12, 0, 14);
    box(2.5, 0.4, 1.2, white,  12, 6, 14);
    box(2.5, 0.4, 1.2, white, -12, 6, 14);

    // ── Lighting ──────────────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0xfff5e0, 0.9);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xfff8e8, 2.2);
    sun.position.set(30, 60, 40);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.near   = 1;
    sun.shadow.camera.far    = 200;
    sun.shadow.camera.left   = -60;
    sun.shadow.camera.right  = 60;
    sun.shadow.camera.top    = 80;
    sun.shadow.camera.bottom = -20;
    scene.add(sun);

    const fill = new THREE.DirectionalLight(0xb0c8ff, 0.4);
    fill.position.set(-20, 20, -30);
    scene.add(fill);

    scene.userData.lights = { ambient, sun, fill };

    // Window glow point lights (used in night mode)
    const glowLights = [];
    for (let i = 0; i < 6; i++) {
      const g = new THREE.PointLight(0xffd580, 0, 10);
      g.position.set(0, towerY + 5 + i * 6.5, 6);
      scene.add(g);
      glowLights.push(g);
    }
    scene.userData.glowLights = glowLights;

    setLoaded(true);

    // ── Render loop ───────────────────────────────────────────────────
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // ── Resize handler ────────────────────────────────────────────────
    const onResize = () => {
      const nw = mount.clientWidth, nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
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

  // ── Day / Night toggle ────────────────────────────────────────────────────
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const { lights, glowLights, towerMats, podiumFront } = scene.userData;
    const { dayFront, nightFront, daySide, nightSide, dayPod, nightPod, nightRenderTex } = scene.userData.tex;
    const { ambient, sun, fill } = lights;

    if (isNight) {
      scene.background = new THREE.Color(0x060e1c);
      scene.fog = new THREE.Fog(0x060e1c, 80, 240);
      ambient.color.set(0x1a2a4a); ambient.intensity = 0.4;
      sun.intensity  = 0;
      fill.intensity = 0.1;
      glowLights.forEach(l => { l.intensity = 1.8; });
      // Front face: use the actual building render photo
      towerMats[0].map = nightSide;      towerMats[0].needsUpdate = true;
      towerMats[1].map = nightSide;      towerMats[1].needsUpdate = true;
      towerMats[4].map = nightRenderTex; towerMats[4].needsUpdate = true;
      towerMats[5].map = nightFront;     towerMats[5].needsUpdate = true;
      podiumFront.map  = nightPod;       podiumFront.needsUpdate  = true;
    } else {
      scene.background = new THREE.Color(0x0a1828);
      scene.fog = new THREE.Fog(0x0a1828, 120, 280);
      ambient.color.set(0xfff5e0); ambient.intensity = 0.9;
      sun.intensity  = 2.2;
      fill.intensity = 0.4;
      glowLights.forEach(l => { l.intensity = 0; });
      towerMats[0].map = daySide;  towerMats[0].needsUpdate = true;
      towerMats[1].map = daySide;  towerMats[1].needsUpdate = true;
      towerMats[4].map = dayFront; towerMats[4].needsUpdate = true;
      towerMats[5].map = dayFront; towerMats[5].needsUpdate = true;
      podiumFront.map  = dayPod;   podiumFront.needsUpdate  = true;
    }
  }, [isNight]);

  // ── Auto-rotate toggle ────────────────────────────────────────────────────
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
