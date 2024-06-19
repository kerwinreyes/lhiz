import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TransitionFade from "../../components/transition";

const NotFound = () => {
    const navigate = useNavigate()
    return (
        <>
        <section className='h-screen md:py-0 flex items-center'>
            <Grid container>
                <Grid item xs={12} sm={12} alignContent="center" justifyContent="center">
                    <TransitionFade className='flex justify-center items-center'>
                        <div>
                        <img src="https://i.ibb.co/7vmGJHs/Sewing-Machinge-Small.gif" alt="Sewing Machine" 
                            className="w-64 md:w-80 mx-auto object-contain"
                            style={{ objectFit: 'contain' }}/>
                        </div>
                    </TransitionFade>
                </Grid>
                <Grid item xs={12} sm={12} alignContent="center" justifyContent="center" alignItems="center">
                    <Typography variant="h2" className="font-extrabold">404</Typography>
                    <span className="text-sm sm:text-md md:text-xl font-semibold uppercase">The perfect outfit might be just a stitch away!</span>
                    <Typography className="text-lg sm:text-xl md:text-xl font-thin mt-5 ">This page seems to be missing</Typography>
                    <Typography className="text-sm sm:text-md md:text-lg font-thin ">Head back to explore my services</Typography>
                     <Button 
                        onClick={() => navigate("/services")}
                        className="mt-2 py-3 px-5 bg-luxe-brown hover:bg-luxe-nude text-luxe-light text-xs" 
                        disableElevation>
                        Find My Perfect Stitch 
                    </Button>
                </Grid>
                
            </Grid>
            </section>
        </>
    )
}

export default NotFound;