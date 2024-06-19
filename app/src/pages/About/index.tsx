import VectorPortrait from '../../../public/img/vectorPortfolio.jpg'
import {  Grid } from '@mui/material';
import TransitionFade from '../../components/transition';
const About = () => {
    const aboutMe = "Sewing has been my love story for a long time! It all started with a childhood project that sparked a passion. For 6 years, I shared that passion by teaching others the magic of turning fabric into something beautiful. Seeing students light up when they learned something new was amazing, but I also had a dream of creating clothes myself. So, I took the leap and became a dressmaker! Now, I get to combine my teaching skills with my love of fashion to help people find clothes that make them feel incredible. Whether it's a dream gown or a perfect-fitting suit, I love working with people to bring their unique style to life. The best part? Seeing the smile on someone's face when they feel confident and truly themselves in what they're wearing. Let's create that feeling for you!"

    return (
        <>
        <section className='py-12 md:h-screen md:py-0 flex items-center'>
            <Grid container className="">
                <Grid item xs={12} sm={6} className='flex justify-center items-center'>
                    <TransitionFade className='flex justify-center items-center'>
                    <div className="absolute border-4 border-luxe-blue h-2/5 w-2/5"></div>
                    <img src={VectorPortrait} className='py-10 z-10 object-fit h-auto w-3/4' />
                    </TransitionFade>
                </Grid>
                <Grid item xs={12} sm={6} className='w-full flex justify-center items-center'>
                    <TransitionFade className='w-full px-5 md:px-0 md:w-4/5 text-left font-light text-xl'>
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