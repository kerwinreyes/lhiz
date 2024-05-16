import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { AppDispatch, RootState } from '../redux/store'
import { fetchAppointments, scheduleAppointment } from '../redux/appointments/action'
import { IAppointmentResponse } from '../interfaces'
import { BG_COLOR } from '../utils/constant'
export const useAppointment = () => {
    const dispatch = useDispatch<AppDispatch>()
    const appointments = useSelector((state: RootState) => state.appointment.appointment)
    
    useEffect(() => {
        dispatch(fetchAppointments())
    },[dispatch])
    const schedule = async (body: string) => {
        await dispatch(scheduleAppointment(body));
        dispatch(fetchAppointments())

      };
    const finalAppointmentList = appointments.map((item: IAppointmentResponse) => {
        const startEnd: Date = new Date(item.date)
        const endDate: Date = startEnd
        endDate.setHours(endDate.getHours() + 1)
        return {
            id: item._id,
            date: item.date,
            color: BG_COLOR.success,
            title: item.service,
            start: new Date(item.date),
            end: endDate,
            allDay:false
        }
    })
    return {finalAppointmentList, schedule}
}
