import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh, Vector3 } from "three";
import { useEffect, useRef, useState } from "react";


export function Coins(props) {
    const time =useRef(0)
    const getInitialPosition = ()=>{
            let v = [0,0,0]
            let num = Math.floor(Math.random() * 3)
            v[num] = 1
            if (v[0]===1) {
                return new Vector3(1.75,1,10)
            } else if (v[1]===1) {
                return new Vector3(-0.2,1,10)
            }else if (v[2]===1) {
                return new Vector3(-2,1,10)
            }
        }
    const [position , setPosition ] = useState(getInitialPosition())
        function resetPosition(){
            let v = [0,0,0]
            let num = Math.floor(Math.random() * 3)
            v[num] = 1
            if (v[0]===1) {
                setPosition(new Vector3(1.75,1,10))
            } else if (v[1]===1) {
                setPosition(new Vector3(-0.2,1,10))
            }else if (v[2]===1) {
                setPosition(new Vector3(-2,1,10))
            }
        }
    const glb = useLoader(
        GLTFLoader,
        process.env.PUBLIC_URL + "models/coins/coin.glb"
    );
    useEffect(()=>{
        glb.scene.scale.set(0.01, 0.01, 0.01);
        glb.scene.traverse((object) => {
            if (object instanceof Mesh ) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 10;
            }
        })
        },[glb])


    useFrame((state,delta)=>{
        time.current += delta * 10 // 1.5 =>
        let newZ = position.z - (time.current)

        if ( newZ < 0) { // if the plane take the coin
            resetPosition();
            time.current = 0
            // score ++
        }
        if (newZ < -5) {
            resetPosition();
            time.current = 0
        }
        glb.scene.position.set( position.x, position.y , newZ )
         glb.scene.rotation.y += delta * 1;

    } , [position])

    return <primitive object={glb.scene} />
}
