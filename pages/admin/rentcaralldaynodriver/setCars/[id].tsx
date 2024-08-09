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
import { localStorageLoad } from '../../../../utils/localStrorage';
import { Controller } from 'react-hook-form';
import { useRouter } from "next/router"
import { getMe } from "../../../../data-hooks/me/getMe";
import DatePicker from 'react-datepicker';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import styled, { css, createGlobalStyle } from 'styled-components';
import { SearchIcon } from '@chakra-ui/icons';
import { TimePicker } from 'antd';
import InfoCars from '../../../../components/admin/rentcarall/setCars/InfoCars';

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
const SetRentCarAllDayDriver = () => {
    const me = getMe()
    const [value, setValue] = useState("1")
    const [datas, setDatas] = useState<any>([])
    const [date, setDate] = useState<any>(new Date())
    const tokens = localStorageLoad("token")
    const router = useRouter()
    const [showfile,setshowfile] = useState<boolean>(true)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [dataCars, setDataCars] = useState<any>([])
    const [dataModal, setDataModal] = useState<any>([])

    const id = router?.query?.id
    const type_text = "ไม่มีคนขับ";
    // console.log(value);
    const handleSubmit = (event: any) => {
        // alert('You clicked submit');
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // console.log(data.get('cost-enter'));

    }
    const handleDelete = (data: any) => {
        console.log(data);
    }
    const handleModalEdit = (data: any) => {
        console.log(data);
        setDataModal(data);
        onOpen();
    }

    const handleChange = async(event: any) => {
        await setDatas({ ...datas, [event.target.name]: event.target.value })
    }
    useEffect(() => {
        axios({
            url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/GetCarBookingNoDriverById/'+id+'?page=1&size=30',
            method: 'GET',
            headers: { 
                'accept': '*/*', 
                'Authorization': 'Bearer '+tokens,
            }
        }).then(async (res) => {
            let detail = res.data.data[0];
            detail.booking_date = new Date(detail.booking_date).toISOString().slice(0,10);
            detail.startdate = new Date(detail.startdate).toISOString().slice(0,10);
            detail.enddate = new Date(detail.enddate).toISOString().slice(0,10);
            setDatas(detail);
            console.log("Hello");
            
        }).catch( error =>{
            console.log(error);
        });

        setDataCars([
            {
                id: 1,
                name: 'PDR',
                typecar: 'รถเก๋ง',
                licenseplate: 'กข-1234',
                date: '12/12/2024',
                age: '3',
                driver: 'นาย สมชาย',
                phone: '089-123-4567'
            }
        ])
    },[me.isLoading])
   

    const isError = datas.note === ''
    return (
        <>
            <Head>
                <title>จัดรถเช่าเหมาวัน({ type_text })</title>
                <meta name="description" content="reservation" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <form onSubmit={handleSubmit}>
                <Text className='head-text' >จองรถเช่าเหมาวัน({ type_text })</Text>
                <Grid h='200px'
                    templateRows='repeat(2, 1fr)'
                    templateColumns='repeat(12, 1fr)'
                    gap={4}>
                    <GridItem colSpan={3}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>วันที่จองรถ : </FormLabel> 
                            <Input value={datas.booking_date } disabled style={{ border: '1px #00AAAD solid' }}/>

                            <FormLabel className='lable-rentcar'>ชื่อผู้จองรถ :</FormLabel> 
                            <Input value={datas.bookingname } disabled style={{ border: '1px #00AAAD solid' }}/>

                            <FormLabel className='lable-rentcar'>Email :</FormLabel> 
                            <Input value={datas.email } disabled style={{ border: '1px #00AAAD solid' }}/>

                            <FormLabel className='lable-rentcar'>หน่วยงาน :</FormLabel> 
                            <Input value={datas.agency } disabled style={{ border: '1px #00AAAD solid' }}/>
                            
                            <FormLabel className='lable-rentcar'>ส่วนงาน : </FormLabel>
                            <Input value={datas.division } disabled style={{ border: '1px #00AAAD solid' }}/>

                            <FormLabel className='lable-rentcar'>เบอร์โทรศัพท์ : </FormLabel> 
                            <Input value={datas.tel } disabled style={{ border: '1px #00AAAD solid' }}/>

                            <FormLabel className='lable-rentcar'>รหัสพนักงานผู้ใช้งาน : </FormLabel> 
                            <Input value={datas.code_employee } disabled style={{ border: '1px #00AAAD solid' }}/>

                            <FormLabel className='lable-rentcar'>ชื่อผู้ใช้รถ : </FormLabel> 
                            <Input value={datas.drivername } disabled style={{ border: '1px #00AAAD solid' }}/>

                            <FormLabel className='lable-rentcar'>Email : </FormLabel> 
                            <Input value={datas.use_email } disabled style={{ border: '1px #00AAAD solid' }}/>

                            <FormLabel className='lable-rentcar'>ตำแหน่ง : </FormLabel>
                            <Input value={datas.use_agency } disabled style={{ border: '1px #00AAAD solid' }}/>

                            <FormLabel className='lable-rentcar'>ส่วนงาน : </FormLabel> 
                            <Input value={datas.use_division } disabled style={{ border: '1px #00AAAD solid' }}/>

                            <FormLabel className='lable-rentcar'>เบอร์โทรศัพท์ผู้ใช้รถ : </FormLabel>
                            <Input value={datas.tel_use_car } disabled style={{ border: '1px #00AAAD solid' }}/>

                            <FormLabel className='lable-rentcar'>ใบขับขี่เลขที่ : </FormLabel>
                            <Input value={datas.license_number } disabled style={{ border: '1px #00AAAD solid' }}/>

                            <FormLabel className='lable-rentcar'>วัตถุประสงค์ในการจองรถ : </FormLabel>
                            <Input value={datas.note } disabled style={{ border: '1px #00AAAD solid' }}/>

                        
                  
                            { datas.number_cars ? <FormLabel className='lable-rentcar'>รถเก๋ง { datas.number_cars } คัน : ยี่ห้อ { datas.brand_cars1 } : จำนวนผู้เดินทาง { datas.person_count } </FormLabel> : ''}
                            { datas.number_travelers ? <FormLabel className='lable-rentcar'>รถกระบะ { datas.number_travelers } คัน : ยี่ห้อ { datas.brand_cars2 } : จำนวนผู้เดินทาง { datas.person_count2 } </FormLabel> : ''}
                            
                            <FormLabel className='lable-rentcar'>วันที่ใช้รถเริ่มต้น : </FormLabel>
                            <Input value={datas.startdate+":"+datas.timeIn } disabled style={{ border: '1px #00AAAD solid' }}/>

                            <FormLabel className='lable-rentcar'>วันที่ใช้รถสิ้นสุด : </FormLabel>
                            <Input value={datas.enddate+":"+datas.timeOut } disabled style={{ border: '1px #00AAAD solid' }}/>

                            <FormLabel className='lable-rentcar'>สถานที่รับ : </FormLabel>
                            <Input value={datas.LocationOut } disabled style={{ border: '1px #00AAAD solid' }}/>

                            <FormLabel className='lable-rentcar'>สถานที่ส่ง : </FormLabel>
                            <Input value={datas.locationIn } disabled style={{ border: '1px #00AAAD solid' }}/>

                            <FormLabel className='lable-rentcar'>ผู้รับผิดชอบค่าใช้จ่าย : </FormLabel>
                            <Input value={ datas.person_responsible_for_expenses === '1' ? 'SKC':'อื่น ๆ' } disabled style={{ border: '1px #00AAAD solid' }}/>

                            <FormLabel className='lable-rentcar'>GL : </FormLabel>
                            <Input value={datas.GL } disabled style={{ border: '1px #00AAAD solid' }}/>

                            <FormLabel className='lable-rentcar'>Cost Center : </FormLabel>
                            <Input value={datas.cost_enter } disabled style={{ border: '1px #00AAAD solid' }}/>

                            <FormLabel className='lable-rentcar'>Order : </FormLabel>
                            <Input value={datas.order } disabled style={{ border: '1px #00AAAD solid' }}/>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={9} style={{ padding: '1%' }}>
                        <InfoCars type={type_text}/>
                    </GridItem>
                    
                    
                    
                    
                   
                    
                  
                </Grid>

            </form >



        </>

    )
}

export default SetRentCarAllDayDriver