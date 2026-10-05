import * as THREE from "three";
import { landPoints } from "./landDots";

/**
 * Globo pontilhado com rotas animadas saindo de um ponto de origem.
 * Mesmo contrato da cena do hero: carregado sob demanda, loop só enquanto
 * visível, quadro único para movimento reduzido. Arrastável no desktop.
 */

const R = 2;
const ORIGIN: [number, number] = [-20.3, -40.3];
const ROUTES: [number, number][] = [
  [38.7, -9.1],
  [-8.8, 13.2],
  [40.7, -74],
  [51.5, -0.1],
  [25.8, -80.2],
  [-33.4, -70.6],
  [4.7, -74.1],
  [48.1, 11.6],
];

function toVec(lat: number, lng: number, r = R) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lng + 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

function glowTexture() {
  const size = 128;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.18, "rgba(255,255,255,0.85)");
  grad.addColorStop(0.45, "rgba(255,255,255,0.18)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

const damp = (a: number, b: number, k: number, dt: number) =>
  THREE.MathUtils.lerp(a, b, 1 - Math.exp(-k * dt));

export type GlobeController = {
  setActive: (on: boolean) => void;
  setReveal: (p: number) => void;
  dispose: () => void;
};

export function createGlobe(
  canvas: HTMLCanvasElement,
  opts: { reduced: boolean },
): GlobeController {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0, 8.6);

  const tilt = new THREE.Group();
  tilt.rotation.x = 0.32;
  tilt.rotation.z = -0.08;
  scene.add(tilt);
  const globe = new THREE.Group();
  tilt.add(globe);

  // Gira o globo para que a origem fique levemente à esquerda do centro,
  // deixando as rotas para a Europa e a África abertas à direita.
  const o = toVec(...ORIGIN);
  const baseY = -Math.atan2(o.x, o.z) - 0.55;
  globe.rotation.y = baseY;

  // ── Corpo: esfera escura com borda luminosa (fresnel) ──
  const bodyGeo = new THREE.SphereGeometry(R * 0.995, 64, 64);
  const bodyMat = new THREE.ShaderMaterial({
    uniforms: {
      uDeep: { value: new THREE.Color(0x070c1a) },
      uRim: { value: new THREE.Color(0x3a6df0) },
    },
    vertexShader: /* glsl */ `
      varying vec3 vN; varying vec3 vV;
      void main(){
        vec4 mv = modelViewMatrix * vec4(position,1.0);
        vN = normalize(normalMatrix * normal);
        vV = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uDeep; uniform vec3 uRim;
      varying vec3 vN; varying vec3 vV;
      void main(){
        float f = pow(1.0 - max(dot(vN, vV), 0.0), 3.0);
        vec3 c = mix(uDeep, uRim, f * 0.5);
        gl_FragColor = vec4(c, 1.0);
      }`,
  });
  globe.add(new THREE.Mesh(bodyGeo, bodyMat));

  // ── Atmosfera ──
  const atmoGeo = new THREE.SphereGeometry(R * 1.16, 64, 64);
  const atmoMat = new THREE.ShaderMaterial({
    uniforms: { uColor: { value: new THREE.Color(0x3a7bff) }, uAlpha: { value: 1 } },
    vertexShader: /* glsl */ `
      varying vec3 vN; varying vec3 vV;
      void main(){
        vec4 mv = modelViewMatrix * vec4(position,1.0);
        vN = normalize(normalMatrix * normal);
        vV = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor; uniform float uAlpha;
      varying vec3 vN; varying vec3 vV;
      void main(){
        // Face de trás: dot vai de ~-0.5 (borda do globo) a 0 (borda externa).
        float f = pow(clamp(-dot(vN, vV) * 1.9, 0.0, 1.0), 1.6);
        gl_FragColor = vec4(uColor, f * 0.55 * uAlpha);
      }`,
    side: THREE.BackSide,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  tilt.add(new THREE.Mesh(atmoGeo, atmoMat));

  // ── Continentes em pontos ──
  const land = landPoints();
  const lp = new Float32Array(land.length * 3);
  land.forEach(([lat, lng], i) => {
    const v = toVec(lat, lng, R * 1.004);
    lp[i * 3] = v.x;
    lp[i * 3 + 1] = v.y;
    lp[i * 3 + 2] = v.z;
  });
  const dotsGeo = new THREE.BufferGeometry();
  dotsGeo.setAttribute("position", new THREE.BufferAttribute(lp, 3));
  const dotsMat = new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(0x9db7ff) },
      uSize: { value: 2.4 * renderer.getPixelRatio() },
      uAlpha: { value: 1 },
    },
    vertexShader: /* glsl */ `
      uniform float uSize; varying float vFace;
      void main(){
        vec4 mv = modelViewMatrix * vec4(position,1.0);
        vec3 n = normalize(normalMatrix * normalize(position));
        vFace = dot(n, normalize(-mv.xyz));
        gl_PointSize = uSize * (8.6 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor; uniform float uAlpha; varying float vFace;
      void main(){
        vec2 p = gl_PointCoord - 0.5;
        float d = length(p);
        if (d > 0.5) discard;
        float a = smoothstep(0.5, 0.2, d) * smoothstep(-0.05, 0.35, vFace);
        gl_FragColor = vec4(uColor, a * 0.85 * uAlpha);
      }`,
    transparent: true,
    depthWrite: false,
  });
  globe.add(new THREE.Points(dotsGeo, dotsMat));

  // ── Rotas ──
  const glow = glowTexture();
  const arcMats: THREE.ShaderMaterial[] = [];
  const arcGeos: THREE.BufferGeometry[] = [];
  const arcs = ROUTES.map(([lat, lng], i) => {
    const a = toVec(...ORIGIN);
    const b = toVec(lat, lng);
    const dist = a.distanceTo(b);
    const mid = a.clone().add(b).normalize().multiplyScalar(R + dist * 0.42);
    const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
    const pts = curve.getPoints(96);
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const ts = new Float32Array(pts.length).map((_, k) => k / (pts.length - 1));
    geo.setAttribute("aT", new THREE.BufferAttribute(ts, 1));
    arcGeos.push(geo);
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uHead: { value: 0 },
        uDraw: { value: 0 },
        uColor: { value: new THREE.Color(i % 2 ? 0x6d8bff : 0x7cc4ff) },
      },
      vertexShader: /* glsl */ `
        attribute float aT; varying float vT;
        void main(){ vT = aT; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: /* glsl */ `
        uniform float uHead; uniform float uDraw; uniform vec3 uColor; varying float vT;
        void main(){
          if (vT > uDraw) discard;
          float trail = smoothstep(uHead - 0.32, uHead, vT) * step(vT, uHead);
          float a = 0.22 + trail * 0.78;
          gl_FragColor = vec4(uColor, a);
        }`,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    arcMats.push(mat);
    globe.add(new THREE.Line(geo, mat));

    const head = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glow,
        color: 0xbfdcff,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    head.scale.setScalar(0.16);
    globe.add(head);

    const end = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glow,
        color: 0x6d8bff,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    end.position.copy(b);
    end.scale.setScalar(0.12);
    globe.add(end);

    return { curve, mat, head, end, speed: 0.13 + (i % 3) * 0.035, offset: i * 0.37 };
  });

  // ── Origem: ponto brilhante + pulso ──
  const hub = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glow,
      color: 0xffffff,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  hub.position.copy(toVec(...ORIGIN, R * 1.01));
  hub.scale.setScalar(0.42);
  globe.add(hub);
  const pulseGeo = new THREE.RingGeometry(0.06, 0.075, 48);
  const pulseMat = new THREE.MeshBasicMaterial({
    color: 0x8fc2ff,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const pulse = new THREE.Mesh(pulseGeo, pulseMat);
  pulse.position.copy(toVec(...ORIGIN, R * 1.012));
  pulse.lookAt(pulse.position.clone().multiplyScalar(2));
  globe.add(pulse);

  // ── Arrastar (desktop e toque horizontal) ──
  let drag = 0;
  let dragVel = 0;
  let dragging = false;
  let lastX = 0;
  const onDown = (e: PointerEvent) => {
    dragging = true;
    lastX = e.clientX;
    canvas.setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: PointerEvent) => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    lastX = e.clientX;
    dragVel = dx * 0.006;
    drag += dragVel;
  };
  const onUp = () => {
    dragging = false;
  };
  canvas.addEventListener("pointerdown", onDown);
  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("pointerup", onUp);
  window.addEventListener("pointercancel", onUp);

  function resize() {
    const w = canvas.clientWidth || 1;
    const h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    if (!running) render(performance.now());
  }

  let reveal = opts.reduced ? 1 : 0;
  let shown = reveal;
  const start = performance.now();
  let last = start;
  let running = false;
  let disposed = false;

  function render(now: number) {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    const t = (now - start) / 1000;
    shown = opts.reduced ? reveal : damp(shown, reveal, 2.4, dt);

    if (!dragging) {
      dragVel *= Math.exp(-3 * dt);
      drag += dragVel;
    }
    const sway = opts.reduced ? 0 : Math.sin(t * 0.12) * 0.35;
    globe.rotation.y = baseY + sway + drag;
    tilt.scale.setScalar(0.86 + shown * 0.14);
    atmoMat.uniforms.uAlpha.value = shown;
    dotsMat.uniforms.uAlpha.value = Math.min(1, shown * 1.4);

    arcs.forEach((arc, i) => {
      const draw = THREE.MathUtils.clamp(shown * 1.6 - i * 0.07, 0, 1);
      arc.mat.uniforms.uDraw.value = draw;
      const head = opts.reduced ? 0.75 : (t * arc.speed + arc.offset) % 1.25;
      arc.mat.uniforms.uHead.value = head;
      const visible = head <= 1 && draw >= 1;
      arc.head.visible = visible;
      if (visible) arc.head.position.copy(arc.curve.getPoint(head));
      (arc.end.material as THREE.SpriteMaterial).opacity = draw;
    });

    const pt = (t * 0.6) % 1;
    pulse.scale.setScalar(1 + pt * 3.5);
    pulseMat.opacity = (1 - pt) * 0.8 * shown;
    (hub.material as THREE.SpriteMaterial).opacity = shown;

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

  return {
    setActive,
    setReveal(p) {
      reveal = opts.reduced ? 1 : p;
    },
    dispose() {
      disposed = true;
      renderer.setAnimationLoop(null);
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        mesh.geometry?.dispose();
        const mat = mesh.material as THREE.Material | undefined;
        mat?.dispose();
      });
      arcGeos.forEach((g) => g.dispose());
      arcMats.forEach((m) => m.dispose());
      glow.dispose();
      renderer.dispose();
    },
  };
}
