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
const CarsAndDriver = () => {
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

    const handleChange = (event: any) => {
        let value = event.target.value;
        setDatas({ ...datas, [event.target.name]: event.target.value })
    }
    console.log(datas);

    const isError = datas.note === ''
    return (
        <>
            <Head>
                <title>รายงานการขอใช้รถเช่าเหมาวัน (ไม่มีคนขับ)</title>
                <meta name="description" content="reservation" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Grid templateColumns='repeat(6, 1fr)'>
                <GridItem colSpan={6}>
                    <Box border="solid 1px #00A5A8" p={4} borderRadius={"10px"} justifySelf={"center"}>
                        <Text color={'#00A5A8'} fontSize='xl' as={'b'} className='lable-rentcar'>รายงานการขอใช้รถเช่าเหมาวัน (ไม่มีคนขับ)</Text>
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
                                <Input style={{ border: '1px #00A5A8 solid', width: '150px' }} type="text" />
                            </Flex>
                            <Flex p={2}  >
                                <label className='lable-statusrentcar' style={{ width: "150px" }}>ผู้ให้บริการ</label>
                                <Input style={{ border: '1px #00A5A8 solid', width: '150px' }} type="text" />
                                <label className='lable-statusrentcar' style={{ width: "150px" }}>ทะเบียนรถ</label>
                                <Input style={{ border: '1px #00A5A8 solid', width: '150px' }} type="text" />
                            </Flex>
                            <Flex p={2}  >
                                <label className='lable-statusrentcar' style={{ width: "150px" }}>ชื่อคนขับรถ</label>
                                <Input style={{ border: '1px #00A5A8 solid', width: '150px' }} type="text" />
                                <label className='lable-statusrentcar' style={{ width: "150px" }}>ประเภทรถที่ขอ</label>
                                <Input style={{ border: '1px #00A5A8 solid', width: '150px' }} type="text" />
                                
                                
                            </Flex>
                            <Flex p={2}  >
                                
                                <label className='lable-statusrentcar' style={{ width: "150px" }}>ประเภทการจัดรถ</label>
                                <Select placeholder='Select option' style={{ border: '1px #00A5A8 solid'}}>
                                    <option value='option1'>Option 1</option>
                                    <option value='option2'>Option 2</option>
                                    <option value='option3'>Option 3</option>
                                </Select>
                                
                            </Flex>
                            <Flex p={2} justifyContent={"center"} >
                                <Button className='lable-rentcar' type='submit' colorScheme='teal' size='md' ml={5}><AiOutlineSearch />ค้นหา</Button>
                                <Button className='lable-rentcar' type='submit' colorScheme='teal' size='md' ml={5}><AiOutlineSearch />PDF</Button>
                                <Button className='lable-rentcar' type='submit' colorScheme='teal' size='md' ml={5}><AiOutlineSearch />Excel</Button>
                            </Flex>
                        </Grid>
                    </Box>
                </GridItem>
                <GridItem colSpan={6} mt={"50px"} ml={"10px"}>
                    <Flex p={2} display={"flex"} justifyContent={"space-between"}>
                        <p>จำนวนที่ใช้งานทั้งหมด 1 คัน</p>
                        <span >จำนวนแสดง: 
                            <span style={{display:"inline-block"}}>
                                <Select placeholder='' width={"105px"} >
                                    <option value='5' selected>5</option>
                                    <option value='10'>10</option>
                                    <option value='30'>30</option>
                                    <option value='-1'>ทั้งหมด</option>
                                </Select>
                            </span>
                        </span>
                    </Flex> 
                </GridItem>
                <GridItem colSpan={6}>

                    <Box mt={"0px"}  >
                        <TableContainer borderRadius={"10px"} border={'1px #00A5A8 solid'} >
                            <Table size='md' className='table-font' >
                                <Thead bgColor={'#00A5A8'} height={"40px"}  >
                                    <Tr>
                                        <Th color={"white"}>ลำดับ</Th>
                                        <Th color={"white"}>วันที่จอง/เวลา</Th>
                                        <Th color={"white"}>ชื่อผู้จองรถ</Th>
                                        <Th color={"white"}>หน่วยงาน</Th>
                                        <Th color={"white"}>ตำแหน่ง</Th>
                                        <Th color={"white"}>ส่วนงาน</Th>
                                        <Th color={"white"}>เบอร์โทร</Th>
                                        <Th color={"white"}>ประเภทรถที่ขอ</Th>
                                        <Th color={"white"}>จำนวน (คัน)</Th>
                                        <Th color={"white"}>วันที่ใช้รถเริ่มต้น/เวลา</Th>
                                        <Th color={"white"}>วันที่ใช้รถสิ้นสุด/เวลา</Th>
                                        <Th color={"white"}>รวมจำนวนวันใช้งาน (วัน)</Th>
                                        <Th color={"white"}>สถานที่รับ</Th>
                                        <Th color={"white"}>สถานที่ส่ง</Th>
                                        <Th color={"white"}>GL</Th>
                                        <Th color={"white"}>Cost center</Th>
                                        <Th color={"white"}>Order</Th>
                                        <Th color={"white"}>ประเภทการจัดการรถ</Th>
                                        <Th color={"white"}>ผู้ให้บริการ</Th>
                                        <Th color={"white"}>ทะเบียนรถ</Th>
                                        <Th color={"white"}>ชื่อคนขับรถ</Th>
                                        <Th color={"white"}>เบอร์โทร</Th>
                                        <Th color={"white"}>สถานะการจัดรถ</Th>
                                    </Tr>
                                </Thead>
                                <Tbody >
                                    <Tr>
                                        <Td >PDR</Td>
                                        <Td>เก๋ง</Td>
                                        <Td>กท 1234</Td>
                                        <Td >21/1/2565</Td>
                                        <Td>1</Td>
                                        <Td>test</Td>
                                        <Td>0123456789</Td>
                                        <Td>test</Td>
                                        <Td>test</Td>
                                        <Td>test</Td>
                                        <Td>test</Td>
                                        <Td>test</Td>
                                        <Td>test</Td>
                                        <Td>test</Td>
                                        <Td>test</Td>
                                        <Td>test</Td>
                                        <Td>test</Td>
                                        <Td>test</Td>
                                        <Td>test</Td>
                                        <Td>test</Td>
                                        <Td>test</Td>
                                        <Td>test</Td>
                                        <Td>test</Td>
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

export default CarsAndDriver