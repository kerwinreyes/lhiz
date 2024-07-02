import { IAppointmentResponse } from "../../interfaces"
import { AppointmentActionTypes, FETCH_APPOINTMENT_FAILED, FETCH_APPOINTMENT_REQUEST, FETCH_APPOINTMENT_SUCCESS, SCHEDULE_APPOINTMENT_FAILED, SCHEDULE_APPOINTMENT_REQUEST, SCHEDULE_APPOINTMENT_SUCCESS } from "./types";
interface AppointmentState {
    loading: boolean
    appointment: IAppointmentResponse[]
    error: string
    scheduling: boolean,
}
const initialState: AppointmentState = {
    loading: false,
    appointment: [],
    error: "",
    scheduling: false
}

const serviceReducerApp = (state = initialState, action: AppointmentActionTypes): AppointmentState => {
    switch (action.type){
        case FETCH_APPOINTMENT_REQUEST: 
            return {
                ...state,
                loading: true
            }
        case FETCH_APPOINTMENT_SUCCESS: 
            return {
                ...state,
                loading: false,
                appointment: action.payload
            }
        case FETCH_APPOINTMENT_FAILED: 
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        
        case SCHEDULE_APPOINTMENT_REQUEST: 
            return {
                ...state,
                scheduling: true,
                error: ""
            }
        case SCHEDULE_APPOINTMENT_SUCCESS: 
            return {
                ...state,
                scheduling: false,
            }
        case SCHEDULE_APPOINTMENT_FAILED: 
            return {
                ...state,
                scheduling: false,
                error: action.payload
            }
    
        default:
            return state
    }
}

export default serviceReducerApp