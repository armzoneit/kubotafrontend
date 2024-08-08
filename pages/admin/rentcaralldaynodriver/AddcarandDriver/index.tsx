import { Button, Checkbox, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Grid, GridItem, Input, Radio, RadioGroup, Select, Stack, Text,useToast } from '@chakra-ui/react'
import Head from 'next/head';
import React, { useState } from 'react'
import axios from 'axios';
import { Controller } from 'react-hook-form';
import { getMe } from "../../../../data-hooks/me/getMe"


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
        // axios.post('https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/InsertCar',jsonref).then((response) => {
            toast({
                id: toastId4,
                description: `เพิ่มข้อมูลสำเร็จ`,
                status: "success",
                duration: 5000,
                isClosable: false,
              })
              setform({
                Id:null,
                carname:"",
                brand:"บริษัท พี.ดี.อาร์.คาร์เซอร์วิส จำกัด",
              });
        // }).catch((error) => {
            // console.log(error);
        // });
    }

    const [form, setform] = useState({
        Id:null,
        carname:"",
        brand:"บริษัท พี.ดี.อาร์.คาร์เซอร์วิส จำกัด",
        
    })
    
    // console.log(value);
    const handlecarname = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,carname:event.target.value}})
    const handlebrand = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,brand:event.target.value}})
    
    const handleChange = (event: any) => {
        let value = event.target.value;
        setDatas({ ...datas, [event.target.name]: event.target.value })
    }
    console.log(datas);
    const oninvalids = (event:any) => {
        event.target.setCustomValidity('กรุณากรอกข้อมูล')
    }
    const isError = datas.note === ''
    return (
        <>
            <Head>
                <title>ข้อมูลรถ</title>
                <meta name="description" content="reservation" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <form onSubmit={handleSubmit}>
                <Text className='head-text' >ข้อมูลรถ</Text>
                <Grid h='200px'
                    templateRows='repeat(2, 1fr)'
                    templateColumns='repeat(12, 1fr)'
                    gap={4}>
                    <GridItem colSpan={12}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>ผู้ให้บริการ</FormLabel>
                            <Input placeholder='กรุณากรอกข้อมูล'  style={{ border: '1px #00AAAD solid' }} name='booking_date' value={form.brand} onChange={handlebrand} required  />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={12}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>ยี่ห้อ/รุ่น</FormLabel>
                            <Input placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} name='booking_date' value={form.carname} onChange={handlecarname} required  />
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