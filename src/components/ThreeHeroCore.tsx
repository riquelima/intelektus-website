import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeHeroCoreProps {
  className?: string;
}

const ThreeHeroCore: React.FC<ThreeHeroCoreProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    let isVisible = true;

    // ── Setup Scene, Camera, Renderer ──
    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6.4;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // ── Iluminação Volumétrica ──
    const ambientLight = new THREE.AmbientLight(0x0f0e26, 2.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x6C63FF, 6, 20);
    pointLight1.position.set(4, 4, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00F5D4, 5, 18);
    pointLight2.position.set(-4, -3, 3);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xFF3CAC, 4, 15);
    pointLight3.position.set(0, 4, -3);
    scene.add(pointLight3);

    // ── Grupo Principal do Holograma 3D ──
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // ══════════════════════════════════════════════════
    // 1. CÉREBRO 3D PROCEDURAL NEURAL COM DOIS HEMISFÉRIOS
    // ══════════════════════════════════════════════════
    const brainGroup = new THREE.Group();
    coreGroup.add(brainGroup);

    // Função para gerar geometria anatômica de hemisfério com sulcos/convoluções corticais
    const createHemisphereGeo = (isLeft: boolean) => {
      const geo = new THREE.SphereGeometry(0.75, 42, 32);
      const pos = geo.attributes.position;
      const v = new THREE.Vector3();
      const sign = isLeft ? -1 : 1;

      for (let i = 0; i < pos.count; i++) {
        v.fromBufferAttribute(pos, i);

        // Proporções anatômicas do cérebro (mais longo no eixo Z frontal/occipital, achatado embaixo)
        v.z *= 1.35;
        v.y *= 1.05;
        v.x *= 0.82;

        // Deslocamento lateral para separar os dois hemisférios (fissura longitudinal)
        v.x += sign * 0.26;

        // Curvatura e ondulações dos giros corticais (sulci e gyri)
        const theta = Math.atan2(v.z, v.x);
        const phi = Math.acos(Math.max(-1, Math.min(1, v.y / 1.15)));

        const fold1 = Math.sin(theta * 6.5 + (isLeft ? 0 : Math.PI)) * Math.cos(phi * 7.5) * 0.085;
        const fold2 = Math.sin(phi * 12.0) * 0.045;
        const fold3 = Math.cos(theta * 10.0) * 0.035;
        const wrinkle = fold1 + fold2 + fold3;

        // Parede medial interna (fissura central mais plana)
        if ((isLeft && v.x > -0.04) || (!isLeft && v.x < 0.04)) {
          v.x = sign * 0.03;
        } else {
          v.x += wrinkle * (isLeft ? -1 : 1) * 0.5;
          v.y += wrinkle * 0.55;
          v.z += wrinkle * 0.55;
        }

        // Lóbulo temporal inferior
        if (v.y < -0.1 && Math.abs(v.x) > 0.3) {
          v.y -= 0.08;
          v.x += sign * 0.07;
        }

        // Cerebelo / curvatura occipital traseira
        if (v.z < -0.3 && v.y < 0) {
          v.y -= 0.06;
        }

        pos.setXYZ(i, v.x, v.y, v.z);
      }

      geo.computeVertexNormals();
      return geo;
    };

    // Material do Cérebro Cyber-Neural
    const brainMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1A1438,
      emissive: 0x6C63FF,
      emissiveIntensity: 0.65,
      metalness: 0.85,
      roughness: 0.25,
      clearcoat: 1.0,
      clearcoatRoughness: 0.15,
      transparent: true,
      opacity: 0.88,
    });

    const leftGeo = createHemisphereGeo(true);
    const rightGeo = createHemisphereGeo(false);

    const leftLobe = new THREE.Mesh(leftGeo, brainMaterial);
    const rightLobe = new THREE.Mesh(rightGeo, brainMaterial);
    brainGroup.add(leftLobe);
    brainGroup.add(rightLobe);

    // Sinapses e Vértices Corticais Brilhantes sobre o Cérebro
    const synapsesMaterial = new THREE.PointsMaterial({
      color: 0x00F5D4,
      size: 0.045,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const leftSynapses = new THREE.Points(leftGeo, synapsesMaterial);
    const rightSynapses = new THREE.Points(rightGeo, synapsesMaterial);
    brainGroup.add(leftSynapses);
    brainGroup.add(rightSynapses);

    // Cerebelo Inferior Traseiro
    const cerebellumGeo = new THREE.SphereGeometry(0.32, 24, 20);
    const cerebellumMat = new THREE.MeshStandardMaterial({
      color: 0x120E2C,
      emissive: 0x8B5CF6,
      emissiveIntensity: 0.4,
      metalness: 0.8,
      roughness: 0.3,
      transparent: true,
      opacity: 0.85,
    });
    const leftCerebellum = new THREE.Mesh(cerebellumGeo, cerebellumMat);
    leftCerebellum.position.set(-0.22, -0.42, -0.45);
    leftCerebellum.scale.set(0.9, 0.65, 0.9);
    brainGroup.add(leftCerebellum);

    const rightCerebellum = new THREE.Mesh(cerebellumGeo, cerebellumMat);
    rightCerebellum.position.set(0.22, -0.42, -0.45);
    rightCerebellum.scale.set(0.9, 0.65, 0.9);
    brainGroup.add(rightCerebellum);

    // ══════════════════════════════════════════════════
    // 2. EMBLEMA HOLOGRÁFICO "IA" NO CENTRO DO CÉREBRO
    // ══════════════════════════════════════════════════
    const createIATexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      ctx.clearRect(0, 0, 512, 512);

      // Glow radial de fundo cibernético
      const radialGrad = ctx.createRadialGradient(256, 256, 20, 256, 256, 230);
      radialGrad.addColorStop(0, 'rgba(0, 245, 212, 0.45)');
      radialGrad.addColorStop(0.35, 'rgba(108, 99, 255, 0.35)');
      radialGrad.addColorStop(0.7, 'rgba(255, 60, 172, 0.15)');
      radialGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radialGrad;
      ctx.beginPath();
      ctx.arc(256, 256, 230, 0, Math.PI * 2);
      ctx.fill();

      // Escudo Hexagonal Tecnológico
      ctx.strokeStyle = '#00F5D4';
      ctx.lineWidth = 10;
      ctx.shadowColor = '#00F5D4';
      ctx.shadowBlur = 24;

      const hexRadius = 185;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const x = 256 + hexRadius * Math.cos(angle);
        const y = 256 + hexRadius * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      // Nós nos vértices do hexágono
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const x = 256 + hexRadius * Math.cos(angle);
        const y = 256 + hexRadius * Math.sin(angle);
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.fill();
      }

      // Tipografia "IA" Ultranítida e Imponente
      ctx.font = '900 190px "Sora", -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Sombra laser cyan
      ctx.shadowColor = '#00F5D4';
      ctx.shadowBlur = 35;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText('IA', 256, 256);

      // Preenchimento com ciano elétrico
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#00F5D4';
      ctx.fillText('IA', 256, 256);

      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.needsUpdate = true;
      return texture;
    };

    const iaTexture = createIATexture();
    const iaMaterial = new THREE.MeshBasicMaterial({
      map: iaTexture,
      transparent: true,
      opacity: 0.96,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    // Placa Holográfica 1 (Plano Frontal)
    const iaPlaneGeo = new THREE.PlaneGeometry(1.4, 1.4);
    const iaMeshFront = new THREE.Mesh(iaPlaneGeo, iaMaterial);
    iaMeshFront.position.set(0, 0, 0.05);
    brainGroup.add(iaMeshFront);

    // Placa Holográfica 2 (Plano Cruzado a 90° para visibilidade tridimensional perfeita)
    const iaMeshCross = new THREE.Mesh(iaPlaneGeo, iaMaterial);
    iaMeshCross.rotation.y = Math.PI / 2;
    brainGroup.add(iaMeshCross);

    // Núcleo central de luz
    const centralOrbGeo = new THREE.SphereGeometry(0.35, 20, 20);
    const centralOrbMat = new THREE.MeshBasicMaterial({
      color: 0x00F5D4,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const centralOrb = new THREE.Mesh(centralOrbGeo, centralOrbMat);
    brainGroup.add(centralOrb);

    // ══════════════════════════════════════════════════
    // 3. ESFERA GEODÉSICA EXTERNA DE DADOS (WIREFRAME)
    // ══════════════════════════════════════════════════
    const wireGeometry = new THREE.IcosahedronGeometry(1.68, 1);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x8B5CF6,
      wireframe: true,
      transparent: true,
      opacity: 0.38,
    });
    const wireMesh = new THREE.Mesh(wireGeometry, wireMaterial);
    coreGroup.add(wireMesh);

    // Vértices brilhantes da malha externa
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0x00F5D4,
      size: 0.07,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const verticesMesh = new THREE.Points(wireGeometry, pointsMaterial);
    coreGroup.add(verticesMesh);

    // ══════════════════════════════════════════════════
    // 4. ANÉIS GIROSCÓPICOS ORBITAIS (ARQUITETURA & DADOS)
    // ══════════════════════════════════════════════════
    const ring1Geometry = new THREE.TorusGeometry(1.95, 0.018, 16, 100);
    const ring1Material = new THREE.MeshStandardMaterial({
      color: 0x00F5D4,
      emissive: 0x00F5D4,
      emissiveIntensity: 0.7,
      metalness: 0.9,
      roughness: 0.3,
    });
    const ring1 = new THREE.Mesh(ring1Geometry, ring1Material);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ring2Geometry = new THREE.TorusGeometry(2.18, 0.014, 16, 100);
    const ring2Material = new THREE.MeshStandardMaterial({
      color: 0xFF3CAC,
      emissive: 0xFF3CAC,
      emissiveIntensity: 0.55,
      metalness: 0.9,
      roughness: 0.3,
    });
    const ring2 = new THREE.Mesh(ring2Geometry, ring2Material);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.z = Math.PI / 6;
    coreGroup.add(ring2);

    // ══════════════════════════════════════════════════
    // 5. NUVEM ESFÉRICA DE MICRO-PARTÍCULAS ORBITAIS
    // ══════════════════════════════════════════════════
    const particleCount = 260;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorA = new THREE.Color(0x6C63FF);
    const colorB = new THREE.Color(0x00F5D4);

    for (let i = 0; i < particleCount; i++) {
      const r = 2.3 + Math.random() * 1.3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);

      const mixedColor = colorA.clone().lerp(colorB, Math.random());
      particleColors[i * 3] = mixedColor.r;
      particleColors[i * 3 + 1] = mixedColor.g;
      particleColors[i * 3 + 2] = mixedColor.b;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    coreGroup.add(particles);

    setIsReady(true);

    // ── Físicas de Toque e Gestos Mobile com Inércia ──
    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;
    let rotationVelocityX = 0;
    let rotationVelocityY = 0;

    const onPointerDown = (clientX: number, clientY: number) => {
      isDragging = true;
      previousPointerX = clientX;
      previousPointerY = clientY;
      setHasInteracted(true);
    };

    const onPointerMove = (clientX: number, clientY: number) => {
      if (!isDragging) return;
      const deltaX = clientX - previousPointerX;
      const deltaY = clientY - previousPointerY;

      rotationVelocityY = deltaX * 0.005;
      rotationVelocityX = deltaY * 0.005;

      coreGroup.rotation.y += rotationVelocityY;
      coreGroup.rotation.x += rotationVelocityX;

      previousPointerX = clientX;
      previousPointerY = clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    // Listeners Touch (Mobile)
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && isDragging) {
        onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const handleTouchEnd = () => onPointerUp();

    // Listeners Mouse (Desktop)
    const handleMouseDown = (e: MouseEvent) => onPointerDown(e.clientX, e.clientY);
    const handleMouseMove = (e: MouseEvent) => onPointerMove(e.clientX, e.clientY);
    const handleMouseUp = () => onPointerUp();

    const domElement = renderer.domElement;
    domElement.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // ── Scroll Driven Reactivity ──
    let scrollY = window.scrollY;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ── Intersection Observer (Economia de Bateria Mobile) ──
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // ── Resize Listener ──
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // ── Loop de Animação 60fps com Respiração Sináptica ──
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Rotação suave contínua quando o usuário não estiver arrastando
      if (!isDragging) {
        rotationVelocityX *= 0.94;
        rotationVelocityY *= 0.94;

        coreGroup.rotation.x += rotationVelocityX + 0.0025;
        coreGroup.rotation.y += rotationVelocityY + 0.0055;
      }

      // Respiração Neural / Pulsação de IA (Heartbeat do cérebro)
      const brainPulse = 1 + Math.sin(elapsedTime * 2.8) * 0.04;
      brainGroup.scale.set(brainPulse, brainPulse, brainPulse);

      // Leve pulso de iluminação emissiva nas sinapses
      const synPulse = 0.65 + Math.sin(elapsedTime * 4.0) * 0.25;
      brainMaterial.emissiveIntensity = synPulse;

      // Anéis orbitais girando em eixos opostos
      ring1.rotation.z += 0.012;
      ring2.rotation.x -= 0.014;
      wireMesh.rotation.z += 0.002;
      particles.rotation.y += 0.0015;

      // Efeito de rolagem: inclinação conforme scroll
      const scrollProgress = Math.min(scrollY / 700, 1.5);
      coreGroup.position.y = -scrollProgress * 0.4;
      coreGroup.rotation.z = scrollProgress * 0.25;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);

      domElement.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);

      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);

      renderer.dispose();
      leftGeo.dispose();
      rightGeo.dispose();
      cerebellumGeo.dispose();
      brainMaterial.dispose();
      synapsesMaterial.dispose();
      cerebellumMat.dispose();
      iaPlaneGeo.dispose();
      iaMaterial.dispose();
      if (iaTexture) iaTexture.dispose();
      centralOrbGeo.dispose();
      centralOrbMat.dispose();
      wireGeometry.dispose();
      wireMaterial.dispose();
      ring1Geometry.dispose();
      ring1Material.dispose();
      ring2Geometry.dispose();
      ring2Material.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();

      if (container && domElement.parentNode === container) {
        container.removeChild(domElement);
      }
    };
  }, []);

  return (
    <div className={`relative w-full aspect-square max-w-[340px] sm:max-w-[420px] mx-auto select-none touch-none ${className}`}>
      {/* Container de montagem do WebGL Canvas */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing relative z-10"
        title="Arraste para rotacionar o Cérebro de IA em 3D"
      />

      {/* Brilho e Aura 3D Holográfica de Fundo */}
      <div
        className="absolute inset-0 pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(108, 99, 255, 0.3) 0%, rgba(0, 245, 212, 0.16) 45%, transparent 70%)',
          filter: 'blur(35px)',
          zIndex: 1,
        }}
      />

      {/* Dica tátil para Mobile (some após primeira interação) */}
      {isReady && !hasInteracted && (
        <div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-opacity duration-500 animate-pulse"
        >
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold text-[#00F5D4] bg-[#04040D]/90 border border-[#00F5D4]/40 backdrop-blur-md shadow-[0_0_15px_rgba(0,245,212,0.25)] whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F5D4] animate-ping" />
            Toque e arraste o Cérebro IA em 3D
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreeHeroCore;
