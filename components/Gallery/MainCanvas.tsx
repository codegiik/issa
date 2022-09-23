import * as THREE from 'three';
import { useEffect, useRef, useState, Suspense, MutableRefObject } from 'react';
import {
    Canvas,
    ThreeElements,
    ThreeEvent,
    useFrame,
} from '@react-three/fiber';
import {
    useCursor,
    Image as ThreeImage,
    Text,
    Environment,
} from '@react-three/drei';
import { NumeralForm, convertNumberToNumeralForm } from 'numerals';
import { NextRouter, useRouter } from 'next/router';
import { CompetitionEntriesRecord, CompetitionsRecord } from 'lib/interfaces';
// import colors from 'styles/colors';
import tailwindconfig from 'tailwind.config';

const colors = tailwindconfig.daisyui.themes[0].issa;

const GOLDENRATIO = 1.61803398875;

export type MainCanvasProps = {
    entries: CompetitionEntriesRecord[];
    comp: CompetitionsRecord;
    className: string;
    baseUri: string;
};

export function MainCanvas({
    entries,
    comp,
    className,
    baseUri,
}: MainCanvasProps) {
    const router = useRouter();
    const [windowSize, setWindowSize] = useState(1024);

    useEffect(() => {
        const textSizeInterval = setInterval(() => {
            if (!window) return;
            const windowSize = window.innerWidth;
            setWindowSize(windowSize);
        }, 1000);

        return () => clearInterval(textSizeInterval);
    }, []);

    const getTextSize = () =>
        windowSize /
        comp?.name?.length /
        (windowSize < 1250 ? 65 : windowSize > 2000 ? 180 : 80);
    const getTitleOffset = () => {
        if (getTextSize() < 0.2) return 1.75;
        else if (getTextSize() > 0.5) return 2.75;
        return 2.25;
    };
    const editionIdOffset = getTitleOffset() - getTextSize() * 1.25;

    return (
        <Canvas
            gl={{ alpha: false }}
            dpr={[1, 1.5]}
            camera={{ fov: 70, position: [0, 2, 15] }}
            className={className}
        >
            <color attach="background" args={[colors['base-200']]} />
            <fog attach="fog" args={[colors['primary'], 0, 15]} />
            <Suspense fallback={null}>
                <Environment preset="city" />
                <Text
                    {...({
                        color: colors['primary'],
                        font: '/fonts/LibreBaskerville-Regular.ttf',
                        fontSize: getTextSize(),
                        anchorX: 'center',
                        anchorY: 'middle',
                        // position={[0, 2.5 - getTextOffset() * 0.5, 0]}
                        position: [0, getTitleOffset(), 0],
                    } as any)}
                >
                    {comp?.name}
                </Text>
                <Text
                    {...({
                        color: colors['primary'],
                        font: '/fonts/LibreBaskerville-Regular.ttf',
                        fontSize:
                            getTextSize() * (windowSize > 3250 ? 0.5 : 0.6),
                        anchorX: 'center',
                        anchorY: 'middle',
                        // position={[0, 1.8 + getTextOffset() * 0.32, 0]}
                        position: [0, editionIdOffset, 0],
                    } as any)}
                >
                    Premio ISSA - Edizione{' '}
                    {convertNumberToNumeralForm(
                        comp?.id,
                        NumeralForm.Roman,
                        (NumeralForm as any).English
                    )}
                </Text>
            </Suspense>
            <group position={[0, -0.5, 0]}>
                <Frames
                    router={router}
                    baseUri={baseUri}
                    entries={entries}
                    windowSize={windowSize}
                />
                {/*<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
              <planeGeometry args={[50, 50]} />
              <meshBasicMaterial color={colors['cedar']['400']} />
              {/*<MeshReflectorMaterial
                blur={[300, 100]}
                resolution={2048}
                mixBlur={1}
                mixStrength={40}
                roughness={1}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color={colors['stark-white'][900]}
                metalness={0.5}
              />
          </mesh>*/}
            </group>
        </Canvas>
    );
}

function Frames({
    entries,
    router,
    baseUri,
    windowSize,
    p = new THREE.Vector3(),
    q = new THREE.Quaternion(),
}: {
    entries: CompetitionEntriesRecord[];
    router: NextRouter;
    windowSize: number;
    baseUri: string;
    q?: any;
    p?: any;
}) {
    const ref = useRef<any>();
    const clicked = useRef<any>();

    const getPositionOffset = () => {
        console.log(windowSize);
        return windowSize > 1024 ? 1.3 : 0;
    };

    useEffect(() => {
        if (router.query.gallery_id) {
            try {
                clicked.current = ref.current.getObjectByName(
                    router.query.gallery_id
                );
                clicked.current.parent.updateWorldMatrix(true, true);
                clicked.current.parent.localToWorld(
                    p.set(getPositionOffset(), GOLDENRATIO / 2, 2)
                );
                clicked.current.parent.getWorldQuaternion(q);
            } catch (e) {
                console.log('Something went horribly wrong', e);
            }
        } else {
            clicked.current = undefined;
            p.set(0, 0.5, 5.5);
            q.identity();
        }
    });

    useFrame((state, dt) => {
        state.camera.position.lerp(p, 0.025);
        state.camera.quaternion.slerp(q, 0.025);
    });

    const setLocation = (id?: string) => {
        router.push(
            id ? `${baseUri}?gallery_id=${id}` : '/gallery',
            undefined,
            {
                shallow: true,
            }
        );
    };

    return router ? (
        <group
            ref={ref}
            onClick={(e: ThreeEvent<MouseEvent>) => (
                e.stopPropagation(),
                typeof clicked.current === typeof e.object
                    ? setLocation()
                    : setLocation(e.object.name)
            )}
            onPointerMissed={() => setLocation()}
        >
            {entries.map((entry, i: number) => {
                const PADDING = -entries.length + 1;
                return (
                    <Frame
                        key={entry.id}
                        entry={entry}
                        clicked={clicked}
                        url={entry.preview}
                        position={[PADDING + i * 2, 0, -2]}
                        rotation={[0, 0, 0]}
                    />
                );
            })}
        </group>
    ) : null;
}

export type FrameProps = {
    url?: string;
    clicked: MutableRefObject<ThreeElements['mesh'] | undefined>;
    c?: THREE.Color;
    entry: CompetitionEntriesRecord;
    [key: string]: any;
};

function Frame({
    url,
    clicked,
    c = new THREE.Color(),
    entry,
    ...props
}: FrameProps) {
    const [hovered, hover] = useState(false);
    const [rnd] = useState(() => Math.random());
    const image = useRef<any>();
    const frame = useRef<any>();
    const name = entry.id.toString();

    useCursor(hovered);
    useFrame((state) => {
        if (image.current) {
            (image.current as any).material.zoom =
                2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2;
            (image.current as any).scale.x = THREE.MathUtils.lerp(
                (image.current as any).scale.x,
                0.85 * (hovered ? 0.85 : 1),
                0.1
            );
            (image.current as any).scale.y = THREE.MathUtils.lerp(
                (image.current as any).scale.y,
                0.9 * (hovered ? 0.905 : 1),
                0.1
            );
        }

        (frame.current as any).material.color.lerp(
            c.set(hovered ? colors['base-200'] : 'white').convertSRGBToLinear(),
            0.1
        );
    });

    const getFrameColor = () => {
        if (clicked.current && clicked.current.name == name)
            return colors['primary'];
        else return colors['base-200'];
    };

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
                <meshStandardMaterial
                    color={getFrameColor()}
                    metalness={0.5}
                    roughness={0.5}
                    envMapIntensity={2}
                />
                <mesh
                    ref={frame}
                    raycast={() => null}
                    scale={[0.9, 0.93, 0.9]}
                    position={[0, 0, 0.2]}
                >
                    <boxGeometry />
                    <meshBasicMaterial toneMapped={false} fog={false} />
                </mesh>
                <Suspense fallback={null}>
                    <ThreeImage
                        {...({
                            raycast: () => null,
                            ref: image,
                            position: [0, 0, 0.7],
                            url: url || 'https://i.ibb.co/fnHShSz/aledime.png',
                        } as any)}
                    />
                </Suspense>
            </mesh>
        </group>
    );
}
