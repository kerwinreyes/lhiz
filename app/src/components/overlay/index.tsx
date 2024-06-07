import { Scroll, ScrollControlsState, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
interface SectionI {
    content: React.ReactElement
    align: string
    opacity: number
}
const Section:React.FC<SectionI> = (props:SectionI) =>{
    const {content, align, opacity} = props
    return (
        <section style={{
            opacity: opacity,
        }} className={`h-screen flex flex-col justify-center p-10 ${align == 'right' ? "items-end" : "items-start"}`}>
            <div className="w-1/2 flex items-center justify-center">
                <div className="max-w-sm w-full">
                    <div className="bg-white rounded-lg px-8 py-12">
                        {content}
                    </div>
                </div>
            </div>
        </section>
    )
} 
const Overlay = () => {
    const scroll:ScrollControlsState = useScroll()
    const [opacityFirst, setOpacityFirst] = useState<number>(1)
    const [opacitySecond, setOpacitySecond] = useState<number>(1)

    useFrame(() => {
        setOpacityFirst(1 - scroll.range(0, 1/3));
        setOpacitySecond(scroll.range(2/3, 1/3));
    })
    const navigate = useNavigate()
    const navigateToAbout= () => {
        navigate("/about")
    }
    return (
        <Scroll html>
            <div className="w-screen" >
            <Section opacity={opacityFirst} align="right" content={
                <>
                <span className="font-thin text-2xl xs:text-xl text-luxe-red">Hello! I am Eliza, with a passion for fashion and an eye for detail, I brings dreams to life, one stitch at a time.</span>
                <div onClick={navigateToAbout} className="mt-3 px-2 py-2 font-thin hover:cursor-pointer hover:border-luxe-brown bg-luxe-red text-luxe-light hover:bg-luxe-brown">
                    GET TO KNOW ME
                </div>
                </>
            } />
            
            <Section opacity={opacitySecond} align="left" content={
                <div>
                    <h1 className="text-xl font-thin text-luxe-red">HELP ME MAKE YOU PRETTY</h1>
                    <span className="font-thin text-luxe-red"><LocalPhoneIcon /> +63 932 7273 288</span>
                </div>
            } />
            </div>
        </Scroll>
    )
}

export default Overlay;