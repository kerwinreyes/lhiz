import React from 'react';
import VectorPortrait from '../../../public/img/vectorPortfolio.jpg'
import { Avatar, Grid } from '@mui/material';
const About = () => {
    const aboutMe = "Eliza Dungao, the name itself whispers of meticulous stitches and fabrics that drape like dreams.  As a dressmaker, your hands weave more than just thread; they weave stories.  Every dress that emerges from your care tells a tale, a whispered secret of the woman who will inhabit it.  Whether it's a garment for a joyous celebration or a quiet expression of personal style, your touch imbues it with a touch of magic, transforming mere cloth into something that speaks to the soul."
    return (
        <section className='h-screen w-screen'>
            <Grid container className="pt-12">
                <Grid item xs={12} sm={6} className='flex justify-center items-center'>
                    <div className="absolute border-4 border-luxe-blue h-3/4 w-2/5"></div>
                    <img src={VectorPortrait} className='pt-10 z-10 object-fit h-auto w-3/4' />
                </Grid>
                <Grid item xs={12} sm={6} className='w-full flex justify-center items-center'>
                    <span className='w-3/4 text-left font-light text-xl'>
                        {aboutMe}
                    </span>
                </Grid>
            </Grid>
        </section>
    )
}

export default About