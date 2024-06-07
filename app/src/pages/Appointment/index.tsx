import CalendarEvents from '../../components/calendar';
import { useServices } from '../../hooks/services';
const Appointment = () => {

    const { services, 
        // loading, error
    } = useServices()
    
    return (
        <div className="p-10 h-screen w-screen">
            <CalendarEvents  
                services={services.map((item) => {return {label: item.name, value: item.slug}})} />
        </div>
    )
}

export default Appointment