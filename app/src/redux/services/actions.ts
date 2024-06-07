import { FETCH_SERVICES_FAILED, FETCH_SERVICES_REQUEST, FETCH_SERVICES_SUCCESS, ServicesActionTypes } from './types'
import { IService } from '../../interfaces'
import api from '../../utils/api'
import { Dispatch } from 'react'
export const fetchServicesRequest = (): ServicesActionTypes => ({
    type: FETCH_SERVICES_REQUEST,
})

export const fetchServicesSuccess = (services: IService[]): ServicesActionTypes => ({
    type:FETCH_SERVICES_SUCCESS,
    payload: services
})
export const fetchServiceFailed = (error: string): ServicesActionTypes => ({
    type:FETCH_SERVICES_FAILED,
    payload: error
})

export const fetchServices = () => {
    return async (dispatch: Dispatch<ServicesActionTypes>) => {
        dispatch({ type: FETCH_SERVICES_REQUEST })
        try {
            const response = await api.get('/services')
            dispatch({ type: FETCH_SERVICES_SUCCESS, payload: response.data })
        } catch(err) {
        
            const errMsg: string = "Error while retrieving services"
            dispatch({ type: FETCH_SERVICES_FAILED, payload: errMsg })
        }
    }
}