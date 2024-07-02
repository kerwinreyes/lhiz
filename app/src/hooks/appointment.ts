import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { AppDispatch, RootState } from '../redux/store'
import { fetchAppointments, scheduleAppointment } from '../redux/appointments/action'
import { IAppointmentResponse } from '../interfaces'
import { BG_COLOR } from '../utils/constant'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc);
dayjs.extend(timezone);

export const useAppointment = () => {
    const dispatch = useDispatch<AppDispatch>()
    const appointments = useSelector((state: RootState) => state.appointment?.appointment)
    const isScheduling = useSelector((state: RootState) => state.appointment?.scheduling)
    const appointmentError = useSelector((state: RootState) => state.appointment?.error)
    
    useEffect(() => {
        dispatch(fetchAppointments())
    },[dispatch])
    const schedule = async (body: string) => {
        await dispatch(scheduleAppointment(body));
        dispatch(fetchAppointments())

      };
    const finalAppointmentList = !!appointments?.length ? appointments.map((item: IAppointmentResponse) => {
        const startEnd: Date = dayjs(item.date).toDate()
        const endDate: Date = startEnd
        endDate.setHours(endDate.getHours() + 1)

        const convertedTime = dayjs(item.date);
        const convertDate = convertedTime.tz('Asia/Manila').format('HH:mm')
        
        return {
            id: item._id,
            date: item.date,
            color: BG_COLOR.secondary,
            title: convertDate,
            service: item.service,
            start: dayjs(item.date).toDate(),
            end: endDate,
            allDay:false
        }
    }) : []
    return {finalAppointmentList, schedule, isScheduling, appointmentError}
}
