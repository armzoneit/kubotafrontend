import { Box, Button, Flex, FormControl, Checkbox, FormLabel, Grid, GridItem, Input, Radio, RadioGroup, Select, Stack, useToast, Text, ModalOverlay, Container } from '@chakra-ui/react'
import axios, { AxiosRequestConfig } from 'axios';
import React, { useEffect, useState } from 'react'
import { localStorageLoad } from '../../../utils/localStrorage';

import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import styled, { css, createGlobalStyle } from 'styled-components';
import { TimePicker } from 'antd';
import { useRouter } from "next/router"

const DatePickerWrapperStyles = createGlobalStyle`
    .date_picker.full-width input {
        border: 1px #00AAAD solid;
        padding-top: 7px;
        padding-bottom: 7px;
        padding-left: 17px;
        padding-right: 17px;
        border-radius: 5px;
        width: 100%;
        margin-right:0px;
    }
    .react-datepicker-wrapper{
        width: 100%;
    }
    .date_picker.full-width input:focus {
        z-index: 1;
        box-shadow: 0 0 0 1px #3182ce !important;
    }
    .ant-picker.ant-picker-outlined{
        border: 1px #00AAAD solid;
        padding-top: 7px;
        padding-bottom: 7px;
        padding-left: 17px;
        padding-right: 17px;
        border-radius: 5px;
    }
    tbody tr:hover{
        background-color:#E2EFEF;
        color:#000000;
    }
    .text-centers{
        text-align: center;
    }
    .swal2-confirm{
        background-color:#00A8A9;
    }
    .swal2-cancel{
        background-color:#CCC5C5;
    }
`;

const StatusRentCarDetail = (data: any=false) => {
    const userId = localStorageLoad("userId")
    const tokens = localStorageLoad("token")
    const [textcc, settextcc] = useState<string>("");
    const [disread, setdisread] = useState<boolean>(false);


    const [carck3, setcarck3] = useState<boolean>(false);
    const [carck4, setcarck4] = useState<boolean>(false);
    const [carck5, setcarck5] = useState<boolean>(false);
    const [ckcar1, setckcar1] = useState<boolean>(false)
    const [ckcar2, setckcar2] = useState<boolean>(false)
    const toast = useToast()
    const toastId4 = "success"

    const router = useRouter()
    const ids = data.id ? data.id : router.query?.ids;
    const cartype = data.type ? data.type : router.query?.cartype;

    console.log('ids', ids);
    console.log('cartype', cartype);
    useEffect(() => {
        const handleopenedit = (ids: any) => {
            console.log('userId', userId);
            setcarck3(true);
            setcarck4(false);
            setcarck5(false);
            setdisread(false);
            if (cartype == '1') {
                setcarck3(false);
                setcarck4(true);
                settextcc("จองรถเช่าเหมาวัน(พร้อมคนขับ)");
                let config5: AxiosRequestConfig = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/GetCarBookingWithDriverById/' + ids,
                    headers: {
                        'accept': '*/*',
                        'Authorization': "Bearer " + tokens
                    }
                };

                axios.request(config5)
                    .then((response) => {

                        seteditbutton(false);
                        let subdate = response.data.data.carBookingWithDriver[0]?.booking_date;
                        let subdate1 = subdate.split('/');
                        let subdate2 = response.data.data.carBookingWithDriver[0]?.startdate;
                        let subdate3 = subdate2.split('/');
                        let subdate4 = response.data.data.carBookingWithDriver[0]?.enddate;
                        let subdate5 = subdate4.split('/');
                        setStartDate(new Date(subdate1[2] + "-" + subdate1[1] + "-" + subdate1[0]))
                        setStartDate3(new Date(subdate3[2] + "-" + subdate3[1] + "-" + subdate3[0]))
                        setStartDate4(new Date(subdate5[2] + "-" + subdate5[1] + "-" + subdate5[0]))
                        if (response.data.data.carBookingWithDriver[0]?.employee_no == userId) {
                            seteditbutton(false);
                        } else {
                            seteditbutton(true);
                        }
                        if (response.data.data.carBookingWithDriver[0]?.employee_no != userId) {
                            setdisread(true);
                        }
                        // @ts-ignore
                        setform({
                            idcarbooking: response.data.data.carBookingWithDriver[0]?.idcarbooking,
                            PlantId: response.data.data.carBookingWithDriver[0]?.plantId,
                            employee_no: response.data.data.carBookingWithDriver[0]?.employee_no,
                            booking_date: response.data.data.carBookingWithDriver[0]?.booking_date,
                            bookingname: response.data.data.carBookingWithDriver[0]?.bookingname,
                            email: response.data.data.carBookingWithDriver[0]?.email,
                            agency: response.data.data.carBookingWithDriver[0]?.agency,
                            division: response.data.data.carBookingWithDriver[0]?.division,
                            tel: response.data.data.carBookingWithDriver[0]?.tel,
                            note: response.data.data.carBookingWithDriver[0]?.note,
                            typecar: response.data.data.carBookingWithDriver[0]?.typecar,
                            number_travelers: response.data.data.carBookingWithDriver[0]?.number_travelers,
                            number_cars: response.data.data.carBookingWithDriver[0]?.number_cars,
                            number_cars1: response.data.data.carBookingWithDriver[0]?.number_cars,
                            person_count: response.data.data.carBookingWithDriver[0]?.person_count,
                            countper1: response.data.data.carBookingWithDriver[0]?.person_count,
                            countper2: response.data.data.carBookingWithDriver[0]?.person_count2,
                            countper3: response.data.data.carBookingWithDriver[0]?.person_count2,
                            startdate: response.data.data.carBookingWithDriver[0]?.startdate,
                            enddate: response.data.data.carBookingWithDriver[0]?.enddate,
                            locationIn: response.data.data.carBookingWithDriver[0]?.locationIn,
                            timeIn: response.data.data.carBookingWithDriver[0]?.timeIn,
                            LocationOut: response.data.data.carBookingWithDriver[0]?.LocationOut,
                            timeOut: response.data.data.carBookingWithDriver[0]?.timeOut,
                            operational_area: response.data.data.carBookingWithDriver[0]?.operational_area,
                            upcountry: response.data.data.carBookingWithDriver[0]?.upcountry,
                            overnight_stay: response.data.data.carBookingWithDriver[0]?.overnight_stay,
                            person_responsible_for_expenses: response.data.data.carBookingWithDriver[0]?.person_responsible_for_expenses,
                            other: response.data.data.carBookingWithDriver[0]?.other,
                            number_of_trips: response.data.data.carBookingWithDriver[0]?.plantId,
                            province: response.data.data.carBookingWithDriver[0]?.plantId,
                            GL: response.data.data.carBookingWithDriver[0]?.GL,
                            cost_enter: response.data.data.carBookingWithDriver[0]?.cost_enter,
                            order: response.data.data.carBookingWithDriver[0]?.order,
                            overnight: response.data.data.carBookingWithDriver[0]?.overnight,
                        })

                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else if (cartype == '2') {
                setcarck5(true);
                settextcc("จองรถเช่าเหมาวัน(ไม่มีคนขับ)");
                let config5: AxiosRequestConfig = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/GetCarBookingNoDriverById/' + ids,
                    headers: {
                        'accept': '*/*',
                        'Authorization': "Bearer " + tokens
                    }
                };

                axios.request(config5)
                    .then((response) => {

                        seteditbutton(false);
                        let subdate = response.data.data.carBookingWithDriver[0]?.booking_date;
                        let subdate1 = subdate.split('/');
                        let subdate2 = response.data.data.carBookingWithDriver[0]?.startdate;
                        let subdate3 = subdate2.split('/');
                        let subdate4 = response.data.data.carBookingWithDriver[0]?.enddate;
                        let subdate5 = subdate4.split('/');
                        setStartDate(new Date(subdate1[2] + "-" + subdate1[1] + "-" + subdate1[0]))
                        setStartDate3(new Date(subdate3[2] + "-" + subdate3[1] + "-" + subdate3[0]))
                        setStartDate4(new Date(subdate5[2] + "-" + subdate5[1] + "-" + subdate5[0]))
                        if (response.data.data.carBookingWithDriver[0]?.employee_no == userId) {
                            seteditbutton(false);
                        } else {
                            seteditbutton(true);
                        }
                        // @ts-ignore
                        setform({
                            idcarbooking: response.data.data.carBookingWithDriver[0]?.idcarbooking,
                            PlantId: response.data.data.carBookingWithDriver[0]?.plantId,
                            employee_no: response.data.data.carBookingWithDriver[0]?.employee_no,
                            booking_date: response.data.data.carBookingWithDriver[0]?.booking_date,
                            bookingname: response.data.data.carBookingWithDriver[0]?.bookingname,
                            email: response.data.data.carBookingWithDriver[0]?.email,
                            agency: response.data.data.carBookingWithDriver[0]?.agency,
                            division: response.data.data.carBookingWithDriver[0]?.division,
                            tel: response.data.data.carBookingWithDriver[0]?.tel,
                            note: response.data.data.carBookingWithDriver[0]?.note,
                            typecar: response.data.data.carBookingWithDriver[0]?.typecar,
                            number_travelers: response.data.data.carBookingWithDriver[0]?.number_travelers,
                            number_cars: response.data.data.carBookingWithDriver[0]?.number_cars,
                            person_count: response.data.data.carBookingWithDriver[0]?.person_count,
                            countper1: response.data.data.carBookingWithDriver[0]?.person_count,
                            countper2: response.data.data.carBookingWithDriver[0]?.person_count2,
                            startdate: response.data.data.carBookingWithDriver[0]?.startdate,
                            enddate: response.data.data.carBookingWithDriver[0]?.enddate,
                            locationIn: response.data.data.carBookingWithDriver[0]?.locationIn,
                            timeIn: response.data.data.carBookingWithDriver[0]?.timeIn,
                            LocationOut: response.data.data.carBookingWithDriver[0]?.LocationOut,
                            timeOut: response.data.data.carBookingWithDriver[0]?.timeOut,
                            operational_area: response.data.data.carBookingWithDriver[0]?.operational_area,
                            upcountry: response.data.data.carBookingWithDriver[0]?.upcountry,
                            overnight_stay: response.data.data.carBookingWithDriver[0]?.overnight_stay,
                            person_responsible_for_expenses: response.data.data.carBookingWithDriver[0]?.person_responsible_for_expenses,
                            other: response.data.data.carBookingWithDriver[0]?.other,
                            number_of_trips: response.data.data.carBookingWithDriver[0]?.plantId,
                            province: response.data.data.carBookingWithDriver[0]?.plantId,
                            GL: response.data.data.carBookingWithDriver[0]?.GL,
                            cost_enter: response.data.data.carBookingWithDriver[0]?.cost_enter,
                            order: response.data.data.carBookingWithDriver[0]?.order,
                            overnight: response.data.data.carBookingWithDriver[0]?.overnight,
                        })
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else if (cartype == '3') {
                setcarck5(true);
                settextcc("จองรถรับส่งระหว่างวัน");
                let config5: AxiosRequestConfig = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/GetCarBookingPickupAndDropById/' + ids,
                    headers: {
                        'accept': '*/*',
                        'Authorization': "Bearer " + tokens
                    }
                };

                axios.request(config5)
                    .then((response) => {
                        console.log(response)

                        seteditbutton(false);
                        var ggg11 = response.data.data.carBookingWithDriver[0]?.bookingDate;
                        var ggg12 = response.data.data.carBookingWithDriver[0]?.startDate;
                        var ggg13 = response.data.data.carBookingWithDriver[0]?.endDate;
                        var ggg21 = ggg11.split('T')
                        var ggg22 = ggg12.split('T')
                        var ggg23 = ggg13.split('T')
                        let subdate = response.data.data.carBookingWithDriver[0]?.booking_date;
                        let subdate1 = ggg21[0].split('/');
                        let subdate2 = response.data.data.carBookingWithDriver[0]?.startdate;
                        let subdate3 = ggg22[0].split('/');
                        let subdate4 = response.data.data.carBookingWithDriver[0]?.enddate;
                        let subdate5 = ggg23[0].split('/');
                        setStartDate(new Date(subdate1[2] + "-" + subdate1[1] + "-" + subdate1[0]))
                        setStartDate3(new Date(subdate3[2] + "-" + subdate3[1] + "-" + subdate3[0]))
                        setStartDate4(new Date(subdate5[2] + "-" + subdate5[1] + "-" + subdate5[0]))
                        if (response.data.data.carBookingWithDriver[0]?.plantId == 2) {
                            setcarck3(false);
                        } else if (parseInt(response.data.data.carBookingWithDriver[0]?.plantId) == 1) {
                            setcarck4(true);
                        }
                        if (response.data.data.carBookingWithDriver[0]?.employee_no == userId) {
                            seteditbutton(false);
                        } else {
                            seteditbutton(true);
                        }
                        // @ts-ignore
                        setform({
                            idcarbooking: response.data.data.carBookingWithDriver[0]?.idCarBooking,
                            PlantId: response.data.data.carBookingWithDriver[0]?.plantId,
                            employee_no: response.data.data.carBookingWithDriver[0]?.employee_no,
                            booking_date: response.data.data.carBookingWithDriver[0]?.booking_date,
                            bookingname: response.data.data.carBookingWithDriver[0]?.bookingName,
                            email: response.data.data.carBookingWithDriver[0]?.email,
                            agency: response.data.data.carBookingWithDriver[0]?.agency,
                            division: response.data.data.carBookingWithDriver[0]?.division,
                            tel: response.data.data.carBookingWithDriver[0]?.tel,
                            note: response.data.data.carBookingWithDriver[0]?.note,
                            typecar: response.data.data.carBookingWithDriver[0]?.typecar,
                            number_travelers: response.data.data.carBookingWithDriver[0]?.number_Cars,
                            number_cars: response.data.data.carBookingWithDriver[0]?.number_Cars2,
                            number_cars1: response.data.data.carBookingWithDriver[0]?.number_Cars3,
                            countper1: response.data.data.carBookingWithDriver[0]?.person_count,
                            countper2: response.data.data.carBookingWithDriver[0]?.person_count2,
                            countper3: response.data.data.carBookingWithDriver[0]?.person_count3,
                            person_count: response.data.data.carBookingWithDriver[0]?.person_count,
                            startdate: response.data.data.carBookingWithDriver[0]?.startdate,
                            enddate: response.data.data.carBookingWithDriver[0]?.enddate,
                            locationIn: response.data.data.carBookingWithDriver[0]?.locationIn,
                            timeIn: response.data.data.carBookingWithDriver[0]?.timeIn,
                            LocationOut: response.data.data.carBookingWithDriver[0]?.locationOut,
                            timeOut: response.data.data.carBookingWithDriver[0]?.timeOut,
                            operational_area: response.data.data.carBookingWithDriver[0]?.operational_Area,
                            upcountry: response.data.data.carBookingWithDriver[0]?.upcountry,
                            overnight_stay: response.data.data.carBookingWithDriver[0]?.overnight_Stay,
                            person_responsible_for_expenses: response.data.data.carBookingWithDriver[0]?.person_responsible_for_expenses,
                            other: response.data.data.carBookingWithDriver[0]?.other,
                            number_of_trips: response.data.data.carBookingWithDriver[0]?.plantId,
                            province: response.data.data.carBookingWithDriver[0]?.plantId,
                            GL: response.data.data.carBookingWithDriver[0]?.gl,
                            cost_enter: response.data.data.carBookingWithDriver[0]?.cost_Enter,
                            order: response.data.data.carBookingWithDriver[0]?.order,
                            overnight: response.data.data.carBookingWithDriver[0]?.other,
                        })
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }


        handleopenedit(ids)
    }, []);


    const editdata = () => {
        if (cartype == "1") {
            let data = JSON.stringify({
                "idcarbooking": form.idcarbooking,
                "plantId": form.PlantId,
                "employee_no": form.employee_no,
                "drivername": "string",
                "booking_date": dayjs(form.booking_date, 'DD/MM/YYYY').format('YYYY/MM/DD'),
                "bookingname": form.bookingname,
                "email": form.email,
                "agency": form.agency,
                "division": form.division,
                "tel": form.tel,
                "note": form.note,
                "typecar": form.typecar,
                "number_travelers": form.number_travelers,
                "number_cars": form.number_cars1,
                "person_count": form.countcar1,
                "person_count2": form.countcar3,
                "startdate": dayjs(form.startdate, 'DD/MM/YYYY').format('YYYY/MM/DD'),
                "enddate": dayjs(form.enddate, 'DD/MM/YYYY').format('YYYY/MM/DD'),
                "locationIn": form.locationIn,
                "timeIn": form.timeIn,
                "LocationOut": form.LocationOut,
                "timeOut": form.timeOut,
                "operational_area": form.operational_area,
                "upcountry": form.upcountry,
                "overnight_stay": form.overnight_stay,
                "person_responsible_for_expenses": form.person_responsible_for_expenses,
                "other": form.other,
                "GL": form.GL,
                "cost_enter": form.cost_enter,
                "order": form.order,
                "status": 0,
                "status_approved": 0,
                "googleform": 0,
                "overnight": form.overnight,
                "employeeapproval": "string"
            });

            let config: AxiosRequestConfig = {
                method: 'put',
                maxBodyLength: Infinity,
                url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/UpdatetCarBookingWithDriver',
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    toast({
                        id: toastId4,
                        description: `แก้ไขข้อมูลสำเร็จ`,
                        status: "success",
                        duration: 3000,
                        isClosable: false,
                    })
                })
                .catch((error) => {
                    console.log(error);
                });

        } else if (cartype == "2") {
            let data = JSON.stringify({
                "idcarbooking": 0,
                "plantId": 0,
                "employee_no": "string",
                "drivername": "string",
                "booking_date": "string",
                "bookingname": "string",
                "email": "string",
                "agency": "string",
                "division": "string",
                "tel": "string",
                "code_employee": "string",
                "name_use_car": "string",
                "use_email": "string",
                "use_agency": "string",
                "use_division": "string",
                "tel_use_car": "string",
                "type_idcar": "string",
                "brand": "string",
                "idcar": "string",
                "pathfile": "string",
                "note": "string",
                "typecar": "string",
                "number_travelers": 0,
                "brand_cars1": "string",
                "person_count": 0,
                "number_cars": 0,
                "brand_cars2": "string",
                "person_count2": 0,
                "startdate": "string",
                "enddate": "string",
                "locationIn": "string",
                "timeIn": "string",
                "LocationOut": "string",
                "timeOut": "string",
                "operational_area": "string",
                "upcountry": "string",
                "overnight_stay": "string",
                "person_responsible_for_expenses": "string",
                "other": "string",
                "GL": "string",
                "cost_enter": "string",
                "order": "string",
                "status": 0,
                "status_approved": 0,
                "googleform": 0,
                "overnight": 0,
                "license_number": "string",
                "employeeapproval": "string"
            });

            let config: AxiosRequestConfig = {
                method: 'put',
                maxBodyLength: Infinity,
                url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/UpdateReserveCar_NoDriver',
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (cartype == "3") {
            let data = JSON.stringify({
                "idcarbooking": 0,
                "plantId": 0,
                "employee_no": "string",
                "driverName": "string",
                "booking_date": "string",
                "bookingname": "string",
                "email": "string",
                "agency": "string",
                "division": "string",
                "tel": "string",
                "note": "string",
                "typecar": "string",
                "number_travelers": 0,
                "person_count": 0,
                "number_cars": 0,
                "number_cars2": 0,
                "person_count2": 0,
                "startdate": "string",
                "enddate": "string",
                "locationIn": "string",
                "timeIn": "string",
                "LocationOut": "string",
                "timeOut": "string",
                "person_responsible_for_expenses": "string",
                "other": "string",
                "GL": "string",
                "cost_enter": "string",
                "order": "string",
                "status": 0,
                "status_approved": 0,
                "googleform": 0,
                "employeeapproval": "string",
                "person_count3": 0,
                "number_cars3": 0,
                "operational_area": "string",
                "upcountry": "string",
                "overnight_stay": "string"
            });

            let config: AxiosRequestConfig = {
                method: 'put',
                maxBodyLength: Infinity,
                url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/UpdateReserveCar_Pickup_and_drop',
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
    const [form, setform] = useState({
        idcarbooking: null,
        PlantId: "",
        employee_no: "",
        booking_date: "",
        bookingname: "",
        email: "",
        agency: "",
        division: "",
        tel: "",
        note: "",
        typecar: "",
        number_travelers: "0",
        number_cars: "0",
        number_cars1: "0",
        person_count: "0",
        startdate: "",
        enddate: "",
        locationIn: "",
        timeIn: "00:00",
        LocationOut: "",
        timeOut: "00:00",
        operational_area: "",
        upcountry: "",
        overnight_stay: "",
        person_responsible_for_expenses: "",
        other: "",
        number_of_trips: "",
        province: "",
        GL: "",
        cost_enter: "",
        order: "",
        overnight: "0",
        countcar1: 0,
        countper1: 0,
        countcar2: 0,
        countper2: 0,
        countcar3: 0,
        countper3: 0
    })

    const [startDate, setStartDate] = useState(new Date());
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )
    const [overlay, setOverlay] = React.useState(<OverlayOne />)
    const [editbutton, seteditbutton] = React.useState<boolean>(false);
    const [startDate1, setStartDate1] = useState(new Date());
    const [startDate2, setStartDate2] = useState(new Date());
    const [startDate3, setStartDate3] = useState(new Date());
    const [startDate4, setStartDate4] = useState(new Date());
    const handlebookingdate = (date: Date) => setform(prev => {
        const vl = new Date(date)
        setStartDate(date);
        return { ...prev, booking_date: [vl.getFullYear(), vl.getMonth() + 1, vl.getDate()].join('-') + " 03:54:07.6233333 +00:00" }
    });
    const handlebookingname = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => { return { ...prev, bookingname: event.target.value } })
    const handleemail = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => { return { ...prev, email: event.target.value } })
    const handleagency = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => { return { ...prev, agency: event.target.value } })
    const handledivision = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => { return { ...prev, division: event.target.value } })
    const handletel = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => {
        let isnumber = /^[0-9\b]*$/;
        if (isnumber.test(event.target.value)) {
            return { ...prev, tel: event.target.value }
        } else {
            return { ...prev }
        }

    })
    const handlenote = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => { return { ...prev, note: event.target.value } })
    const handletypecar = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => { return { ...prev, typecar: event.target.value } })
    const handlenumber_travelers = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => {
        let isnumber = /^[0-9\b]*$/;
        if (isnumber.test(event.target.value)) {
            return { ...prev, number_travelers: event.target.value }
        } else {
            return { ...prev }
        }
    });
    const handlenumber_cars = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => {
        let isnumber = /^[0-9\b]*$/;
        if (isnumber.test(event.target.value)) {
            return { ...prev, number_cars: event.target.value }
        } else {
            return { ...prev }
        }
    });
    const handlenumber_cars1 = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => {
        let isnumber = /^[0-9\b]*$/;
        if (isnumber.test(event.target.value)) {
            return { ...prev, number_cars1: event.target.value }
        } else {
            return { ...prev }
        }
    });

    const handlestartdate3 = (date: Date) => setform(prev => {
        const vl = new Date(date)
        setStartDate3(date);
        return { ...prev, startdate: [vl.getFullYear(), vl.getMonth() + 1, vl.getDate()].join('-') }
    })
    const handleenddate4 = (date: Date) => setform(prev => {
        const vl = new Date(date)
        setStartDate4(date);
        return { ...prev, enddate: [vl.getFullYear(), vl.getMonth() + 1, vl.getDate()].join('-') }
    })
    // @ts-ignore 
    const handlecountper1 = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => {
        let isnumber = /^[0-9\b]*$/;
        if (isnumber.test(event.target.value)) {
            return { ...prev, countper1: event.target.value }
        } else {
            return { ...prev }
        }
    })

    // @ts-ignore 
    const handlecountper2 = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => {
        let isnumber = /^[0-9\b]*$/;
        if (isnumber.test(event.target.value)) {
            return { ...prev, countper2: event.target.value }
        } else {
            return { ...prev }
        }
    })

    // @ts-ignore 
    const handlecountper3 = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => {
        let isnumber = /^[0-9\b]*$/;
        if (isnumber.test(event.target.value)) {
            return { ...prev, countper3: event.target.value }
        } else {
            return { ...prev }
        }
    })
    const handlelocationIn = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => { return { ...prev, locationIn: event.target.value } })
    const handletimeIn = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => { return { ...prev, timeIn: event.target.value } })
    const handlelocationOut = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => { return { ...prev, LocationOut: event.target.value } })
    const handletimeOut = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => { return { ...prev, timeOut: event.target.value } })
    const handleoperational_area = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => { return { ...prev, operational_area: event.target.value } })
    const handleovernight_stay = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => { return { ...prev, overnight_stay: event.target.value } })
    const handleperson_responsible_for_expenses = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => { return { ...prev, person_responsible_for_expenses: event.target.value } })
    const handleTrip = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => {
        let isnumber = /^[0-9\b]*$/;
        if (isnumber.test(event.target.value)) {
            return { ...prev, number_of_trips: event.target.value }
        } else {
            return { ...prev }
        }


    })
    const handlerovince = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => { return { ...prev, province: event.target.value } })
    const handleGL = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => { return { ...prev, GL: event.target.value } })
    const handlecost_enter = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => { return { ...prev, cost_enter: event.target.value } })
    const handleorder = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => { return { ...prev, order: event.target.value } })
    const handleovernight = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => { return { ...prev, overnight: event.target.value } })
    const handleother = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => { return { ...prev, other: event.target.value } })
    const onChanges1 = (time: Dayjs, timeString: string) => {
        var ggg = timeString
        if (typeof timeString === "string" && timeString.length === 0) {
            ggg = "00:00";
        }
        setform(prev => ({ ...prev, timeIn: ggg }));

    };
    const onChanges2 = (time: Dayjs, timeString: string) => {
        console.log(timeString);
        var ggg = timeString
        if (typeof timeString === "string" && timeString.length === 0) {
            ggg = "00:00";
        }
        setform(prev => ({ ...prev, timeOut: ggg }));

    };



    return (
        <>
            <Grid templateColumns='repeat(6, 1fr)'>
                <GridItem colSpan={6}>
                    <Box border="solid 1px #00A5A8" p={4} borderRadius={"10px"} justifySelf={"center"}>
                        <Text color={'#00A5A8'} p={4} fontSize='xl' as={'b'} className='lable-rentcar'>แก้ไข {textcc}</Text>
                        <Container maxW={"100%"} mt={5}>
                            <Grid
                                templateRows='repeat(2, 1fr)'
                                templateColumns='repeat(6, 1fr)'
                                gap={4}>
                                <GridItem colSpan={2} >
                                    <FormControl >
                                        <FormLabel className='lable-rentcar'>วันที่จองรถ</FormLabel>
                                        <DatePicker disabled={disread} required dateFormat="dd-MM-yyyy" wrapperClassName='date_picker full-width' selected={startDate} onChange={handlebookingdate} />
                                        <DatePickerWrapperStyles />
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={4} />
                                <GridItem colSpan={2}>
                                    <FormControl>

                                        <FormLabel className='lable-rentcar'>ชื่อผู้จองรถ</FormLabel>
                                        <Input disabled={disread} type='search' required style={{ border: '1px #00AAAD solid' }} name="bookingname" value={form.bookingname} onChange={handlebookingname} />

                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={2}>
                                    <FormControl>
                                        <FormLabel className='lable-rentcar'>Email</FormLabel>
                                        <Input disabled={disread} type='search' required style={{ border: '1px #00AAAD solid' }} name="email" value={form.email} onChange={handleemail} />

                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={2} />
                                <GridItem colSpan={2}>
                                    <FormControl>
                                        <FormLabel className='lable-rentcar'>หน่วยงาน</FormLabel>
                                        <Input required disabled={disread} type='search' style={{ border: '1px #00AAAD solid' }} name="agency" value={form.agency} onChange={handleagency} />
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={2}>
                                    <FormControl>
                                        <FormLabel className='lable-rentcar'>ส่วนงาน</FormLabel>
                                        <Input required type='search' disabled={disread} style={{ border: '1px #00AAAD solid' }} name="division" value={form.division} onChange={handledivision} />
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={2}>
                                    <FormControl>
                                        <FormLabel className='lable-rentcar'>เบอร์โทรศัพท์</FormLabel>
                                        <Input disabled={disread} required placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} type='search' onChange={handletel} name='search' pattern="[0-9]*" value={form.tel} />
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={4}>
                                    <FormControl >
                                        <FormLabel className='lable-rentcar'>วัตถุประสงค์ในการจองรถ</FormLabel>
                                        <Input disabled={disread} required type='search' placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} onChange={handlenote} value={form.note} name='note' />
                                        {/* {isError &&
                                <FormErrorMessage>Email is required.</FormErrorMessage>
                            } */}
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={6}>

                                    <FormControl>

                                        <FormLabel className='lable-rentcar'>ประเภทรถที่ขอ</FormLabel>
                                        <Flex>
                                            <Checkbox disabled={disread} colorScheme='green' marginRight={"30px"} isChecked={ckcar1} >
                                                รถตู้
                                            </Checkbox>
                                            <FormLabel className='lable-rentcar' style={{ marginTop: "10px" }}>จำนวนคัน</FormLabel>
                                            <Stack direction='row' alignItems={"baseline"}>

                                                <Input isDisabled={!ckcar1} style={{ border: '1px #00AAAD solid', margin: "0px 10px" }} maxWidth={"100"} value={form.number_travelers} onChange={handlenumber_travelers} name='number_travelers' type='search' pattern="[0-9]*" />

                                            </Stack>
                                            <Stack direction='row' alignItems={"baseline"}>
                                                <FormLabel className='lable-rentcar'>จำนวนผู้เดินทาง</FormLabel>
                                                <Input type='search' required isDisabled={!ckcar1} style={{ border: '1px #00AAAD solid', margin: "0px 10px" }} value={form.countper1} onChange={handlecountper1} maxWidth={"100"} />
                                            </Stack>
                                        </Flex>
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={6}>
                                    <FormControl hidden={carck4}>
                                        <Flex>
                                            <Checkbox disabled={disread} colorScheme='green' marginRight={"20px"} isChecked={ckcar2} >
                                                รถกระบะ
                                            </Checkbox>
                                            <FormLabel className='lable-rentcar' style={{ marginTop: "10px" }}>จำนวนคัน</FormLabel>
                                            <Stack direction='row' alignItems={"baseline"}>
                                                <Input isDisabled={!ckcar2} style={{ border: '1px #00AAAD solid', margin: "0px 10px" }} maxWidth={"100"} value={form.number_cars} onChange={handlenumber_cars} type='search' name='number_cars' />

                                            </Stack>
                                            <Stack direction='row' alignItems={"baseline"}>
                                                <FormLabel className='lable-rentcar'>จำนวนผู้เดินทาง</FormLabel>
                                                <Input type='search' required isDisabled={!ckcar2} style={{ border: '1px #00AAAD solid', margin: "0px 10px" }} value={form.countper2} onChange={handlecountper2} maxWidth={"100"} />
                                            </Stack>
                                        </Flex>

                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={6}>
                                    <FormControl hidden={carck3}>
                                        <Flex>
                                            <Checkbox disabled={disread} colorScheme='green' marginRight={"20px"} isChecked={ckcar2} >
                                                รถเก๋ง
                                            </Checkbox>
                                            <FormLabel className='lable-rentcar' style={{ marginTop: "10px" }}>จำนวนคัน</FormLabel>
                                            <Stack direction='row' alignItems={"baseline"}>
                                                <Input isDisabled={!ckcar2} style={{ border: '1px #00AAAD solid', margin: "0px 10px" }} maxWidth={"100"} value={form.number_cars1} onChange={handlenumber_cars1} type='search' name='number_cars' />

                                            </Stack>
                                            <Stack direction='row' alignItems={"baseline"}>
                                                <FormLabel className='lable-rentcar'>จำนวนผู้เดินทาง</FormLabel>
                                                <Input type='search' required isDisabled={!ckcar2} style={{ border: '1px #00AAAD solid', margin: "0px 10px" }} value={form.countper3} onChange={handlecountper3} maxWidth={"100"} />
                                            </Stack>
                                        </Flex>

                                    </FormControl>
                                </GridItem>

                                <GridItem colSpan={6} />
                                <GridItem colSpan={2}>
                                </GridItem>
                                <GridItem colSpan={4} />
                                <GridItem colSpan={2}>
                                    <FormControl >
                                        <FormLabel className='lable-rentcar'>วันที่ใช้รถเริ่มต้น</FormLabel>
                                        <DatePicker disabled={disread} required placeholderText='วัน-เดือน-ปี' dateFormat="dd-MM-yyyy" minDate={new Date()} wrapperClassName='date_picker full-width' selected={startDate3} onChange={handlestartdate3} />
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={2}>
                                    <FormControl >
                                        <FormLabel className='lable-rentcar'>วันที่ใช้รถสิ้นสุด</FormLabel>
                                        <DatePicker disabled={disread} required placeholderText='วัน-เดือน-ปี' dateFormat="dd-MM-yyyy" minDate={new Date()} wrapperClassName='date_picker full-width' selected={startDate4} onChange={handleenddate4} />
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={2} />
                                <GridItem colSpan={2}>
                                    <FormControl>
                                        <FormLabel className='lable-rentcar'>สถานที่รับ</FormLabel>
                                        <Input type='search' disabled={disread} required placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} value={form.locationIn} onChange={handlelocationIn} />
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={2}>
                                    <FormControl>
                                        <FormLabel className='lable-rentcar'>เวลา</FormLabel>
                                        <TimePicker disabled={disread} required onChange={onChanges1} value={dayjs(form.timeIn, "HH:mm")} format="HH:mm" />
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={2} />
                                <GridItem colSpan={2}>
                                    <FormControl>
                                        <FormLabel className='lable-rentcar'>สถานที่ส่ง</FormLabel>
                                        <Input type='search' disabled={disread} required placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} value={form.LocationOut} onChange={handlelocationOut} />
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={2}>
                                    <FormControl>
                                        <FormLabel className='lable-rentcar'>เวลา</FormLabel>
                                        <TimePicker required onChange={onChanges2} disabled={disread} value={dayjs(form.timeOut, "HH:mm")} format="HH:mm" />
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={2} />
                                <GridItem colSpan={2} hidden={carck5}>
                                    <FormControl>
                                        <FormLabel className='lable-rentcar'>พื้นที่การปฏิบัติงาน</FormLabel>
                                        <Select disabled={disread} required placeholder='เลือกพื้นที่การปฏิบัติงาน' style={{ border: '1px #00AAAD solid' }} value={form.operational_area} onChange={handleoperational_area}>
                                            <option value='option1'>กรุงเทพฯ/ปริมณฑล</option>
                                            <option value='option2'>ต่างจังหวัด</option>
                                        </Select>
                                    </FormControl>
                                </GridItem>
                                {
                                    form.operational_area == "option2" ?
                                        <GridItem colSpan={2} hidden={carck5}>
                                            <FormControl>
                                                <FormLabel className='lable-rentcar'>จังหวัด</FormLabel>
                                                <Input disabled={disread} type='search' required placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} value={form.upcountry} onChange={handlerovince} />
                                            </FormControl>
                                        </GridItem>
                                        :
                                        <GridItem colSpan={2} />
                                }
                                <GridItem colSpan={2} />
                                <GridItem colSpan={2} hidden={carck5}>
                                    <FormControl>
                                        <FormLabel className='lable-rentcar'>ข้อมูลการพักค้างคืน</FormLabel>
                                        <Select disabled={disread} required placeholder='เลือกข้อมูลการพักค้างคืน' style={{ border: '1px #00AAAD solid' }} value={form.overnight_stay} onChange={handleovernight_stay}>
                                            <option value='option1'>ค้างคืน</option>
                                            <option value='option2'>ไม่ค้างคืน</option>
                                        </Select>
                                    </FormControl>
                                </GridItem>
                                {
                                    form.overnight_stay == "option1" ?
                                        <GridItem colSpan={2} hidden={carck5}>
                                            <FormControl>
                                                <FormLabel className='lable-rentcar'>จำนวนวันที่ค้างคืน (วัน)</FormLabel>
                                                <Input disabled={disread} type='search' required placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} value={form.overnight} onChange={handleovernight} />
                                            </FormControl>
                                        </GridItem>
                                        :
                                        <GridItem colSpan={2} />
                                }

                                <GridItem colSpan={2} hidden={carck5} />
                                <GridItem colSpan={2}>
                                    <FormControl>
                                        <FormLabel className='lable-rentcar'>ผู้รับผิดชอบค่าใช้จ่าย</FormLabel>
                                        <Select disabled={disread} required onChange={handleperson_responsible_for_expenses} name='pay' placeholder='เลือกผู้รับผิดชอบค่าใช้จ่าย' style={{ border: '1px #00AAAD solid' }} value={form.person_responsible_for_expenses}>
                                            <option value='1'>SKC</option>
                                            <option value='2'>อื่นๆ</option>
                                        </Select>
                                    </FormControl>
                                </GridItem>
                                {
                                    form.person_responsible_for_expenses == "2" ?
                                        <GridItem colSpan={4}>
                                            <FormControl>
                                                <FormLabel className='lable-rentcar'>รายละเอียด</FormLabel>
                                                <Input type='search' disabled={disread} required placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} value={form.other} onChange={handleother} />
                                            </FormControl>
                                        </GridItem>

                                        :
                                        <GridItem colSpan={4} />
                                }
                                <GridItem colSpan={2}>
                                    <FormControl>
                                        <FormLabel className='lable-rentcar'>GL</FormLabel>
                                        <Input type='search' required placeholder='กรุณากรอกข้อมูล' disabled={disread} style={{ border: '1px #00AAAD solid' }} value={form.GL} onChange={handleGL} />
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={2}>
                                    <FormControl>
                                        <FormLabel className='lable-rentcar'>Cost Center</FormLabel>
                                        <Input type='search' required placeholder='กรุณากรอกข้อมูล' disabled={disread} style={{ border: '1px #00AAAD solid' }} id='cost-enter' name='cost-enter' value={form.cost_enter} onChange={handlecost_enter} />
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={2}>
                                    <FormControl>
                                        <FormLabel className='lable-rentcar'>Order</FormLabel>
                                        <Input disabled={disread} type='search' required placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} id='cost-enter' name='cost-enter' value={form.order} onChange={handleorder} />
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={4}>
                                    <Button hidden={editbutton} onClick={editdata} className='lable-rentcar' type='submit' colorScheme='teal' size='md' px={'10'} py={'5'} mb={"20px"}>
                                        แก้ไขข้อมูล
                                    </Button>

                                </GridItem>
                            </Grid>
                        </Container>
                    </Box>
                </GridItem>

            </Grid>
        </>
    )
}

export default StatusRentCarDetail