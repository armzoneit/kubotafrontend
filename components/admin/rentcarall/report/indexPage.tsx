import { Box, Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Grid, GridItem, Input, Radio, RadioGroup, Select, Stack, Text } from '@chakra-ui/react'
import Head from 'next/head';
import React, { useState } from 'react'
import { Controller } from 'react-hook-form';
import { AiOutlineSearch, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
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
} from '@chakra-ui/react'
import DatePicker from 'react-datepicker';
import axios from 'axios';

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
import { getMe } from "../../../../data-hooks/me/getMe";
import Swal from 'sweetalert2';
import { useRouter } from "next/router"
import { localStorageLoad } from '../../../../utils/localStrorage';

const ReportRentCar = ({ mode }) => {
    const me = getMe();
    const router = useRouter();
    const tokens = localStorageLoad("token");
    const FileDownload = require('js-file-download');


    const [startDate, setStartDate] = useState(new Date());
    const [startDate1, setStartDate1] = useState(new Date());
    const [bookingname, setbookingname] = useState<any>('');
    const [status, setstatus] = useState<any>('');
    const [serv, setserv] = useState<any>('');
    const [license, setlicense] = useState<any>('');
    const [driver, setdriver] = useState<any>('');
    const [type_car, settype_car] = useState<any>('');
    const [type_manage, settype_manage] = useState<any>('');



    const title_name = ['','รายงานการขอใช้รถเช่าเหมาวัน (พร้อมคนขับรถ)','รายงานการขอใช้รถเช่าเหมาวัน (ไม่มีคนขับรถ)','รายงานการขอใช้รถรับส่งระหว่างวัน'];
    const download_url = ['','CarWithDriver','CarNoDriver','CarPickup_and_drop'];
    const car_manage_status = ['รอจัดรถ','จัดเสร็จแล้ว','ยกเลิก'];
    const type_manage_car = ['รถต่างจังหวัด','กรุงเทพฯ-ปริมณฑล','SKCN-SKCA','SKCN-Kubota Farm'];

    const car_type = [
        [],
        ['รถตู้','รถเก๋ง'],
        ['รถเก๋ง','รถกระบะ'],
        ['รถเก๋ง','รถกระบะ','รถตู้']
    ];


    const [dataTable, setdataTable] = useState({
       page:1,
       size:10,
       mode:mode,
       filter:[
        {
            bookingname:bookingname,
            status:status,
            serv:serv,
            license:license,
            driver:driver,
            type_car:type_car,
            type_manage:type_manage,
            // start_date:startDate,
            // end_date:startDate1
            start_date:startDate ? startDate.toISOString().slice(0,10) :'',
            end_date:startDate1 ? startDate1.toISOString().slice(0,10) :''
       }
       ],
    //    rows:new Array()
    });
    
    const searchCommit = async () => {
        let data = {
            page:1,
            size:10,
            mode:mode,
            filter:[
                {
                    bookingname:bookingname,
                    status:status.toString(),
                    serv:serv,
                    license:license,
                    driver:driver,
                    type_car:type_car,
                    type_manage:type_manage,
                    start_date:startDate ? new Date(startDate).toISOString().slice(0,10) :'',
                    end_date:startDate1 ? new Date(startDate1).toISOString().slice(0,10) :''
                }
            ]
        };

        
        await setdataTable(data);
        console.log(dataTable);

        axios({
            url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/Export_Excel/GetAll',
            method: 'POST',
            headers: { 
                'accept': '*/*', 
                'Authorization': 'Bearer '+tokens,
                'Content-Type': 'application/json'
            },
            data:dataTable
        }).then((res) => {
            console.log(res);
            
        }).catch((err)=>{
            console.log(err);
        });
        // axios.get('https://d713apsi01-wa01kbtcom.azurewebsites.net/Export_Excel/GetAll',dataTable,{ 
        //     headers: {
        //       'Content-Type': 'application/json'
        //      }
        // }).then(async(response) => {
        //     console.log(response);
            
        // }).catch((error) => {
        //     console.log(error);
        // });
        
    }

    const export_excel = async () => {
        let data = {
            page:1,
            size:10,
            mode:mode,
            filter:[
                {
                    bookingname:bookingname,
                    status:'1',
                    serv:serv,
                    license:license,
                    driver:driver,
                    type_car:type_car,
                    type_manage:type_manage,
                    start_date:startDate ? new Date(startDate).toISOString().slice(0,10) :'',
                    end_date:startDate1 ? new Date(startDate1).toISOString().slice(0,10) :''
                }
            ]
        };

        
        await setdataTable(data);

        axios({
            url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/Export_Excel/'+download_url[mode],
            method: 'POST',
            responseType: 'blob', // Important
            headers: { 
                'accept': '*/*', 
                'Authorization': 'Bearer '+tokens,
                'Content-Type': 'application/json'
            },
            data:data
        }).then((res) => {
            FileDownload(res.data,title_name[mode]+".xlsx");

            
        }).catch((err)=>{
            console.log(err);
        });
        // axios.get('https://d713apsi01-wa01kbtcom.azurewebsites.net/Export_Excel/GetAll',dataTable,{ 
        //     headers: {
        //       'Content-Type': 'application/json'
        //      }
        // }).then(async(response) => {
        //     console.log(response);
            
        // }).catch((error) => {
        //     console.log(error);
        // });
        
    }
    
    return (
        <>
            <Head>
                <title>{ title_name[mode] }</title>
                <meta name="description" content="reservation" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Grid templateColumns='repeat(12, 1fr)' border="solid 1px #00A5A8" m={4} p={2} borderRadius={"10px"}>
                <GridItem colSpan={12}>
                    <Text color={'#00A5A8'} fontSize='xl' as={'b'} className='lable-rentcar'>{ title_name[mode] }</Text>
                    <DatePickerWrapperStyles />

                </GridItem>
                <GridItem colSpan={4}>
                    <label className='lable-statusrentcar' style={{ width: "100px" }}>วันที่ใช้รถเริ่มต้น</label>
                    <span>
                        <DatePicker required dateFormat="dd-MM-yyyy" wrapperClassName='date_picker full-width' style="width:90%;" selected={startDate} onChange={(event)=>{setStartDate(event)}} />
                    </span>

                    <label className='lable-statusrentcar' style={{ width: "90%" }}>วันที่ใช้รถสิ้นสุด</label>
                    <span>
                        <DatePicker required dateFormat="dd-MM-yyyy" wrapperClassName='date_picker full-width' selected={startDate1} onChange={(event)=>{setStartDate1(event)}} />
                    </span>
                    
                </GridItem>
                <GridItem colSpan={12}>
                    <FormLabel className='lable-rentcar'>ชื่อผู้จองรถ : </FormLabel>
                    <Input style={{ border: '1px #00A5A8 solid', width: '90%' }} type="text" onChange={(event)=>{setbookingname(event.target.value)}}/>

                    <FormLabel className='lable-rentcar'>ผู้ให้บริการ : </FormLabel>
                    <Input style={{ border: '1px #00A5A8 solid', width: '90%' }} type="text" onChange={(event)=>{setserv(event.target.value)}}/>

                    <FormLabel className='lable-rentcar'>ชื่อคนขับรถ : </FormLabel>
                    <Input style={{ border: '1px #00A5A8 solid', width: '90%' }} type="text" onChange={(event)=>{setdriver(event.target.value)}}/>
                
                    <FormLabel className='lable-rentcar'>ทะเบียนรถ : </FormLabel>
                    <Input style={{ border: '1px #00A5A8 solid', width: '90%' }} type="text" onChange={(event)=>{setlicense(event.target.value)}}/>

                    <FormLabel className='lable-rentcar'>ประเภทรถที่ขอ : </FormLabel>
                    <Select placeholder='Select option' style={{ border: '1px #00A5A8 solid'}} onChange={(event)=>{settype_car(event.target.value)}}>
                        {Array.isArray(car_type) &&
                                        car_type[mode].map((val, index) => {
                                        return (
                                            <option value={index}>{ val }</option>
                                        )})
                                }
                    </Select>
                    <br /><br />
                    <Button className='lable-rentcar' type='submit' colorScheme='teal' size='md' ml={5} onClick={export_excel}><AiOutlineSearch />Excel</Button>

                </GridItem>

            </Grid>
        </>
    )
}

export default ReportRentCar