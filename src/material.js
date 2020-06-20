

import { apply } from "react-spring/three";
import { extend } from "react-three-fiber";

import * as THREE from "three";


export default class AnimatedMaterial extends THREE.ShaderMaterial {

    constructor() {
        super({
            uniforms: {
                texture: { type: 't', value: undefined },
                framesHorizontal: { type: 'f', value: 1.0 },
                framesVertical: { type: 'f', value: 1.0},
                currentFrame: { type: 'f', value: 0.0 }
            },
            vertexShader: `
            varying vec2 vUv;
            uniform float framesHorizontal;
            uniform float framesVertical;
            uniform float currentFrame;
            void main() {
                float factorHorizontal = 1.0 / framesHorizontal;
                float factorVertical = 1.0 / framesVertical;
                float offsetX = mod(currentFrame, framesHorizontal) / framesHorizontal;
                float offsetY = floor(currentFrame / framesHorizontal) / framesVertical;
                vUv = vec2(uv.x * factorHorizontal + offsetX, uv.y * factorVertical + offsetY);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
            `,
            fragmentShader: `
            varying vec2 vUv;
            uniform sampler2D texture;
            void main() {
                gl_FragColor = texture2D(texture, vUv);
            }
            `
        });
    }

    get texture() {
        return this.uniforms.texture.value;
    }

    set texture(v) {
        this.uniforms.texture.value = v;
    }

    get framesHorizontal() {
        return this.uniforms.framesHorizontal.value;
    }

    set framesHorizontal(v) {
        this.uniforms.framesHorizontal.value = v;
    }

    get framesVertical() {
        return this.uniforms.framesVertical.value;
    }

    set framesVertical(v) {
        this.uniforms.framesVertical.value = v;
    }

    get currentFrame() {
        return this.uniforms.currentFrame.value;
    }

    set currentFrame(v) {
        this.uniforms.currentFrame.value = v;
    }

}

apply({ AnimatedMaterial });

extend({ AnimatedMaterial });
