import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Easing, Tween } from '@tweenjs/tween.js'

function Box(props) {
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    // useFrame((state, delta) => (props.meshRef.current.rotation.x += 0.01))
    // Return view, these are regular three.js elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={props.meshRef}
            scale={active ? 1.5 : 1}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}

export function MainCanvas(props) {
    const camera = useRef(null)
    const box1 = useRef(null)

    useEffect(() => {
        const coords = {
            x: 0,
            y: 5
        }
        const tween = new Tween(coords)
            .to({ x: 0, y: 20 }, 1000)
            .onUpdate(() => {
                console.log(coords)
            })
            .start()
    }, [camera, box1])

    return (
        <>
            <Canvas {...props}>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Box position={[-1.5, 0, 0]} meshRef={box1} />
                <Box position={[1.5, 0, 0]} />
                <PerspectiveCamera
                    makeDefault
                    ref={camera}
                    fov={45}
                    aspect={16 / 9}
                    near={1}
                    far={1000}

                    position={[0, 5, 5]}
                    rotation={[0, 0, 0]}
                />
                <OrbitControls />
                {props.children}
            </Canvas>
        </>
    )
}