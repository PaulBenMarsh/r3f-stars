import React, { useRef, useState, useEffect, useCallback, Suspense } from "react";
import ReactDOM from "react-dom";
import { Canvas } from "react-three-fiber"
import { useSpring } from "react-spring/three";
import { HTML, OrbitControls } from "drei";

import Scene from "./scene";

import "./styles.css";

function HtmlContent({ portal }) {

    return (
        <HTML
        portal={ portal }>
            <div className="html-content">
            </div>
        </HTML>
    );

}

function App() {

    const domContent = useRef();
    const scrollContainer = useRef();

    const [events, setEvents] = useState();

    const [{ top }, set] = useSpring(() => ({ top: 0 }));
    
    const onScroll = useCallback(e => set({ top: e.target.scrollTop }), [set]);

    useEffect(() => void onScroll({ target: scrollContainer.current }), [onScroll]);

    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    return (
        <>
        <Canvas
        camera={{
            position: [0, 0, 32],
            near: 1,
            far: 128,
            fov: 45
        }}
        onCreated={ ({ gl, events }) => {
            gl.setClearColor("#000000");
            setEvents(events);
        }}>
            <Suspense fallback={ null } >
                <Scene
                // htmlContent={ <HtmlContent portal={domContent} /> }
                position={ top.interpolate(top => [0, top * 0.01, 0]) }
                />
            </Suspense>

            <OrbitControls
            enableKeys={ false }
            enablePan={ false }
            enableZoom={ false }
            enableRotate={ false }
            autoRotate={ true }
            autoRotateSpeed={ 0.6 }
            maxPolarAngle={ Math.PI / 2 } />
        </Canvas>

        <div
        ref={ scrollContainer }
        className="scroll-container"
        onScroll={ onScroll }
        { ...events }>
            <div
            ref={ domContent }
            style={{
                position: "sticky",
                top: 0
            }} />
            <div
            style={{
                height: "300vh"
            }} />
        </div>
        </>
    );

}

ReactDOM.render(<App />, document.getElementById("root"));