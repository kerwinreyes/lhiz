import { IService } from "../../interfaces"

export const FETCH_SERVICES_REQUEST = "FETCH_SERVICES_REQUEST"
export const FETCH_SERVICES_SUCCESS = "FETCH_SERVICES_SUCCESS"
export const FETCH_SERVICES_FAILED = "FETCH_SERVICES_FAILED"

interface FetchServicesRequestAction {
    type: typeof FETCH_SERVICES_REQUEST
}
interface FetchServicesSuccessAction {
    type: typeof FETCH_SERVICES_SUCCESS
    payload: IService[]
}
interface FetchServicesFailedAction {
    type: typeof FETCH_SERVICES_FAILED
    payload: string
}

export type ServicesActionTypes = FetchServicesFailedAction | FetchServicesRequestAction | FetchServicesSuccessAction