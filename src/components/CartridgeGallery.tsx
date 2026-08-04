import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { createCartridge, type Cartridge, type CartridgeConfig } from '../three/createCartridge'
import { ui, type Lang, type SectionId } from '../data/content'

const SECTION_ORDER: SectionId[] = ['about', 'contact', 'social', 'projects', 'campus', 'hobbies']

const CARTRIDGES: CartridgeConfig[] = [
  { label: 'about', shellColor: '#eef0f3' },
  { label: 'contact', shellColor: '#17171b', accentColor: '#0c0c0f' },
  { label: 'social', shellColor: '#a9c3e6', accentColor: '#8fadd6' },
  { label: 'projects', shellColor: '#d9c9a1', accentColor: '#c9b78d' },
  { label: 'campus', shellColor: '#cfc9b8', accentColor: '#bcb5a2' },
  { label: 'hobbies', shellColor: '#31405e', accentColor: '#263350' },
]

interface Props {
  lang: Lang
  /** 插入动画播放完毕后回调，由父组件打开对应内容面板 */
  onInsert: (id: SectionId) => void
}

export default function CartridgeGallery({ lang, onInsert }: Props) {
  const mountRef = useRef<HTMLDivElement>(null)
  const onInsertRef = useRef(onInsert)
  onInsertRef.current = onInsert

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
    let camZoom = 1 // 插入动画时相机推进

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
      cart.group.userData.sectionId = SECTION_ORDER[i]
      scene.add(cart.group)
      carts.push(cart)
    })

    /* ---------- pointer / raycast ---------- */
    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2(-10, -10)
    let hoveredCart: Cartridge | null = null

    const updatePointer = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect()
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    }
    const onPointerMove = (e: PointerEvent) => updatePointer(e)
    const onPointerLeave = () => pointer.set(-10, -10)
    renderer.domElement.addEventListener('pointermove', onPointerMove)
    renderer.domElement.addEventListener('pointerleave', onPointerLeave)

    /* ---------- click → insert ---------- */
    let inserting: { cart: Cartridge; t0: number; fired: boolean } | null = null
    let downX = 0
    let downY = 0

    const pick = (): Cartridge | null => {
      raycaster.setFromCamera(pointer, camera)
      const hits = raycaster.intersectObjects(carts.map((c) => c.group), true)
      if (!hits.length) return null
      const root = hits[0].object.userData.cartridgeRoot as THREE.Group
      return carts.find((c) => c.group === root) ?? null
    }

    const onPointerDown = (e: PointerEvent) => {
      downX = e.clientX
      downY = e.clientY
    }
    const onPointerUp = (e: PointerEvent) => {
      if (inserting) return
      if (Math.hypot(e.clientX - downX, e.clientY - downY) > 8) return
      updatePointer(e)
      const cart = pick()
      if (cart) inserting = { cart, t0: clock.getElapsedTime(), fired: false }
    }
    renderer.domElement.addEventListener('pointerdown', onPointerDown)
    renderer.domElement.addEventListener('pointerup', onPointerUp)

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
    const INSERT_DURATION = 0.62

    const animate = () => {
      raf = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      const dt = Math.min(clock.getDelta() + 0.016, 0.05)

      // hover picking（插入动画期间冻结 hover）
      if (!inserting) {
        const next = pick()
        if (next !== hoveredCart) {
          if (hoveredCart) hoveredCart.hovered = false
          hoveredCart = next
          if (hoveredCart) hoveredCart.hovered = true
          renderer.domElement.style.cursor = hoveredCart ? 'pointer' : 'default'
        }
      } else {
        if (hoveredCart) {
          hoveredCart.hovered = false
          hoveredCart = null
        }
        renderer.domElement.style.cursor = 'default'
      }

      // 插入动画进度
      let insertP = 0
      if (inserting) {
        insertP = Math.min(1, (t - inserting.t0) / INSERT_DURATION)
        if (insertP >= 1 && !inserting.fired) {
          inserting.fired = true
          const id = inserting.cart.group.userData.sectionId as SectionId
          onInsertRef.current(id)
        }
        if (insertP >= 1) {
          // 面板已覆盖屏幕，瞬间复位卡带与相机
          const c = inserting.cart.group
          c.position.z = 0
          c.position.y = inserting.cart.baseY
          c.rotation.x = -0.06
          c.scale.setScalar(1)
          inserting = null
          insertP = 0
        }
      }

      carts.forEach((cart) => {
        const g = cart.group
        const isInsert = inserting?.cart === cart

        if (isInsert) {
          // 卡带被"插入"：下沉 + 推向屏幕深处 + 镜头拉近
          const e = insertP * insertP * (3 - 2 * insertP) // smoothstep
          g.position.z = THREE.MathUtils.lerp(g.position.z, -3.2, e * 0.35)
          g.position.y = THREE.MathUtils.lerp(g.position.y, cart.baseY - 1.1, e * 0.3)
          g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -0.55, 8, dt)
          g.rotation.z = THREE.MathUtils.damp(g.rotation.z, 0, 8, dt)
          const s = THREE.MathUtils.damp(g.scale.x, 1.12, 8, dt)
          g.scale.setScalar(s)
          return
        }

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

      // 插入时镜头推近
      camZoom = THREE.MathUtils.damp(camZoom, inserting ? 0.86 : 1, 5, dt)
      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamX, 3, dt)
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamY, 3, dt)
      camera.lookAt(0, 0.05, 0)
      applyCamZ()

      renderer.render(scene, camera)
    }

    const applyCamZ = () => {
      const fit = Math.max(1, 1.5 / camera.aspect)
      camera.position.z = baseCamZ * fit * camZoom
    }

    animate()

    /* ---------- resize ---------- */
    const onResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      applyCamZ()
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
      renderer.domElement.removeEventListener('pointerdown', onPointerDown)
      renderer.domElement.removeEventListener('pointerup', onPointerUp)
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

      <footer className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center select-none">
        <p className="rounded-full bg-white/60 px-4 py-1.5 text-xs text-slate-500 shadow-sm backdrop-blur">
          {ui.hoverHint[lang]}
        </p>
      </footer>
    </div>
  )
}
