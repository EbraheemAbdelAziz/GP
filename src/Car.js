import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function Car (props) {

    const [pastPosition , setPastPosition ] = useState([0,0])
    function resetPastPosition(){
        setPastPosition([0,0])
    }

    const time = useRef(0)

    const gltf = useLoader(
        GLTFLoader,
        // process.env.PUBLIC_URL + "models/car/chevrolet_corvette_c7.glb"
        // process.env.PUBLIC_URL + "models/car/free_space_ship_wip.glb"
        // process.env.PUBLIC_URL + "models/car/multi_universe_space_ship_3d_model.glb"
        process.env.PUBLIC_URL + "models/plane1/ssss.glb"
        // process.env.PUBLIC_URL + "models/coins/coin.glb"
    );
    useEffect(()=>{
        // gltf.scene.scale.set(0.005, 0.005, 0.005);
        // gltf.scene.scale.set(0.06, 0.06, 0.06);
        // gltf.scene.scale.set(0.2, 0.2, 0.2);
        gltf.scene.position.set( 0, 1, 0 ) // (x,y,z)
        gltf.scene.scale.set(1, 1, 1);
        // gltf.scene.scale.set(0.01, 0.01, 0.01);
        gltf.scene.rotation.x = -0.2

       
        gltf.scene.traverse((object) => {
            if (object instanceof Mesh ) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 10;
            }
        })
    }
    ,[gltf])

        useFrame((state,delta)=>{
            time.current += 0.1  // => speed
            document.onkeydown =function (e) {
            if (e.keyCode === 37 && props.planePosition[2]=== 1) { // position => right move => left
                setPastPosition([0,1])
                props.setPlanePosition([0,1,0])
            }else if (e.keyCode === 37 && props.planePosition[1]=== 1) { // position => medel move => left
                props.setPlanePosition([1,0,0])
            }else if (e.keyCode === 39 && props.planePosition[1]=== 1) { // position => medel move => right
                props.setPlanePosition([0,0,1])
            }else if (e.keyCode === 39 && props.planePosition[0]=== 1) { // position => left move => right
                setPastPosition([1,0])
                props.setPlanePosition([0,1,0])
            }
    }

            if (props.planePosition[0] === 1) { // left side
                gltf.scene.position.x += time.current
                if (gltf.scene.position.x > 2 ) {
                    gltf.scene.position.x = 2
                    time.current = 0
                    gltf.scene.rotation.z = 0.4
                    gltf.scene.rotation.y = -0.1
                }
            }else if ( props.planePosition[1] === 1 && pastPosition[0] === 1){
                gltf.scene.position.x -= time.current
                if (gltf.scene.position.x < 0 ) {
                    gltf.scene.position.x = 0
                    time.current = 0
                    resetPastPosition()
                    gltf.scene.rotation.z = 0
                    gltf.scene.rotation.y = 0
                }
            }else if ( props.planePosition[1] === 1 &&  pastPosition[1] === 1){
                gltf.scene.position.x += time.current
                if (gltf.scene.position.x > 0 ) {
                    gltf.scene.position.x = 0
                    time.current = 0
                    resetPastPosition()
                    gltf.scene.rotation.z = 0
                    gltf.scene.rotation.y = 0
                }
            }else if (props.planePosition[2] === 1){
                gltf.scene.position.x -= time.current
                if (gltf.scene.position.x < -2 ) {
                    gltf.scene.position.x = -2
                    time.current = 0
                    gltf.scene.rotation.z = -0.4
                    gltf.scene.rotation.y = 0.1
                }
            }
        })



    return <primitive object={gltf.scene} />
}