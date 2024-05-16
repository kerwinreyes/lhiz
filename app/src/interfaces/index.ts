export interface IService {
    ID: string
    price: number
    name: string
    image: string
    description: string
    slug: string
    status: string
}
export interface IServiceList {
    services: IService[]
}
export interface IAppointmentResponse{
    _id: string
    createdat: string
    customer: string
    service: string
    time: string
    date: string
}