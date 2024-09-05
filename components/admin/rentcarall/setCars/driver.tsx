import { Button, Checkbox, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Grid, GridItem, Input, Radio, RadioGroup, Select, Stack, Text,useToast,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Container,
 } from '@chakra-ui/react'
import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react'
import { Controller } from 'react-hook-form';
import DatePickerInput from '../../../../components/input/Datepicker';
import axios from 'axios';
import { getMe } from "../../../../data-hooks/me/getMe"
// import { getApproved } from '../../data-hooks/me/getapproved';
import { localStorageLoad } from '../../../../utils/localStrorage';
import { ref } from 'yup';
// import {DatePicker} from 'chakra-ui-date-input'
import DatePicker from 'react-datepicker';
import styled, { css, createGlobalStyle } from 'styled-components';

import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { TimePicker } from 'antd';

import { DeleteIcon } from '@chakra-ui/icons';
import { red } from '@mui/material/colors';
import { split } from 'lodash';


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

const RentCarAllDayDriver = ({ data }) => {
    const tokens = localStorageLoad("token")
    const me = getMe()
    // const getapp = getApproved("16409");
    // console.log(getapp);
    const toast = useToast()
    const toastId4 = "success"
    const toastId7 = "error"
    const timerdis = useState([1]);
    const [value1, onChange] = useState('10:00');
    const [plant,setplant] = useState<Number>(1);
    const [value, setValue] = useState("1")
    const [ckcar1,setckcar1] = useState<boolean>(false)
    const [ckcar2,setckcar2] = useState<boolean>(false)
    const [ckvar3,setckcar3] = useState<string>("0")
    const [disbut,setdisbut] = useState<boolean>(false);
    const [loading,setloading] = useState<boolean>(false);
    const [dateminend, setdateminend] = useState(new Date())
    dayjs.extend(customParseFormat);
    delete data.drivername;
    delete data.created_at;
    delete data.status;
    delete data.status_approved;
    delete data.googleform;
    data.person_count1 = data.person_count2;
    // delete data.person_count2;

    const [form, setform] = useState(data)
    
    const onChanges1 = (time: Dayjs, timeString: string) => {
        var ggg = timeString
        if(typeof timeString === "string" && timeString.length === 0)
            {
                ggg = "00:00";
            }
        setform(prev => ({...prev,timeIn:ggg}));
        if(data.startdate == data.enddate)
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
        // console.log(timeString);
        var ggg = timeString
        if(typeof timeString === "string" && timeString.length === 0)
            {
                ggg = "00:00";
            }
        setform(prev => ({...prev,timeOut:ggg}));
        if(data.startdate == data.enddate)
            {
                sethours([])
                let subhours = ggg.split(":")
                sethours(range(0,parseInt(subhours[0])))
            }else{
                sethours([])
            }
        
      };
    useEffect(()=>{

    },[]);
    const [datas, setDatas] = useState<any>([])
    const [date, setDate] = useState<any>(new Date())
    // console.log(value);
    const handlebookingdate = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { 
        const vl = new Date(event)
        setStartDate(event);
        return {...prev,booking_date:[vl.getFullYear(), vl.getMonth()+1, vl.getDate()].join('-')+" 03:54:07.6233333 +00:00"}
    });
    const handlebookingname = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,bookingname:event.target.value}})
    const handleemail = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,email:event.target.value}})
    const handleagency = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,agency:event.target.value}})
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
    const handlenote = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,note:event.target.value}})
    const handletypecar = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,typecar:event.target.value}})
    const handlenumber_travelers = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { 
        let isnumber = /^[0-9\b]*$/;
        if(isnumber.test(event.target.value))
        {
            return {...prev,number_travelers:event.target.value}
        }  else{
            return {...prev}
        }
    });
    const handlenumber_cars = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { 
        let isnumber = /^[0-9\b]*$/;
        if(isnumber.test(event.target.value))
        {
            return {...prev,number_cars:event.target.value}
        }  else{
            return {...prev}
        }
    });
    
    const handlestartdate = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { 
        const vl = new Date(event)
        const dal1 = [vl.getFullYear(), vl.getMonth()+1, vl.getDate()].join('-');
        setStartDate1(event);
        setdateminend(new Date([vl.getFullYear(), vl.getMonth()+1, vl.getDate()].join('-')))
        
        if(dal1 == data.enddate)
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
        setStartDate2(event);
        const datl = [vl.getFullYear(), vl.getMonth()+1, vl.getDate()].join('-');
        // console.log(event);
        if(data.startdate == datl)
            {
                sethours([])
                setform(prev => ({...prev,timeIn:"00:00"}));
                setform(prev => ({...prev,timeOut:"00:00"}));
            }else{
                sethours([])
            }
        return {...prev,enddate:[vl.getFullYear(), vl.getMonth()+1, vl.getDate()].join('-')}
    })
    const handlelocationIn = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,locationIn:event.target.value}})
    const handletimeIn = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,timeIn:event.target.value}})
    const handlelocationOut = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,LocationOut:event.target.value}})
    const handletimeOut = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,timeOut:event.target.value}})
    const handleoperational_area = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,operational_area:event.target.value}})
    const handleovernight_stay = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,overnight_stay:event.target.value}})
    const handleperson_responsible_for_expenses = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,person_responsible_for_expenses:event.target.value}})
    const handleTrip = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { 
        let isnumber = /^[0-9\b]*$/;
        if(isnumber.test(event.target.value))
        {
            return {...prev,person_count:event.target.value}
        } else{
            return {...prev}
        }
        
        
    })
    const handleTrip1 = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { 
        let isnumber = /^[0-9\b]*$/;
        if(isnumber.test(event.target.value))
        {
            return {...prev,person_count1:event.target.value}
        } else{
            return {...prev}
        }
        
        
    })
    const typecars = useRef(null)
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
    const handlerovince = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,province:event.target.value}})
    const handleGL = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,GL:event.target.value}})
    const handlecost_enter = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,cost_enter:event.target.value}})
    const handleorder = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,order:event.target.value}})
    const handleovernight = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> {
        let isnumber = /^[0-9\b]*$/;
        if(isnumber.test(event.target.value))
        {
            return {...prev,overnight:event.target.value}
        } else{
            return {...prev}
        } 
    })
    const handleother = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,other:event.target.value}})
    const handleSubmit = (event: any) => {
        event.preventDefault();
        if(ckcar1 == false && ckcar2 == false)
            {
                toast({
                    id: toastId4,
                    description: `กรุณาเลือกประเภทรถ`,
                    status: "error",
                    duration: 5000,
                    isClosable: false,
                  })
                
                return;
            }
        if(ckcar1 == true &&  data.number_travelers == 0)
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
        if(ckcar2 == true &&  data.number_cars == 0)
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
        if(data.timeIn == "00:00" && data.timeOut == "00:00")
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
        if(data.overnight_stay == "option1" && data.overnight == 0)
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
        setloading(true)
    }

    useEffect(() => {
        if(data.person_count2){
            delete data.person_count2;
        }
        setform(data);
        setplant(me?.data?.data?.myHrEmployee.plantId)
      
          
    },[me.isLoading])

    const handlereset = (event:any) => {
        setckcar1(false);
        setckcar2(false);
        setform(data);
        setStartDate1(undefined)
        setStartDate2(undefined)
        setckcar1(false);
        setckcar2(false);
    }
    const handleChange = (event: any) => {
        let value = event.target.value;
        setDatas({ ...datas, [event.target.name]: event.target.value })
    }

    
    const [startDate, setStartDate] = useState();
    const [startDate1, setStartDate1] = useState();
    const [startDate2, setStartDate2] = useState();
    //====================================f
    const isError = datas.note === ''
    return (
        <>
            <Head>
                <title>จองรถเช่าเหมาวัน(พร้อมคนขับ)</title>
                <meta name="description" content="reservation" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <form onSubmit={handleSubmit} id='formsend'>
                <Text className='head-text' >จองรถเช่าเหมาวัน(พร้อมคนขับ)</Text>
                <Grid h='200px'
                    templateRows='repeat(2, 1fr)'
                    templateColumns='repeat(6, 1fr)'
                    gap={4}>
                    <GridItem colSpan={2} >
                        <FormControl isRequired >
                            <FormLabel className='lable-rentcar'>วันที่จองรถ</FormLabel>
                            <DatePicker required dateFormat="dd-MM-yyyy" wrapperClassName='date_picker full-width' selected={startDate} onChange={handlebookingdate} />
                            <DatePickerWrapperStyles />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4} />
                    <GridItem colSpan={2}>
                        <FormControl isRequired>
                            
                            <FormLabel className='lable-rentcar'>ชื่อผู้จองรถ</FormLabel>
                            <Input type='search' required style={{ border: '1px #00AAAD solid' }} name="bookingname" value={data.bookingname} onChange={handlebookingname}  />
                            
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>Email</FormLabel>
                            <Input type='search' required style={{ border: '1px #00AAAD solid' }} name="email" value={data.email} onChange={handleemail} />
                            
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2} />
                    <GridItem colSpan={2}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>หน่วยงาน</FormLabel>
                            <Input required type='search' style={{ border: '1px #00AAAD solid' }} name="agency" value={data.agency} onChange={handleagency} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>ส่วนงาน</FormLabel>
                            <Input required type='search' style={{ border: '1px #00AAAD solid' }} name="division" value={data.division} onChange={handledivision} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>เบอร์โทรศัพท์</FormLabel>
                            <Input required placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} type='search' onChange={handletel} name='search' pattern="[0-9]*" value={data.tel}  />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <FormControl isRequired isInvalid={isError}>
                            <FormLabel className='lable-rentcar'>วัตถุประสงค์ในการจองรถ</FormLabel>
                            <Input required type='search' placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} onChange={handlenote} value={data.note} name='note' />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={6}>
                        <FormControl>
                            <FormLabel  ref={typecars} className='lable-rentcar'>ประเภทรถที่ขอ <span style={{color:"red"}}>*</span></FormLabel>
                            <Flex>
                                <Checkbox colorScheme='green' marginRight={"30px"} isChecked={ckcar1}  onChange={(val) => setckcar1(val.target.checked)}>
                                    รถตู้
                                </Checkbox>
                                <FormLabel className='lable-rentcar' style={{marginTop:"10px"}}>จำนวนคัน</FormLabel>
                                <Stack direction='row' alignItems={"baseline"}>
                                    
                                    <Input isDisabled={!ckcar1} style={{ border: '1px #00AAAD solid', margin: "0px 10px" }} maxWidth={"100"} value={data.number_travelers} onChange={handlenumber_travelers} name='number_travelers' type='search' pattern="[0-9]*" />
                                    
                                    
                                </Stack>
                                <Text style={{marginTop:"10px"}}>คัน</Text>
                                <Stack direction='row' alignItems={"baseline"}>
                                    <FormLabel className='lable-rentcar'> จำนวนผู้เดินทาง</FormLabel>
                                    <Input isDisabled={!ckcar1} required type='search' style={{ border: '1px #00AAAD solid' }} maxWidth={"100"} value={data.person_count} onChange={handleTrip}/><Text >คน</Text>
                                </Stack>
                            </Flex>
                            
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={6}>
                        <FormControl >
                            <Flex>
                                <Checkbox colorScheme='green' marginRight={"20px"} isChecked={ckcar2} onChange={(val) => setckcar2(val.target.checked)}>
                                รถเก๋ง
                                </Checkbox>
                                <FormLabel className='lable-rentcar' style={{marginTop:"10px"}}>จำนวนคัน</FormLabel>
                                <Stack direction='row' alignItems={"baseline"}>
                                    <Input isDisabled={!ckcar2} style={{ border: '1px #00AAAD solid', margin: "0px 10px" }} maxWidth={"100"} value={data.number_cars} onChange={handlenumber_cars} type='search' name='number_cars' />
                                    
                                </Stack>
                                <Text style={{marginTop:"10px"}}>คัน</Text>
                                <Stack direction='row' alignItems={"baseline"}>
                                    <FormLabel className='lable-rentcar'> จำนวนผู้เดินทาง</FormLabel>
                                    <Input isDisabled={!ckcar2} required type='search' style={{ border: '1px #00AAAD solid' }} maxWidth={"100"} value={data.person_count1} onChange={handleTrip1}/><Text >คน</Text>
                                </Stack>
                            </Flex>
                            
                        </FormControl>
                    </GridItem>
                    
                    <GridItem colSpan={6} />
                    <GridItem colSpan={2}>
                       
                    </GridItem>
                    <GridItem colSpan={4} />
                    <GridItem colSpan={2}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>วันที่ใช้รถเริ่มต้น</FormLabel>
                           
                            <DatePicker required placeholderText='วัน-เดือน-ปี' dateFormat="dd-MM-yyyy" minDate={new Date()} wrapperClassName='date_picker full-width' selected={startDate1} onChange={handlestartdate} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>วันที่ใช้รถสิ้นสุด</FormLabel>

                            <DatePicker required placeholderText='วัน-เดือน-ปี' dateFormat="dd-MM-yyyy" minDate={dateminend} wrapperClassName='date_picker full-width' selected={startDate2} onChange={handleenddate} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2} />
                    <GridItem colSpan={2}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>สถานที่รับ</FormLabel>
                            <Input type='search' required placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} value={data.locationIn} onChange={handlelocationIn} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>เวลา</FormLabel>
                            
                            <TimePicker required onChange={onChanges1} value={dayjs(data.timeIn,"HH:mm")} format="HH:mm"  />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2} />
                    <GridItem colSpan={2}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>สถานที่ส่ง</FormLabel>
                            <Input type='search' required placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} value={data.LocationOut} onChange={handlelocationOut} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>เวลา</FormLabel>

                            <TimePicker required onChange={onChanges2} value={dayjs(data.timeOut,"HH:mm")} format="HH:mm" disabledTime={disabledDateTime}/>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2} />
                    <GridItem colSpan={2}>
                        {plant == 1 ? 
                            <FormControl isRequired>
                                <FormLabel className='lable-rentcar'>พื้นที่การปฏิบัติงาน</FormLabel>
                                <Select required placeholder='พื้นที่ปฏิบัติงาน' style={{ border: '1px #00AAAD solid' }} value={data.operational_area} onChange={handleoperational_area}>
                                    
                                        <option value='option1'>กรุงเทพฯ/ปริมณฑล</option>
                                        <option value='option2'>ต่างจังหวัด</option>
                                    
                                </Select>
                            </FormControl>
                        :
                            <FormControl isRequired>
                                <FormLabel className='lable-rentcar'>พื้นที่การปฏิบัติงาน</FormLabel>
                                <Select required placeholder='พื้นที่ปฏิบัติงาน' style={{ border: '1px #00AAAD solid' }} value={data.operational_area} onChange={handleoperational_area}>

                                    
                                        <option value='option1'>เขตชลบุรี/รอบชลบุรี</option>
                                        <option value='option2'>ต่างจังหวัด</option>
                                    
                                </Select>
                            </FormControl>
                        }
                    </GridItem>
                    {   data.operational_area == "option2" ? 
                        <GridItem colSpan={2}>
                            <FormControl isRequired>
                                <FormLabel className='lable-rentcar'>จังหวัด</FormLabel>
                                <Input type='search' required placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} value={data.province} onChange={handlerovince} />
                            </FormControl>
                        </GridItem>
                        :<GridItem colSpan={2} />
                    }
                    <GridItem colSpan={2} />
                    <GridItem colSpan={2}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>ข้อมูลการพักค้างคืน</FormLabel>
                            <Select required placeholder='ข้อมูลการพักค้างคืน' style={{ border: '1px #00AAAD solid' }} value={data.overnight_stay} onChange={handleovernight_stay}>
                                <option value='option1'>ค้างคืน</option>
                                <option value='option2'>ไม่ค้างคืน</option>
                            </Select>
                        </FormControl>
                    </GridItem>
                    {
                        data.overnight_stay == "option1" ? 
                        <GridItem colSpan={2}>
                            <FormControl isRequired>
                                <FormLabel className='lable-rentcar'>จำนวนวันที่ค้างคืน (วัน)</FormLabel>
                                <Input type='search' required placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} value={data.overnight} onChange={handleovernight} pattern="[0-9]*" />
                            </FormControl>
                        </GridItem>
                        :
                        <GridItem colSpan={2} />
                    }
                    
                    <GridItem colSpan={2} />
                    <GridItem colSpan={2}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>ผู้รับผิดชอบค่าใช้จ่าย</FormLabel>
                            <Select required onChange={handleperson_responsible_for_expenses} name='pay' placeholder='ผู้รับผิดชอบค่าใช้จ่าย' style={{ border: '1px #00AAAD solid' }} value={data.person_responsible_for_expenses}>
                                <option value='1'>SKC</option>
                                <option value='2'>อื่นๆ</option>
                            </Select>
                        </FormControl>
                    </GridItem>
                    {
                        data.person_responsible_for_expenses == "2" ? 
                        <GridItem colSpan={4}>
                            <FormControl isRequired>
                                <FormLabel className='lable-rentcar'>รายละเอียด</FormLabel>
                                <Input type='search' required placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} value={data.other} onChange={handleother} />
                            </FormControl>
                        </GridItem>
                        
                        :
                        <GridItem colSpan={4} />
                    }
                    <GridItem colSpan={2}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>GL</FormLabel>
                            <Input type='search' required placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} value={data.GL} onChange={handleGL} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>Cost Center</FormLabel>
                            <Input type='search' required placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} id='cost-enter' name='cost-enter' value={data.cost_enter} onChange={handlecost_enter} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>Order</FormLabel>
                            <Input type='search' required placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} id='cost-enter' name='cost-enter' value={data.order} onChange={handleorder} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <Button isLoading={loading}
                                loadingText='ส่งแบบฟอร์ม'
                                colorScheme='teal' 
                                className='lable-rentcar' 
                                type='submit' 
                                colorScheme='teal' size='md' px={'10'} py={'5'} mb={"20px"} disabled={disbut}>
                            ส่งแบบฟอร์ม
                        </Button>

                        <Button style={{marginLeft:"30px"}} onClick={handlereset} className='lable-rentcar' colorScheme='teal' size='md' px={'10'} py={'5'} mb={"20px"}>
                            <DeleteIcon style={{marginRight:"1px",marginTop:"-5px"}}/> ล้างข้อมูล
                        </Button>
                    </GridItem>
                </Grid>

            </form >
        </>
    )
}

export default RentCarAllDayDriver