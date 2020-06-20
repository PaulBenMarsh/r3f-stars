import React, { useRef, useState, useMemo } from "react";
import { useFrame, useLoader, useThree } from "react-three-fiber";
import { a, useSpring } from "react-spring/three";
import { Chance } from "chance";

import * as THREE from "three";

import { AnimatedMaterial } from "./material";

import config from "./store";


const chance = new Chance(0);


function Entity({ props }) {

    const ms = useRef(0);
    const material = useRef();
    const mesh = useRef();

    const { camera } = useThree();

    const [position, setPosition] = useState([
        chance.floating({ ...props.positionRange[0] }),
        chance.floating({ ...props.positionRange[1] }),
        chance.floating({ ...props.positionRange[2] }),
    ]);

    const defaultScale = useRef(props.mesh.scale);

    const hoverScale = useRef([
        defaultScale.current[0] * 1.6,
        defaultScale.current[1] * 1.6,
        defaultScale.current[2] * 1.6
    ]);

    const [scaleSpring, set] = useSpring(() => ({
        scale: defaultScale.current,
        config: {
            mass: 5,
            tension: 350,
            friction: 40,
            clamp: false
        }
    }));

    const [frameDuration, setFrameDuration] = useState(props.frameDuration);

    const texture = useLoader(THREE.TextureLoader, props.textureImage);

    useMemo(() => {
        texture.minFilter = THREE.NearestFilter;
        texture.magFilter = THREE.NearestFilter;
    }, [texture]);

    useFrame((_, delta) => {
        ms.current += delta * 1000;
        mesh.current.quaternion.copy(camera.quaternion);
        while (ms.current > frameDuration) {
            ms.current -= frameDuration;
            material.current.uniforms.currentFrame.value = (material.current.uniforms.currentFrame.value + 1) % (material.current.uniforms.framesHorizontal.value * material.current.uniforms.framesVertical.value);
        }
    });

    return (
        <a.mesh
        ref={ mesh }
        position={ position }
        onPointerOver={ () => set({ scale: hoverScale.current }) }
        onPointerLeave={ () => set({ scale: defaultScale.current }) }
        scale={ scaleSpring.scale.interpolate((x, y, z) => [x, y, z]) }>
            <planeGeometry
            attach="geometry"
            { ...props.geometry } />
            <a.animatedMaterial
            attach="material"
            ref={ material }
            texture={ texture }
            { ...props.material }
            currentFrame={ 0 }
            transparent />
        </a.mesh>
    );

}

function Entities() {

    return (
        <>
        {
            config.entities.map((entity, _) => (
                Array(entity.count).fill(entity.props).map((props, i) => (
                    <Entity key={ `${entity.name}_${i}` } props={ props } />
                ))
            ))
        }
        </>
    );

}

export default function Scene({ htmlContent, position }) {

    return (
        <>
        <a.group position={ position }>
            { htmlContent }
            <Entities />
        </a.group>
        </>
    );

}