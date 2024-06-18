import { OrbitControls, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import SewingMachineModel from "../models/sewing-machine";
import Overlay from "../overlay";
import { useState } from "react";
const Box = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    return (
            <>
            <ambientLight intensity={2.5} />
            <OrbitControls enableZoom={false} />
            <ScrollControls pages={2} damping={0.25}>
            {
                !isLoading && <Overlay />
            }
            
            <SewingMachineModel setIsLoading={(loading) => setIsLoading(loading)} />
            </ScrollControls>
            </>
    )
}
const SewingMachine = () => {

    return (
        <>
            <Canvas camera={{
                fov:64,
                position: [2.5, 1, 2.5]
            }}>
                <Box />
            </Canvas>
        </>
    )
}

export default SewingMachine