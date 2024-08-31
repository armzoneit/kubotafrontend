import { Box, Button, Flex, FormControl, Checkbox, FormLabel, Grid,useDisclosure, GridItem, Input, Radio, RadioGroup, Select, Stack, useToast, Text, ModalOverlay, Container } from '@chakra-ui/react'
import axios, { AxiosRequestConfig } from 'axios';
import React, { useEffect, useState } from 'react'
import { localStorageLoad } from '../../../utils/localStrorage';

import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import styled, { css, createGlobalStyle } from 'styled-components';
import { TimePicker } from 'antd';
import { useRouter } from "next/router"
import { SearchIcon } from '@chakra-ui/icons';
import { getMe } from "../../../data-hooks/me/getMe"
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
    const me = getMe()
    const [textcc, settextcc] = useState<string>("");
    const [disread, setdisread] = useState<boolean>(false);
    const [cards,setcards] = useState<boolean>(true);
    const [approvedbutton, setapprovedbutton] = React.useState<boolean>(false);

    const [carck3, setcarck3] = useState<boolean>(false);
    const [carck4, setcarck4] = useState<boolean>(false);
    const [loading,setloading] = useState<boolean>(false);
    const [carck5, setcarck5] = useState<boolean>(false);
    const [carck6, setcarck6] = useState<boolean>(false);
    const [ckcar1, setckcar1] = useState<boolean>(false);
    const [ckcar2, setckcar2] = useState<boolean>(false);
    const [ckcar20, setckcar20] = useState<boolean>(false);
    const [namefile,setnamefile] = useState<string>("");

    const [brand1,setbrand1] = useState<boolean>(true);
    const [brand2,setbrand2] = useState<boolean>(true);
    

    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toastId4 = "success"

    const router = useRouter()
    const ids = data.booking_id ? data.booking_id : router.query?.ids;
    const cartype = data.typecar ? data.typecar : router.query?.cartype;
    const handle_idcar = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { 
        return {...prev,idcar:event.target.value}


    });
    const [showfile,setshowfile] = useState<boolean>(true)
    const [pictureFile, setpictureFile] = useState(null);
    const [imageshow,setimageshow] = useState("gibbresh.png");
    const pictureChangeHandler = event => {
        setpictureFile(event.target.files[0]);
        setnamefile(event.target.files[0].name)
        setimageshow(URL.createObjectURL(event.target.files[0]));
        setshowfile(false);
    };

    const handleapproved = () => {
        setloading(true)
        const tokens = localStorageLoad("token")
        let data = JSON.stringify({
            "type": cartype,
            "BookingNo": form.idcarbooking,
        });
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/ApprovalStatus/' + cartype + '/' + form.idcarbooking,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tokens
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(response);
                onClose();
                toast({
                    id: toastId4,
                    description: `อนุมัติสำเร็จ`,
                    status: "success",
                    duration: 3000,
                    isClosable: false,
                })
                setTimeout(()=>{
                    setloading(false);
                    window.location.reload();
                },3000);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    console.log('data', data);
    console.log('ids', ids);
    console.log('cartype', cartype);
    const handlebrand1 = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,brand_cars1:event.target.value}})
    const handlebrand2 = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,brand_cars2:event.target.value}})
    useEffect(() => {
        const handleopenedit = (ids: any) => {
            console.log('userId', userId);
            setcards(true)
            setcarck3(true);
            setcarck4(false);
            setcarck5(false);
            setdisread(false);
            if (cartype == '1') {
                setcarck3(false);
                setcarck4(true);
                setbrand1(true);
                setbrand2(true);
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
                        console.log(response)
                        seteditbutton(false);
                        setapprovedbutton(true);
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
                            setapprovedbutton(true);
                        } else {
                            if(data.fix){
                                seteditbutton(false);
                            }else{
                                seteditbutton(true);
                                
                            }
                            response.data.data.approval.map((e, v) => {
                                console.log("ckck",me?.data?.data?.myHrEmployee.employeeNo,e.employeeApproval);
                                if (me?.data?.data?.myHrEmployee.employeeNo == e.employeeApproval) {
                                    setapprovedbutton(false);
                                }
                            });
                        }
                        if (response.data.data.carBookingWithDriver[0]?.employee_no != userId) {
                            if(data.fix){
                                setdisread(false);
                            }else{
                                setdisread(true);
                            }
                        }
                        if(response.data.data.carBookingWithDriver[0]?.number_travelers != 0){
                            setckcar1(true);
                        }
                        if(response.data.data.carBookingWithDriver[0]?.number_cars != 0){
                            setckcar20(true)
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
                            number_cars1: response.data.data.carBookingWithDriver[0]?.number_cars3,
                            person_count: response.data.data.carBookingWithDriver[0]?.person_count,
                            countper1: response.data.data.carBookingWithDriver[0]?.person_count,
                            countper2: response.data.data.carBookingWithDriver[0]?.person_count2,
                            countper3: response.data.data.carBookingWithDriver[0]?.person_count2,
                            startdate: subdate3[2] + "-" + subdate3[1] + "-" + subdate3[0],
                            enddate: subdate5[2] + "-" + subdate5[1] + "-" + subdate5[0],
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
                setcarck3(false);
                setbrand1(false);
                setbrand2(false);
                setcards(false)
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
                        console.log("fix",data.fix)
                        console.log(response);
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
                        setapprovedbutton(true);
                        if (response.data.data.carBookingWithDriver[0]?.employee_no == userId) {
                            console.log("gg1");
                            seteditbutton(false);
                            setapprovedbutton(true);
                        }else {
                            if(data.fix){
                                console.log("gg2");
                                seteditbutton(false);
                            }else{
                                console.log("gg3");
                                seteditbutton(true);
                                
                            }
                            response.data.data.approval.map((e, v) => {
                                if (me?.data?.data?.myHrEmployee.employeeNo == e.employeeApproval) {
                                    setapprovedbutton(false);
                                }
                            });
                        }
                        if(response.data.data.carBookingWithDriver[0]?.pathfile != ""){
                            console.log(response.data.data.carBookingWithDriver[0].pathfile,"Image")
                            fetch("/cardImage/"+response.data.data.carBookingWithDriver[0]?.pathfile)
                            .then(response => response.blob())
                            .then(blob => {
                                setpictureFile(blob);
                                setnamefile(response.data.data.carBookingWithDriver[0]?.pathfile)
                                setimageshow(URL.createObjectURL(blob));
                                setshowfile(false);
                            });
                            // var imagecc = new Image();
                            // imagecc.onload = function(){
                            //     console.log(imagecc.target.files[0])
                            //     setpictureFile(imagecc);
                            //     setnamefile(response.data.data.carBookingWithDriver[0]?.pathfile)
                            //     setimageshow(URL.createObjectURL(imagecc));
                            //     setshowfile(false);
                            // }
                            // imagecc.src = "/cardImage/"+response.data.data.carBookingWithDriver[0]?.pathfile;
                        }
                        if (response.data.data.carBookingWithDriver[0]?.employee_no != userId) {
                            if(data.fix){
                                setdisread(false);
                            }else{
                                setdisread(true);
                            }
                        }
                        if(response.data.data.carBookingWithDriver[0]?.number_cars != 0){
                            setckcar2(true);
                        }
                        if(response.data.data.carBookingWithDriver[0]?.number_travelers != 0){
                            setckcar20(true)
                        }
                        
                        // @ts-ignore
                        setform({
                            idcarbooking: response.data.data.carBookingWithDriver[0]?.idcarbooking,
                            license_number:response.data.data.carBookingWithDriver[0]?.license_number,
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
                            number_cars1:response.data.data.carBookingWithDriver[0]?.number_travelers,
                            person_count: response.data.data.carBookingWithDriver[0]?.person_count,
                            countper1: response.data.data.carBookingWithDriver[0]?.person_count,
                            countper2: response.data.data.carBookingWithDriver[0]?.person_count2,
                            countper3:response.data.data.carBookingWithDriver[0]?.person_count,
                            startdate: subdate3[2] + "-" + subdate3[1] + "-" + subdate3[0],
                            enddate: subdate5[2] + "-" + subdate5[1] + "-" + subdate5[0],
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
                            code_employee: response.data.data.carBookingWithDriver[0]?.code_employee,
                            name_use_car:response.data.data.carBookingWithDriver[0]?.name_use_car,
                            email_employee:response.data.data.carBookingWithDriver[0]?.use_email,
                            agency_employee:response.data.data.carBookingWithDriver[0]?.use_agency,
                            division_employee:response.data.data.carBookingWithDriver[0]?.use_division,
                            tel_use_car:response.data.data.carBookingWithDriver[0]?.tel_use_car,
                            brand_cars1:response.data.data.carBookingWithDriver[0]?.brand_cars2,
                            brand_cars2:response.data.data.carBookingWithDriver[0]?.brand_cars1,
                        })
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else if (cartype == '3') {
                setcarck6(true)
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
                        setapprovedbutton(true);
                        let subdate1 = ggg21[0].split('-');
                        let subdate2 = response.data.data.carBookingWithDriver[0]?.startDate;
                        let subdate3 = ggg22[0].split('-');
                        let subdate4 = response.data.data.carBookingWithDriver[0]?.endDate;
                        let subdate5 = ggg23[0].split('-');
                        console.log(subdate1);
                        console.log(subdate3);
                        console.log(subdate5);
                        setStartDate(new Date(ggg21[0]))
                        setStartDate3(new Date(ggg22[0]))
                        setStartDate4(new Date(ggg23[0]))
                        console.log("ggggg5555");
                        if (response.data.data.carBookingWithDriver[0]?.plantId == 2) {
                            setcarck3(false);
                        } else if (parseInt(response.data.data.carBookingWithDriver[0]?.plantId) == 1) {
                            setcarck4(true);
                        }
                        if (response.data.data.carBookingWithDriver[0]?.employee_no == userId) {
                            seteditbutton(false);
                            setapprovedbutton(true);
                        }else {
                            if(data.fix){
                                seteditbutton(false);
                            }else{
                                seteditbutton(true);
                                
                            }
                            response.data.data.approval.map((e, v) => {
                                if (me?.data?.data?.myHrEmployee.employeeNo == e.employeeApproval) {
                                    setapprovedbutton(false);
                                }
                            });
                        }
                        if (response.data.data.carBookingWithDriver[0]?.employee_no != userId) {
                            if(data.fix){
                                setdisread(false);
                            }else{
                                setdisread(true);
                            }
                        }
                        // @ts-ignore
                        if(response.data.data.carBookingWithDriver[0]?.number_Cars != 0){
                            setckcar1(true);
                        }
                        if(response.data.data.carBookingWithDriver[0]?.number_Cars2 != 0){
                            setckcar2(true)
                        }
                        if(response.data.data.carBookingWithDriver[0]?.number_Cars3 != 0){
                            setckcar20(true)
                        }
                        setform({
                            idcarbooking: response.data.data.carBookingWithDriver[0]?.idCarBooking,
                            PlantId: response.data.data.carBookingWithDriver[0]?.plantId,
                            employee_no: response.data.data.carBookingWithDriver[0]?.employee_no,
                            booking_date: ggg21[0],
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
                            startdate: ggg22[0],
                            enddate: ggg23[0],
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
    }, [me.isLoading]);


    const editdata = () => {
        if (cartype == "1") {
            var vl = new Date(startDate);
            let data = JSON.stringify({
                "idcarbooking": form.idcarbooking,
                "plantId": form.PlantId,
                "employee_no": form.employee_no,
                "drivername": "string",
                "booking_date": [vl.getFullYear(), vl.getMonth()+1, vl.getDate()].join('-')+" 03:54:07.6233333 +00:00",
                "bookingname": form.bookingname,
                "email": form.email,
                "agency": form.agency,
                "division": form.division,
                "tel": form.tel,
                "note": form.note,
                "typecar": form.typecar,
                "number_travelers": form.number_travelers,
                "number_cars": form.number_cars1,
                "number_cars3": form.number_cars,
                "person_count": form.countper1,
                "person_count2": form.countper3,
                "person_count3": form.countper2,
                "startdate": form.startdate,
                "enddate": form.enddate,
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
            var vl = new Date(startDate);
            let data555 = JSON.stringify({
                "idcarbooking": form.idcarbooking,
                "plantId": form.PlantId,
                "employee_no": form.employee_no,
                "drivername": "string",
                "booking_date": [vl.getFullYear(), vl.getMonth()+1, vl.getDate()].join('-')+" 03:54:07.6233333 +00:00",
                "bookingname": form.bookingname,
                "email": form.email,
                "agency": form.agency,
                "division": form.division,
                "tel": form.tel,
                "note": form.note,
                "typecar": form.typecar,
                "number_travelers": form.number_cars1,
                "number_cars": form.number_cars,

                "brand_cars1": form.brand_cars2,
                "brand_cars2": form.brand_cars1,
                "startdate": form.startdate,
                "enddate": form.enddate,
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
                "employeeapproval": "string",
                "code_employee": form.code_employee,
                "name_use_car": form.name_use_car,
                "use_email": form.email_employee,
                "use_agency": form.agency_employee,
                "use_division": form.division_employee,
                "tel_use_car": form.tel_use_car,
                "license_number":form.license_number,
                "person_count": parseInt(form.countper3),
                "person_count2": parseInt(form.countper2),
                

            });
            console.log("ggggg",data555);
            let config: AxiosRequestConfig = {
                method: 'put',
                maxBodyLength: Infinity,
                url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/UpdateReserveCar_NoDriver',
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json'
                },
                data: data555
            };

            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
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
        } else if (cartype == "3") {
            var vl = new Date(startDate);
            let data = JSON.stringify({
                "idcarbooking": form.idcarbooking,
                "plantId": form.PlantId,
                "employee_no": form.employee_no,
                "drivername": "string",
                "booking_date": [vl.getFullYear(), vl.getMonth()+1, vl.getDate()].join('-')+" 03:54:07.6233333 +00:00",
                "bookingname": form.bookingname,
                "email": form.email,
                "agency": form.agency,
                "division": form.division,
                "tel": form.tel,
                "note": form.note,
                "typecar": form.typecar,
                "number_travelers": form.number_travelers,
                "number_cars": form.number_travelers,
                "number_cars2": form.number_cars,
                "number_cars3":form.number_cars1,
                "person_count": form.countper1,
                "person_count2": form.countper2,
                "person_count3":form.countper3,
                "startdate": form.startdate,
                "enddate": form.enddate,
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
        countper3: 0,
        license_number:"",
        code_employee:"",
        name_use_car:"",
        email_employee:"",
        agency_employee:"",
        division_employee:"",
        tel_use_car:"",
        brand_cars1:"",
        brand_cars2:""
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
    const handlecode_employee = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { 
        
        let config1 = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/employee2/'+event.target.value,
            headers: { 
              'Authorization': 'Bearer '+tokens
            }
          };
          
          axios.request(config1)
          .then((response) => {
            if(response.data?.data == null){
                setform(prev => ({...prev,name_use_car:""}))
                setform(prev => ({...prev,email_employee:""}))
                setform(prev => ({...prev,agency_employee:""}))
                setform(prev => ({...prev,division_employee:""}))
            }else{
                console.log("bbb",response)
                console.log((response.data));
                setform(prev => ({...prev,name_use_car:response?.data?.data?.firstName+" "+response?.data?.data?.lastName}))
                setform(prev => ({...prev,email_employee:response?.data?.data?.email}))
                setform(prev => ({...prev,agency_employee:response?.data?.data?.jobName}))
                setform(prev => ({...prev,division_employee:response?.data?.data?.positionName}))
            }
          })
          .catch((error) => {
            console.error(error)
            setform(prev => ({...prev,name_use_car:""}))
            setform(prev => ({...prev,email_employee:""}))
            setform(prev => ({...prev,agency_employee:""}))
            setform(prev => ({...prev,division_employee:""}))
          });
        
        return {...prev,code_employee:event.target.value}
    })
    const handlename_use_car = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,name_use_car:event.target.value}})
    const handletel_use_car = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { 
        
        let isnumber = /^[0-9\b]*$/;
        if(isnumber.test(event.target.value))
            {
                return {...prev,tel_use_car:event.target.value}
            }else{
                return {...prev}
            }
    })
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
    const [dateminend, setdateminend] = useState(new Date())
    const handlestartdate = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { 
        const vl = new Date(event)
        const dal1 = [vl.getFullYear(), vl.getMonth()+1, vl.getDate()].join('-');
        setStartDate3(event);
        console.log(dal1)
        setdateminend(new Date([vl.getFullYear(), vl.getMonth()+1, vl.getDate()].join('-')))
        
        if(dal1 == form.enddate)
            {
                sethours([])
                setform(prev => ({...prev,timeIn:"00:00"}));
                setform(prev => ({...prev,timeOut:"00:00"}));
            }else{
                sethours([])
            }
        return {...prev,startdate:[vl.getFullYear(), vl.getMonth()+1, vl.getDate()].join('-')}
    })
    const range = (start: number, end: number) => {
        const result = [];
        for (let i = start; i < end; i++) {
          result.push(i);
        }
        return result;
      };
    
      const [hours,sethours] = useState([])
      const [minutes,setminutes] = useState([])
      const disabledDateTime = () => ({
          disabledHours: () => hours,
          disabledMinutes: () => minutes,
        });
      const handleenddate = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { 
          const vl = new Date(event)
          setStartDate4(event);
          const datl = [vl.getFullYear(), vl.getMonth()+1, vl.getDate()].join('-');
          console.log(event);
          if(form.startdate == datl)
              {
                  sethours([])
                  setform(prev => ({...prev,timeIn:"00:00"}));
                  setform(prev => ({...prev,timeOut:"00:00"}));
              }else{
                  sethours([])
              }
          return {...prev,enddate:[vl.getFullYear(), vl.getMonth()+1, vl.getDate()].join('-')}
      })

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
        if(typeof timeString === "string" && timeString.length === 0)
            {
                ggg = "00:00";
            }
        setform(prev => ({...prev,timeIn:ggg}));
        if(form.startdate == form.enddate)
        {
            sethours([])
            
            let subhours = ggg.split(":")
            
            sethours(range(0,parseInt(subhours[0])))
            setminutes([0])
        }else{
            sethours([])
        }
      };
      const onChanges2 = (time: Dayjs, timeString: string) => {
        var ggg = timeString
        if(typeof timeString === "string" && timeString.length === 0)
            {
                ggg = "";
            }

        if(form.startdate == form.enddate)
        {
            if(ggg != null && ggg != undefined && ggg != ""){
                
                sethours([])
                setform(prev => ({...prev,timeOut:ggg}));

                let subhours = ggg.split(":")
                sethours(range(0,parseInt(subhours[0])))
            }
        }else{
            if(ggg != null && ggg != undefined && ggg != ""){
                sethours([])
                setform(prev => ({...prev,timeOut:ggg}));
            }
        }
        
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
                                <GridItem colSpan={2}>
                        <FormControl isRequired hidden={cards}>
                            <FormLabel className='lable-rentcar'>รหัสพนักงานผู้ใช้งาน</FormLabel>
                            <Input type='search' placeholder='กรุณากรอกข้อมูล'  style={{ border: '1px #00AAAD solid' }} disabled={disread}  required value={form.code_employee} onChange={handlecode_employee} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2} hidden={cards}>
                        <FormControl >
                            <FormLabel className='lable-rentcar'>ชื่อผู้ใช้รถ</FormLabel>
                            <Input type='search' placeholder='Auto' readOnly style={{ border: '1px #00AAAD solid' }} disabled={disread} required value={form.name_use_car} onChange={handlename_use_car} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2} hidden={cards}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>Email</FormLabel>
                            <Input type='search' placeholder='Auto' style={{ border: '1px #00AAAD solid' }} disabled={disread} required value={form.email_employee} readOnly />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2} hidden={cards}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>ตำแหน่ง</FormLabel>
                            <Input type='search' placeholder='Auto' style={{ border: '1px #00AAAD solid' }} disabled={disread}  required value={form.agency_employee} readOnly />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2} hidden={cards}>
                        <FormControl >
                            <FormLabel className='lable-rentcar'>ส่วนงาน</FormLabel>
                            <Input type='search' placeholder='Auto' style={{ border: '1px #00AAAD solid' }} disabled={disread} required value={form.division_employee} readOnly />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2} hidden={cards}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>เบอร์โทรศัพท์ผู้ใช้รถ</FormLabel>
                            <Input type='search' placeholder='กรุณากรอกข้อมูล'  style={{ border: '1px #00AAAD solid' }} disabled={disread} required pattern="[0-9]*" onChange={handletel_use_car} name='phone' value={form.tel_use_car} />
                        </FormControl>
                    </GridItem>
                                
                                <GridItem colSpan={3} hidden={cards}>
                                    <FormControl isRequired>
                                        <FormLabel className='lable-rentcar'>ข้อมูลใบขับขี่บริษัท</FormLabel>
                                        <RadioGroup value={"1"} >
                                            <Stack direction='row' alignItems={"baseline"} >
                                                <Radio value='1' defaultChecked>มีใบขับขี่ เลขที่ </Radio><Input style={{ border: '1px #00AAAD solid', width: '150px' }} disabled={disread} value={form.license_number} onChange={handle_idcar}  required />
                                            </Stack>
                                        </RadioGroup>
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={3} hidden={cards} >
                                <FormLabel className='lable-rentcar'>แนบไฟล์ใบขับขี่</FormLabel>
                                    <FormControl isRequired my={"-1.5"} style={{marginTop:"-30px"}}>
                                        <FormLabel style={{display:"inline-block"}} htmlFor="file-input" id='file-input-label' className='lable-rentcar'>แนบไฟล์ใบขับขี่</FormLabel>
                                        <Input type='file' style={{ border: '0px solid', color: '#00AAAD' }}  id="file-input" name="file-input" disabled={disread}  onChange={pictureChangeHandler}/>
                                        {/* <label id="file-input-label" htmlFor="file-input">แนบไฟล์ใบขับขี่ </label> */}
                                        <Button isDisabled={showfile} onClick={(e)=>{window.open(imageshow,"_blank")}} className='lable-rentcar'  colorScheme='teal' size='md' px={'2'} py={'2'} mb={"10px"} type="button"><SearchIcon /></Button>
                                        
                                    </FormControl>
                                    <FormLabel className='lable-rentcar'>{namefile}</FormLabel>
                                </GridItem>
                                <GridItem colSpan={6} >
                                    <FormControl >
                                        <FormLabel className='lable-rentcar'>วัตถุประสงค์ในการจองรถ</FormLabel>
                                        <Input disabled={disread} required type='search' placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} onChange={handlenote} value={form.note} name='note' />
                                        {/* {isError &&
                                <FormErrorMessage>Email is required.</FormErrorMessage>
                            } */}
                                    </FormControl>
                                </GridItem>
                                <FormLabel className='lable-rentcar'>ประเภทรถที่ขอ</FormLabel>
                                <GridItem colSpan={6} hidden={carck5}>

                                    <FormControl>

                                        
                                        <Flex>
                                            <Checkbox disabled={disread} colorScheme='green' marginRight={"30px"} isChecked={ckcar1} onChange={(val) => setckcar1(val.target.checked)}>
                                                รถตู้
                                            </Checkbox>
                                            <FormLabel className='lable-rentcar' style={{ marginTop: "10px" }}>จำนวนคัน</FormLabel>
                                            <Stack direction='row' alignItems={"baseline"}>

                                                <Input style={{ border: '1px #00AAAD solid', margin: "0px 10px" }} maxWidth={"100"} value={form.number_travelers} disabled={disread == true ? true : !ckcar1} onChange={handlenumber_travelers} name='number_travelers' type='search' pattern="[0-9]*" />

                                            </Stack>
                                            
                                            <Stack direction='row' alignItems={"baseline"}>
                                                <FormLabel className='lable-rentcar'>จำนวนผู้เดินทาง</FormLabel>
                                                <Input type='search' required style={{ border: '1px #00AAAD solid', margin: "0px 10px" }} value={form.countper1} disabled={disread == true ? true : !ckcar1} onChange={handlecountper1} maxWidth={"100"} />
                                            </Stack>
                                        </Flex>
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={6}>
                                    <FormControl hidden={carck4}>
                                        <Flex>
                                            <Checkbox disabled={disread} colorScheme='green' marginRight={"20px"} isChecked={ckcar2} onChange={(val) => setckcar2(val.target.checked)}>
                                                รถกระบะ
                                            </Checkbox>
                                            <Stack hidden={brand1} direction='row' alignItems={"baseline"} marginRight={"20px"}  marginLeft={"10px"}>
                                                <FormLabel className='lable-rentcar'>ยี่ห้อรุ่น</FormLabel>
                                                <Input type='search' required style={{ border: '1px #00AAAD solid' }} maxWidth={"150"} value={form.brand_cars1} disabled={disread == true ? true : !ckcar2} onChange={handlebrand1}  />
                                            </Stack>
                                            <FormLabel className='lable-rentcar' style={{ marginTop: "10px" }}>จำนวนคัน</FormLabel>
                                            <Stack direction='row' alignItems={"baseline"}>
                                                <Input style={{ border: '1px #00AAAD solid', margin: "0px 10px" }} maxWidth={"100"} value={form.number_cars} disabled={disread == true ? true : !ckcar2} onChange={handlenumber_cars} type='search' name='number_cars' />

                                            </Stack>
                                            
                                            <Stack direction='row' alignItems={"baseline"}>
                                                <FormLabel className='lable-rentcar'>จำนวนผู้เดินทาง</FormLabel>
                                                <Input type='search' required  style={{ border: '1px #00AAAD solid', margin: "0px 10px" }} value={form.countper2} disabled={disread == true ? true : !ckcar2} onChange={handlecountper2} maxWidth={"100"} />
                                            </Stack>
                                        </Flex>

                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={6}>
                                    <FormControl hidden={carck3}>
                                        <Flex>
                                            <Checkbox disabled={disread} colorScheme='green' marginRight={"20px"} isChecked={ckcar20} onChange={(val) => setckcar20(val.target.checked)} >
                                                รถเก๋ง
                                            </Checkbox>
                                            <Stack hidden={brand2} direction='row' alignItems={"baseline"} marginRight={"20px"}  marginLeft={"10px"}>
                                                <FormLabel className='lable-rentcar'>ยี่ห้อรุ่น</FormLabel>
                                                <Input type='search' required  style={{ border: '1px #00AAAD solid' }} maxWidth={"150"} value={form.brand_cars2} disabled={disread == true ? true : !ckcar20} onChange={handlebrand2}  />
                                            </Stack>
                                            <FormLabel className='lable-rentcar' style={{ marginTop: "10px" }}>จำนวนคัน</FormLabel>
                                            <Stack direction='row' alignItems={"baseline"}>
                                                <Input style={{ border: '1px #00AAAD solid', margin: "0px 10px" }} maxWidth={"100"} value={form.number_cars1} disabled={disread == true ? true : !ckcar20} onChange={handlenumber_cars1} type='search' name='number_cars' />

                                            </Stack>
                                            <Stack direction='row' alignItems={"baseline"}>
                                                <FormLabel className='lable-rentcar'>จำนวนผู้เดินทาง</FormLabel>
                                                <Input type='search' required  style={{ border: '1px #00AAAD solid', margin: "0px 10px" }} value={form.countper3} disabled={disread == true ? true : !ckcar20} onChange={handlecountper3} maxWidth={"100"} />
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
                                        <DatePicker disabled={disread} required placeholderText='วัน-เดือน-ปี' dateFormat="dd-MM-yyyy" minDate={new Date()} wrapperClassName='date_picker full-width' selected={startDate3} onChange={handlestartdate} />
                                        {/* <DatePicker disabled={disread} required placeholderText='วัน-เดือน-ปี' dateFormat="dd-MM-yyyy" minDate={new Date()} wrapperClassName='date_picker full-width' selected={startDate3} onChange={handlestartdate3} /> */}
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={2}>
                                    <FormControl >
                                        <FormLabel className='lable-rentcar'>วันที่ใช้รถสิ้นสุด</FormLabel>
                                        <DatePicker required disabled={disread} placeholderText='วัน-เดือน-ปี' dateFormat="dd-MM-yyyy" minDate={dateminend} wrapperClassName='date_picker full-width' selected={startDate4} onChange={handleenddate} />
                                        {/* <DatePicker  required placeholderText='วัน-เดือน-ปี' dateFormat="dd-MM-yyyy" minDate={new Date()} wrapperClassName='date_picker full-width' selected={startDate4} onChange={handleenddate4} /> */}
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
                                <GridItem colSpan={2} hidden={carck5 == true ? true : carck6}>
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
                                        <GridItem colSpan={2} hidden={carck5 == true ? true : carck6}>
                                            <FormControl>
                                                <FormLabel className='lable-rentcar'>จังหวัด</FormLabel>
                                                <Input disabled={disread} type='search' required placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} value={form.upcountry} onChange={handlerovince} />
                                            </FormControl>
                                        </GridItem>
                                        :
                                        <GridItem colSpan={2} />
                                }
                                <GridItem colSpan={2} />
                                <GridItem colSpan={2} hidden={carck5 == true ? true : carck6}>
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
                                        <GridItem colSpan={2} hidden={carck5 == true ? true : carck6}>
                                            <FormControl>
                                                <FormLabel className='lable-rentcar'>จำนวนวันที่ค้างคืน (วัน)</FormLabel>
                                                <Input disabled={disread} type='search' required placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} value={form.overnight} onChange={handleovernight} />
                                            </FormControl>
                                        </GridItem>
                                        :
                                        <GridItem colSpan={2} />
                                }

                                <GridItem colSpan={2} hidden={carck5 == true ? true : carck6} />
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
                                    <Button isLoading={loading}
    loadingText='กำลังอัพเดท'
   onClick={handleapproved} hidden={approvedbutton} className='lable-rentcar' type='submit' colorScheme='teal' size='md' px={'10'} py={'5'} mx={"3"} mb={"20px"}>
                                        อนุมัติ
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