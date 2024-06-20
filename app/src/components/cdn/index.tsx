import React from 'react'
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { AdvancedImage  } from '@cloudinary/react';
import { lazyload, responsive } from '@cloudinary/react';

interface IAdvanceImage {
    name: string
    size: number
}
const AdvanceImage:React.FC<IAdvanceImage> = (props) => {
   
    const { name, size } = props
    const cld = new Cloudinary({ cloud: { cloudName: 'dosfavadd' } });
    const img = cld
            .image(name)
            .format('auto') 
            .quality('auto')
            .resize(auto().width(size).height(size))

    return (
        <AdvancedImage 
            cldImg={img}
            plugins={[lazyload(), responsive()]}
        />
    );
}

export default AdvanceImage;