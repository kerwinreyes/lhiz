import { TransitionStatus } from "react-transition-group";
import { useServices } from "../../hooks/services";
import { useEffect, useState } from "react";
import { Transition } from '@headlessui/react'
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./style.scss";
const HeroSplitSlider = () => {
    const {services , loading} = useServices()

    const [index, setIndex] = useState(0);
    
    const navigate = useNavigate();
    const nextSlide = () => {
        index === services.length-1 ? setIndex(0) : setIndex(index + 1);
    };

    const prevSlide = () => {
        
        index === 0 ? setIndex(services.length -1) : setIndex(index - 1);
    };
    const duration:number = 500
    
    const handleScroll = (event: WheelEvent) =>{
        if (event.deltaY > 0 ){
            nextSlide()
        } else {
            prevSlide()
        }
    }
    const navigateToAppointment = () => {
        navigate("/appointment")
    }
    useEffect(() => {
        window.addEventListener('wheel', handleScroll)
        return () => {
            window.removeEventListener('wheel', handleScroll)
        }
    }, [index])
    return (
        <div className="flex justify-between items-center h-screen w-full">
            <div className="w-3/6 h-screen relative overflow-hidden bg-luxe-red">
                {
                    services.map((item, i) => {
                        return (
                            <Transition
                                show={i===index}
                                enter="transition ease duration-500 transform"
                                enterFrom="opacity-0 -translate-y-12"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease duration-300 transform"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 -translate-y-12"
                            >
                                <div
                                    className="absolute w-full h-full flex items-center justify-center bg-luxe-red text-white"
                                >
                                    <div className="image-layout">
                                        <img src={item.image} className="object-fit h-48 w-48 " />
                                    </div>
                                </div>
                            </Transition>
                        )
                    })
                }
            </div>
            <div className="w-3/6 h-screen relative overflow-hidden bg-luxe-nude">
                {
                    services.map((item, i) => {
                        return (
                            <Transition
                                show={i ===index}
                                enter="transition ease duration-1000 transform"
                                enterFrom="opacity-0 translate-y-12"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease duration-300 transform"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-12"
                            >
                                <div
                                    className="absolute w-full h-full flex items-center justify-center text-luxe-brown"
                                >
                                    <div className="text-left">
                                        <div>
                                        <Typography variant="h3">
                                            {item.name}
                                        </Typography>
                                        <Typography>
                                            {item.description || "this is the dress you"}
                                        </Typography>
                                        <Button 
                                            className="py-3 px-5 bg-luxe-brown hover:bg-luxe-red text-luxe-light text-xs" 
                                            onClick={navigateToAppointment} 
                                            disableElevation
                                        >
                                            Book an appointment
                                        </Button>
                                        </div>
                                    </div>

                                </div>

                            </Transition>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default HeroSplitSlider;