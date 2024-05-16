import { IService } from "../../interfaces";
import { FETCH_SERVICES_FAILED, FETCH_SERVICES_REQUEST, FETCH_SERVICES_SUCCESS, ServicesActionTypes } from "./types";

interface ServiceState {
    loading: boolean
    services: IService[]
    error: string;
}

const initialState: ServiceState = {
    loading: false,
    services: [],
    error: "",
}
const serviceReducer = (state = initialState, action: ServicesActionTypes): ServiceState => {
    switch (action.type) {
        case FETCH_SERVICES_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_SERVICES_SUCCESS:
            return {
                ...state,
                loading: false,
                services: action.payload
            }
        case FETCH_SERVICES_FAILED: 
            return {
                ...state,
                loading:false,
                error: action.payload
            }
        default: 
        return state
    }
} 

export default serviceReducer;