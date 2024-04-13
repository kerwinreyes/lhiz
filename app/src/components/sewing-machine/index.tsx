import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import SewingMachineModel from "../models/sewing-machine";
const Box = () => {
    return (
        <>
        <ambientLight intensity={2} />
        <OrbitControls />
        <SewingMachineModel />

        </>
    )
}
const SewingMachine = () => {
    return (
        <Canvas>
            <Box />
        </Canvas>
    )
}

export default SewingMachine