import { useRef } from 'react';
import { Plane } from '@react-three/drei'
import colors from 'styles/colors';

export function Ground({ props }) {
    const ref = useRef(null);

    return (
        <Plane
            rotation={[-1, 0, 0]}
            position={[0, 0, -10]}
            scale={200}
        >
            <meshStandardMaterial attach="material" color={colors['warmGray']['600']} />
        </Plane>
    )
}