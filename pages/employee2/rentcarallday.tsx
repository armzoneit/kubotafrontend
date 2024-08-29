import { Button,useDisclosure, Checkbox, Flex, FormControl, FormErrorMessage, FormHelperText,Image, FormLabel, Grid, GridItem, Input, Radio, RadioGroup, Select, Stack, Text,useToast,Container,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
 } from '@chakra-ui/react'
import Head from 'next/head';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { localStorageLoad } from '../../utils/localStrorage';
import { Controller } from 'react-hook-form';
import { getMe } from "../../data-hooks/me/getMe"
import DatePickerInput from '../../components/input/Datepicker';
import DatePicker from 'react-datepicker';
import styled, { css, createGlobalStyle } from 'styled-components';

import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { TimePicker } from 'antd';
import { SearchIcon } from '@chakra-ui/icons';

const DatePickerWrapperStyles = createGlobalStyle`
    .date_picker.full-width input {
        border: 1px #00AAAD solid;
        padding-top: 7px;
        padding-bottom: 7px;
        padding-left: 17px;
        padding-right: 17px;
        border-radius: 5px;
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
`;



const RentCarAllDay = () => {
    const me = getMe()
    const tokens = localStorageLoad("token")
    const toast = useToast()
    const toastId4 = "success"
    const [value, setValue] = useState("1")
    const [datas, setDatas] = useState<any>([])
    const [date, setDate] = useState<any>(new Date())
    const [startDate, setStartDate] = useState(new Date());
    const [startDate1, setStartDate1] = useState();
    const [startDate2, setStartDate2] = useState();
    const [ckcar1,setckcar1] = useState<boolean>(false)
    const [ckcar2,setckcar2] = useState<boolean>(false)
    const [showfile,setshowfile] = useState<boolean>(true)
    const { isOpen, onOpen, onClose } = useDisclosure()
    console.log(tokens)
    const [dateminend, setdateminend] = useState(new Date())
    const [namefile,setnamefile] = useState<string>("");
    // console.log(value);
    const [form, setform] = useState({
        idcarbooking:null,
        PlantId:"",
        employee_no:"",
        booking_date:"2023-12-06 03:54:07.6233333 +00:00",
        bookingname:"",
        email:"",
        agency:"",
        division:"",
        tel:"",
        code_employee:"",
        email_employee:"",
        agency_employee:"",
        division_employee:"",
        name_use_car:"",
        tel_use_car:"",
        type_idcar:"",
        brand:"",
        idcar:"",
        pathfile:"",
        note:"",
        typecar:"",
        number_travelers:"0",
        brand_cars1:"",
        person_count:"0",
        number_cars:"0",
        brand_cars2:"",
        person_count2:"0",
        startdate:"",
        enddate:"",
        locationIn:"",
        timeIn:"00:00",
        LocationOut:"",
        timeOut:"00:00",
        operational_area:"",
        upcountry:"",
        overnight_stay:"",
        person_responsible_for_expenses:"",
        other:"",
        GL:"",
        cost_enter:"",
        order:"",
        countcar1:0,
        countper1:0,
        countcar2:0,
        countper2:0,
        license_number:"",
})
const [imageshow,setimageshow] = useState("gibbresh.png");

const ckcargg = (event:string) => {
        
    if(event == "1")
    {
        setckcar1(true);
        setckcar2(false);
    }
    else if(event == "2"){
        setckcar2(true);
        setckcar1(false);
    }
    else{
        setckcar1(false);
        setckcar2(false);
    }
}
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
            console.log(ggg,"gggg");
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
    const handlebookingname = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,bookingname:event.target.value}})
    const handleemail = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,email:event.target.value}})
    const handleagency = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,agency:event.target.value}})
    const handlecountcar1 = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> {
        let isnumber = /^[0-9\b]*$/;
        console.log("countcar1")
        if(isnumber.test(event.target.value))
        {
            return {...prev,countcar1:event.target.value}
        }  else{
            return {...prev}
        }
    })
    const handlecountper1 = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { 
        let isnumber = /^[0-9\b]*$/;
        if(isnumber.test(event.target.value))
        {
            return {...prev,countper1:event.target.value}
        }  else{
            return {...prev}
        }
    })
    const handlecountcar2 = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> {
         let isnumber = /^[0-9\b]*$/;
            if(isnumber.test(event.target.value))
            {
                return {...prev,countcar2:event.target.value}
            }  else{
                return {...prev}
            }
        })
    const handlecountper2 = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { 
        let isnumber = /^[0-9\b]*$/;
        if(isnumber.test(event.target.value))
        {
            return {...prev,countper2:event.target.value}
        }  else{
            return {...prev}
        }
    })
    const handledivision = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,division:event.target.value}})
    const handletel = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { 
        
        let isnumber = /^[0-9\b]*$/;
        if(isnumber.test(event.target.value))
            {
                return {...prev,tel:event.target.value}
            }else{
                return {...prev}
            }
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
    const handlestartdate = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { 
        const vl = new Date(event)
        const dal1 = [vl.getFullYear(), vl.getMonth()+1, vl.getDate()].join('-');
        setStartDate1(event);
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
    const handleenddate = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { 
        const vl = new Date(event)
        const dal1 = [vl.getFullYear(), vl.getMonth()+1, vl.getDate()].join('-');
        setStartDate2(event);
        console.log(event);
        if(form.startdate == dal1)
            {
                sethours([])
                setform(prev => ({...prev,timeIn:"00:00"}));
                setform(prev => ({...prev,timeOut:"00:00"}));
            }else{
                sethours([])
            }
        return {...prev,enddate:[vl.getFullYear(), vl.getMonth()+1, vl.getDate()].join('-')}
    })
    const handlenote = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,note:event.target.value}})
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
    useEffect(()=>{
        console.log(form);
    },[form]);
    const handlepathfile = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,pathfile:event.target.value}})
    const handlebrand1 = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,brand_cars1:event.target.value}})
    const handlebrand2 = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,brand_cars2:event.target.value}})
    const handlelocationin = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,locationIn:event.target.value}})
    const handlelocationout = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,LocationOut:event.target.value}})
    const handleperson_responsible_for_expenses = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,person_responsible_for_expenses:event.target.value}})
    const handleother = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,other:event.target.value}})
    const handlegl = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,GL:event.target.value}})
    const handleconst_enter = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,cost_enter:event.target.value}})
    const handleorder = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,order:event.target.value}})
    const handle_idcar = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { 
                return {...prev,idcar:event.target.value}
        

    });
    const [pictureFile, setpictureFile] = useState(null);

    const pictureChangeHandler = event => {
        console.log(event.target.files[0])
        setpictureFile(event.target.files[0]);
        setnamefile(event.target.files[0].name)
        setimageshow(URL.createObjectURL(event.target.files[0]))
        setshowfile(false);
    };



    const handleSubmit = async (event: any) => {
        // alert('You clicked submit');
        event.preventDefault();
        if(pictureFile == null)
        {
            toast({
                id: toastId4,
                description: `กรุณาแนบไฟล์ใบขับขี่`,
                status: "error",
                duration: 5000,
                isClosable: false,
            })
            return;
        }
        if(ckcar1 == false && ckcar2 == false){
            toast({
                id: toastId4,
                description: `กรุณาเลือกประเภทรถ`,
                status: "error",
                duration: 5000,
                isClosable: false,
              })
            return;
        }
        if(ckcar1 == true &&  form.countcar1 == 0)
            {
                toast({
                    id: toastId4,
                    description: `กรุณาใส่จำนวนรถเก๋ง`,
                    status: "error",
                    duration: 5000,
                    isClosable: false,
                  })
                
                return;
            }
        if(ckcar2 == true &&  form.countcar2 == 0)
            {
                toast({
                    id: toastId4,
                    description: `กรุณาใส่จำนวนรถกระบะ`,
                    status: "error",
                    duration: 5000,
                    isClosable: false,
                  })
                
                return;
            }
        if(form.timeIn == "00:00" && form.timeOut == "00:00")
        {
            toast({
                id: toastId4,
                description: `กรุณาเลือกเวลา เริ่มต้น-สิ้นสุด`,
                status: "error",
                duration: 5000,
                isClosable: false,
              })
            
            return;
        }
        if(form.overnight_stay == "option1" && form.overnight == 0)
        {
            toast({
                id: toastId4,
                description: `กรุณาใส่จำนวนวันที่ค้าง`,
                status: "error",
                duration: 5000,
                isClosable: false,
                })
            
            return;
        }
        var pathc = "";
        
        const pictureData = new FormData();
        pictureData.append('image', pictureFile);
        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: pictureData,
            }).then(function(response) {
                return response.json();
            }).then(function(data){
                console.log(data.message);
                pathc = data.message;
                console.log(pathc);
                setform(prev => ({...prev,pathfile:pathc}));
            });
            const data = response.json();
            if (!response.ok) {
                throw data;
            }
            setpictureFile(null);

            // console.log(JSON.parse(data));
        } catch (error) {
            console.log(error.message);
        }
        const headers1 = { 
            'Authorization': 'Bearer '+tokens
          }
          const vl = new Date(startDate)
        // console.log(data.get('cost-enter'));
        let jsonref = [{
            "idcarbooking":null,
            "plantId":me?.data?.data?.myHrEmployee.plantId,
            "employee_no":me?.data?.data?.myHrEmployee.employeeNo,
            "booking_date":[vl.getFullYear(), vl.getMonth()+1, vl.getDate()].join('-')+" 03:54:07.6233333 +00:00",
            "bookingname":form.bookingname,
            "email":form.email,
            "agency":form.agency,
            "division":form.division,
            "tel": form.tel,
            "code_employee": form.code_employee,
            "name_use_car": form.name_use_car,
            "use_email":form.email_employee,
            "use_agency": form.agency_employee,
            "use_division": form.division_employee,
            "tel_use_car": form.tel_use_car,
            "type_idcar": form.type_idcar,
            "brand": form.brand,
            "idcar": "",
            "pathfile": pathc,
            "note": form.note,
            "typecar": form.typecar,
            "number_travelers": parseInt(form.countcar1),
            "brand_cars1": form.brand_cars1,
            "person_count": parseInt(form.countper1),
            "number_cars": parseInt(form.countcar2),
            "brand_cars2": form.brand_cars2,
            "person_count2": parseInt(form.countper2),
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
            "overnight": 0,
            "license_number": form.idcar
        }];
        console.log([JSON.stringify(form)]);
        console.log("aaaa",jsonref);
        axios.post('https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/InsertReserveCar_NoDriver',jsonref,{headers:headers1}).then((response) => {
            toast({
                id: toastId4,
                description: `เพิ่มข้อมูลสำเร็จ`,
                status: "success",
                duration: 5000,
                isClosable: false,
              })
              setform({
                idcarbooking:null,
                PlantId:me?.data?.data?.myHrEmployee.plantId,
                employee_no:me?.data?.data?.myHrEmployee.employeeNo,
                booking_date:"2023-12-06 03:54:07.6233333 +00:00",
                bookingname:me?.data?.data?.myHrEmployee.firstName+" "+me?.data?.data?.myHrEmployee.lastName,
                email:me?.data?.data?.myHrEmployee.email,
                agency:me?.data?.data?.myHrEmployee.jobName,
                division:me?.data?.data?.myHrEmployee.positionName,
                tel:"",
                code_employee:"",
                email_employee:"",
                agency_employee:"",
                division_employee:"",
                name_use_car:"",
                tel_use_car:"",
                type_idcar:"",
                brand:"",
                idcar:"",
                pathfile:"",
                note:"",
                typecar:"",
                number_travelers:"0",
                brand_cars1:"",
                person_count:"0",
                number_cars:"0",
                brand_cars2:"",
                person_count2:"0",
                startdate:"",
                enddate:"",
                locationIn:"",
                timeIn:"00:00",
                LocationOut:"",
                timeOut:"00:00",
                operational_area:"",
                upcountry:"",
                overnight_stay:"",
                person_responsible_for_expenses:"",
                other:"",
                GL:"",
                cost_enter:"",
                order:"",
                countcar1:0,
                countper1:0,
                countcar2:0,
                countper2:0,
                license_number:"",
              });
              setStartDate1(undefined)
              setStartDate2(undefined)
              setckcar1(false);
              setckcar2(false);
              setpictureFile(null);
              setnamefile("")
              setimageshow("gibbresh.png")
              setshowfile(true);
        }).catch((error) => {
            toast({
                id: toastId4,
                description: error,
                status: "error",
                duration: 5000,
                isClosable: false,
              })
        });
    }
    const [disbut,setdisbut] = useState<boolean>(false);
    useEffect(() => {
        setform({
            idcarbooking:null,
            PlantId:me?.data?.data?.myHrEmployee.plantId,
            employee_no:me?.data?.data?.myHrEmployee.employeeNo,
            booking_date:"2023-12-06 03:54:07.6233333 +00:00",
            bookingname:me?.data?.data?.myHrEmployee.firstName == undefined ? " " :me?.data?.data?.myHrEmployee.firstName+" "+me?.data?.data?.myHrEmployee.lastName,
            email:me?.data?.data?.myHrEmployee.email,
            agency:me?.data?.data?.myHrEmployee.jobName,
            division:me?.data?.data?.myHrEmployee.positionName,
            tel:"",
            code_employee:"",
            email_employee:"",
            agency_employee:"",
            division_employee:"",
            name_use_car:"",
            tel_use_car:"",
            type_idcar:"",
            brand:"",
            idcar:"",
            pathfile:"",
            note:"",
            typecar:"",
            number_travelers:"0",
            brand_cars1:"",
            person_count:"0",
            number_cars:"0",
            brand_cars2:"",
            person_count2:"0",
            startdate:"",
            enddate:"",
            locationIn:"",
            timeIn:"00:00",
            LocationOut:"",
            timeOut:"00:00",
            operational_area:"",
            upcountry:"",
            overnight_stay:"",
            person_responsible_for_expenses:"",
            other:"",
            GL:"",
            cost_enter:"",
            order:"",
            countcar1:0,
            countper1:0,
            countcar2:0,
            countper2:0,
            license_number:"",
          });
        //   let config = {
        //     method: 'get',
        //     maxBodyLength: Infinity,
        //     url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/CheckReserverCar/2',
        //     headers: { 
        //       'accept': '*/*', 
        //       'Authorization': 'Bearer '+tokens
        //     }
        //   };
          
        //   axios.request(config)
        //   .then((response) => {
        //     console.log(response);
        //     if(response.data.data.length == 0) {
        //         toast({
        //             id: "error",
        //             description: `ไม่มีรถที่พร้อมให้บริการ`,
        //             status: "warning",
        //             duration: 5000,
        //             isClosable: false,
        //           })
        //         setdisbut(true);
        //     }
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
    },[me.isLoading])
    const handleChange = (event: any) => {
        let value = event.target.value;
        setDatas({ ...datas, [event.target.name]: event.target.value })
    }
    console.log(datas);
    const handlereset = (event:any) => {
        setform({
            idcarbooking:null,
            PlantId:me?.data?.data?.myHrEmployee.plantId,
            employee_no:me?.data?.data?.myHrEmployee.employeeNo,
            booking_date:"2023-12-06 03:54:07.6233333 +00:00",
            bookingname:me?.data?.data?.myHrEmployee.firstName+" "+me?.data?.data?.myHrEmployee.lastName,
            email:me?.data?.data?.myHrEmployee.email,
            agency:me?.data?.data?.myHrEmployee.jobName,
            division:me?.data?.data?.myHrEmployee.positionName,
            tel:"",
            code_employee:"",
            email_employee:"",
            agency_employee:"",
            division_employee:"",
            name_use_car:"",
            tel_use_car:"",
            type_idcar:"",
            brand:"",
            idcar:"",
            pathfile:"",
            note:"",
            typecar:"",
            number_travelers:"0",
            brand_cars1:"",
            person_count:"0",
            number_cars:"0",
            brand_cars2:"",
            person_count2:"0",
            startdate:"",
            enddate:"",
            locationIn:"",
            timeIn:"00:00",
            LocationOut:"",
            timeOut:"00:00",
            operational_area:"",
            upcountry:"",
            overnight_stay:"",
            person_responsible_for_expenses:"",
            other:"",
            GL:"",
            cost_enter:"",
            order:"",
            countcar1:0,
            countper1:0,
            countcar2:0,
            countper2:0,
            license_number:"",
          });
          setStartDate1(undefined)
              setStartDate2(undefined)
              setckcar1(false);
              setckcar2(false);
              setpictureFile(null);
        setnamefile("")
        setimageshow("gibbresh.png")
        setshowfile(true);
    }
    const isError = datas.note === ''
    return (
        <>
            <Head>
                <title>จองรถเช่าเหมาวัน(ไม่มีคนขับ)</title>
                <meta name="description" content="reservation" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>ไฟล์แนบ</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                </ModalBody>
                    <Image src={imageshow} width={"640px"} height={"480px"} fallbackSrc='https://via.placeholder.com/640x480' />

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
            <form >
                <Text className='head-text' >จองรถเช่าเหมาวัน(ไม่มีคนขับ)</Text>
                <Grid h='200px'
                    templateRows='repeat(2, 1fr)'
                    templateColumns='repeat(12, 1fr)'
                    gap={4}>
                    <GridItem colSpan={4}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>วันที่จองรถ</FormLabel>
                            {/* <Input style={{ border: '1px #00AAAD solid' }} type="date" value={new Date(Date.now()).toISOString().split("T")[0]} /> */}
                            <DatePicker required dateFormat="dd-MM-yyyy" wrapperClassName='date_picker full-width' selected={startDate} onChange={(date) => setStartDate(date)} />
                            <DatePickerWrapperStyles />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={8} />
                    <GridItem colSpan={4}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>ชื่อผู้จองรถ</FormLabel>
                            <Input type='search' value={form.bookingname} required onChange={handlebookingname} style={{ border: '1px #00AAAD solid' }} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>Email</FormLabel>
                            <Input type='search' value={form.email} required onChange={handleemail} style={{ border: '1px #00AAAD solid' }} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4} />
                    <GridItem colSpan={4}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>หน่วยงาน</FormLabel>
                            <Input type='search' value={form.agency} required onChange={handleagency} style={{ border: '1px #00AAAD solid' }} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>ส่วนงาน</FormLabel>
                            <Input type='search' value={form.division} required onChange={handledivision} style={{ border: '1px #00AAAD solid' }} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>เบอร์โทรศัพท์</FormLabel>
                            <Input type='search' placeholder='กรุณากรอกข้อมูล' value={form.tel} required  style={{ border: '1px #00AAAD solid' }} pattern="[0-9]*" onChange={handletel} name='phone' />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>รหัสพนักงานผู้ใช้งาน</FormLabel>
                            <Input type='search' placeholder='กรุณากรอกข้อมูล'  style={{ border: '1px #00AAAD solid' }}  required value={form.code_employee} onChange={handlecode_employee} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <FormControl >
                            <FormLabel className='lable-rentcar'>ชื่อผู้ใช้รถ</FormLabel>
                            <Input type='search' placeholder='Auto' readOnly style={{ border: '1px #00AAAD solid' }} required value={form.name_use_car} onChange={handlename_use_car} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>Email</FormLabel>
                            <Input type='search' placeholder='Auto' style={{ border: '1px #00AAAD solid' }} required value={form.email_employee} readOnly />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>ตำแหน่ง</FormLabel>
                            <Input type='search' placeholder='Auto' style={{ border: '1px #00AAAD solid' }} required value={form.agency_employee} readOnly />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <FormControl >
                            <FormLabel className='lable-rentcar'>ส่วนงาน</FormLabel>
                            <Input type='search' placeholder='Auto' style={{ border: '1px #00AAAD solid' }} required value={form.division_employee} readOnly />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>เบอร์โทรศัพท์ผู้ใช้รถ</FormLabel>
                            <Input type='search' placeholder='กรุณากรอกข้อมูล'  style={{ border: '1px #00AAAD solid' }} required pattern="[0-9]*" onChange={handletel_use_car} name='phone' value={form.tel_use_car} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>ข้อมูลใบขับขี่บริษัท</FormLabel>
                            <RadioGroup value={"1"} >
                                <Stack direction='row' alignItems={"baseline"} >
                                    <Radio value='1' defaultChecked>มีใบขับขี่ เลขที่ </Radio><Input style={{ border: '1px #00AAAD solid', width: '150px' }} value={form.idcar} onChange={handle_idcar}  required />
                                </Stack>
                            </RadioGroup>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={5}>
                        <FormControl isRequired>
                            <FormLabel style={{display:"inline-block"}} htmlFor="file-input" id='file-input-label' className='lable-rentcar'>แนบไฟล์ใบขับขี่</FormLabel>
                            <Input type='file' style={{ border: '0px solid', color: '#00AAAD' }}  id="file-input" name="file-input" required  onChange={pictureChangeHandler}/>
                            {/* <label id="file-input-label" htmlFor="file-input">แนบไฟล์ใบขับขี่ </label> */}
                            <Button isDisabled={showfile} onClick={(e)=>{window.open(imageshow,"_blank")}} className='lable-rentcar'  colorScheme='teal' size='md' px={'2'} py={'2'} mb={"10px"} type="button"><SearchIcon /></Button>

                        </FormControl>
                        <FormLabel className='lable-rentcar'>{namefile}</FormLabel>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <FormControl pt={"8"}>
                            {/* <label id="file-input-label" htmlFor="file-input">แนบไฟล์ใบขับขี่ </label> */}
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={8}>
                        <FormControl isRequired isInvalid={isError}>
                            <FormLabel className='lable-rentcar'>วัตถุประสงค์ในการจองรถ</FormLabel>
                            <Input type='search' placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} value={form.note} onChange={handlenote} name='note' required />
                            {isError &&
                                <FormErrorMessage>กรณุรากรอกข้อมูล</FormErrorMessage>
                            }
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={12}>
                        <FormControl >
                            <FormLabel className='lable-rentcar'>ประเภทรถที่ขอ <span style={{color:"red"}}>*</span></FormLabel>
                            <Flex>
                                <Checkbox colorScheme='green' marginRight={"20px"} isChecked={ckcar1} onChange={(val)=>setckcar1(val.target.checked)}>
                                    รถเก๋ง
                                </Checkbox>
                                <Stack direction='row' alignItems={"baseline"} marginRight={"20px"}  marginLeft={"10px"}>
                                    <FormLabel className='lable-rentcar'>ยี่ห้อรุ่น</FormLabel>
                                    <Input type='search' required isDisabled={!ckcar1} style={{ border: '1px #00AAAD solid' }} maxWidth={"150"} value={form.brand_cars1} onChange={handlebrand1}  />
                                </Stack>
                                <Stack direction='row' alignItems={"baseline"}>
                                    <FormLabel className='lable-rentcar'>จำนวนคัน</FormLabel>
                                    <Input type='search' required onChange={handlecountcar1} value={form.countcar1} isDisabled={!ckcar1} pattern="[0-9]*" style={{ border: '1px #00AAAD solid', margin: "0px 10px" }} maxWidth={"100"} />
                                </Stack>
                                <Stack direction='row' alignItems={"baseline"}>
                                    <FormLabel className='lable-rentcar'>จำนวนผู้เดินทาง</FormLabel>
                                    <Input type='search' required onChange={handlecountper1} value={form.countper1} isDisabled={!ckcar1} pattern="[0-9]*" style={{ border: '1px #00AAAD solid', margin: "0px 10px" }} maxWidth={"100"} />
                                </Stack>
                            </Flex>
                            {/* <RadioGroup onChange={setValue} value={value}>
                                <Stack direction='row'>
                                    <Radio value='1'>รถตู้</Radio>
                                    <Radio value='2'>รถกระบะ</Radio>
                                </Stack>
                            </RadioGroup> */}
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={12}>
                        <FormControl >
                            <Flex>
                                <Checkbox colorScheme='green' marginRight={"20px"} isChecked={ckcar2} onChange={(val)=>setckcar2(val.target.checked)}>
                                    รถกระบะ
                                </Checkbox>
                                <Stack direction='row' alignItems={"baseline"} marginRight={"20px"}>
                                    <FormLabel className='lable-rentcar'>ยี่ห้อรุ่น</FormLabel>
                                    <Input type='search' required isDisabled={!ckcar2} style={{ border: '1px #00AAAD solid' }} maxWidth={"150"} value={form.brand_cars2} onChange={handlebrand2} />
                                </Stack>
                                <Stack direction='row' alignItems={"baseline"}>
                                    <FormLabel className='lable-rentcar'>จำนวนคัน</FormLabel>
                                    <Input type='search' required onChange={handlecountcar2} value={form.countcar2} isDisabled={!ckcar2} pattern="[0-9]*" style={{ border: '1px #00AAAD solid', margin: "0px 10px" }} maxWidth={"100"} />
                                </Stack>
                                <Stack direction='row' alignItems={"baseline"}>
                                    <FormLabel className='lable-rentcar'>จำนวนผู้เดินทาง</FormLabel>
                                    <Input type='search' required onChange={handlecountper2} value={form.countper2} isDisabled={!ckcar2} pattern="[0-9]*" style={{ border: '1px #00AAAD solid', margin: "0px 10px" }} maxWidth={"100"} />
                                </Stack>
                            </Flex>
                            {/* <RadioGroup onChange={setValue} value={value}>
                                <Stack direction='row'>
                                    <Radio value='1'>รถตู้</Radio>
                                    <Radio value='2'>รถกระบะ</Radio>
                                </Stack>
                            </RadioGroup> */}
                        </FormControl>
                    </GridItem>
                    
                    
                    <GridItem colSpan={12} />

                    <GridItem colSpan={4}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>วันที่ใช้รถเริ่มต้น</FormLabel>
                            {/* <Cont roller
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
                            {/* <Input style={{ border: '1px #00AAAD solid' }} required type="date" /> */}
                            <DatePicker required minDate={new Date("06-15-2024")} placeholderText='วัน-เดือน-ปี' minDate={new Date()} dateFormat="dd-MM-yyyy" wrapperClassName='date_picker full-width' selected={startDate1} onChange={handlestartdate} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>วันที่ใช้รถสิ้นสุด</FormLabel>
                            {/* <Input style={{ border: '1px #00AAAD solid' }} required type="date" /> */}
                            <DatePicker required placeholderText='วัน-เดือน-ปี' minDate={dateminend}  dateFormat="dd-MM-yyyy" wrapperClassName='date_picker full-width' selected={startDate2} onChange={handleenddate} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4} />
                    <GridItem colSpan={4}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>สถานที่รับ</FormLabel>
                            <Input type='search' placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} value={form.locationIn} onChange={handlelocationin} required />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>เวลา</FormLabel>
                            {/* <Input style={{ border: '1px #00AAAD solid' }} required type="time" /> */}
                            <TimePicker required  onChange={onChanges1} value={dayjs(form.timeIn,"HH:mm")}  format="HH:mm" placeholder='กรอกเวลา' />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4} />
                    <GridItem colSpan={4}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>สถานที่ส่ง</FormLabel>
                            <Input type='search' placeholder='กรุณากรอกข้อมูล' value={form.LocationOut} onChange={handlelocationout} style={{ border: '1px #00AAAD solid' }} required />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>เวลา</FormLabel>
                            {/* <Input style={{ border: '1px #00AAAD solid' }} required type="time" /> */}
                            <TimePicker required onChange={onChanges2} value={dayjs(form.timeOut,"HH:mm")} format="HH:mm" placeholder='กรอกเวลา' disabledTime={disabledDateTime}/>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4} />

                    <GridItem colSpan={4}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>ผู้รับผิดชอบค่าใช้จ่าย</FormLabel>
                            <Select onChange={handleperson_responsible_for_expenses} value={form.person_responsible_for_expenses} required name='pay' placeholder='ผู้รับผิดชอบค่าใช้จ่าย' style={{ border: '1px #00AAAD solid' }}>
                                <option value='1'>SKC</option>
                                <option value='2'>อื่นๆ</option>
                            </Select>
                        </FormControl>
                    </GridItem>
                    {form.person_responsible_for_expenses == '2' ?
                        <>
                            <GridItem colSpan={4}>
                                <FormControl isRequired>
                                    <FormLabel className='lable-rentcar'>อื่นๆ</FormLabel>
                                    <Input type='search' style={{ border: '1px #00AAAD solid' }} required value={form.other} onChange={handleother} />
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={2} />
                        </>
                        :
                        <GridItem colSpan={8} />
                    }
                    <GridItem colSpan={4}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar' >GL</FormLabel>
                            <Input type='search' placeholder='กรุณากรอกข้อมูล' required style={{ border: '1px #00AAAD solid' }} value={form.GL} onChange={handlegl} />
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={4}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>Cost Center</FormLabel>
                            <Input type='search' placeholder='กรุณากรอกข้อมูล' required style={{ border: '1px #00AAAD solid' }} id='cost-enter' value={form.cost_enter} onChange={handleconst_enter} name='cost-enter' />
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={4}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>Order</FormLabel>
                            <Input type='search' placeholder='กรุณากรอกข้อมูล' required style={{ border: '1px #00AAAD solid' }} id='order' name='order' value={form.order} onChange={handleorder} />
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={6}>
                        <Button disabled={disbut} onClick={handleSubmit} className='lable-rentcar' type='submit' colorScheme='teal' size='md' px={'10'} py={'5'} mb={"20px"}>
                            ส่งแบบฟอร์ม
                        </Button>
                        <Button style={{marginLeft:"30px"}} onClick={handlereset} className='lable-rentcar'  colorScheme='teal' size='md' px={'10'} py={'5'} mb={"20px"}>
                            ล้างข้อมูล
                        </Button>
                    </GridItem>
                </Grid>

            </form >


        </>

    )
}

export default RentCarAllDay