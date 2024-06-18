import * as THREE from 'three'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Html, ScrollControlsState, useGLTF, useScroll } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import gsap from 'gsap'
import { GroupProps, useFrame } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import TransitionFade from '../../transition'

interface IuseGLTFWithProgress {
  model: any
  progress: number
}
interface IModel  extends GroupProps{
  setIsLoading: (loading:boolean) => void
}
type GLTFResult = GLTF & {
  nodes: {
    ['01_office001_1']: THREE.Mesh
    ['01_office001_2']: THREE.Mesh
    ['01_office001_3']: THREE.Mesh
    ['01_office001_4']: THREE.Mesh
    ['01_office001_5']: THREE.Mesh
    ['01_office001_6']: THREE.Mesh
    ['01_office001_7']: THREE.Mesh
    ['01_office001_8']: THREE.Mesh
    ['01_office001_9']: THREE.Mesh
    ['01_office001_10']: THREE.Mesh
    ['01_office001_11']: THREE.Mesh
    ['01_office002']: THREE.Mesh
    ['01_office002_1']: THREE.Mesh
    ['01_office002_2']: THREE.Mesh
    ['01_office002_3']: THREE.Mesh
    ['01_office002_4']: THREE.Mesh
    ['01_office002_5']: THREE.Mesh
  }
  materials: {
    Wall: THREE.MeshStandardMaterial
    ['Material.001']: THREE.MeshStandardMaterial
    PastelPinkTexture: THREE.MeshStandardMaterial
    PasteBlueTexture: THREE.MeshStandardMaterial
    Wood1: THREE.MeshStandardMaterial
    ['Material.002']: THREE.MeshStandardMaterial
    Material: THREE.MeshStandardMaterial
    ['Material.003']: THREE.MeshStandardMaterial
    ['Material.005']: THREE.MeshStandardMaterial
    ['Material.007']: THREE.MeshStandardMaterial
    Wood2: THREE.MeshStandardMaterial
    ['WoodQuarteredChiffon001_6K.002']: THREE.MeshStandardMaterial
    ['PasteBlueTexture.002']: THREE.MeshStandardMaterial
    Mirror: THREE.MeshStandardMaterial
    ['WoodQuarteredChiffon001_6K.001']: THREE.MeshStandardMaterial
    ['PastelPinkTexture.001']: THREE.MeshStandardMaterial
    ['Wood2.1']: THREE.MeshStandardMaterial
  }
  animations: any
}

// type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>>

export const FLOOR_HEIGHT: number = 2.5;
export const NB_FLOORS: number = 2;
const useGLTFWithProgress = (url: string): IuseGLTFWithProgress => {
  const [model, setModel] = useState<any>(null);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      url,
      (gltf) => {
        setModel(gltf);
      },
      (xhr: ProgressEvent<EventTarget>) => {
        if (xhr.lengthComputable) {
          const percentComplete = (xhr.loaded / xhr.total) * 100;
          setProgress(percentComplete);
        }
      },
      (error) => {
        console.error('An error happened', error);
      }
    );
  }, [url]);
  const result: IuseGLTFWithProgress = {
    model,
    progress
  }
  return result
};

const SewingMachineModel:React.FC<IModel> = (props) => {
  const { setIsLoading} = props
  const { model, progress } = useGLTFWithProgress('./models/office.glb');
  
  const { nodes, materials } = useGLTF('./models/office.glb') as GLTFResult;
  const ref:any = useRef()
  const tl:any = useRef()
  const firstFloor:any = useRef()
  const secondFloor:any = useRef()
  const scroll:ScrollControlsState = useScroll()

  useFrame(() => {  
    tl.current.seek(scroll.offset * tl.current.duration())
  });
  useLayoutEffect(() => {
    if (model) {
    tl.current = gsap?.timeline()

    //Vertical
    tl.current.to(
      ref.current.position, {
        duration: 2,
        y: -FLOOR_HEIGHT * (NB_FLOORS -1),
      },
      0
    );

    tl.current.to(
      ref.current.rotation,
      { duration: 1, x:0, y: Math.PI/6, z:0},
      0
    );
    tl.current.to(
      ref.current.rotation,
      { duration: 1, x:0, y: -Math.PI/15, z:0},
      1
    );
    //movement
    
    tl.current.to(
      ref.current.position,
      { duration: 1, x:-1, z: 2},
      0
    )
    
    tl.current.to(
      ref.current.position,
      { duration: 1, x:1, z: 2},
      1
    )
    //FirstFloor
    tl.current.from(
      firstFloor.current.position,
      {
        duration: 0.5,
        x: -2,
      },
      0.5,
    );
    //SecondFloor
    tl.current.from(
      secondFloor.current.position,
      {
        duration: 1.5,
        x: -2,
      },
      0.5,
    );
    tl.current.from(
      secondFloor.current.rotation,
      {
        duration: 0.5,
        y: -Math.PI/2,  
      },
      0,
    );
  }
  }, [model])
  useEffect(() => {
    if(!model){
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [model])
  if (!model) {
    return (
      <Html center>
        <div className="flex justify-center items-center w-screen h-screen">
          <TransitionFade className='flex justify-center items-center'>
            <div>
              <img src="https://i.ibb.co/7vmGJHs/Sewing-Machinge-Small.gif" alt="Sewing Machine" 
                className="w-64 md:w-96 mb-4 mx-auto object-contain"
                style={{ objectFit: 'contain' }}/>
            <p className="text-lg md:text-xl font-semibold">Loading...</p>
            </div>
          </TransitionFade>
        </div>
      </Html>
    );
  }
  return (
        <group {...props} dispose={null} ref={ref}>
          <group position={[0, -1.019, 1.255]}>
            <group ref={firstFloor}>
            <mesh geometry={nodes['01_office001_1'].geometry} material={materials.Wall} />
            <mesh geometry={nodes['01_office001_2'].geometry} material={materials['Material.001']} />
            <mesh geometry={nodes['01_office001_3'].geometry} material={materials.PastelPinkTexture} />
            <mesh geometry={nodes['01_office001_4'].geometry} material={materials.PasteBlueTexture} />
            <mesh geometry={nodes['01_office001_5'].geometry} material={materials.Wood1} />
            <mesh geometry={nodes['01_office001_6'].geometry} material={materials['Material.002']} />
            <mesh geometry={nodes['01_office001_7'].geometry} material={materials.Material} />
            <mesh geometry={nodes['01_office001_8'].geometry} material={materials['Material.003']} />
            <mesh geometry={nodes['01_office001_9'].geometry} material={materials['Material.005']} />
            <mesh geometry={nodes['01_office001_10'].geometry} material={materials['Material.007']} />
            <mesh geometry={nodes['01_office001_11'].geometry} material={materials.Wood2} />
          </group></group>
          <group position={[0, 1.284, -0.937]}>
            <group ref={secondFloor}>
            <mesh geometry={nodes['01_office002'].geometry} material={materials['WoodQuarteredChiffon001_6K.002']} />
            <mesh geometry={nodes['01_office002_1'].geometry} material={materials['PasteBlueTexture.002']} />
            <mesh geometry={nodes['01_office002_2'].geometry} material={materials.Mirror} />
            <mesh geometry={nodes['01_office002_3'].geometry} material={materials['WoodQuarteredChiffon001_6K.001']} />
            <mesh geometry={nodes['01_office002_4'].geometry} material={materials['PastelPinkTexture.001']} />
            <mesh geometry={nodes['01_office002_5'].geometry} material={materials['Wood2.1']} />
          </group>
          </group>
        </group>
  )
}

useGLTF.preload('./models/office.glb')

export default SewingMachineModel;