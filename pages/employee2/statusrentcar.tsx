import {
    Box, Button, Flex, Spacer, FormControl, FormErrorMessage, FormHelperText, Checkbox, FormLabel, Grid, GridItem, Input, Radio, RadioGroup, Select, Stack, useToast, Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Center,
    Container,
    Tooltip,
    IconButton,
    NumberInputField,
    effect,
    Link,
    position

} from '@chakra-ui/react'
import Head from 'next/head';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form';
import DatePickerInput from '../../components/input/Datepicker';
import { AiOutlineSearch, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons"
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { localStorageLoad } from '../../utils/localStrorage';
import { getMe } from "../../data-hooks/me/getMe"
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import Swal from 'sweetalert2';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    NumberInput,
} from '@chakra-ui/react'

import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import styled, { css, createGlobalStyle } from 'styled-components';
import { TimePicker } from 'antd';
import { number } from 'yup';

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

const StatusRentCar = () => {

    const me = getMe()
    const [loading, setloading] = useState<boolean>(false);
    const [textcc, settextcc] = useState<string>("");
    const [disread, setdisread] = useState<boolean>(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const isopen1 = useDisclosure()

    const [ckcar1, setckcar1] = useState<boolean>(false)
    const [ckcar2, setckcar2] = useState<boolean>(false)
    const [ckcar3, setckcar3] = useState<boolean>(false)
    const [approval, setapproval] = useState([{
        no: 1,
        name: "A",
        position: "ผชส",
        status: ""
    },
    {
        no: 2,
        name: "B",
        position: "ผส",
        status: ""
    }]);
    const toast = useToast()
    const toastId4 = "success"
    const [pagegination, setpagegination] = useState({
        page: 1,
        size: 30,
        pageOptions: 0,
        canNextPage: false,
        canPreviousPage: false,

    })
    const nextpage = () => {
        setpagegination(prev => {
            let count = pagegination.page + 1;
            if (count == pagegination.pageOptions) {
                return { ...prev, page: count, canNextPage: false, canPreviousPage: true }
            } else {

                return { ...prev, page: count, canNextPage: true, canPreviousPage: true }
            }


        })

    }
    const prevpage = () => {
        setpagegination(prev => {
            let count = pagegination.page - 1;
            if (count == 1) {

                return { ...prev, page: count, canNextPage: true, canPreviousPage: false }
            } else {

                return { ...prev, page: count, canNextPage: true, canPreviousPage: true }
            }


        })
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
        number_cars2: "0",
        number_cars3: "0",
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
    })
    useEffect(() => {
        if (pagegination.pageOptions != 0) {
            search1()
        }
    }, [pagegination.page])
    const [startDate, setStartDate] = useState(new Date());
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )
    const [overlay, setOverlay] = React.useState(<OverlayOne />)
    const [approvedbutton, setapprovedbutton] = React.useState<boolean>(false);
    const [editbutton, seteditbutton] = React.useState<boolean>(false);
    const [startDate1, setStartDate1] = useState(new Date());
    const [startDate2, setStartDate2] = useState(new Date());
    const handlebookingdate = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => {
        const vl = new Date(event)
        setStartDate(event);
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
    const handlestartdate = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => {
        const vl = new Date(event)
        setStartDate1(event);
        return { ...prev, startdate: [vl.getFullYear(), vl.getMonth() + 1, vl.getDate()].join('-') }
    })
    const handleenddate = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => {
        const vl = new Date(event)
        setStartDate2(event);
        return { ...prev, enddate: [vl.getFullYear(), vl.getMonth() + 1, vl.getDate()].join('-') }
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
    const [datasall, setdatas] = useState({
        cartype: 0,
        startdates: null,
        enddates: null
    });
    console.log(me);
    const [datatables, setdatatable] = useState([])
    const handlecartye = (event: React.ChangeEvent<HTMLInputElement>) => setdatas(prev => {

        setdatatable([])

        return { ...prev, cartype: event.target.value }
    }
    )
    const handlestartdates = (event: React.ChangeEvent<HTMLInputElement>) => setdatas(prev => { return { ...prev, startdates: event.target.value } })
    const handleenddates = (event: React.ChangeEvent<HTMLInputElement>) => setdatas(prev => { return { ...prev, enddates: event.target.value } })
    const deletes = (id: any) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#00A8A9",
            cancelButtonColor: "#CCC5C5",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                const tokens = localStorageLoad("token")
                if (datasall.cartype == 1) {

                    let config1 = {
                        method: 'delete',
                        maxBodyLength: Infinity,
                        url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/DeleteCarBookingWithDriver/' + id,
                        headers: {
                            'Authorization': 'Bearer ' + tokens,
                            'Content-Type': 'application/json'
                        }
                    };

                    axios.request(config1)
                        .then((response) => {
                            window.location.reload();
                        })
                        .catch((error) => {
                            console.log(error);
                        });

                } else if (datasall.cartype == 2) {
                    let config2 = {
                        method: 'delete',
                        maxBodyLength: Infinity,
                        url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/DeleteReserveCar_NoDriver/' + id,
                        headers: {
                            'Authorization': 'Bearer ' + tokens,
                            'Content-Type': 'application/json'
                        }
                    };

                    axios.request(config2)
                        .then((response) => {
                            window.location.reload();
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } else if (datasall.cartype == 3) {
                    let config3 = {
                        method: 'delete',
                        maxBodyLength: Infinity,
                        url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/DeleteReserveCar_Pickup_and_drop/' + id,
                        headers: {
                            'Authorization': 'Bearer ' + tokens,
                            'Content-Type': 'application/json'
                        }
                    };

                    axios.request(config3)
                        .then((response) => {
                            window.location.reload();
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }
    const search1 = () => {
        setdatatable([])
        const tokens = localStorageLoad("token")
        console.log(startDate1);
        var res1 = startDate1.toISOString().slice(0, 10)
        var res2 = startDate2.toISOString().slice(0, 10)
        console.log(res1);
        console.log("car", datasall.cartype)
        console.log("start", datasall.startdates)
        console.log("end", datasall.enddates)
        const axios = require('axios');
        let data = JSON.stringify({
            "carBookingType": 1,
            "startdate": "2024-02-13",
            "enddate": "2024-02-13"
        });

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/GetCheckStatus_ReserveCar/' + datasall.cartype + '/' + res1 + '/' + res2 + '/' + me?.data?.data?.planningBusUser.role + '?page=' + pagegination.page + '&size=30',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tokens
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(response);
                if (response.data.data.data.length > 0) {
                    setdatatable(response.data.data.data)
                }
                setloading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const search = (event: any) => {
        if (datasall.cartype < 1) {
            toast({
                id: toastId4,
                description: `เลือกประเภทการประเมิน`,
                status: "error",
                duration: 3000,
                isClosable: false,
            })
            return
        }
        setloading(true);

        setdatatable([])
        const tokens = localStorageLoad("token")
        console.log(startDate1);
        var res1 = startDate1.toISOString().slice(0, 10)
        var res2 = startDate2.toISOString().slice(0, 10)
        console.log(res1);
        console.log("car", datasall.cartype)
        console.log("start", datasall.startdates)
        console.log("end", datasall.enddates)
        const axios = require('axios');
        let data = JSON.stringify({
            "carBookingType": 1,
            "startdate": "2024-02-13",
            "enddate": "2024-02-13"
        });

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/GetCheckStatus_ReserveCar/' + datasall.cartype + '/' + res1 + '/' + res2 + '/' + (me?.data?.data?.planningBusUser == null ? "user" : me?.data?.data?.planningBusUser.role) + '?page=' + pagegination.page + '&size=30',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tokens
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(response);
                if (response.data.data.data.length > 0) {
                    console.log(response.data.data.data);
                    setdatatable(response.data.data.data)
                    let pagesize = Math.ceil(parseFloat(response.data.total) / 30)
                    setpagegination(prev => { return { ...prev, page: 1, pageOptions: pagesize, canNextPage: true, canPreviousPage: false } })
                }
                setloading(false);
            })
            .catch((error) => {
                console.log(error);
            });

    }

    const handleapproved = (ids: number) => {
        const tokens = localStorageLoad("token")
        let data = JSON.stringify({
            "type": datasall.cartype,
            "BookingNo": form.idcarbooking,
        });
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/ApprovalStatus/' + datasall.cartype + '/' + form.idcarbooking,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tokens
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                onClose();
                search(1);
                toast({
                    id: toastId4,
                    description: `อนุมัติสำเร็จ`,
                    status: "success",
                    duration: 3000,
                    isClosable: false,
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const handlereset = (event: any) => {
        setStartDate1(new Date())
        setStartDate2(new Date())
        setdatatable([])
    }

    const [value, setValue] = useState("1")
    const [datas, setDatas] = useState<any>([])
    const [date, setDate] = useState<any>(new Date())
    // console.log(value);
    const handleSubmit = (event: any) => {
        // alert('You clicked submit');
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // console.log(data.get('cost-enter'));

    }

    const getApprovedPerson = (ids: Number) => {
        const tokens = localStorageLoad("token")
        setapproval([])
        let config: any = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/GetUserApproval/' + datasall.cartype + '/' + ids,
            headers: {
                'Authorization': 'Bearer ' + tokens
            }
        };
        let dumper: any = [];
        axios.request(config)
            .then((response) => {
                console.log(response.data);
                var ii = 0;
                response.data.map(function (k, v) {
                    if (ii < 2) {
                        if (k.bossPositionId == "Ass_Mgr") {
                            let postions = "ผู้ช่วยผู้จัดการส่วน";
                            if (k.bossPositionId == "Ass_Mgr") {
                                postions == "ผู้ช่วยผู้จัดการส่วน"
                            } else if (k.bossPositionId == "Dep_Mgr") {
                                postions = "ผู้จัดการส่วน"
                            }
                            dumper.push({
                                name: k.approvedName == null ? k.bossName : k.approvedName,
                                position: postions,
                                status: k.statusApproved
                            });

                        }

                        else if (k.bossPositionId == "Dep_Mgr") {
                            let postions = "";
                            if (k.bossPositionId == "Ass_Mgr") {
                                postions = "ผู้ช่วยผู้จัดการส่วน"
                            } else if (k.bossPositionId == "Dep_Mgr") {
                                postions = "ผู้จัดการส่วน"
                            }
                            dumper.push({
                                name: k.approvedName == null ? k.bossName : k.approvedName,
                                position: postions,
                                status: k.statusApproved
                            });
                        } else {
                            dumper.push({
                                name: k.approvedName == null ? k.bossName : k.approvedName,
                                position: k.bossPositionId,
                                status: k.statusApproved
                            });
                        }
                    }
                    ii++;
                })
                setapproval(dumper)
            })
            .catch((error) => {
                console.log(error);
            });

    };

    const handleChange = (event: any) => {
        let value = event.target.value;
        setDatas({ ...datas, [event.target.name]: event.target.value })
    }

    const handleopenedit = (ids: number) => {
        onOpen();
        const tokens = localStorageLoad("token")
        if (datasall.cartype == 1) {
            let config5 = {
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
                    settextcc("จองรถเช่าเหมาวัน(พร้อมคนขับ)");
                    console.log(response)
                    setapprovedbutton(true);
                    seteditbutton(false);
                    setdisread(false);
                    if (response.data.data.carBookingWithDriver[0]?.employee_no == me?.data?.data?.myHrEmployee.employeeNo) {

                        setapprovedbutton(true);
                        seteditbutton(false);
                    } else {
                        seteditbutton(true);
                        response.data.data.approval.map((e, v) => {
                            console.log("ggg kuy", e);
                            if (me?.data?.data?.myHrEmployee.employeeNo == e.employeeApproval) {
                                setapprovedbutton(false);
                            }
                        });
                    }
                    if (response.data.data.carBookingWithDriver[0]?.employee_no != me?.data?.data?.myHrEmployee.employeeNo) {
                        setdisread(true);
                    }
                    console.log(response.data.data.carBookingWithDriver[0]);
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
                        startdate: response.data.data.carBookingWithDriver[0]?.startdate,
                        enddate: response.data.data.carBookingWithDriver[0]?.enddate,
                        locationIn: response.data.data.carBookingWithDriver[0]?.locationIn,
                        timeIn: response.data.data.carBookingWithDriver[0]?.timeIn,
                        LocationOut: response.data.data.carBookingWithDriver[0]?.plantId,
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
        } else if (datasall.cartype == 2) {
            let config5 = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/GetCarBookingNoDriverById/' + ids,
                headers: {
                    'accept': '*/*',
                    'Authorization': "Bearer " + tokens
                }
            };

            console.log(ids);


            axios.request(config5)
                .then((response) => {
                    settextcc("จองรถเช่าเหมาวัน(ไม่มีคนขับ)");
                    console.log(response)
                    setapprovedbutton(true);
                    seteditbutton(false);
                    setdisread(false);
                    if (response.data.data.carBookingWithDriver[0]?.employee_no == me?.data?.data?.myHrEmployee.employeeNo) {
                        setapprovedbutton(true);
                        seteditbutton(false);
                    } else {
                        seteditbutton(true);
                        response.data.data.approval.map((e, v) => {
                            console.log("ggg kuy", e);
                            if (me?.data?.data?.myHrEmployee.employeeNo == e.employeeApproval) {
                                setapprovedbutton(false);
                            }
                        });
                    }
                    if (response.data.data.carBookingWithDriver[0]?.employee_no != me?.data?.data?.myHrEmployee.employeeNo) {
                        setdisread(true);
                    }
                    console.log(response.data.data.carBookingWithDriver[0]);
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
        } else if (datasall.cartype == 3) {
            let config5 = {
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
                    settextcc("จองรถรับส่งระหว่างวัน");
                    console.log(response)
                    setapprovedbutton(true);
                    seteditbutton(false);
                    setdisread(false);

                    if (response.data.data.carBookingWithDriver[0]?.employee_no == me?.data?.data?.myHrEmployee.employeeNo) {
                        setapprovedbutton(true);
                        seteditbutton(false);
                    } else {
                        seteditbutton(true);
                        response.data.data.approval.map((e, v) => {
                            console.log("ggg kuy", e);
                            if (me?.data?.data?.myHrEmployee.employeeNo == e.employeeApproval) {
                                setapprovedbutton(false);
                            }
                        });
                    }
                    if (response.data.data.carBookingWithDriver[0]?.employee_no != me?.data?.data?.myHrEmployee.employeeNo) {
                        setdisread(true);
                    }
                    console.log(response.data.data.carBookingWithDriver[0]);
                    setform({
                        idcarbooking: response.data.data.carBookingWithDriver[0]?.idcarbooking,
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
                        number_travelers: response.data.data.carBookingWithDriver[0]?.number_travelers,
                        number_cars: response.data.data.carBookingWithDriver[0]?.number_Cars,
                        number_cars2: response.data.data.carBookingWithDriver[0]?.number_Cars2,
                        number_cars3: response.data.data.carBookingWithDriver[0]?.number_Cars3,
                        person_count: response.data.data.carBookingWithDriver[0]?.person_count,
                        startdate: response.data.data.carBookingWithDriver[0]?.startdate,
                        enddate: response.data.data.carBookingWithDriver[0]?.enddate,
                        locationIn: response.data.data.carBookingWithDriver[0]?.locationIn,
                        timeIn: response.data.data.carBookingWithDriver[0]?.timeIn,
                        LocationOut: response.data.data.carBookingWithDriver[0]?.locationOut,
                        timeOut: response.data.data.carBookingWithDriver[0]?.timeOut,
                        operational_area: response.data.data.carBookingWithDriver[0]?.operational_area,
                        upcountry: response.data.data.carBookingWithDriver[0]?.upcountry,
                        overnight_stay: response.data.data.carBookingWithDriver[0]?.overnight_stay,
                        person_responsible_for_expenses: response.data.data.carBookingWithDriver[0]?.person_responsible_for_expenses,
                        other: response.data.data.carBookingWithDriver[0]?.other,

                        number_of_trips: response.data.data.carBookingWithDriver[0]?.plantId,
                        province: response.data.data.carBookingWithDriver[0]?.plantId,

                        GL: response.data.data.carBookingWithDriver[0]?.gl,
                        cost_enter: response.data.data.carBookingWithDriver[0]?.cost_Enter,
                        order: response.data.data.carBookingWithDriver[0]?.order,
                        overnight: response.data.data.carBookingWithDriver[0]?.overnight,
                    })
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    const isError = datas.note === ''
    return (
        <>
            <Modal blockScrollOnMount={false} size={"xl"} isOpen={isopen1.isOpen} onClose={isopen1.onClose}>
                {overlay}
                <ModalContent>
                    <ModalHeader>ข้อมูลสายอนุมัติ</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box>
                            <TableContainer borderRadius={"10px"} border={'1px #00A5A8 solid'} height={"45vh"} overflowY={"auto"}  >
                                <Table size='md' className='table-font' >
                                    <Thead bgColor={'#00A5A8'} height={"40px"} position={"sticky"} top={"0"}  >
                                        <Tr>
                                            <Th color={"white"}>ลำดับ</Th>
                                            <Th color={"white"}>ชื่อ</Th>
                                            <Th color={"white"}>ตำแหน่ง</Th>
                                            <Th color={"white"}>สถานะ</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {approval.map((x, i) =>
                                            <Tr>
                                                <Th>{(i) + 1}</Th>
                                                <Th>{x.name}</Th>
                                                <Th>{x.position}</Th>
                                                <Th>{x.status}</Th>
                                            </Tr>
                                        )}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' backgroundColor={"#00A5A8"} mr={3} onClick={isopen1.onClose}>
                            Close
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal isOpen={isOpen} size={"full"} onClose={onClose}>
                {overlay}
                <ModalContent>
                    <ModalHeader><Text className='head-text' >แก้ไข {textcc}</Text></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Container maxW={"100%"}>
                            <Grid
                                templateRows='repeat(2, 1fr)'
                                templateColumns='repeat(6, 1fr)'
                                gap={4}>
                                <GridItem colSpan={2} >
                                    <FormControl >
                                        <FormLabel className='lable-rentcar'>วันที่จองรถ</FormLabel>
                                        {/* <Input style={{ border: '1px #00AAAD solid' }} name="booking_date" type="date" value={new Date(Date.now()).toISOString().split("T")[0]} /> */}
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
                                    <FormControl isInvalid={isError}>
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
                                            <Checkbox disabled={disread} colorScheme='green' marginRight={"30px"} isChecked={ckcar1} onChange={(val) => ckcargg("1")}>
                                                รถตู้
                                            </Checkbox>
                                            <FormLabel className='lable-rentcar' style={{ marginTop: "10px" }}>จำนวนคัน</FormLabel>
                                            <Stack direction='row' alignItems={"baseline"}>

                                                <Input isDisabled={!ckcar1} style={{ border: '1px #00AAAD solid', margin: "0px 10px" }} maxWidth={"100"} value={ datasall.cartype != 3 ? form.number_travelers : form.number_cars} onChange={handlenumber_travelers} name={datasall.cartype !== 3 ? 'number_travelers' : 'number_cars'}  type='search' pattern="[0-9]*" />
                                                {/* <NumberInput isDisabled={!ckcar1} min={0} max={100} style={{ border: '1px #00AAAD solid', margin: "0px 10px" }} onChange={handlenumber_travelers}>
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput> */}

                                            </Stack>
                                            <Text style={{ marginTop: "10px" }}>คัน</Text>
                                        </Flex>
                                        {/* <RadioGroup onChange={setValue} value={value}>
                                <Stack direction='row'>
                                    <Radio value='1'>รถตู้</Radio>
                                    <Radio value='2'>รถกระบะ</Radio>
                                </Stack>
                            </RadioGroup> */}
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={6}>
                                    <FormControl>
                                        <Flex>
                                            <Checkbox disabled={disread} colorScheme='green' marginRight={"20px"} isChecked={ckcar2} onChange={(val) => ckcargg("2")}>
                                                รถกระบะ
                                            </Checkbox>
                                            <FormLabel className='lable-rentcar' style={{ marginTop: "10px" }}>จำนวนคัน</FormLabel>
                                            <Stack direction='row' alignItems={"baseline"}>
                                                <Input isDisabled={!ckcar2} style={{ border: '1px #00AAAD solid', margin: "0px 10px" }} maxWidth={"100"} value={form.number_cars} onChange={handlenumber_cars} type='search' name='number_cars' />
                                                {/* <NumberInput isDisabled={!ckcar2} min={0} max={100} style={{ border: '1px #00AAAD solid', margin: "0px 10px" }} value={form.number_cars} onChange={(val) => console.log(val)}>
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput> */}
                                            </Stack>
                                            <Text style={{ marginTop: "10px" }}>คัน</Text>
                                        </Flex>
                                        {/* <RadioGroup onChange={setValue} value={value}>
                                <Stack direction='row'>
                                    <Radio value='1'>รถตู้</Radio>
                                    <Radio value='2'>รถกระบะ</Radio>
                                </Stack>
                            </RadioGroup> */}
                                    </FormControl>
                                </GridItem>
                                {datasall.cartype == 3 ?
                                    <GridItem colSpan={6}>
                                        <FormControl>
                                            <Flex>
                                                <Checkbox disabled={disread} colorScheme='green' marginRight={"20px"} isChecked={ckcar3} onChange={(val) => ckcargg("3")}>
                                                    รถเก๋ง
                                                </Checkbox>
                                                <FormLabel className='lable-rentcar' style={{ marginTop: "10px" }}>จำนวนคัน</FormLabel>
                                                <Stack direction='row' alignItems={"baseline"}>
                                                    <Input isDisabled={!ckcar3} style={{ border: '1px #00AAAD solid', margin: "0px 10px" }} maxWidth={"100"} value={form.number_cars3} onChange={handlenumber_cars} type='search' name='number_cars' />
                                                    {/* <NumberInput isDisabled={!ckcar2} min={0} max={100} style={{ border: '1px #00AAAD solid', margin: "0px 10px" }} value={form.number_cars} onChange={(val) => console.log(val)}>
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput> */}
                                                </Stack>
                                                <Text style={{ marginTop: "10px" }}>คัน</Text>
                                            </Flex>
                                            {/* <RadioGroup onChange={setValue} value={value}>
                                <Stack direction='row'>
                                    <Radio value='1'>รถตู้</Radio>
                                    <Radio value='2'>รถกระบะ</Radio>
                                </Stack>
                            </RadioGroup> */}
                                        </FormControl>
                                    </GridItem>
                                    : ''}
                                <GridItem colSpan={2}>
                                    <FormControl>
                                        <Stack direction='row' alignItems={"baseline"}>
                                            <FormLabel className='lable-rentcar'>จำนวนผู้เดินทาง</FormLabel>
                                            <Input disabled={disread} required type='search' style={{ border: '1px #00AAAD solid' }} maxWidth={"100"} value={form.number_of_trips} onChange={handleTrip} /><Text >คน</Text>
                                        </Stack>
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={4} />
                                <GridItem colSpan={2}>
                                    {/* <FormControl>
                            <Stack direction='row' alignItems={"baseline"}>
                                <FormLabel className='lable-rentcar'>จำนวนคัน</FormLabel>
                                <Input style={{ border: '1px #00AAAD solid', marginLeft: "48px" }} maxWidth={"50"} /><Text>คัน</Text>
                            </Stack>
                        </FormControl> */}
                                </GridItem>
                                <GridItem colSpan={4} />
                                <GridItem colSpan={2}>
                                    <FormControl >
                                        <FormLabel className='lable-rentcar'>วันที่ใช้รถเริ่มต้น</FormLabel>
                                        {/* <Controller
                                name={`date`}
                                control={control}
                                render={({ field, fieldState }) => (
                                    <DatePickerInput
                                        date={date ?? null}
                                        minDate={new Date()}
                                        field={field}
                                        fieldState={fieldState}
                                        dateFormat="dd/MM/yyyy (ccc)"
                                        customOnChange={true}
                                        onChange={(date: any) => {
                                            field.onChange(date)
                                            handleSetDate(date)
                                            if (date == null) {
                                                setError("date", {
                                                    message: "กรุณาเลือกวันที่",
                                                    type: "required",
                                                })
                                            } else {
                                                clearErrors("date")
                                            }

                                            if (!(date === watchDate)) {
                                                setValue(`timeTableRoundId`, null)
                                            }
                                            unregister(`timeTableRoundId`)
                                        }}
                                    />
                                )}
                                rules={{
                                    required: "กรุณาเลือกวันที่",
                                }}
                            /> */}
                                        {/* <Input style={{ border: '1px #00AAAD solid' }} type="date" value={form.startdate} onChange={handlestartdate} /> */}
                                        <DatePicker disabled={disread} required placeholderText='วัน-เดือน-ปี' dateFormat="dd-MM-yyyy" minDate={new Date()} wrapperClassName='date_picker full-width' selected={startDate1} onChange={handlestartdate} />
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={2}>
                                    <FormControl >
                                        <FormLabel className='lable-rentcar'>วันที่ใช้รถสิ้นสุด</FormLabel>
                                        {/* <Input style={{ border: '1px #00AAAD solid' }} type="date" value={form.enddate} onChange={handleenddate} /> */}
                                        <DatePicker disabled={disread} required placeholderText='วัน-เดือน-ปี' dateFormat="dd-MM-yyyy" minDate={new Date()} wrapperClassName='date_picker full-width' selected={startDate2} onChange={handleenddate} />
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
                                        {/* <Input style={{ border: '1px #00AAAD solid' }} type="time" value={form.timeIn} onChange={handletimeIn} /> */}
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
                                        {/* <Input style={{ border: '1px #00AAAD solid' }} type="time" value={form.timeOut} onChange={handletimeOut} /> */}
                                        <TimePicker required onChange={onChanges2} disabled={disread} value={dayjs(form.timeOut, "HH:mm")} format="HH:mm" />
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={2} />
                                <GridItem colSpan={2}>
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
                                        <GridItem colSpan={2}>
                                            <FormControl>
                                                <FormLabel className='lable-rentcar'>จังหวัด</FormLabel>
                                                <Input disabled={disread} type='search' required placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} value={form.province} onChange={handlerovince} />
                                            </FormControl>
                                        </GridItem>
                                        :
                                        <GridItem colSpan={2} />
                                }
                                <GridItem colSpan={2} />
                                <GridItem colSpan={2}>
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
                                        <GridItem colSpan={2}>
                                            <FormControl>
                                                <FormLabel className='lable-rentcar'>จำนวนวันที่ค้างคืน (วัน)</FormLabel>
                                                <Input disabled={disread} type='search' required placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} value={form.overnight} onChange={handleovernight} />
                                            </FormControl>
                                        </GridItem>
                                        :
                                        <GridItem colSpan={2} />
                                }

                                <GridItem colSpan={2} />
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
                                    <Button hidden={editbutton} className='lable-rentcar' type='submit' colorScheme='teal' size='md' px={'10'} py={'5'} mb={"20px"}>
                                        แก้ไขข้อมูล
                                    </Button>
                                    <Button onClick={handleapproved} hidden={approvedbutton} className='lable-rentcar' type='submit' colorScheme='teal' size='md' px={'10'} py={'5'} mx={"3"} mb={"20px"}>
                                        อนุมัติ
                                    </Button>

                                </GridItem>
                            </Grid>
                        </Container>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            ปิด
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
            <Head>
                <title>ตรวจสอบสถานะการจองรถ</title>
                <meta name="description" content="reservation" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Grid templateColumns='repeat(6, 1fr)'>
                <GridItem colSpan={6}>
                    <Box border="solid 1px #00A5A8" p={4} borderRadius={"10px"} justifySelf={"center"}>
                        <Text color={'#00A5A8'} fontSize='xl' as={'b'} className='lable-rentcar'>ตรวจสอบสถานะการจอง</Text>
                        <Grid style={{ justifyContent: "center" }} >
                            <Flex p={2} mt={2} >
                                <label className='lable-statusrentcar' style={{ width: "150px" }}>ประเภทการจอง</label>
                                <Select width={'400px'} placeholder='เลือกประเภทการจองรถ' value={datasall.cartype} onChange={handlecartye}>
                                    <option value='1' selected>จองรถเช่าเหมาวัน(พร้อมคนขับ)</option>
                                    <option value='2'>จองรถเช่าเหมาวัน(ไม่มีคนขับ)</option>
                                    <option value='3'>จองรถรับส่งระหว่างวัน</option>
                                </Select>
                            </Flex>
                            <DatePickerWrapperStyles />

                            <Flex p={2}  >
                                <label className='lable-statusrentcar' style={{ width: "150px" }}>วันที่ใช้รถเริ่มต้น</label>
                                {/* <Input style={{ border: '1px #00A5A8 solid', width: '150px' }} type="date"  value={datasall.startdates} onChange={handlestartdates}/> */}
                                <DatePicker required dateFormat="dd-MM-yyyy" wrapperClassName='date_picker full-width' selected={startDate1} onChange={(date) => setStartDate1(date)} />
                                <label className='lable-statusrentcar' style={{ width: "150px" }}>วันที่ใช้รถสิ้นสุด</label>
                                {/* <Input style={{ border: '1px #00A5A8 solid', width: '150px' }} type="date" value={datasall.enddates} onChange={handleenddates}/> */}
                                <DatePicker required dateFormat="dd-MM-yyyy" wrapperClassName='date_picker full-width' selected={startDate2} onChange={(date) => setStartDate2(date)} />
                            </Flex>
                            <Flex justifyContent={"center"} p={2} ><Center>
                                <Button isLoading={loading}
                                    loadingText='ค้นหา'
                                    colorScheme='teal'
                                    className='lable-rentcar'
                                    className='lable-rentcar' type='button' onClick={search} colorScheme='teal' size='md' ml={5}><AiOutlineSearch style={{ marginRight: "3px" }} />ค้นหา</Button>
                                <Button className='lable-rentcar' type='button' onClick={handlereset} colorScheme='teal' size='md' ml={5}>Clear</Button>
                            </Center></Flex>
                        </Grid>
                    </Box>
                </GridItem>
                <GridItem colSpan={6}>

                    <Box mt={"50px"}  >
                        <TableContainer borderRadius={"10px"} border={'1px #00A5A8 solid'} height={"45vh"} overflowY={"auto"}  >
                            <Table size='md' className='table-font' >
                                <Thead bgColor={'#00A5A8'} height={"40px"} position={"sticky"} top={"0"}  >
                                    {datasall.cartype != "2" ?
                                        <Tr>
                                            <Th color={"white"}>ลำดับ</Th>
                                            <Th color={"white"}>วันจอง/เวลา</Th>
                                            <Th color={"white"}>ชื่อผู้จองรถ</Th>
                                            <Th color={"white"}>ประเภทรถ</Th>
                                            <Th color={"white"}>จำนวน(คัน)</Th>
                                            <Th color={"white"}>วันที่ใช้รถเริ่มต้น/เวลา</Th>
                                            <Th color={"white"}>วันที่ใช้รถสิ้นสุด/เวลา</Th>
                                            <Th color={"white"} maxWidth={"200px"}>สถานที่รับ</Th>
                                            <Th color={"white"} maxWidth={"200px"}>สถานที่ส่ง</Th>
                                            <Th color={"white"}>สถานะการอนุมัติ</Th>
                                            <Th color={"white"}>สถานะการจัดรถ</Th>
                                            <Th color={"white"}>ผู้ให้บริการ</Th>
                                            <Th color={"white"}>ทะเบียนรถ</Th>
                                            <Th color={"white"}>ชื่อคนขับ</Th>
                                            <Th color={"white"}>เบอร์โทร</Th>
                                            <Th color={"white"}>แก้ไข</Th>
                                            <Th color={"white"}>ลบ</Th>
                                        </Tr>
                                        :
                                        <Tr>
                                            <Th color={"white"}>ลำดับ</Th>
                                            <Th color={"white"}>วันจอง/เวลา</Th>
                                            <Th color={"white"}>ผู้ใช้รถ</Th>
                                            <Th color={"white"} className='text-centers'>ประเภทรถ</Th>
                                            <Th color={"white"} className='text-centers'>จำนวน(คัน)</Th>
                                            <Th color={"white"} className='text-centers'>วันที่ใช้รถเริ่มต้น/เวลา</Th>
                                            <Th color={"white"} className='text-centers'>วันที่ใช้รถสิ้นสุด/เวลา</Th>
                                            <Th color={"white"} maxWidth={"200px"}>สถานที่รับ</Th>
                                            <Th color={"white"} maxWidth={"200px"}>สถานที่ส่ง</Th>
                                            <Th color={"white"} className='text-centers'>สถานะการอนุมัติ</Th>
                                            <Th color={"white"} className='text-centers'>สถานะการจัดรถ</Th>
                                            <Th color={"white"} className='text-centers'>ยี่ห้อรุ่น</Th>
                                            <Th color={"white"} className='text-centers'>ผู้ให้บริการ</Th>
                                            <Th color={"white"} className='text-centers'>วันส่งมอบรถคืน/เวลา</Th>
                                            <Th color={"white"} className='text-centers'>สถานที่</Th>
                                            <Th color={"white"} className='text-centers'>แก้ไข</Th>
                                            <Th color={"white"} className='text-centers'>ลบ</Th>
                                        </Tr>
                                    }

                                </Thead>
                                <Tbody id='tabledata'>
                                    {datatables.map((x, i) =>
                                        datasall.cartype == "1" ?
                                            <Tr key={i}>
                                                <Td>{(i) + 1 + ((pagegination.page - 1) * 30)}</Td>
                                                <Td>{x.booking_date}</Td>
                                                <Td>{x.bookingname}</Td>
                                                <Td className='text-centers'>{x.number_travelers == 0 || x.number_travelers == null ? "" : "(รถตู้) "} {x.number_cars1 == 0 || x.number_cars1 == null ? "" : "(รถกระบะ)"}</Td>
                                                <Td className='text-centers'>{x.number_travelers == 0 || x.number_travelers == null ? "" : "(" + x.number_travelers + ")"} {x.number_cars1 == 0 || x.number_cars1 == null ? "" : "(" + x.number_cars1 + ")"}</Td>
                                                <Td className='text-centers'>{x.startdate}</Td>
                                                <Td className='text-centers'>{x.enddate}</Td>
                                                <Td maxWidth={"200px"} overflow={"hidden"} textOverflow={"ellipsis"}>{x.locationIn}</Td>
                                                <Td maxWidth={"200px"} overflow={"hidden"} textOverflow={"ellipsis"}>{x.locationOut}</Td>
                                                {x.statusApproved == "1" ? <Td className='text-centers'><Link onClick={() => { isopen1.onOpen(); getApprovedPerson(x.idcarbooking) }}>อนุมัติ</Link></Td> : <Td className='text-centers'><Link onClick={() => { isopen1.onOpen(); getApprovedPerson(x.idcarbooking) }}>รออนุมัติ</Link></Td>
                                                }
                                                {
                                                    x.statusApproved == "1" ? <Td className='text-centers'>รอจัดรถ</Td> : <Td className='text-centers'></Td>
                                                }
                                                <Td className='text-centers'></Td>
                                                <Td className='text-centers'></Td>
                                                <Td className='text-centers'></Td>
                                                <Td className='text-centers' ></Td>
                                                {x.statusApproved == "1" ? <Td></Td> : <Td className='text-centers'><a onClick={(e) => { handleopenedit(x.idcarbooking) }} href="#"><AiOutlineEdit /></a></Td>
                                                }
                                                {x.statusApproved == "1" ? <Td></Td> : me?.data?.data?.myHrEmployee.employeeNo == x.employee_no ? <Td className='text-centers'><a onClick={(e) => { deletes(x.idcarbooking) }} href="#"><AiOutlineDelete /></a></Td> : <Td></Td>
                                                }
                                            </Tr>
                                            :
                                            datasall.cartype == "2" ?
                                            <Tr key={i}>
                                                <Td>{(i) + 1 + ((pagegination.page - 1) * 30)}</Td>
                                                <Td>{x.booking_date}</Td>
                                                <Td>{x.bookingname}</Td>

                                                <Td className='text-centers'>{x.number_travelers == 0 || x.number_travelers == null ? "" : "(รถตู้) "} {x.number_cars1 == 0 || x.number_cars1 == null ? "" : "(รถเก๋ง)"}</Td>
                                                <Td className='text-centers'>{x.number_travelers == 0 || x.number_travelers == null ? "" : "(" + x.number_travelers + ")"} {x.number_cars1 == 0 || x.number_cars1 == null ? "" : "(" + x.number_cars1 + ")"}</Td>
                                                <Td className='text-centers'>{x.startdate}</Td>
                                                <Td className='text-centers'>{x.enddate}</Td>
                                                <Td maxWidth={"200px"} overflow={"hidden"} textOverflow={"ellipsis"}>{x.locationIn}</Td>
                                                <Td maxWidth={"200px"} overflow={"hidden"} textOverflow={"ellipsis"}>{x.locationOut}</Td>
                                                {x.statusApproved == "1" ? <Td></Td> : <Td className='text-centers'><Link onClick={() => { isopen1.onOpen(); getApprovedPerson(x.idcarbooking) }}>รออนุมัติ</Link></Td>
                                                }
                                                {
                                                    x.statusApproved == "1" ? <Td className='text-centers'>รอจัดรถ</Td> : <Td className='text-centers'></Td>
                                                }
                                                <Td className='text-centers'></Td>
                                                <Td className='text-centers'></Td>
                                                <Td className='text-centers'></Td>
                                                <Td className='text-centers'></Td>
                                                {x.statusApproved == "1" ? <Td></Td> : <Td className='text-centers'><a onClick={(e) => { handleopenedit(x.idcarbooking) }} href="#"><AiOutlineEdit /></a></Td>
                                                }
                                                {x.statusApproved == "1" ? <Td></Td> : me?.data?.data?.myHrEmployee.employeeNo == x.employee_no ? <Td className='text-centers'><a onClick={(e) => { deletes(x.idcarbooking) }} href="#"><AiOutlineDelete /></a></Td> : <Td></Td>
                                                }
                                            </Tr>
                                            :  <Tr key={i}>
                                            <Td>{(i) + 1 + ((pagegination.page - 1) * 30)}</Td>
                                            <Td>{x.booking_date}</Td>
                                            <Td>{x.bookingname}</Td>
                                            <Td className='text-centers'>{x.number_cars == 0 || x.number_cars == null ? "" : "(รถตู้) "} {x.number_cars1 == 0 || x.number_cars1 == null ? "" : "(รถกระบะ)"} {x.number_cars3 == 0 || x.number_cars3 == null ? "" : "(รถเก๋ง)"}</Td>
                                            <Td className='text-centers'>{x.number_cars == 0 || x.number_cars == null ? "" : "(" + x.number_cars + ")"} {x.number_cars1 == 0 || x.number_cars1 == null ? "" : "(" + x.number_cars1 + ")"} {x.number_cars3 == 0 || x.number_cars3 == null ? "" : "(" + x.number_cars3 + ")"}</Td>
                                            <Td className='text-centers'>{x.startdate}</Td>
                                            <Td className='text-centers'>{x.enddate}</Td>
                                            <Td maxWidth={"200px"} overflow={"hidden"} textOverflow={"ellipsis"}>{x.locationIn}</Td>
                                            <Td maxWidth={"200px"} overflow={"hidden"} textOverflow={"ellipsis"}>{x.locationOut}</Td>
                                            {x.statusApproved == "1" ? <Td className='text-centers'><Link onClick={() => { isopen1.onOpen(); getApprovedPerson(x.idcarbooking) }}>อนุมัติ</Link></Td> : <Td className='text-centers'><Link onClick={() => { isopen1.onOpen(); getApprovedPerson(x.idcarbooking) }}>รออนุมัติ</Link></Td>
                                            }
                                            {
                                                x.statusApproved == "1" ? <Td className='text-centers'>รอจัดรถ</Td> : <Td className='text-centers'></Td>
                                            }
                                            <Td className='text-centers'></Td>
                                            <Td className='text-centers'></Td>
                                            <Td className='text-centers'></Td>
                                            <Td className='text-centers' ></Td>
                                            {x.statusApproved == "1" ? <Td></Td> : <Td className='text-centers'><a onClick={(e) => { handleopenedit(x.idcarbooking) }} href="#"><AiOutlineEdit /></a></Td>
                                            }
                                            {x.statusApproved == "1" ? <Td></Td> : me?.data?.data?.myHrEmployee.employeeNo == x.employee_no ? <Td className='text-centers'><a onClick={(e) => { deletes(x.idcarbooking) }} href="#"><AiOutlineDelete /></a></Td> : <Td></Td>
                                            }
                                        </Tr>
                                    )




                                    }
                                    {datatables.length == 0 &&
                                        <Tr>
                                            <Td colSpan={17} style={{ textAlign: 'center' }}>ไม่พบข้อมูล</Td>

                                        </Tr>
                                    }
                                    {/* <Tr>
                                        <Td colSpan={16}>ไม่มีข้อมูล</Td>

                                    </Tr> */}
                                    {/* <Tr>
                                        <Td>2</Td>
                                        <Td>centimetres (cm)</Td>
                                        <Td isNumeric>30.48</Td>
                                        <Td>feet</Td>
                                        <Td>centimetres (cm)</Td>
                                        <Td isNumeric>30.48</Td>
                                        <Td>feet</Td>
                                        <Td>centimetres (cm)</Td>
                                        <Td isNumeric>30.48</Td>
                                        <Td>centimetres (cm)</Td>
                                        <Td isNumeric>30.48</Td>
                                        <Td>feet</Td>
                                        <Td>centimetres (cm)</Td>
                                        <Td isNumeric>30.48</Td>
                                        <Td ><a href="#"><AiOutlineEdit /></a></Td>
                                        <Td ><a href="#"><AiOutlineDelete /></a></Td>
                                    </Tr>
                                    <Tr>
                                        <Td>3</Td>
                                        <Td>metres (m)</Td>
                                        <Td isNumeric>0.91444</Td>
                                        <Td>yards</Td>
                                        <Td>metres (m)</Td>
                                        <Td isNumeric>0.91444</Td>
                                        <Td>yards</Td>
                                        <Td>metres (m)</Td>
                                        <Td isNumeric>0.91444</Td>
                                        <Td>centimetres (cm)</Td>
                                        <Td isNumeric>30.48</Td>
                                        <Td>feet</Td>
                                        <Td>centimetres (cm)</Td>
                                        <Td isNumeric>30.48</Td>
                                        <Td ><a href="#"><AiOutlineEdit /></a></Td>
                                        <Td ><a href="#"><AiOutlineDelete /></a></Td>
                                    </Tr> */}
                                </Tbody>

                            </Table>

                        </TableContainer>
                        {/* <DataTable
                            title="Movies"
                            columns={columns}
                            data={movies}
                            defaultSortField="title"
                            sortIcon={<SortIcon />}
                            pagination
                            /> */}
                    </Box>
                    <Box>
                        <Flex justifyContent="flex-end" m={4} alignItems="center">
                            <Text flexShrink={0} mr={2}>
                                Page{" "}
                            </Text>
                            <Flex>
                                <Tooltip label="Previous Page">
                                    <IconButton
                                        aria-label="previousPage"
                                        onClick={prevpage}
                                        isDisabled={!pagegination.canPreviousPage}
                                        icon={<ChevronLeftIcon h={6} w={6} />}
                                        variant="unstyled"
                                        _focus={{ boxShadow: "none" }}
                                    />
                                </Tooltip>
                            </Flex>
                            <Flex alignItems="center">
                                <NumberInput
                                    ml={2}
                                    mr={5}
                                    minW={14}
                                    maxW={18}
                                    min={1}
                                    max={pagegination.pageOptions}
                                    onChange={(value: any) => {
                                        const page = value ? value : 1
                                        setControlledPage(page)
                                    }}
                                    value={pagegination.page}
                                    borderColor="primary.500"
                                >
                                    <NumberInputField
                                        padding={0}
                                        textAlign="center"
                                        _focus={{
                                            borderColor: "#B2CCCC",
                                            boxShadow: "0 0 0 1px #00A5A8",
                                        }}
                                    />
                                </NumberInput>
                                <Text flexShrink={0} mr={2}>
                                    of{" "}
                                    <Text fontWeight="bold" as="span">
                                        {pagegination.pageOptions}
                                    </Text>
                                </Text>
                            </Flex>
                            <Flex>
                                <Tooltip label="Next Page">
                                    <IconButton
                                        aria-label="nextPage"
                                        onClick={nextpage}
                                        isDisabled={!pagegination.canNextPage}
                                        icon={<ChevronRightIcon h={6} w={6} />}
                                        variant="unstyled"
                                        _focus={{ boxShadow: "none" }}
                                    />
                                </Tooltip>
                            </Flex>
                        </Flex>
                    </Box>
                </GridItem>
            </Grid>
        </>
    )
}

export default StatusRentCar
