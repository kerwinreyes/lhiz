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
            <div className="md:w-1/2 w-full flex items-center justify-center">
                <div className="max-w-sm w-full">
                    <div className="bg-white/50 sm:bg-white rounded-lg px-8 py-12">
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
    // const { size } = useThree()
    // const touchStartYRef = useRef<number>(0)
    
    // const handleTouchStart = (event: TouchEvent) => {
    //     const touch = event.touches[0];
    //     touchStartYRef.current = touch.clientY;
    //     event.preventDefault()
    // };

    // const handleTouchMove = (event: TouchEvent) => {
    //     const touch = event.touches[0];
    //     const scrollDelta = (touch.clientY - touchStartYRef.current) / size.height;
    //     scroll.offset -= scrollDelta;
    //     touchStartYRef.current = touch.clientY;
    //     event.preventDefault()

    // };

    // const handleTouchEnd = () => {
    //     touchStartYRef.current = 0;
    // };

    // useEffect(() => {
    //     window.addEventListener('touchstart', handleTouchStart);
    //     window.addEventListener('touchmove', handleTouchMove, { passive: false });
    //     window.addEventListener('touchend', handleTouchEnd);
    //     return () => {
    //         window.removeEventListener('touchstart', handleTouchStart);
    //         window.removeEventListener('touchmove', handleTouchMove);
    //         window.removeEventListener('touchend', handleTouchEnd);
    //     };
    // }, []);
    
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
                <span className="font-thin md:text-2xl text-sm text-black md:text-luxe-red">Hello! I am Eliza, with a passion for fashion and an eye for detail, I brings dreams to life, one stitch at a time.</span>
                <div onClick={navigateToAbout} className="mt-3 px-2 py-2 font-thin hover:cursor-pointer hover:border-luxe-brown bg-luxe-red text-luxe-light hover:bg-luxe-brown xs:text-lg">
                    GET TO KNOW ME
                </div>
                </>
            } />
            
            <Section opacity={opacitySecond} align="left" content={
                <div>
                    <h1 className="text-lg font-thin md:text-xl text-luxe-red">HELP ME MAKE YOU PRETTY</h1>
                    <span className="font-thin text-luxe-red"><LocalPhoneIcon /> +63 932 7273 288</span>
                </div>
            } />
            </div>
        </Scroll>
    )
}

export default Overlay;