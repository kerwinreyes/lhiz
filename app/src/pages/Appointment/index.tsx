import CalendarEvents from '../../components/calendar';
import { useServices } from '../../hooks/services';
import { IService } from '../../interfaces';
const Appointment = () => {

    const { services, 
        // loading, error
    } = useServices()
    
    return (
        <div className="p-10 h-screen w-screen">
            <CalendarEvents  
                services={services.map((item: IService) => {return {label: item.name, value: item.slug}})} />
        </div>
    )
}

export default Appointment