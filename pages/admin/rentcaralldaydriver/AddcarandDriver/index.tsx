import { Button, Checkbox, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Grid, GridItem, Input, Radio, RadioGroup, Select, Stack, Text,useToast } from '@chakra-ui/react'
import Head from 'next/head';
import React, { useState } from 'react'
import axios from 'axios';
import { Controller } from 'react-hook-form';
import { getMe } from "../../../../data-hooks/me/getMe"
import DatePicker from 'react-datepicker';
import styled, { css, createGlobalStyle } from 'styled-components';

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
    const [startDate1, setStartDate1] = useState();
    const toast = useToast()
    const toastId4 = "success"
    const [value, setValue] = useState("1")
    const [datas, setDatas] = useState<any>([])
    const [date, setDate] = useState<any>(new Date())
    // console.log(value);
    const handleSubmit = (event: any) => {
        // alert('You clicked submit');
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // console.log(data.get('cost-enter'));
        let jsonref = [{
            "plantId": me?.data?.data?.myHrEmployee.plantId,
            "idTransportationProvider": 0,
            "typeCar": form.carname,
            "car_registration": form.car_registration,
            "dateRegisterCar": form.datecar+"T12:00:00.567Z",
            "brand": form.brand,
            "driverName": form.cardriver,
            "tel": form.teldriver

        }];
        console.log([JSON.stringify(form)]);
        console.log("aaaa",jsonref);
        // console.log(data.get('cost-enter'));
        axios.post('https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/InsertCarDetail',jsonref).then((response) => {
            toast({
                id: toastId4,
                description: `เพิ่มข้อมูลสำเร็จ`,
                status: "success",
                duration: 5000,
                isClosable: false,
              })
        setform({
            Id:null,
            typecar:"",
            carname:"",
            car_registration:"",
            brand:"บริษัท พี.ดี.อาร์.คาร์เซอร์วิส จำกัด",
            datecar:"",
            cardriver:"",
            teldriver:"",
        });
        setStartDate1(undefined);
        }).catch((error) => {
            console.log(error);
        });
    }

    const [form, setform] = useState({
        Id:null,
        typecar:"",
        carname:"",
        car_registration:"",
        brand:"บริษัท พี.ดี.อาร์.คาร์เซอร์วิส จำกัด",
        datecar:"",
        cardriver:"",
        teldriver:"",
        
    })
    const handlestartdate = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { 
        const vl = new Date(event)
        console.log([vl.getFullYear(), vl.getMonth()+1, vl.getDate()].join('-'))
        setStartDate1(event);
        return {...prev,datecar:[vl.getFullYear(), vl.getMonth()+1, vl.getDate()].join('-')}
    })
    // console.log(value);
    const handletypecar = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,typecar:event.target.value}})
    const handlecarname = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,carname:event.target.value}})
    const handlecarregistration = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,car_registration:event.target.value}})
    const handlebrand = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,brand:event.target.value}})
    const handledatecar = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,datecar:event.target.value}})
    const handlecardriver = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,cardriver:event.target.value}})
    const handleteldriver = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,teldriver:event.target.value}})
    
    const handleChange = (event: any) => {
        let value = event.target.value;
        setDatas({ ...datas, [event.target.name]: event.target.value })
    }
    console.log(datas);

    const isError = datas.note === ''
    return (
        <>
            <Head>
                <title>บันทึกข้อมูลรถและคนขับรถ</title>
                <meta name="description" content="reservation" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <form onSubmit={handleSubmit}>
                <Text className='head-text' >ข้อมูลรถและคนขับรถ</Text>
                <Grid h='200px'
                    templateRows='repeat(2, 1fr)'
                    templateColumns='repeat(12, 1fr)'
                    gap={4}>
                    <GridItem colSpan={12}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>ผู้ให้บริการ</FormLabel>
                            <Input placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} name='booking_date' value={form.brand} onChange={handlebrand} required />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={12}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>ประเภทรถ</FormLabel>
                            <Select placeholder='เลือกประเภทรถ' style={{ border: '1px #00AAAD solid' }} value={form.carname} onChange={handlecarname} required>
                                <option value='1'>รถตู้</option>
                                <option value='2'>รถเก๋ง</option>
                            </Select>
                            
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={12}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>ทะเบียนรถ</FormLabel>
                            <Input  placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} name='booking_date' value={form.car_registration} onChange={handlecarregistration} required />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={12}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>วันที่จดทะเบียนรถ</FormLabel>
                            {/* <Input style={{ border: '1px #00AAAD solid' }} type="date" value={form.datecar} onChange={handledatecar} required /> */}
                            <DatePicker required placeholderText='วัน-เดือน-ปี' dateFormat="dd-MM-yyyy" wrapperClassName='date_picker full-width' selected={startDate1} onChange={handlestartdate} />
                            <DatePickerWrapperStyles />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={12}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>ชื่อคนขับ</FormLabel>
                            <Input placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} name='booking_date' value={form.cardriver} onChange={handlecardriver} required />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={12}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>เบอร์โทร</FormLabel>
                            <Input placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} name='booking_date' value={form.teldriver} onChange={handleteldriver} required />
                        </FormControl>
                    </GridItem>
                    {/* <GridItem colSpan={12}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>ชื่อคนขับ</FormLabel>
                            <Input  style={{ border: '1px #00AAAD solid' }} name='booking_date' value={form.bookingname} onChange={handlebookingname} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={12}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>เบอร์โทร</FormLabel>
                            <Input  style={{ border: '1px #00AAAD solid' }} name='booking_date' value={form.bookingname} onChange={handlebookingname} />
                        </FormControl>
                    </GridItem> */}
                    
                    <GridItem colSpan={12}>
                        <Button className='lable-rentcar' type='submit' colorScheme='teal' size='md' px={'32'} py={'8'} mb={"20px"}>
                            เพิ่มข้อมูล
                        </Button>
                    </GridItem>
                </Grid>

            </form >



        </>

    )
}

export default RentCar