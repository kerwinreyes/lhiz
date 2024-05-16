import { IAppointmentResponse } from "../../interfaces"

export const FETCH_APPOINTMENT_REQUEST = "FETCH_APPOINTMENT_REQUEST"
export const FETCH_APPOINTMENT_SUCCESS ="FETCH_APPOINTMENT_SUCCESS"
export const FETCH_APPOINTMENT_FAILED = "FETCH_APPOINTMENT_FAILED"

export const SCHEDULE_APPOINTMENT_REQUEST = "SCHEDULE_APPOINTMENT_REQUEST"
export const SCHEDULE_APPOINTMENT_SUCCESS ="SCHEDULE_APPOINTMENT_SUCCESS"
export const SCHEDULE_APPOINTMENT_FAILED = "SCHEDULE_APPOINTMENT_FAILED"

interface FetchAppointmentRequestAction {
    type: typeof FETCH_APPOINTMENT_REQUEST,
}
interface FetchAppointmentSuccessAction {
    type: typeof FETCH_APPOINTMENT_SUCCESS,
    payload: IAppointmentResponse[]
}
interface FetchAppointmentFailedAction {
    type: typeof FETCH_APPOINTMENT_FAILED,
    payload: string
}

interface ScheduleAppointmentRequestAction {
    type: typeof SCHEDULE_APPOINTMENT_REQUEST,
}
interface ScheduleAppointmentSuccessAction {
    type: typeof SCHEDULE_APPOINTMENT_SUCCESS,
    payload: IAppointmentResponse[]
}
interface ScheduleAppointmentFailedAction {
    type: typeof SCHEDULE_APPOINTMENT_FAILED,
    payload: string
}

export type AppointmentActionTypes = 
FetchAppointmentFailedAction | 
FetchAppointmentRequestAction | 
FetchAppointmentSuccessAction |
ScheduleAppointmentFailedAction |
ScheduleAppointmentRequestAction |
ScheduleAppointmentSuccessAction 