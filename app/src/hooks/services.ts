import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchServices } from '../redux/services/actions'
import { AppDispatch, RootState } from '../redux/store'
export const useServices = () => {
    const dispatch = useDispatch<AppDispatch>()
    const services = useSelector((state: RootState) => state.service)
    useEffect(() => {
        dispatch(fetchServices())
    },[dispatch])

    return services
}
