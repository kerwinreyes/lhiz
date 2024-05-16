import React, { useCallback, useEffect, useState } from 'react';
import { BG_COLOR, Days } from '../../utils/constant';
import { Button, 
         CircularProgress, 
         Dialog, 
         DialogActions, 
         DialogContent, 
         DialogTitle, 
         FormControl, 
         IconButton, 
         InputLabel, 
         MenuItem, 
         Select, 
         TextField, 
        } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Calendar, DateLocalizer, Event, SlotInfo, globalizeLocalizer, momentLocalizer } from 'react-big-calendar'
import CloseIcon from '@mui/icons-material/Close';

import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";

import "react-big-calendar/lib/css/react-big-calendar.css"
import "./style/index.css"
import globalize from 'globalize'
import moment from 'moment';
import SnackBarComponent from '../snackbar';
import { IAppointmentResponse } from '../../interfaces';

interface ICalendar {
    day: Date
    services: {label: string, value: string}[]
}
interface IEvent {
    id: string
    date: string
    color: string
    title: string,
    start: Date,
    end: Date,
    allDay?: boolean
    resource?: any,
}
interface FormValues {
  email: string,
  name: string,
  services: string,
  date: string,
  phone: string,
}
const CalendarEvents:React.FC<ICalendar> = (props) => {
    const { day, services } = props
    const [eventList, setEventList] = useState<IEvent[]>([])
    const [appointments, setAppointments] = useState<IEvent[]>([])
    const getHolidayList = () => {
        const holidayList = []
        for (var i = 0; i < holidayList.length; i++) {
        }
    } 
    const devURL = "http://localhost:5000"

    const localizer = globalizeLocalizer(globalize)

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [snackBarStatus, setSnackBarStatus] = useState<{ show: boolean, message: string, bg: string}>({ show: false, message: "", bg:""})
    const handleSlotSelected= (info: SlotInfo) => {
        setIsOpen(true)
    }
    const handleEventSelected = (event: IEvent) => {
        setIsOpen(true)
        
    }
    const handleCancelAppointment = () => {

    }
    const handleUpdateEvent = (code: string) => {

    }
    const getEventList = async() => {
        try {
            const response = await (await fetch(`${devURL}/appointments`)).json()
            const eventResponse: IEvent[] =  response.map((item: IAppointmentResponse) => {
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
            setEventList(eventResponse)
        } catch (err) {

        }
    }
    const formik = useFormik<FormValues>({
        initialValues: {
            email: "",
            name: "",
            services: services[0]?.value || "",
            date: "",
            phone: "",
        },
        onSubmit: async(values) => {
            try {
                setIsLoading(true)
                setIsOpen(false)
                
                const responseJSON = await fetch(`${devURL}/appointment`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values),
                  })
                setSnackBarStatus({ show: true, message: "Appointment has successfully created.", bg:BG_COLOR.success})
                formik.resetForm()
            } catch (err) {
                setSnackBarStatus({ show: true, message: "Error while scheduling an appointment.", bg: BG_COLOR.error})
            } finally {
                setTimeout(() => {
                    setIsLoading(false)
                }, 1000)

            }
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email("Enter valid email address.").required("Please Enter Email"),
            name: Yup.string().required("Please enter your name"),
            services: Yup.string().required("Please select a service"),
            date: Yup.string().required("Please select a time"),
            phone: Yup.string().required("Please enter your phone number")
        })
    })
    
    const handleClose = () => {
        formik.resetForm()
        setIsOpen(false)
    }
    
    useEffect(() => {
        getEventList()
    },[])
    return(
        <div className='w-full'>
            <Calendar 
                style={{height: 500}}
                className='p-5'
                localizer={localizer}
                events={eventList}
                views={["month", "week"]}
                defaultDate={moment().toDate()}
                defaultView='month'
                eventPropGetter={(event) => {
                    const eventData = eventList.find(ot => ot.id === event.id)
                    const backgroundColor = eventData && eventData.color
                    return {style: { backgroundColor,}}
                }}
                selectable={true}
                onSelectEvent={(event) => handleEventSelected(event)}
                onSelectSlot={(info) => handleSlotSelected(info)}
                timeslots={5}
            />
            {
                snackBarStatus.show && (
                <SnackBarComponent 
                    bg={snackBarStatus.bg}
                    message={snackBarStatus.message}
                    show={snackBarStatus.show}
                    setStatus={(show) => setSnackBarStatus(s => ({ ...s, show }))}
                />
                )
            }
            {
            isOpen && (<Dialog
                open={isOpen}
                onClose={handleClose}
                fullWidth={true}
            >
                <DialogTitle>
                    Book an Appointment
                </DialogTitle>
                <IconButton 
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <form onSubmit={formik.handleSubmit} id="appointment" className='w-full'>
                    <DialogContent dividers className="space-y-4">
                        <TextField
                            className="pt-3"
                            fullWidth={true}
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            className="mt-3"
                            fullWidth={true}
                            id="name"
                            name="name"
                            label="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <TextField
                            className="mt-3"
                            fullWidth={true}
                            id="phone"
                            name="phone"
                            label="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}
                        />
                      <FormControl fullWidth className="mt-3">
                        <InputLabel id="services">Service</InputLabel>
                        <Select
                            labelId="services"
                            id="services"
                            name="services"
                            value={formik.values.services}
                            label="Age"
                            onChange={(e) => formik.setFieldValue("services", e?.target?.value)}
                            onBlur={formik.handleBlur}
                            error={formik.touched.services && Boolean(formik.errors.services)}
                            placeholder="Select a service"
                        >
                            {services.map((service) => (
                            <MenuItem key={service.value} value={service.value}>
                                {service.label}
                            </MenuItem>
                            ))}
                        </Select>
                        {formik.touched.services || formik.errors.services && (
                            <span className="text-red-500">{formik.errors.services}</span>
                        )}
                        </FormControl>

                        <FormControl fullWidth className="mt-3">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                            ampm={true}
                            format="HH:mm"
                            slotProps={{
                                textField: {
                                label: "Appointment Date",
                                fullWidth: true,
                                },
                            }}
                            onChange={value => {
                                formik.setFieldValue('date', value?.toString());
                            }}
                            />
                        </LocalizationProvider>
                        {formik.touched.date && formik.errors.date && (
                            <span className="text-red-500">{formik.errors.date}</span>
                        )}
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                    {
                        !isLoading && (
                            <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                        )    
                    }
                    {
                        !isLoading ?

                            <Button form="appointment" color="primary" variant="contained" type="submit" disabled={!formik.dirty}>
                                Submit
                            </Button>
                            : <CircularProgress color="secondary" />
                    }
                    </DialogActions>
                </form>
            </Dialog>)
            }
        </div>
    )
}

export default CalendarEvents;