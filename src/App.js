import React , { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import "./style.css";
import { CubeCamera, Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Ground } from './Ground';
import { Car } from './Car';
import { Rings } from './Rings';
import { Boxes } from './Boxes';
import { FloatingGrid } from './FloatingGrid';
import { Coins } from './Coins';

function CarShow(){
  const [planePosition, setPlanePosition ]= useState([0,1,0])

  return (
    <>
    <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />

    <PerspectiveCamera makeDefault fov={60} position={[0, 2, -4]}  />

    <color args={[0,0,0]} attach="background" />

    <CubeCamera resolution={256} frames={Infinity}>
      {
        (texture)=>(
          <>
          <Environment map={texture} />
              <Car planePosition={planePosition} setPlanePosition={setPlanePosition}/>
              <Ground />
          </>
        )
      }
    </CubeCamera>

    <Coins planePosition={planePosition}/>
    <spotLight 
        color={[1, 0.25, 0.7]}
        intensity={100}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
    />

    <spotLight 
      color={[0.14, 0.5, 1]}
        intensity={100}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
    />

      <Rings />
      {/* <Boxes /> */}
      <FloatingGrid />
        {/* <DepthOfField focusDistance={0.0035} focalLength={0.01} bokehScale={3} height={480} /> */}
      <EffectComposer>
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={0.5} // The bloom intensity.
          width={300} // render width
          height={300} // render height
          kernelSize={5} // blur kernel size
          luminanceThreshold={0.15} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL} // blend mode
          offset={[0.0005, 0.0012]} // color offset
        />
      </EffectComposer>


    {/* <mesh>
      <planeGeometry args={[30 ,30]} />   
      <meshBasicMaterial color={"red"} />
      
    </mesh> */}

    </>
  );
}

function App() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <CarShow />
      </Canvas>
    </Suspense>
  );
}

export default App
