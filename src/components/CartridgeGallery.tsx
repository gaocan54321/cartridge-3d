import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { createCartridge, type Cartridge, type CartridgeConfig } from '../three/createCartridge'

const CARTRIDGES: CartridgeConfig[] = [
  { label: 'blank', shellColor: '#eef0f3' },
  { label: 'vercel', shellColor: '#17171b', accentColor: '#0c0c0f' },
  { label: 'github', shellColor: '#a9c3e6', accentColor: '#8fadd6' },
  { label: 'azure', shellColor: '#d9c9a1', accentColor: '#c9b78d' },
  { label: 'microsoft', shellColor: '#cfc9b8', accentColor: '#bcb5a2' },
  { label: 'tuenti', shellColor: '#31405e', accentColor: '#263350' },
]

export default function CartridgeGallery() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    /* ---------- renderer / scene / camera ---------- */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(
      34,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    )
    const baseCamZ = 12.6
    camera.position.set(0, 2.6, baseCamZ)
    camera.lookAt(0, 0.05, 0)

    /* ---------- lights ---------- */
    scene.add(new THREE.HemisphereLight('#ffffff', '#c9d2de', 1.15))

    const key = new THREE.DirectionalLight('#ffffff', 2.0)
    key.position.set(5, 9, 7)
    key.castShadow = true
    key.shadow.mapSize.set(2048, 2048)
    key.shadow.camera.left = -8
    key.shadow.camera.right = 8
    key.shadow.camera.top = 8
    key.shadow.camera.bottom = -8
    key.shadow.camera.far = 30
    key.shadow.bias = -0.0004
    key.shadow.radius = 6
    scene.add(key)

    const fill = new THREE.DirectionalLight('#dfe9ff', 0.5)
    fill.position.set(-6, 3, 6)
    scene.add(fill)

    /* ---------- ground shadow catcher ---------- */
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(60, 60),
      new THREE.ShadowMaterial({ opacity: 0.14 }),
    )
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -2.6
    ground.receiveShadow = true
    scene.add(ground)

    /* ---------- cartridges ---------- */
    const carts: Cartridge[] = []
    const spacingX = 3.75
    const spacingY = 2.75
    CARTRIDGES.forEach((cfg, i) => {
      const cart = createCartridge(cfg)
      const col = i % 3
      const row = Math.floor(i / 3)
      cart.group.position.x = (col - 1) * spacingX
      cart.baseY = (0.5 - row) * spacingY + 0.15
      cart.group.position.y = cart.baseY
      cart.group.rotation.x = -0.06
      scene.add(cart.group)
      carts.push(cart)
    })

    /* ---------- pointer / raycast ---------- */
    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2(-10, -10)
    let hoveredCart: Cartridge | null = null

    const onPointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect()
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    }
    const onPointerLeave = () => pointer.set(-10, -10)
    renderer.domElement.addEventListener('pointermove', onPointerMove)
    renderer.domElement.addEventListener('pointerleave', onPointerLeave)

    /* ---------- subtle camera parallax ---------- */
    let targetCamX = 0
    let targetCamY = 2.4
    const onParallax = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1
      targetCamX = nx * 0.35
      targetCamY = 2.6 - ny * 0.25
    }
    window.addEventListener('pointermove', onParallax)

    /* ---------- animation loop ---------- */
    const clock = new THREE.Clock()
    let raf = 0

    const animate = () => {
      raf = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      const dt = Math.min(clock.getDelta() + 0.016, 0.05)

      // hover picking
      raycaster.setFromCamera(pointer, camera)
      const roots = carts.map((c) => c.group)
      const hits = raycaster.intersectObjects(roots, true)
      const root = hits.length ? (hits[0].object.userData.cartridgeRoot as THREE.Group) : null
      const next = carts.find((c) => c.group === root) ?? null
      if (next !== hoveredCart) {
        if (hoveredCart) hoveredCart.hovered = false
        hoveredCart = next
        if (hoveredCart) hoveredCart.hovered = true
        renderer.domElement.style.cursor = hoveredCart ? 'pointer' : 'default'
      }

      carts.forEach((cart) => {
        const g = cart.group
        const idleBob = Math.sin(t * 0.9 + cart.phase) * 0.06
        const idleSway = Math.sin(t * 0.55 + cart.phase * 1.7) * 0.025

        const targetY = cart.baseY + idleBob + (cart.hovered ? 0.22 : 0)
        const targetZ = cart.hovered ? 0.85 : 0
        const targetRotX = cart.hovered ? -0.38 : -0.06
        const targetRotZ = cart.hovered ? 0 : idleSway
        const targetScale = cart.hovered ? 1.07 : 1

        g.position.y = THREE.MathUtils.damp(g.position.y, targetY, 6, dt)
        g.position.z = THREE.MathUtils.damp(g.position.z, targetZ, 6, dt)
        g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetRotX, 6, dt)
        g.rotation.z = THREE.MathUtils.damp(g.rotation.z, targetRotZ, 6, dt)
        const s = THREE.MathUtils.damp(g.scale.x, targetScale, 6, dt)
        g.scale.setScalar(s)
      })

      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamX, 3, dt)
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamY, 3, dt)
      camera.lookAt(0, 0.05, 0)

      renderer.render(scene, camera)
    }
    animate()

    /* ---------- resize ---------- */
    const onResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      // pull back on narrow viewports so all six cartridges stay in frame
      camera.position.z = baseCamZ * Math.max(1, 1.5 / camera.aspect)
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    const ro = new ResizeObserver(onResize)
    ro.observe(mount)
    onResize()

    /* ---------- cleanup ---------- */
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('pointermove', onParallax)
      renderer.domElement.removeEventListener('pointermove', onPointerMove)
      renderer.domElement.removeEventListener('pointerleave', onPointerLeave)
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose()
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
          mats.forEach((m) => {
            const mat = m as THREE.MeshStandardMaterial
            mat.map?.dispose()
            mat.dispose()
          })
        }
      })
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div className="relative h-screen w-screen overflow-hidden"
      style={{
        background:
          'radial-gradient(1200px 700px at 50% 30%, #fbfcfe 0%, #eef1f5 55%, #e3e8ee 100%)',
      }}
    >
      <div ref={mountRef} className="absolute inset-0" />

      {/* header overlay */}
      <header className="pointer-events-none absolute inset-x-0 top-0 flex flex-col items-center pt-8 select-none">
        <p className="text-[11px] font-semibold tracking-[0.35em] text-slate-400 uppercase">
          Insert cartridge to continue
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-700">
          Career, in cartridges
        </h1>
      </header>

      <footer className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center select-none">
        <p className="rounded-full bg-white/60 px-4 py-1.5 text-xs text-slate-500 shadow-sm backdrop-blur">
          把鼠标悬停在卡带上 · Hover a cartridge
        </p>
      </footer>
    </div>
  )
}
