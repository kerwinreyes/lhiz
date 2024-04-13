import { Scroll, ScrollControlsState, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useState } from "react"
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
    return (
        <Scroll html>
            <div className="w-screen">
            <Section opacity={opacityFirst} align="right" content={
                <h1 className="font-serif text-2xl">Hello! I am Eliza, with a passion for fashion and an eye for detail, I brings dreams to life, one stitch at a time.</h1>
            } />
            
            <Section opacity={opacitySecond} align="left" content={
                <div>
                    <h1 className="font-serif text-2xl">Contact Form</h1>
                </div>
            } />
            </div>
        </Scroll>
    )
}

export default Overlay;