import * as THREE from 'three'
import { useEffect, useRef, useState, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useCursor, Image, Text, MeshReflectorMaterial, Environment, OrbitControls } from '@react-three/drei'
import { fromString } from 'uuidv4'
import { lorempics } from 'lib/utils'
import { Language, NumeralForm, convertNumberToNumeralForm } from 'numerals';
import { useRouter } from 'next/router'
import colors from 'styles/colors'

const GOLDENRATIO = 1.61803398875

export function MainCanvas({ data, edition, className }) {
  const router = useRouter()
  const images = useMemo(() => data ? Array.from(data, (v, k) => ({
    ...v,
    position: [(-10 + k * 2), 0, -2],
    rotation: [0, 0, 0]
  })) : [], [data])

  return (
    <Canvas gl={{ alpha: false }} dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 15] }} className={className}>
      <color attach="background" args={[colors['stark-white'][500]]} />
      <fog attach="fog" args={[colors['cedar'][800], 0, 15]} />
      <Suspense fallback={null}>
        <Environment preset="city" />
        <Text
          color={colors['cedar'][600]}
          font="/fonts/LibreBaskerville-Regular.ttf"
          fontSize={0.8}
          anchorX="center"
          anchorY="middle"
          position={[0, 2.5, 0]}
        >
          {edition?.name}
        </Text>
        <Text
          color={colors['cedar'][400]}
          font="/fonts/LibreBaskerville-Regular.ttf"
          fontSize={0.25}
          anchorX="center"
          anchorY="middle"
          position={[0, 1.8, 0]}
        >
          {edition?.type} - Edizione {convertNumberToNumeralForm(edition?.number, NumeralForm.Roman, NumeralForm.English)} 
        </Text>
      </Suspense>
      <group position={[0, -0.5, 0]}>
          <Frames images={images} router={router}/>
      </group>
    </Canvas>
  )
}

function Frames({ images, q = new THREE.Quaternion(), p = new THREE.Vector3(), router }) {
  const ref = useRef()
  const clicked = useRef()

  useEffect(() => {
    if (router.query.id) {
      try {
        clicked.current = ref.current.getObjectByName(router.query.id)
      
        clicked.current.parent.updateWorldMatrix(true, true)
        clicked.current.parent.localToWorld(p.set(1.5, GOLDENRATIO / 2, 2))
        clicked.current.parent.getWorldQuaternion(q)
      } catch (e) {
        console.log('Something went horribly wrong', e)
      }
    } else {
      clicked.current = null
      p.set(0, 0.5, 5.5)
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
      {images.map((data, i) => {
        const PADDING = -images.length + 1
        return (
            <Frame key={data.id} data={data} clicked={clicked} url={data.preview} position={[(PADDING + i * 2), 0, -2]} rotation={[0, 0, 0]} /> 
        )
      })}
    </group>
  ) : null
}

function Frame({ url, clicked, c = new THREE.Color(), data, ...props }) {
  const [hovered, hover] = useState(false)
  const [rnd] = useState(() => Math.random())
  const image = useRef()
  const frame = useRef()
  const name = data.id

  useCursor(hovered)
  useFrame((state) => {
    if(image.current) {
      image.current.material.zoom = 2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2
      image.current.scale.x = THREE.MathUtils.lerp(image.current.scale.x, 0.85 * (hovered ? 0.85 : 1), 0.1)
      image.current.scale.y = THREE.MathUtils.lerp(image.current.scale.y, 0.9 * (hovered ? 0.905 : 1), 0.1)
    }

    frame.current.material.color.lerp(c.set(hovered ? colors['stark-white'][800] : 'white').convertSRGBToLinear(), 0.1)
  })

  const getFrameColor = () => {
    if (clicked.current && clicked.current.name == name) return colors['cedar'][600]
    else return colors['stark-white'][700]
  }

  return (
    <group {...props}>
      <mesh
        name={name}
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        scale={[1, GOLDENRATIO, 0.05]}
        position={[0, GOLDENRATIO / 2, 0]}
      >
        <boxGeometry />
        <meshStandardMaterial color={getFrameColor()} metalness={0.5} roughness={0.5} envMapIntensity={2} />
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
