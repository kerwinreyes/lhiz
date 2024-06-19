import { useServices } from "../../hooks/services";
import { useEffect, useState } from "react";
import { Transition } from '@headlessui/react'
import { Button, Skeleton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import "./style.scss";
import { IService } from "../../interfaces";
const HeroSplitSlider = () => {
    const {services , loading} = useServices()

    const [index, setIndex] = useState(0);
    const [touchStartY, setTouchStartY] = useState<number>(0);
    
    const navigate = useNavigate();
    const nextSlide = () => {
        index === services.length-1 ? setIndex(0) : setIndex(index + 1);
    };

    const prevSlide = () => {
        
        index === 0 ? setIndex(services.length -1) : setIndex(index - 1);
    };
    
    const handleScroll = (event: WheelEvent) =>{
        if (event.deltaY > 0 ){
            nextSlide()
        } else {
            prevSlide()
        }
    }
    const handleTouchStart = (event: TouchEvent) => {
        setTouchStartY(event.touches[0].clientY)
    }
    const handleTouchMove = (event: TouchEvent) => {
        event.preventDefault();
        const touchEndY = event.touches[0].clientY;

        if (touchStartY - touchEndY > 30) {
            nextSlide();
        } else {
            prevSlide()
        }
    }
    const navigateToAppointment = () => {
        navigate("/appointment")
    }
    useEffect(() => {
        window.addEventListener('wheel', handleScroll);
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchmove', handleTouchMove);

        return () => {
            window.removeEventListener('wheel', handleScroll);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, [index])
    return (
        <>
        {
            !loading &&
            <div className="z-10 absolute bottom-5 right-5">
                <div>
                    <ArrowUpwardIcon onClick={prevSlide} className=" text-5xl text-luxe-red hover:cursor-pointer hover:text-luxe-brown" />
                </div>
                <div>
                    <ArrowDownwardIcon onClick={nextSlide} className=" text-5xl text-luxe-red hover:cursor-pointer hover:text-luxe-brown"/>
                </div>
            </div>
        }
        <div className="md:flex justify-between items-center h-screen w-full">
            <div className=" w-full md:w-3/6 h-3/6 md:h-screen relative overflow-hidden bg-luxe-red">
                {
                    services.map((item: IService, i:number) => {
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
                                        {loading ? (
                                            <Skeleton className="h-72 w-72 " animation="wave" variant="rectangular" />
                                        ) :
                                        <img src={item.image} className="object-cover h-72 w-72 md:h-96 md:w-96 " />
                                        }
                                    </div>
                                </div>
                            </Transition>
                        )
                    })
                }
            </div>
            <div className="w-full md:w-3/6 h-3/6 md:h-screen  relative overflow-hidden bg-luxe-pink">
                { 
                    
                    services.map((item: IService, i: number) => {
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
                                    className="w-full h-full  flex items-center align-center justify-center text-luxe-brown"
                                >
                                    <div className="text-left w-3/5">
                                        <div className="">
                                        <Typography variant="h4">
                                            { loading ? <Skeleton animation="wave" className="h-20" /> : item.name}
                                        </Typography>
                                        <Typography className="mt-5 mb-10">
                                        { loading ? 
                                        <>
                                        <Skeleton animation="wave" className="h-12"  /> 
                                        <Skeleton animation="wave" className="h-12"  /> 
                                        <Skeleton animation="wave" className="h-12"  /> 
                                        </>
                                        : item.description || "this is the dress you"}
                                        </Typography>
                                        { 
                                            !loading &&
                                            <Button 
                                                className="py-3 px-5 bg-luxe-brown hover:bg-luxe-red text-luxe-light text-xs" 
                                                onClick={navigateToAppointment} 
                                                disableElevation
                                            >
                                                Book an appointment
                                            </Button>
                                        }
                                        </div>
                                    </div>

                                </div>

                            </Transition>
                        )
                    })
                }
            </div>
        </div>
        </>
    )
}

export default HeroSplitSlider;