import React, { useEffect, useState } from 'react';
import CalendarEvents from '../../components/calendar';
import { IService, IServiceList } from '../../interfaces';
const Appointment = () => {

    const [currentDay, setCurrentDay] = useState<Date>(new Date())
    const [services, setServices] = useState<IService[]>([])
    const devURL = "http://localhost:5000"
    const getServices = async () => {
        const response = await fetch(`${devURL}/services`)
        const responseJSON: IService[] = await response.json()
        setServices(responseJSON)
    }
    useEffect(() => {
        getServices()
    }, [])
    return (
        <div className="p-10 w-screen">
            <CalendarEvents  
                day={currentDay} 
                services={services.map((item) => {return {label: item.name, value: item.slug}})} />
        </div>
    )
}

export default Appointment