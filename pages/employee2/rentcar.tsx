import { Button, Checkbox, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Grid, GridItem, Input, Radio, RadioGroup, Select, Stack, Text,useToast } from '@chakra-ui/react'
import Head from 'next/head';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Controller } from 'react-hook-form';
import { getMe } from "../../data-hooks/me/getMe"
import DatePickerInput from '../../components/input/Datepicker';
import DatePicker from 'react-datepicker';
import styled, { css, createGlobalStyle } from 'styled-components';
import { localStorageLoad } from '../../utils/localStrorage';

import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { TimePicker } from 'antd';

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

const RentCar = () => {
    const me = getMe()
    const toast = useToast()
    const tokens = localStorageLoad("token")
    const toastId4 = "success"
    const [value, setValue] = useState("1")
    const [datas, setDatas] = useState<any>([])
    const [date, setDate] = useState<any>(new Date())
    const [startDate, setStartDate] = useState(new Date());
    const [startDate1, setStartDate1] = useState();
    const [startDate2, setStartDate2] = useState();
    const [ckcar1,setckcar1] = useState<boolean>(false)
    const [ckcar2,setckcar2] = useState<boolean>(false)
    const [dateminend, setdateminend] = useState(new Date())
    // console.log(value);
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
    const handlestartdate = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { 
        const vl = new Date(event)
        const dal1 = [vl.getFullYear(), vl.getMonth()+1, vl.getDate()].join('-');
        setdateminend(new Date([vl.getFullYear(), vl.getMonth()+1, vl.getDate()].join('-')))
        setStartDate1(event);
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
    const handleSubmit = (event: any) => {
        // alert('You clicked submit');
        event.preventDefault();
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
                    description: `กรุณาใส่จำนวนรถตู้`,
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
        const data = new FormData(event.currentTarget);
        // console.log(data.get('cost-enter'));
        const headers1 = { 
            'Authorization': 'Bearer '+tokens
          }
          const vl = new Date(startDate)
        let jsonref = [{
            "idcarbooking":null,
            "PlantId":parseInt(me?.data?.data?.myHrEmployee.plantId),
            "employee_no":me?.data?.data?.myHrEmployee.employeeNo,
            "booking_date":[vl.getFullYear(), vl.getMonth()+1, vl.getDate()].join('-')+" 03:54:07.6233333 +00:00",
            "bookingname":form.bookingname,
            "email":form.email,
            "agency":form.agency,
            "division":form.division,
            "tel":form.tel,
            "note":form.note,
            "typecar":null,
            "number_travelers":parseInt(form.countcar1),
            "number_cars":parseInt(form.number_cars),
            "startdate":form.startdate,
            "enddate":form.enddate,
            "locationIn":form.locationIn,
            "timeIn":form.timeIn,
            "LocationOut":form.LocationOut,
            "timeOut":form.timeOut,
            "operational_area":form.operational_area,
            "overnight_stay":form.overnight_stay,
            "person_responsible_for_expenses":form.person_responsible_for_expenses,
            "GL":form.GL,
            "cost_enter":form.cost_enter,
            "order":form.order,
            "status": 0,
            "status_approved": 0,
            "googleform": 0
        }];
        console.log([JSON.stringify(form)]);
        console.log("aaaa",jsonref);
        // console.log(data.get('cost-enter'));
        axios.post('https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/InsertReserveCar_Pickup_and_drop',jsonref,{headers:headers1}).then((response) => {
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
                note:"",
                typecar:"",
                number_travelers:"",
                number_cars:"",
                startdate:"",
                enddate:"",
                locationIn:"",
                timeIn:"00:00",
                LocationOut:"",
                timeOut:"00:00",
                operational_area:"",
                overnight_stay:"",
                person_responsible_for_expenses:"",
                GL:"",
                cost_enter:"",
                order:"",
                countcar1:0,
                countper1:0,
                countcar2:0,
                countper2:0
              });
              setStartDate1(undefined)
              setStartDate2(undefined)
              setckcar1(false);
              setckcar2(false);
        }).catch((error) => {
            toast({
                id: toastId4,
                description: error.response.data.error.message,
                status: "error",
                duration: 5000,
                isClosable: false,
              })
        });
    }

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
        note:"",
        typecar:"",
        number_travelers:"",
        number_cars:"",
        startdate:"",
        enddate:"",
        locationIn:"",
        timeIn:"00:00",
        LocationOut:"",
        timeOut:"00:00",
        operational_area:"",
        overnight_stay:"",
        person_responsible_for_expenses:"",
        GL:"",
        cost_enter:"",
        order:"",
        countcar1:0,
        countper1:0,
        countcar2:0,
        countper2:0
})
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
        note:"",
        typecar:"",
        number_travelers:"",
        countcar1:0,
        countper1:0,
        countcar2:0,
        countper2:0,
        number_cars:"",
        startdate:"",
        enddate:"",
        locationIn:"",
        timeIn:"00:00",
        LocationOut:"",
        timeOut:"00:00",
        operational_area:"",
        overnight_stay:"",
        person_responsible_for_expenses:"",
        GL:"",
        cost_enter:"",
        order:"",
      });
      setStartDate1(undefined)
        setStartDate2(undefined)
        setckcar1(false);
        setckcar2(false);
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
            note:"",
            typecar:"",
            number_travelers:"",
            number_cars:"",
            startdate:"",
            enddate:"",
            locationIn:"",
            timeIn:"00:00",
            LocationOut:"",
            timeOut:"00:00",
            operational_area:"",
            overnight_stay:"",
            person_responsible_for_expenses:"",
            GL:"",
            cost_enter:"",
            order:"",
        });
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/CheckReserverCar/3',
            headers: { 
              'accept': '*/*', 
              'Authorization': 'Bearer '+tokens
            }
          };
          
          axios.request(config)
          .then((response) => {
            console.log(response);
            if(response.data.data.length == 0) {
                toast({
                    id: "error",
                    description: `ไม่มีรถที่พร้อมให้บริการ`,
                    status: "warning",
                    duration: 5000,
                    isClosable: false,
                  })
                setdisbut(true);
            }
          })
          .catch((error) => {
            console.log(error);
          });
    },[me.isLoading])
    // console.log(value);
    const handlebookingname = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,bookingname:event.target.value}})
    const handleemail = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,email:event.target.value}})
    const handleagency = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,agency:event.target.value}})
    const handledivision = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,division:event.target.value}})
    const handletel = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { 
        let isnumber = /^[0-9\b]*$/;
        if(isnumber.test(event.target.value))
        {
            return {...prev,tel:event.target.value}
        }  else{
            return {...prev}
        }  
        
    })
    const handlenote = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,note:event.target.value}})
    const handletypecar = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,typecar:event.target.value}})
    const handlenumber_travelers = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,number_travelers:event.target.value}})
    const handlenumber_cars = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,number_cars:event.target.value}})
    const handlelocationIn = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,locationIn:event.target.value}})
    const handletimeIn = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,timeIn:event.target.value}})
    const handlelocationOut = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,LocationOut:event.target.value}})
    const handletimeOut = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,timeOut:event.target.value}})
    const handleoperational_area = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,operational_area:event.target.value}})
    const handleovernight_stay = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,overnight_stay:event.target.value}})
    const handleperson_responsible_for_expenses = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,person_responsible_for_expenses:event.target.value}})
    const handleGL = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,GL:event.target.value}})
    const handlecost_enter = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,cost_enter:event.target.value}})
    const handleorder = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,order:event.target.value}})
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
                ggg = "00:00";
            }
        setform(prev => ({...prev,timeOut:ggg}));
        if(form.startdate == form.enddate)
            {
                sethours([])
                let subhours = ggg.split(":")
                sethours(range(0,parseInt(subhours[0])))
            }else{
                sethours([])
            }
        
      };
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
    const handleChange = (event: any) => {
        let value = event.target.value;
        setDatas({ ...datas, [event.target.name]: event.target.value })
    }
    console.log(datas);

    const isError = datas.note === ''
    return (
        <>
            <Head>
                <title>จองรถรับส่งระหว่างวัน</title>
                <meta name="description" content="reservation" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <form onSubmit={handleSubmit}>
                <Text className='head-text' >จองรถรับส่งระหว่างวัน</Text>
                <Grid h='200px'
                    templateRows='repeat(2, 1fr)'
                    templateColumns='repeat(12, 1fr)'
                    gap={4}>
                    <GridItem colSpan={4}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>วันที่จองรถ</FormLabel>
                            {/* <Input style={{ border: '1px #00AAAD solid' }} type="date" value={new Date(Date.now()).toISOString().split("T")[0]} /> */}
                            <DatePicker required dateFormat="dd-MM-yyyy" wrapperClassName='date_picker full-width' selected={startDate} onChange={handlestartdate} />
                            <DatePickerWrapperStyles />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={8} />
                    <GridItem colSpan={4}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>ชื่อผู้จองรถ</FormLabel>
                            <Input type='search'  style={{ border: '1px #00AAAD solid' }} name='booking_date' value={form.bookingname} onChange={handlebookingname} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>Email</FormLabel>
                            <Input type='search' style={{ border: '1px #00AAAD solid' }} name="email" value={form.email} onChange={handleemail}/>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4} />
                    <GridItem colSpan={4}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>หน่วยงาน</FormLabel>
                            <Input type='search' style={{ border: '1px #00AAAD solid' }} name="agency" value={form.agency} onChange={handleagency}/>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>ส่วนงาน</FormLabel>
                            <Input type='search' style={{ border: '1px #00AAAD solid' }} name="division" value={form.division} onChange={handledivision}/>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>เบอร์โทรศัพท์</FormLabel>
                            <Input type='search' required placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} onChange={handletel} _valid={form.tel} name='tel' value={form.tel} />
                        </FormControl>
                    </GridItem>
                  
                    <GridItem colSpan={8}>
                        <FormControl isRequired isInvalid={isError}>
                            <FormLabel  className='lable-rentcar'>วัตถุประสงค์ในการจองรถ</FormLabel>
                            <Input type='search' required placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} onChange={handlenote} _valid={form.note} value={form.note} name='note' />
                            {isError &&
                                <FormErrorMessage>กรุณากรอกข้อมูล</FormErrorMessage>
                            }
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={12}>
                        <FormControl >
                            <FormLabel className='lable-rentcar'>ประเภทรถที่ขอ <span style={{color:"red"}}>*</span></FormLabel>
                            <Flex>
                                <Checkbox colorScheme='green' marginRight={"30px"} isChecked={ckcar1}  onChange={(val)=>setckcar1(val.target.checked)}>
                                    รถตู้
                                </Checkbox>
                                <Stack direction='row' alignItems={"baseline"}>
                                    <FormLabel className='lable-rentcar'>จำนวนคัน</FormLabel>
                                    <Input type='search' required isDisabled={!ckcar1} style={{ border: '1px #00AAAD solid', margin: "0px 10px" }} maxWidth={"100"} value={form.countcar1} onChange={handlecountcar1} name='number_travelers' />
                                </Stack>
                                <Stack direction='row' alignItems={"baseline"}>
                                    <FormLabel className='lable-rentcar'>จำนวนผู้เดินทาง</FormLabel>
                                    <Input type='search' required isDisabled={!ckcar1} style={{ border: '1px #00AAAD solid', margin: "0px 10px" }} value={form.countper1} onChange={handlecountper1} maxWidth={"100"} />
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
                        <FormControl>
                            <Flex>
                                <Checkbox colorScheme='green' marginRight={"20px"} isChecked={ckcar2} onChange={(val)=>setckcar2(val.target.checked)}>
                                รถกระบะ
                                </Checkbox>
                                <Stack direction='row' alignItems={"baseline"}>
                                    <FormLabel className='lable-rentcar'>จำนวนคัน</FormLabel>
                                    <Input type='search' required isDisabled={!ckcar2} style={{ border: '1px #00AAAD solid', margin: "0px 10px" }} maxWidth={"100"} value={form.countcar2} onChange={handlecountcar2} name='number_cars' />
                                </Stack>
                                <Stack direction='row' alignItems={"baseline"}>
                                    <FormLabel className='lable-rentcar'>จำนวนผู้เดินทาง</FormLabel>
                                    <Input type='search' required isDisabled={!ckcar2} style={{ border: '1px #00AAAD solid', margin: "0px 10px" }} maxWidth={"100"} value={form.countper2} onChange={handlecountper2} />
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
                    
                   
                    <GridItem colSpan={9}/>

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
                            {/* <Input style={{ border: '1px #00AAAD solid' }} type="date" value={form.startdate} onChange={handlestartdate} /> */}
                            <DatePicker required  placeholderText='วัน-เดือน-ปี' minDate={new Date()} dateFormat="dd-MM-yyyy" wrapperClassName='date_picker full-width' selected={startDate1} onChange={handlestartdate} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>วันที่ใช้รถสิ้นสุด</FormLabel>
                            {/* <Input style={{ border: '1px #00AAAD solid' }} type="date" value={form.enddate} onChange={handleenddate} /> */}
                            <DatePicker required placeholderText='วัน-เดือน-ปี' minDate={dateminend} dateFormat="dd-MM-yyyy" wrapperClassName='date_picker full-width' selected={startDate2} onChange={handleenddate} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4} />
                    <GridItem colSpan={4}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>สถานที่รับ</FormLabel>
                            <Input required type='search' placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} value={form.locationIn} onChange={handlelocationIn} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>เวลา</FormLabel>
                            {/* <Input style={{ border: '1px #00AAAD solid' }} type="time" value={form.timeIn} onChange={handletimeIn} /> */}
                            <TimePicker required onChange={onChanges1} value={dayjs(form.timeIn,"HH:mm")} format="HH:mm" placeholder='กรอกเวลา' />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4} />
                    <GridItem colSpan={4}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>สถานที่ส่ง</FormLabel>
                            <Input required type='search' placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }}  value={form.LocationOut} onChange={handlelocationOut}/>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>เวลา</FormLabel>
                            {/* <Input style={{ border: '1px #00AAAD solid' }} type="time" value={form.timeOut} onChange={handletimeOut} /> */}
                            <TimePicker required onChange={onChanges2} value={dayjs(form.timeOut,"HH:mm")}  format="HH:mm" placeholder='กรอกเวลา' disabledTime={disabledDateTime} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4} />
                   
                    <GridItem colSpan={4}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>ผู้รับผิดชอบค่าใช้จ่าย</FormLabel>
                            <Select required onChange={handleperson_responsible_for_expenses} name='pay' placeholder='ผู้รับผิดชอบค่าใช้จ่าย' style={{ border: '1px #00AAAD solid' }} value={form.person_responsible_for_expenses}>
                                <option value='1'>SKC</option>
                                <option value='2'>อื่นๆ</option>
                            </Select>
                        </FormControl>
                    </GridItem>
                    {
                        form.person_responsible_for_expenses == "2" ? 
                        <GridItem colSpan={8}>
                            <FormControl isRequired>
                                <FormLabel className='lable-rentcar'>รายละเอียด</FormLabel>
                                <Input type='search' required placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }}  />
                            </FormControl>
                        </GridItem>
                        
                        :
                        <GridItem colSpan={8} />
                    }
                    <GridItem colSpan={4}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar' >GL</FormLabel>
                            <Input type='search' required placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} value={form.GL} onChange={handleGL}/>
                        </FormControl>
                    </GridItem>
                   

                    <GridItem colSpan={4}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>Cost center</FormLabel>
                            <Input type='search' required placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} id='cost-enter' name='cost-enter' value={form.cost_enter} onChange={handlecost_enter} />
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={4}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>Order</FormLabel>
                            <Input type='search' required placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} id='order' name='order' value={form.order} onChange={handleorder} />
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={8}>
                        <Button disabled={disbut} className='lable-rentcar' type='submit' colorScheme='teal' size='md' px={'10'} py={'5'} mb={"20px"}>
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

export default RentCar