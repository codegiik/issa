import * as THREE from 'three'
import { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import { useCursor, MeshReflectorMaterial, Text, Environment, Image as DreiImage } from '@react-three/drei'
import { Suspense } from 'react'
import { Canvas, useFrame, useLoader, useThree} from '@react-three/fiber'
import randomColor from 'randomcolor'
import CameraControls from 'camera-controls'
import {useRouter} from 'next/router'
import {lorempics} from 'lib/utils'
import {fromString} from 'uuidv4'

const WORKS = Array(10).fill({
  id: 1,
  preview: 'https://picsum.photos/300/500'
})
const DEFAULT_CAMERA_POSITION = [0, 5, 5]
const GOLDENRATIO = 1.61803398875

function useRefCallback() {
  const [ready, setReady] = useState(false);
  const setRef = useCallback(node => setReady(!!node), []);

  return [setRef, ready];
}

CameraControls.install({ THREE })
const randomPos = (min = 5, max = -5) => Math.random() * (max - min) + min

function Controls({ zoom, focus, pos = new THREE.Vector3(), look = new THREE.Vector3() }) {
  const camera = useThree((state) => state.camera)
  const gl = useThree((state) => state.gl)
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), [])
  return useFrame((state, delta) => {
    zoom ? pos.set(focus.x, focus.y, focus.z + 0.2) : pos.set(0, 0, 5)
    zoom ? look.set(focus.x, focus.y, focus.z - 0.2) : look.set(0, 0, 4)

    state.camera.position.lerp(pos, 0.5)
    state.camera.updateProjectionMatrix()

    controls.setLookAt(state.camera.position.x, state.camera.position.y, state.camera.position.z, look.x, look.y, look.z, true)
    return controls.update(delta)
  })
}

export function Box(props) {
  const [hovered, setHover] = useState(false)

  return (
    <mesh
      {...props}
      ref={props.meshRef}
      scale={1}
      onClick={(event) => props.zoomTo(event.object.position)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]}
      />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export function MainCanvas() {
  const [zoom, setZoom] = useState(false)
  const [focus, setFocus] = useState({})
  const [selectedFrame, setSelectedFrame] = useState()
  const [groupFrames, framesRefReady] = useRefCallback()
  const router = useRouter()

  const images = useMemo(() => Array.from({ length: 10 }, (v, k) => ({ id: fromString(lorempics(k, 500, 500)), name: 'Lorem Ipsu', preview: lorempics(k, 500, 500) })))

  const panToPoint = (pos = new THREE.Vector3(...DEFAULT_CAMERA_POSITION)) => {
    const focusPos = new THREE.Vector3(pos.x, 1, pos.z + 2)
    setZoom(!zoom)
    setFocus(focusPos)
  }

  useEffect(() => {
    console.log(selectedFrame)
    if (selectedFrame)
      panToPoint(selectedFrame.parent.position)
  }, [selectedFrame])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Canvas linear camera={{ position: DEFAULT_CAMERA_POSITION }} style={{ flex: '1' }}>
        <ambientLight />
        <directionalLight position={[150, 150, 150]} intensity={0.55} />
        <Controls zoom={zoom} focus={focus} />
        <group 
          ref={groupFrames}
          onClick={e => (e.stopPropagation(), setSelectedFrame(e.object))}
        >
          {images.map((v,i) => {
            const x = -1 * images.length + 2 * (i + 1)
            return (
              <Suspense fallback={null} key={i}>
                <Frame position={[x, 0, 0]} url={v.preview} frameId={v.id} />
              </Suspense>
            )
          })}
        </group>
      </Canvas>
      <button onClick={panToPoint}>Pan to Point</button>
    </div>
  )
}

function Frame({ url, frameId, c = new THREE.Color(), ...props }) {
  const [hovered, hover] = useState(false)
  const [rnd] = useState(() => Math.random())
  const image = useRef()
  const frame = useRef()

  // useCursor(hovered)
  useFrame((state) => {
    // image.current.material.zoom = 2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2
    // image.current.scale.x = THREE.MathUtils.lerp(image.current.scale.x, 0.85 * (hovered ? 0.85 : 1), 0.1)
    // image.current.scale.y = THREE.MathUtils.lerp(image.current.scale.y, 0.9 * (hovered ? 0.905 : 1), 0.1)
    frame.current.material.color.lerp(c.set(hovered ? 'orange' : 'white').convertSRGBToLinear(), 0.1)
  })

  return (
    <group {...props}>
      <mesh
        name={name}
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        scale={[1, GOLDENRATIO, 0.05]}
        position={[0, GOLDENRATIO / 2, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2} />
        <mesh ref={frame} raycast={() => null} scale={[0.9, 0.93, 0.9]} position={[0, 0, 0.2]}>
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
        <DreiImage raycast={() => null} ref={image} position={[0, 0, 0.7]} url={url} />
      </mesh>
    </group>
  )
}
