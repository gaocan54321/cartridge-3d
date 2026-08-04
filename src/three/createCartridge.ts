import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { createLabelTexture, type LabelKind } from './labels'

export interface CartridgeConfig {
  label: LabelKind
  shellColor: string
  accentColor?: string
}

export interface Cartridge {
  group: THREE.Group
  phase: number
  hovered: boolean
  baseY: number
}

const BODY_W = 3.1
const BODY_H = 2.05
const BODY_D = 0.42

export function createCartridge(config: CartridgeConfig): Cartridge {
  const group = new THREE.Group()

  const shellMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(config.shellColor),
    roughness: 0.42,
    metalness: 0.08,
  })

  // main shell
  const body = new THREE.Mesh(
    new RoundedBoxGeometry(BODY_W, BODY_H, BODY_D, 4, 0.07),
    shellMat,
  )
  body.castShadow = true
  body.receiveShadow = true
  group.add(body)

  // top ridge (famicom-style header grip)
  const ridge = new THREE.Mesh(
    new RoundedBoxGeometry(BODY_W * 0.62, 0.16, BODY_D + 0.06, 3, 0.05),
    shellMat,
  )
  ridge.position.set(0, BODY_H / 2 - 0.02, 0)
  ridge.castShadow = true
  group.add(ridge)

  // bottom lip protruding forward (the classic cartridge foot)
  const lipMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(config.accentColor ?? config.shellColor).multiplyScalar(0.82),
    roughness: 0.5,
    metalness: 0.05,
  })
  const lip = new THREE.Mesh(
    new RoundedBoxGeometry(BODY_W * 0.82, 0.5, BODY_D + 0.22, 3, 0.06),
    lipMat,
  )
  lip.position.set(0, -BODY_H / 2 + 0.12, 0.09)
  lip.castShadow = true
  lip.receiveShadow = true
  group.add(lip)

  // recessed label plate
  const labelW = BODY_W * 0.84
  const labelH = BODY_H * 0.62
  const plate = new THREE.Mesh(
    new RoundedBoxGeometry(labelW + 0.1, labelH + 0.1, 0.06, 3, 0.03),
    new THREE.MeshStandardMaterial({
      color: new THREE.Color(config.shellColor).multiplyScalar(0.9),
      roughness: 0.55,
      metalness: 0.05,
    }),
  )
  plate.position.set(0, 0.16, BODY_D / 2 - 0.01)
  group.add(plate)

  // printed label face
  const tex = createLabelTexture(config.label)
  const face = new THREE.Mesh(
    new THREE.PlaneGeometry(labelW, labelH),
    new THREE.MeshStandardMaterial({
      map: tex,
      roughness: 0.62,
      metalness: 0.0,
    }),
  )
  face.position.set(0, 0.16, BODY_D / 2 + 0.032)
  group.add(face)

  // screw detail on the back
  const screw = new THREE.Mesh(
    new THREE.CylinderGeometry(0.07, 0.07, 0.03, 24),
    new THREE.MeshStandardMaterial({ color: '#8a8f99', roughness: 0.35, metalness: 0.8 }),
  )
  screw.rotation.x = Math.PI / 2
  screw.position.set(0, 0, -BODY_D / 2 - 0.005)
  group.add(screw)

  group.traverse((obj) => {
    obj.userData.cartridgeRoot = group
  })

  return {
    group,
    phase: Math.random() * Math.PI * 2,
    hovered: false,
    baseY: 0,
  }
}
