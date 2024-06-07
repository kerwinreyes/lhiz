import { Dispatch } from "react";
import { IAppointmentResponse } from "../../interfaces";
import { AppointmentActionTypes, FETCH_APPOINTMENT_FAILED, FETCH_APPOINTMENT_REQUEST, FETCH_APPOINTMENT_SUCCESS, SCHEDULE_APPOINTMENT_REQUEST, SCHEDULE_APPOINTMENT_SUCCESS } from "./types";
import api from '../../utils/api'
import { AppThunk } from "../store";

export const fetchAppointmentRequest = (): AppointmentActionTypes => ({
    type: FETCH_APPOINTMENT_REQUEST
})
export const fetchAppointmentSuccess = (items: IAppointmentResponse[]): AppointmentActionTypes => ({
    type: FETCH_APPOINTMENT_SUCCESS,
    payload: items
})
export const fetchAppointmentFailed = (error: string): AppointmentActionTypes => ({
    type: FETCH_APPOINTMENT_FAILED,
    payload: error
})

export const fetchAppointments = () => {
    return async (dispatch: Dispatch<AppointmentActionTypes>) => {
        dispatch({ type:FETCH_APPOINTMENT_REQUEST })
        try {
            const response = await api.get("/appointments")
            dispatch({ type:FETCH_APPOINTMENT_SUCCESS, payload: response.data })

        } catch (err) {
            const errMsg: string = "Error while retrieving appointments"

            dispatch({ type:FETCH_APPOINTMENT_FAILED, payload: errMsg })

        }
    }
}
export const scheduleAppointment = (body: string): AppThunk => async (dispatch) => {
    try {
        dispatch({ type: SCHEDULE_APPOINTMENT_REQUEST })
        const response = await api.post('/appointment', body)
        dispatch({ type: SCHEDULE_APPOINTMENT_SUCCESS, payload: response.data })
        fetchAppointments()
    } catch (err) {
        dispatch({ type: SCHEDULE_APPOINTMENT_SUCCESS, payload: "Error while scheduling" })
    }
}