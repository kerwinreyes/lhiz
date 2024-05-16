import React, { useEffect, useState } from 'react';
import CalendarEvents from '../../components/calendar';
import { IService, IServiceList } from '../../interfaces';
import { useServices } from '../../hooks/services';
const Services = () => {

    const [currentDay, setCurrentDay] = useState<Date>(new Date())
    const [servicesList, setServices] = useState<IService[]>([])
    const {services , loading} = useServices()
    useEffect(() => {
        setServices(services)
    }, [])
    return (
        <div className="p-10 w-screen">
        </div>
    )
}

export default Services