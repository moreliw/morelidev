"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const ACCENT = 0x3d6bf4;
const ACCENT_SOFT = 0x9ab4ff;

type Handles = {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  dispose: () => void;
};

function buildScene(canvas: HTMLCanvasElement, isMobile: boolean): Handles | null {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isMobile,
      powerPreference: "low-power",
    });
  } catch {
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));

  const scene = new THREE.Scene();
  const disposables: { dispose: () => void }[] = [];
  const track = <T extends { dispose: () => void }>(d: T): T => {
    disposables.push(d);
    return d;
  };

  const group = new THREE.Group();
  scene.add(group);

  // ── Plataforma central: camadas empilhadas (arquitetura em camadas) ──
  const layers: { size: number; y: number }[] = [
    { size: 2.6, y: -0.55 },
    { size: 1.9, y: -0.18 },
    { size: 1.25, y: 0.16 },
  ];
  const layerFill = track(
    new THREE.MeshBasicMaterial({
      color: 0x0c1424,
      transparent: true,
      opacity: 0.72,
      side: THREE.DoubleSide,
    })
  );
  const layerLine = track(
    new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.4 })
  );
  for (const { size, y } of layers) {
    const geo = track(new THREE.BoxGeometry(size, 0.1, size));
    const mesh = new THREE.Mesh(geo, layerFill);
    mesh.position.y = y;
    group.add(mesh);
    const edges = track(new THREE.EdgesGeometry(geo));
    const line = new THREE.LineSegments(edges, layerLine);
    line.position.y = y;
    group.add(line);
  }

  // Cubo de destaque no topo
  const topGeo = track(new THREE.BoxGeometry(0.5, 0.5, 0.5));
  const topMat = track(new THREE.MeshBasicMaterial({ color: ACCENT }));
  const topCube = new THREE.Mesh(topGeo, topMat);
  topCube.position.y = 0.66;
  group.add(topCube);
  const topEdges = track(new THREE.EdgesGeometry(topGeo));
  const topLineMat = track(
    new THREE.LineBasicMaterial({ color: ACCENT_SOFT, transparent: true, opacity: 0.9 })
  );
  const topLine = new THREE.LineSegments(topEdges, topLineMat);
  topLine.position.copy(topCube.position);
  group.add(topLine);

  // ── Malha de nós conectados ao redor (sistemas integrados) ──
  const nodeCount = isMobile ? 26 : 48;
  const positions = new Float32Array(nodeCount * 3);
  const rand = (min: number, max: number) => min + Math.random() * (max - min);
  for (let i = 0; i < nodeCount; i++) {
    // anel achatado ao redor da plataforma
    const angle = rand(0, Math.PI * 2);
    const radius = rand(2.1, 4.6);
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = rand(-1.4, 1.6);
    positions[i * 3 + 2] = Math.sin(angle) * radius;
  }
  const pointsGeo = track(new THREE.BufferGeometry());
  pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const pointsMat = track(
    new THREE.PointsMaterial({
      color: ACCENT_SOFT,
      size: 0.045,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
    })
  );
  group.add(new THREE.Points(pointsGeo, pointsMat));

  // conexões entre nós próximos
  const linePositions: number[] = [];
  const maxDist = 1.7;
  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      const dx = positions[i * 3] - positions[j * 3];
      const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
      const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
      if (Math.sqrt(dx * dx + dy * dy + dz * dz) < maxDist) {
        linePositions.push(
          positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
          positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
        );
      }
    }
  }
  const linksGeo = track(new THREE.BufferGeometry());
  linksGeo.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(linePositions), 3)
  );
  const linksMat = track(
    new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.16 })
  );
  group.add(new THREE.LineSegments(linksGeo, linksMat));

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 40);
  camera.position.set(4.4, 2.6, 5.6);
  camera.lookAt(0, 0, 0);

  const dispose = () => {
    disposables.forEach((d) => d.dispose());
    renderer.dispose();
  };

  scene.userData = { group, camera };
  return { renderer, scene, dispose };
}

/**
 * Canvas WebGL decorativo do hero. Um único canvas, aria-hidden,
 * DPR limitado, pausa quando invisível/aba oculta, libera recursos
 * no unmount. Sem sombras, sem pós-processamento, sem texturas.
 */
export function HeroSceneCanvas({ reducedMotion }: { reducedMotion: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const holder = ref.current;
    if (!canvas || !holder) return;

    const isMobile = window.innerWidth < 768;
    const handles = buildScene(canvas, isMobile);
    if (!handles) {
      holder.style.display = "none";
      return;
    }
    const { renderer, scene, dispose } = handles;
    const group = scene.userData.group as THREE.Group;
    const camera = scene.userData.camera as THREE.PerspectiveCamera;

    let raf = 0;
    let running = false;
    let inView = true;
    let targetRX = 0.02;
    let targetRY = 0;

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = holder;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(holder);

    const renderFrame = (time: number) => {
      group.rotation.y += (targetRY + time * 0.00006 - group.rotation.y) * 0.04;
      group.rotation.x += (targetRX - group.rotation.x) * 0.04;
      renderer.render(scene, camera);
    };

    const loop = (time: number) => {
      if (!running) return;
      renderFrame(time);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reducedMotion) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // movimento reduzido: renderiza um único quadro estático
    if (reducedMotion) {
      group.rotation.set(0.02, 0.5, 0);
      renderer.render(scene, camera);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView && document.visibilityState === "visible") start();
        else stop();
      },
      { threshold: 0.05 }
    );
    io.observe(holder);

    const onVisibility = () => {
      if (document.visibilityState === "visible" && inView) start();
      else stop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // paralaxe sutil pelo cursor — ouvida na janela, sem capturar o canvas
    const onPointer = (e: PointerEvent) => {
      if (reducedMotion) return;
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      targetRY = nx * 0.22;
      targetRX = 0.02 + ny * 0.12;
    };
    if (!isMobile) window.addEventListener("pointermove", onPointer, { passive: true });

    // fade-in do canvas quando pronto
    canvas.style.opacity = "1";

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (!isMobile) window.removeEventListener("pointermove", onPointer);
      dispose();
    };
  }, [reducedMotion]);

  return (
    <div ref={ref} aria-hidden className="absolute inset-0 pointer-events-none">
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-0 transition-opacity duration-700"
      />
    </div>
  );
}

export default HeroSceneCanvas;
