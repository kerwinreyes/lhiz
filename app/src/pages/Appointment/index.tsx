import React, { useEffect, useState } from 'react';
import CalendarEvents from '../../components/calendar';
import { IService, IServiceList } from '../../interfaces';
import { useServices } from '../../hooks/services';
const Appointment = () => {

    const [currentDay, setCurrentDay] = useState<Date>(new Date())
    const { services, loading, error} = useServices()
    
    return (
        <div className="p-10 h-screen w-screen">
            <CalendarEvents  
                day={currentDay} 
                services={services.map((item) => {return {label: item.name, value: item.slug}})} />
        </div>
    )
}

export default Appointment