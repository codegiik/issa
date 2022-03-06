import * as THREE from 'three'
import { useEffect, useRef, useState, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useCursor, Image, MeshReflectorMaterial, Environment } from '@react-three/drei'
import { fromString } from 'uuidv4'
import { lorempics } from 'lib/utils'
import { useRouter } from 'next/router'

const GOLDENRATIO = 1.61803398875

export function MainCanvas() {
  const router = useRouter()

  const images = useMemo(() =>
    Array.from({ length: 10 },
      (v, k) => ({ 
        url: lorempics(k, 500, 500),
        position: [(-10 + k * 2), 0, -2],
        rotation: [0, 0, 0]
      })
    ))

  return (
    <Canvas gl={{ alpha: false }} dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 15] }}>
      <color attach="background" args={['#191920']} />
      <fog attach="fog" args={['#191920', 0, 15]} />
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>
      <group position={[0, -0.5, 0]}>
          <Frames images={images} router={router}/>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[50, 50]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={2048}
              mixBlur={1}
              mixStrength={40}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#101010"
              metalness={0.5}
            />
          </mesh>
      </group>
    </Canvas>
  )
}

function Frames({ images, q = new THREE.Quaternion(), p = new THREE.Vector3(), router }) {
  const ref = useRef()
  const clicked = useRef()

  useEffect(() => {
    if (router.query.id) {
      clicked.current = ref.current.getObjectByName(router.query.id)

      clicked.current.parent.updateWorldMatrix(true, true)
      clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25))
      clicked.current.parent.getWorldQuaternion(q)
    } else {
      clicked.current = null
      p.set(0, 0, 5.5)
      q.identity()
    }
  })

  useFrame((state, dt) => {
    state.camera.position.lerp(p, 0.025)
    state.camera.quaternion.slerp(q, 0.025)
  })

  const setLocation = (id) => {
    router.push(id ? {
      pathname: '/gallery',
      query: {
        id
      }
    } : '/gallery', undefined, { shallow: true })
  }

  return router ? (
    <group
      ref={ref}
      onClick={(e) => (e.stopPropagation(), clicked.current === e.object ? setLocation() : setLocation(e.object.name) )}
      onPointerMissed={() => setLocation()}>
      {images.map((props) => (
            <Frame key={props.url} {...props} /> 
        ))}
    </group>
  ) : null
}

function Frame({ url, c = new THREE.Color(), ...props }) {
  const [hovered, hover] = useState(false)
  const [rnd] = useState(() => Math.random())
  const image = useRef()
  const frame = useRef()
  const name = fromString(url)

  useCursor(hovered)
  useFrame((state) => {
    if(image.current) {
      image.current.material.zoom = 2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2
      image.current.scale.x = THREE.MathUtils.lerp(image.current.scale.x, 0.85 * (hovered ? 0.85 : 1), 0.1)
      image.current.scale.y = THREE.MathUtils.lerp(image.current.scale.y, 0.9 * (hovered ? 0.905 : 1), 0.1)
    }

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
        <Suspense fallback={null}>
          <Image raycast={() => null} ref={image} position={[0, 0, 0.7]} url={url} />
        </Suspense>
      </mesh>
    </group>
  )
}
