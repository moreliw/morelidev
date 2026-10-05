import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * Cena do hero: o símbolo da MoreliDev (as três lâminas do logo) extrudado
 * em 3D — vidro/metal polido, iluminado pelo mesmo degradê azul da marca.
 *
 * Módulo carregado sob demanda (import dinâmico) depois da primeira pintura:
 * nada daqui entra no caminho crítico do LCP. O loop só roda enquanto o
 * canvas está visível e a aba ativa; quem pede movimento reduzido recebe
 * um único quadro estático.
 */

// Caminhos de /public/logo-icon.svg — a fonte da verdade do símbolo.
const PATHS = [
  "M70 600 L280 170 Q295 140 332 140 H430 L220 620 Q205 655 168 655 H70 Q45 655 60 625 Z",
  "M260 600 L500 100 Q515 70 552 70 H655 L410 620 Q395 655 360 655 H255 Q232 655 245 625 Z",
  "M445 360 L555 190 L760 620 Q775 655 738 655 H650 Q620 655 605 626 Z",
];
const CENTER = { x: 410, y: 362 };
const UNIT = 3.4 / 730;

/** Parser mínimo para os comandos usados no logo (M, L, H, Q, Z). */
function shapeFromPath(d: string) {
  const shape = new THREE.Shape();
  const tokens = d.match(/[MLHQZ]|-?\d+(?:\.\d+)?/g) ?? [];
  const px = (x: number) => (x - CENTER.x) * UNIT;
  const py = (y: number) => -(y - CENTER.y) * UNIT;
  let i = 0;
  let cx = 0;
  let cy = 0;
  const num = () => Number(tokens[i++]);
  while (i < tokens.length) {
    const cmd = tokens[i++];
    if (cmd === "M") {
      cx = num();
      cy = num();
      shape.moveTo(px(cx), py(cy));
    } else if (cmd === "L") {
      cx = num();
      cy = num();
      shape.lineTo(px(cx), py(cy));
    } else if (cmd === "H") {
      cx = num();
      shape.lineTo(px(cx), py(cy));
    } else if (cmd === "Q") {
      const qx = num();
      const qy = num();
      cx = num();
      cy = num();
      shape.quadraticCurveTo(px(qx), py(qy), px(cx), py(cy));
    } else if (cmd === "Z") {
      shape.closePath();
    }
  }
  return shape;
}

function dotTexture() {
  const size = 64;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.35, "rgba(255,255,255,0.75)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

const damp = (a: number, b: number, k: number, dt: number) =>
  THREE.MathUtils.lerp(a, b, 1 - Math.exp(-k * dt));
const easeOut = (t: number) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 4);

export type HeroSceneController = {
  setPointer: (x: number, y: number) => void;
  setScroll: (p: number) => void;
  setActive: (on: boolean) => void;
  dispose: () => void;
};

export function createHeroScene(
  canvas: HTMLCanvasElement,
  opts: { reduced: boolean },
): HeroSceneController {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  const mobile = window.matchMedia("(max-width: 767px)").matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 1.75));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
  scene.environment = envRT.texture;
  scene.environmentIntensity = 0.85;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0, 11);

  // ── Luzes: chave branca + contraluzes no azul da marca ──
  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(-4, 5, 6);
  scene.add(key);
  const rim = new THREE.PointLight(0x3aa0ff, 60, 18);
  rim.position.set(3.5, 1.5, -2.5);
  scene.add(rim);
  const under = new THREE.PointLight(0x5a6cff, 40, 16);
  under.position.set(-3, -3, 1.5);
  scene.add(under);
  scene.add(new THREE.AmbientLight(0x8aa4ff, 0.25));

  // ── Símbolo ──
  const root = new THREE.Group();
  const mark = new THREE.Group();
  root.add(mark);
  scene.add(root);

  const depth = 0.34;
  const materials = [
    new THREE.MeshPhysicalMaterial({
      color: 0xe8edfb,
      metalness: 0.2,
      roughness: 0.2,
      clearcoat: 1,
      clearcoatRoughness: 0.06,
    }),
    new THREE.MeshPhysicalMaterial({
      color: 0x2f6bff,
      metalness: 0.35,
      roughness: 0.14,
      clearcoat: 1,
      clearcoatRoughness: 0.04,
      iridescence: 0.6,
      iridescenceIOR: 1.35,
      emissive: 0x0c2a96,
      emissiveIntensity: 0.45,
    }),
    new THREE.MeshPhysicalMaterial({
      color: 0x2a3242,
      metalness: 0.75,
      roughness: 0.26,
      clearcoat: 0.7,
    }),
  ];
  const geometries: THREE.BufferGeometry[] = [];
  const pieces = PATHS.map((d, i) => {
    const geo = new THREE.ExtrudeGeometry(shapeFromPath(d), {
      depth,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.035,
      bevelSegments: 8,
      curveSegments: 24,
    });
    geo.translate(0, 0, -depth / 2);
    geometries.push(geo);
    const mesh = new THREE.Mesh(geo, materials[i]);
    mark.add(mesh);
    return mesh;
  });
  // Profundidade de repouso de cada lâmina — o azul vem à frente.
  const restZ = [-0.05, 0.2, -0.22];
  // De onde cada lâmina parte na entrada, e para onde se afasta no scroll.
  const introFrom = [
    new THREE.Vector3(-2.6, -1.4, -3),
    new THREE.Vector3(0.4, 2.6, 2.4),
    new THREE.Vector3(2.8, -1.2, -2),
  ];
  const explode = [
    new THREE.Vector3(-1.1, -0.35, 1.2),
    new THREE.Vector3(0.15, 0.55, 2.4),
    new THREE.Vector3(1.25, -0.2, -0.6),
  ];

  // ── Órbitas finas em volta do símbolo ──
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x6d8bff,
    transparent: true,
    opacity: 0.45,
    depthWrite: false,
  });
  const ringGeo = new THREE.TorusGeometry(2.55, 0.0055, 8, 220);
  const rings = [0, 1].map((i) => {
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.set(i ? 1.2 : 1.45, i ? 0.5 : -0.35, i ? 0.4 : 0);
    ring.scale.setScalar(i ? 1.12 : 1);
    root.add(ring);
    return ring;
  });
  // Um "satélite" luminoso percorrendo cada órbita.
  const sprite = dotTexture();
  const satMat = new THREE.SpriteMaterial({
    map: sprite,
    color: 0x9cc6ff,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const sats = rings.map((ring) => {
    const s = new THREE.Sprite(satMat);
    s.scale.setScalar(0.16);
    ring.add(s);
    return s;
  });

  // ── Poeira de partículas ao fundo ──
  const count = mobile ? 420 : 900;
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 5 + Math.random() * 9;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
    pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.7;
    pos[i * 3 + 2] = r * Math.cos(ph) - 4;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const dustMat = new THREE.PointsMaterial({
    size: 0.05,
    map: sprite,
    color: 0x8fb0ff,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const dust = new THREE.Points(dustGeo, dustMat);
  scene.add(dust);

  // ── Layout responsivo: símbolo à direita no desktop, atrás do texto no mobile ──
  let layout = { x: 0, y: 0, s: 1 };
  function resize() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const visH = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    const visW = visH * camera.aspect;
    // Desktop: acima e à direita do título, enquadrando-o sem cobri-lo.
    if (camera.aspect > 1.15) {
      layout = { x: visW * 0.315, y: visH * 0.13, s: visH / 8 };
    } else if (camera.aspect > 0.8) {
      layout = { x: visW * 0.14, y: visH * 0.17, s: visH / 8 };
    } else {
      layout = { x: visW * 0.04, y: visH * 0.27, s: Math.min(0.62, visW / 5.6) };
    }
    if (!running) render(performance.now());
  }

  // ── Estado de interação ──
  const pointer = { x: 0, y: 0 };
  const smooth = { x: 0, y: 0, scroll: 0 };
  let scroll = 0;
  const start = performance.now();
  let last = start;
  let running = false;
  let disposed = false;

  function render(now: number) {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    const t = (now - start) / 1000;
    const intro = opts.reduced ? 1 : easeOut((t - 0.15) / 1.8);

    smooth.x = damp(smooth.x, pointer.x, 3.2, dt);
    smooth.y = damp(smooth.y, pointer.y, 3.2, dt);
    smooth.scroll = opts.reduced ? scroll : damp(smooth.scroll, scroll, 6, dt);
    const sp = smooth.scroll;

    root.position.set(layout.x, layout.y + Math.sin(t * 0.6) * 0.07 + sp * 0.6, 0);
    root.scale.setScalar(layout.s * (1 + sp * 0.18));

    mark.rotation.y = -0.42 + smooth.x * 0.55 + sp * 1.1 + (1 - intro) * -1.2;
    mark.rotation.x = 0.1 + smooth.y * 0.32 + sp * 0.25;
    mark.rotation.z = -0.04 + (1 - intro) * 0.3;

    pieces.forEach((mesh, i) => {
      const from = introFrom[i];
      const ex = explode[i];
      const float = opts.reduced ? 0 : Math.sin(t * 0.8 + i * 1.7) * 0.05;
      mesh.position.set(
        from.x * (1 - intro) + ex.x * sp,
        from.y * (1 - intro) + ex.y * sp + float,
        restZ[i] + from.z * (1 - intro) + ex.z * sp,
      );
      mesh.rotation.z = (1 - intro) * (i - 1) * 0.6 + sp * (i - 1) * 0.35;
    });

    rings[0].rotation.z = t * 0.12;
    rings[1].rotation.z = -t * 0.09;
    sats.forEach((s, i) => {
      const a = t * (i ? 0.55 : 0.4) + i * 2;
      s.position.set(Math.cos(a) * 2.55, Math.sin(a) * 2.55, 0);
    });
    ringMat.opacity = 0.42 * intro * (1 - sp * 0.9);
    satMat.opacity = intro * (1 - sp);

    dust.rotation.y = t * 0.015 + smooth.x * 0.08;
    dust.rotation.x = smooth.y * 0.05;
    dustMat.opacity = 0.55 * Math.min(1, t / 1.2 + 0.2);

    renderer.render(scene, camera);
  }

  const loop = (now: number) => render(now);
  function setActive(on: boolean) {
    if (disposed || opts.reduced) return;
    if (on && !running) {
      running = true;
      last = performance.now();
      renderer.setAnimationLoop(loop);
    } else if (!on && running) {
      running = false;
      renderer.setAnimationLoop(null);
    }
  }

  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();
  if (opts.reduced) render(start + 4000);

  return {
    setPointer(x, y) {
      pointer.x = x;
      pointer.y = y;
    },
    setScroll(p) {
      scroll = p;
      if (opts.reduced) render(performance.now());
    },
    setActive,
    dispose() {
      disposed = true;
      renderer.setAnimationLoop(null);
      ro.disconnect();
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      ringGeo.dispose();
      ringMat.dispose();
      satMat.dispose();
      sprite.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      envRT.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}
