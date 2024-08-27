import {
    Button, useDisclosure, Checkbox, Flex, FormControl, FormErrorMessage, FormHelperText, Image, FormLabel, Grid, GridItem, Input, Radio, RadioGroup, Select, Stack, Text, useToast, Container,
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
import Driver from '../../../../components/admin/rentcarall/setCars/driver';
import CarDetailpage from '../../../../components/form/updatemodal/statusrentcardetail';
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
const detailpage = ({ mode }) => {
    const me = getMe()
    const [value, setValue] = useState("1")
    const [datas, setDatas] = useState<any>([])
    const [date, setDate] = useState<any>(new Date())
    const tokens = localStorageLoad("token")
    const router = useRouter()
    const [showfile, setshowfile] = useState<boolean>(true)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [dataCars, setDataCars] = useState<any>([])
    const [dataModal, setDataModal] = useState<any>([])

    const id = router?.query?.id
    const type = ['','จัดรถเช่าเหมาวัน (พร้อมคนขับรถ)','จัดรถเช่าเหมาวัน (ไม่มีคนขับรถ)','งานรับส่งระหว่างวัน'];
    const edit_url = ['','GetCarBookingWithDriverById','GetCarBookingNoDriverById','GetCarBookingPickupAndDropById'];
    const cartype = [['รถตู้','รถเก๋ง'],['รถเก๋ง','รถกระบะ'],['รถเก๋ง','รถกระบะ','รถตู้']];


    const type_text = type[mode];
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

    const handleChange = async (event: any) => {
        await setDatas({ ...datas, [event.target.name]: event.target.value })
    }
    useEffect(() => {
        // console.log(router.asPath);

        axios({
            url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/'+edit_url[mode]+'/' + id,
            method: 'GET',
            headers: {
                'accept': '*/*',
                'Authorization': 'Bearer ' + tokens,
            }
        }).then(async (res) => {
            console.log(res.data.data.carBookingWithDriver[0]); 

            let detail = res.data.data.carBookingWithDriver[0];
            // detail.booking_date = new Date(detail.booking_date).toISOString().slice(0, 10);
            // detail.startdate = new Date(detail.startdate).toISOString().slice(0, 10);
            // detail.enddate = new Date(detail.enddate).toISOString().slice(0, 10);
            setDatas(detail);
            // console.log("Hello");

        }).catch(error => {
            console.log(error);
        });

       
    }, [me.isLoading])


    const isError = datas.note === ''
    return (
        <>
            <Head>
                <title>{type_text}</title>
                <meta name="description" content="reservation" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <form onSubmit={handleSubmit}>
                <Text className='head-text' >{type_text}</Text>
                <Grid h='200px'
                    templateRows='repeat(2, 1fr)'
                    templateColumns='repeat(12, 1fr)'
                    gap={4}>
                    <GridItem colSpan={6}>
                        <CarDetailpage booking_id={id} typecar={mode} fix={true}/>
                    </GridItem>
                    <GridItem colSpan={6} style={{ padding: '1%' }}>
                        <InfoCars mode={mode} idcarbooking={id} booking={datas} />
                    </GridItem>




                </Grid>

            </form >



        </>

    )
}

export default detailpage
