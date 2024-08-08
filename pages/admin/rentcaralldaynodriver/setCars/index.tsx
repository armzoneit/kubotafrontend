import { Box, Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Grid, GridItem, Input, Radio, RadioGroup, Select, Stack, Text } from '@chakra-ui/react'
import Head from 'next/head';
import React, { useState } from 'react'
import axios from 'axios';
import { localStorageLoad } from '../../../../utils/localStrorage';
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
const ListRentCars = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [startDate1, setStartDate1] = useState(new Date());
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
    const FileDownload = require('js-file-download');
    const tokens = localStorageLoad("token")
    const downloadexcel = (event:any) => {
        console.log("gggg");
        var res1 = startDate.toISOString().slice(0,10)
        var res2 = startDate1.toISOString().slice(0,10)
        axios({
            url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/Export_Excel/CarNoDriver/'+res1+'/'+res2,
            method: 'GET',
            responseType: 'blob', // Important
            headers: { 
                'accept': '*/*', 
                'Authorization': 'Bearer '+tokens,
            }
        }).then((res) => {
            FileDownload(res.data,"Excel.xlsx");
        }).catch((res)=>{
            console.log(res);
        });
    }

    const downloadpdf = (event:any) => {
        axios({
            url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/Export_PDF/CarPickup_and_drop_WithDriver/1',
            method: 'GET',
            responseType: 'blob', // Important
        }).then((res) => {
            FileDownload(res.data,"PDF.pdf");
        });
    }

    const handleChange = (event: any) => {
        let value = event.target.value;
        setDatas({ ...datas, [event.target.name]: event.target.value })
    }
    console.log(datas);

    const isError = datas.note === ''
    return (
        <>
            <Head>
                <title>จัดรถเช่าเหมาวัน (ไม่มีคนขับรถ)</title>
                <meta name="description" content="reservation" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Grid templateColumns='repeat(6, 1fr)'>
                <GridItem colSpan={6}>
                    <Box border="solid 1px #00A5A8" p={4} borderRadius={"10px"} justifySelf={"center"}>
                        <Text color={'#00A5A8'} fontSize='xl' as={'b'} className='lable-rentcar'>จัดรถเช่าเหมาวัน (ไม่มีคนขับรถ)</Text>
                        <Grid style={{ justifyContent: "center" }} >
                        
                            <Flex p={2}  >
                                <label className='lable-statusrentcar' style={{ width: "150px" }}>วันที่ใช้รถเริ่มต้น</label>
                                <span>
                                <DatePicker required dateFormat="dd-MM-yyyy" wrapperClassName='date_picker full-width' selected={startDate} onChange={(event)=>{setStartDate(event)}} />
                                </span>
                                <label className='lable-statusrentcar' style={{ width: "150px" }}>วันที่ใช้รถสิ้นสุด</label>
                                <span>
                                <DatePicker required dateFormat="dd-MM-yyyy" wrapperClassName='date_picker full-width' selected={startDate1} onChange={(event)=>{setStartDate1(event)}} />
                                </span>
                                <DatePickerWrapperStyles />
                            </Flex>
                            <Flex p={2}  >
                                <label className='lable-statusrentcar' style={{ width: "150px" }}>ชื่อผู้จองรถ</label>
                                <Input style={{ border: '1px #00A5A8 solid', width: '150px' }} type="text" />
                                <label className='lable-statusrentcar' style={{ width: "150px" }}>สถานะการจัดรถ</label>
                                <span>
                                    <Select placeholder='เลือกสถานะ' style={{ border: '1px #00A5A8 solid'}}>
                                        <option value='1'>รอจัดรถ</option>
                                        <option value='2'>รออนุมัติ</option>
                                    </Select>
                                </span>
                                <Button className='lable-rentcar' type='submit' colorScheme='teal' size='md' ml={5}><AiOutlineSearch />ค้นหา</Button>
                            </Flex>
                            <Flex p={2} justifyContent={"center"} >
                                {/* <Button className='lable-rentcar' type='submit' colorScheme='teal' size='md' ml={5}><AiOutlineSearch onClick={downloadpdf} />PDF</Button> */}
                                <Button className='lable-rentcar' onClick={downloadexcel} type='submit' colorScheme='teal' size='md' ml={5}><AiOutlineSearch  />Excel</Button>
                            </Flex>
                        </Grid>
                    </Box>
                </GridItem>
                <GridItem colSpan={6}>

                    <Box mt={"50px"}  >
                        <TableContainer borderRadius={"10px"} border={'1px #00A5A8 solid'} >
                            <Table size='md' className='table-font' >
                                <Thead bgColor={'#00A5A8'} height={"40px"}  >
                                    <Tr>
                                        <Th color={"white"}>ลำดับ</Th>
                                        <Th color={"white"}>วันจอง/เวลา</Th>
                                        <Th color={"white"}>ชื่อผู้จองรถ</Th>
                                        <Th color={"white"}>ประเภทรถ</Th>
                                        <Th color={"white"}>จำนวน (คัน)</Th>
                                        <Th color={"white"}>วันที่ใช้รถเริ่มต้น/เวลา</Th>
                                        <Th color={"white"}>วันที่ใช้รถสิ้นสุด/เวลา</Th>
                                        <Th color={"white"}>สถานที่รับ</Th>
                                        <Th color={"white"}>สถานที่ส่ง</Th>
                                        <Th color={"white"}>GL</Th>
                                        <Th color={"white"}>Cost Center</Th>
                                        <Th color={"white"}>Order</Th>
                                        <Th color={"white"}>สถานะการอนุมัติ</Th>
                                        <Th color={"white"}>สถานะการจัดรถ</Th>
                                        <Th color={"white"}>แก้ไข</Th>
                                    </Tr>
                                </Thead>
                                <Tbody >
                                    <Tr>
                                        <Td>1</Td>
                                        <Td>millimetres (mm)</Td>
                                        <Td isNumeric>25.4</Td>
                                        <Td>inches</Td>
                                        <Td>millimetres (mm)</Td>
                                        <Td isNumeric>25.4</Td>
                                        <Td>inches</Td>
                                        <Td>millimetres (mm)</Td>
                                        <Td isNumeric>25.4</Td>
                                        <Td>millimetres (mm)</Td>
                                        <Td isNumeric>25.4</Td>
                                        <Td>inches</Td>
                                        <Td>millimetres (mm)</Td>
                                        <Td textDecoration={"underline"} ><a href="#">รอจัดรถ</a></Td>
                                        <Td ><a href="#"><AiOutlineEdit /></a></Td>
                                    </Tr>
                                    
                                </Tbody>

                            </Table>
                        </TableContainer>
                    </Box>
                </GridItem>
            </Grid>
        </>
    )
}

export default ListRentCars