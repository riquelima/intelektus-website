import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import MaterialIcon from '@/components/ui/MaterialIcon';

interface SegmentChip {
  title: string;
  color: string;
  iconName: string;
}

// Selecionados por relevância mobile-first (8 cards — densidade ideal para órbita fechada)
const MOBILE_SEGMENTS: SegmentChip[] = [
  { title: 'Pet Shops',    color: '#6C63FF', iconName: 'pets' },
  { title: 'Pizzarias',   color: '#F59E0B', iconName: 'local_pizza' },
  { title: 'Restaurantes',color: '#F97316', iconName: 'restaurant' },
  { title: 'Clínicas',    color: '#A855F7', iconName: 'medical_services' },
  { title: 'Salões',      color: '#EC4899', iconName: 'content_cut' },
  { title: 'Oficinas',    color: '#8B5CF6', iconName: 'build' },
  { title: 'Academias',   color: '#EF4444', iconName: 'fitness_center' },
  { title: 'E-commerce',  color: '#FF3CAC', iconName: 'shopping_bag' },
];

const TOTAL = MOBILE_SEGMENTS.length;
const RADIUS = 2.45;

const MobileSegmentsOrbit: React.FC<{ className?: string }> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const labelsLayerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    const labelsLayer = labelsLayerRef.current;
    if (!container || !labelsLayer) return;

    let animationFrameId = 0;
    let isVisible = true;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 6.8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'low-power', // economia de bateria em mobile
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    container.appendChild(renderer.domElement);

    // ── Iluminação cinematográfica para realçar cards ──
    scene.add(new THREE.AmbientLight(0x1a1638, 2.2));

    const keyLight = new THREE.PointLight(0x6C63FF, 8, 18);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x00F5D4, 6, 16);
    rimLight.position.set(-3, -2, 4);
    scene.add(rimLight);

    const accentLight = new THREE.PointLight(0xFF3CAC, 5, 14);
    accentLight.position.set(0, 0, 5);
    scene.add(accentLight);

    // ── Anel de partículas de fundo (atmosfera cyber) ──
    const particleCount = 220;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const palette = [new THREE.Color(0x6C63FF), new THREE.Color(0x00F5D4), new THREE.Color(0xFF3CAC)];

    for (let i = 0; i < particleCount; i++) {
      const r = 3.2 + Math.random() * 1.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.5;
      positions[i * 3 + 2] = r * Math.cos(phi);
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    // ── Núcleo central brilhante (foco visual) ──
    const coreGeo = new THREE.SphereGeometry(0.32, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x00F5D4,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    });
    const coreOrb = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreOrb);

    // ── Anel wireframe externo (referência espacial) ──
    const ringGeo = new THREE.TorusGeometry(RADIUS + 0.35, 0.008, 12, 96);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x8B5CF6,
      transparent: true,
      opacity: 0.32,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);

    const ring2Geo = new THREE.TorusGeometry(RADIUS + 0.7, 0.005, 12, 96);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xFF3CAC,
      transparent: true,
      opacity: 0.18,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 2;
    scene.add(ring2);

    // ── Cards 3D orbitando ──
    interface Card3D {
      group: THREE.Group;
      baseColor: THREE.Color;
      idx: number;
    }
    const cards: Card3D[] = [];

    const createCardTexture = (title: string, hexColor: string): THREE.CanvasTexture => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 640;
      const ctx = canvas.getContext('2d')!;

      // Fundo do card com gradient da cor do segmento
      const grad = ctx.createLinearGradient(0, 0, 0, 640);
      grad.addColorStop(0, `${hexColor}EE`);
      grad.addColorStop(0.55, `${hexColor}99`);
      grad.addColorStop(1, `${hexColor}44`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 640);

      // Borda interna luminosa
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 4;
      ctx.shadowColor = hexColor;
      ctx.shadowBlur = 30;
      ctx.strokeRect(8, 8, 496, 624);
      ctx.shadowBlur = 0;

      // Glow superior
      const glow = ctx.createRadialGradient(256, 120, 10, 256, 120, 220);
      glow.addColorStop(0, 'rgba(255,255,255,0.35)');
      glow.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, 512, 640);

      // Texto do título (perspectiva frontal)
      ctx.font = '800 78px "Sora", -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = '#000';
      ctx.shadowBlur = 18;
      ctx.fillStyle = '#ffffff';
      ctx.fillText(title, 256, 460);

      const tex = new THREE.CanvasTexture(canvas);
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.needsUpdate = true;
      return tex;
    };

    MOBILE_SEGMENTS.forEach((seg, idx) => {
      const angle = (idx / TOTAL) * Math.PI * 2;
      const tex = createCardTexture(seg.title, seg.color);

      const cardGeo = new THREE.PlaneGeometry(1.05, 1.32);
      const cardMat = new THREE.MeshStandardMaterial({
        map: tex,
        transparent: true,
        roughness: 0.35,
        metalness: 0.25,
        emissive: new THREE.Color(seg.color),
        emissiveIntensity: 0.18,
        side: THREE.DoubleSide,
      });
      const cardMesh = new THREE.Mesh(cardGeo, cardMat);

      const group = new THREE.Group();
      group.add(cardMesh);

      // Glow halo atrás do card (plano adicional aditivo)
      const haloGeo = new THREE.PlaneGeometry(1.35, 1.62);
      const haloMat = new THREE.MeshBasicMaterial({
        color: seg.color,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.position.z = -0.05;
      group.add(halo);

      group.position.set(
        Math.cos(angle) * RADIUS,
        0,
        Math.sin(angle) * RADIUS
      );
      // Face do card sempre aponta para FORA do anel (textura legível ao girar)
      group.rotation.y = -angle + Math.PI;

      scene.add(group);
      cards.push({ group, baseColor: new THREE.Color(seg.color), idx });
    });

    setReady(true);

    // ── Gestos touch (drag horizontal para girar o anel) ──
    let angularVelocity = 0;
    let currentAngle = 0;
    let isDragging = false;
    let lastX = 0;
    let lastT = 0;

    const onPointerDown = (x: number) => {
      isDragging = true;
      lastX = x;
      lastT = performance.now();
    };
    const onPointerMove = (x: number) => {
      if (!isDragging) return;
      const now = performance.now();
      const dt = Math.max(now - lastT, 1);
      const dx = x - lastX;
      const dAngle = (dx / container.clientWidth) * 1.6;
      currentAngle += dAngle;
      angularVelocity = dAngle / (dt / 1000);
      angularVelocity = Math.max(Math.min(angularVelocity, 4), -4);
      lastX = x;
      lastT = now;
    };
    const onPointerUp = () => {
      isDragging = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) onPointerDown(e.touches[0].clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) onPointerMove(e.touches[0].clientX);
    };
    const handleMouseDown = (e: MouseEvent) => onPointerDown(e.clientX);
    const handleMouseMove = (e: MouseEvent) => onPointerMove(e.clientX);

    const dom = renderer.domElement;
    dom.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);
    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', onPointerUp);

    // ── Projeção 3D → 2D para labels HTML ──
    const tempVec = new THREE.Vector3();

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => (isVisible = e.isIntersecting)),
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      // Inércia + rotação contínua suave
      if (!isDragging) {
        angularVelocity *= 0.94;
        if (Math.abs(angularVelocity) < 0.0005) {
          currentAngle += 0.0018; // autorrotação quando o usuário não toca
        }
      }
      currentAngle += angularVelocity * 0.016;

      // Partículas e anéis giram independentes
      particles.rotation.y += 0.002;
      ring.rotation.z += 0.003;
      ring2.rotation.z -= 0.004;
      coreOrb.rotation.y += 0.01;

      // Orbita e projeção dos cards
      cards.forEach((card) => {
        const angle = (card.idx / TOTAL) * Math.PI * 2 + currentAngle;
        card.group.position.set(
          Math.cos(angle) * RADIUS,
          0,
          Math.sin(angle) * RADIUS
        );
        card.group.rotation.y = -angle + Math.PI;

        // Escala/opacidade baseada na proximidade frontal (perspective illusion)
        const localZ = card.group.position.z;
        const t = THREE.MathUtils.clamp((localZ + RADIUS) / (2 * RADIUS), 0, 1);
        const scale = 0.55 + t * 0.55;
        card.group.scale.setScalar(scale);

        // Brilho emissivo maior no card frontal
        const cardMesh = card.group.children[0];
        const haloMesh = card.group.children[1];
        if (cardMesh instanceof THREE.Mesh) {
          const mat = cardMesh.material as THREE.MeshStandardMaterial;
          mat.emissiveIntensity = 0.12 + t * 0.45;
          mat.opacity = 0.45 + t * 0.55;
        }
        if (haloMesh instanceof THREE.Mesh) {
          const halo = haloMesh.material as THREE.MeshBasicMaterial;
          halo.opacity = 0.12 + t * 0.45;
        }

        // Projeção HTML label
        tempVec.setFromMatrixPosition(card.group.matrixWorld);
        tempVec.project(camera);
        const x = (tempVec.x * 0.5 + 0.5) * container.clientWidth;
        const y = (-tempVec.y * 0.5 + 0.5) * container.clientHeight;
        const labelEl = labelsLayer.querySelector<HTMLDivElement>(`[data-label-idx="${card.idx}"]`);
        if (labelEl) {
          labelEl.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
          labelEl.style.opacity = String(0.25 + t * 0.75);
          labelEl.style.scale = String(0.7 + t * 0.3);
        }
      });

      // Recalcula índice ativo suavemente
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', onPointerUp);
      dom.removeEventListener('touchstart', handleTouchStart);
      dom.removeEventListener('mousedown', handleMouseDown);

      cards.forEach((card) => {
        card.group.children.forEach((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            const m = child.material as THREE.Material | THREE.Material[];
            if (Array.isArray(m)) m.forEach((mm) => mm.dispose());
            else m.dispose();
          }
        });
      });
      particlesGeo.dispose();
      particlesMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      renderer.dispose();
      if (container.contains(dom)) container.removeChild(dom);
    };
  }, []);

  return (
    <div className={`relative w-full select-none touch-none ${className}`}>
      <div className="relative w-full aspect-square max-w-[420px] mx-auto">
        {/* Container WebGL */}
        <div
          ref={mountRef}
          className="absolute inset-0 cursor-grab active:cursor-grabbing z-0"
          title="Arraste para girar e explorar os sistemas"
        />

        {/* Camada de labels HTML sincronizados com os cards 3D */}
        <div
          ref={labelsLayerRef}
          className="absolute inset-0 pointer-events-none z-10"
          aria-hidden
        >
          {MOBILE_SEGMENTS.map((seg, idx) => {
            return (
              <div
                key={idx}
                data-label-idx={idx}
                className="absolute left-0 top-0 flex flex-col items-center gap-1 will-change-transform"
                style={{ opacity: 0 }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-md"
                  style={{
                    background: `${seg.color}28`,
                    border: `1.5px solid ${seg.color}`,
                    boxShadow: `0 0 18px ${seg.color}55`,
                  }}
                >
                  <MaterialIcon name={seg.iconName} size={22} className="text-white" />
                </div>
                <div
                  className="text-[11px] font-bold tracking-wide px-2.5 py-0.5 rounded-full"
                  style={{
                    color: '#fff',
                    background: 'rgba(4,4,13,0.85)',
                    border: `1px solid ${seg.color}80`,
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  {seg.title}
                </div>
              </div>
            );
          })}
        </div>

        {/* Halo centralizado (somente visual, fica atrás) */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(0,245,212,0.18) 0%, rgba(108,99,255,0.10) 40%, transparent 70%)',
            filter: 'blur(28px)',
          }}
        />

        {/* Hint inicial mobile */}
        {ready && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none animate-pulse">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold text-[#00F5D4] bg-[#04040D]/90 border border-[#00F5D4]/40 backdrop-blur-md shadow-[0_0_15px_rgba(0,245,212,0.25)] whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F5D4] animate-ping" />
              Arraste para girar
            </div>
          </div>
        )}
      </div>

      {/* Legenda acessível (não visual, mas para leitores de tela) */}
      <p className="sr-only">
        Orbe 3D interativa com oito segmentos orbitando: {MOBILE_SEGMENTS.map((s) => s.title).join(', ')}.
      </p>
    </div>
  );
};

export default MobileSegmentsOrbit;
