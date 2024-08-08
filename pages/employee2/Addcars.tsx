import { Button, Checkbox, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Grid, GridItem, Input, Radio, RadioGroup, Select, Stack, Text,useToast } from '@chakra-ui/react'
import Head from 'next/head';
import React, { useState } from 'react'
import axios from 'axios';
import { Controller } from 'react-hook-form';
import { getMe } from "../../data-hooks/me/getMe"
import DatePickerInput from '../../components/input/Datepicker';


const RentCar = () => {
    const me = getMe()
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
            "Id": 0,
            "typecar": 0,
            "carname": form.carname,
            "car_registration": form.car_registration,
            "brand": form.brand
        }];
        console.log([JSON.stringify(form)]);
        console.log("aaaa",jsonref);
        // console.log(data.get('cost-enter'));
        axios.post('https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/InsertCar',jsonref).then((response) => {
            toast({
                id: toastId4,
                description: `เพิ่มข้อมูลสำเร็จ`,
                status: "success",
                duration: 5000,
                isClosable: false,
              })
              setform({
                Id:0,
                typecar:"",
                carname:"",
                car_registration:"",
                brand:"",
              });
        }).catch((error) => {
            console.log(error);
        });
    }

    const [form, setform] = useState({
        Id:null,
        typecar:"",
        carname:"",
        car_registration:"",
        brand:"",
        datecar:"",
        
    })

    // console.log(value);
    const handletypecar = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,typecar:event.target.value}})
    const handlecarname = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,carname:event.target.value}})
    const handlecarregistration = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,car_registration:event.target.value}})
    const handlebrand = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,brand:event.target.value}})
    const handledatecar = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,datecar:event.target.value}})
    
    const handleChange = (event: any) => {
        let value = event.target.value;
        setDatas({ ...datas, [event.target.name]: event.target.value })
    }
    console.log(datas);

    const isError = datas.note === ''
    return (
        <>
            <Head>
                <title>เพิ่มข้อมูลรถ</title>
                <meta name="description" content="reservation" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <form onSubmit={handleSubmit}>
                <Text className='head-text' >เพิ่มข้อมูลรถ</Text>
                <Grid h='200px'
                    templateRows='repeat(2, 1fr)'
                    templateColumns='repeat(12, 1fr)'
                    gap={4}>
                    <GridItem colSpan={12}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>ผู้ให้บริการ</FormLabel>
                            <Input  style={{ border: '1px #00AAAD solid' }} name='booking_date' value={form.brand} onChange={handlebrand} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={12}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>ประเภทรถ</FormLabel>
                            <Input  style={{ border: '1px #00AAAD solid' }} name='booking_date' value={form.carname} onChange={handlecarname} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={12}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>ทะเบียนรถ</FormLabel>
                            <Input  style={{ border: '1px #00AAAD solid' }} name='booking_date' value={form.car_registration} onChange={handlecarregistration} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={12}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>วันที่จองรถ</FormLabel>
                            <Input style={{ border: '1px #00AAAD solid' }} type="date" value={form.datecar} onChange={handledatecar} />
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