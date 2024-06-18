import VectorPortrait from '../../../public/img/vectorPortfolio.jpg'
import {  Grid } from '@mui/material';
import TransitionFade from '../../components/transition';
const About = () => {
    const aboutMe = "Eliza Dungao, the name itself whispers of meticulous stitches and fabrics that drape like dreams.  As a dressmaker, your hands weave more than just thread; they weave stories.  Every dress that emerges from your care tells a tale, a whispered secret of the woman who will inhabit it.  Whether it's a garment for a joyous celebration or a quiet expression of personal style, your touch imbues it with a touch of magic, transforming mere cloth into something that speaks to the soul."
    return (
        <>
        <section className='min-h-screen flex items-center'>
            <Grid container className="">
                <Grid item xs={12} sm={6} className='flex justify-center items-center'>
                    <TransitionFade className='flex justify-center items-center'>
                    <div className="absolute border-4 border-luxe-blue h-2/5 w-2/5"></div>
                    <img src={VectorPortrait} className='pt-10 z-10 object-fit h-auto w-3/4' />
                    </TransitionFade>
                </Grid>
                <Grid item xs={12} sm={6} className='w-full flex justify-center items-center'>
                    <TransitionFade className='w-3/4 text-left font-light text-xl'>
                        {aboutMe}
                    </TransitionFade>
                </Grid>
            </Grid>
            </section>
            {/* <section id="where" className='h-screen'>
            <Grid container>
                <Grid item xs={12} sm={6} className="flex align-center items-center justify-center">
                    <div>
                        <TransitionFade className='tracking-widest text-5xl font-extralight text-luxe-light'>
                        WHERE TO FIND ME
                        </TransitionFade>
                        <Typography className="pt-3">3054 M.Cano Street Brgy. Pulung Bulu</Typography>
                        <Typography>Landmark: Near Angeles Elementary School</Typography>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} className="flex align-center items-center justify-center">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3851.4133867419077!2d120.5947411!3d15.135625499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3396f247d0b42995%3A0xe32b6b0b95aecb0e!2s3054%20M%20Cano%2C%20Angeles%2C%20Pampanga!5e0!3m2!1sen!2sph!4v1716642970806!5m2!1sen!2sph" className='w-3/5 h-96' loading="lazy" />
                </Grid>
            </Grid>
            </section> */}
            </>
    )
}

export default About