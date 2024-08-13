import { Box, Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Grid, GridItem, Input, Radio, RadioGroup, Select, Stack, Text,
    Checkbox,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
 } from '@chakra-ui/react'
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
const CarsAndDriver = ({ mode }) => {

    const title_name = ['','รายงานข้อมูลรถและคนขับรถ','รายงานข้อมูลรถ','รายงานข้อมูลรถและคนขับรถ'];
    const edit_url = ['','rentcaralldaydriver','rentcaralldaynodriver','rentcarduring'];
    const car_manage_status = ['รอจัดรถ','จัดเสร็จแล้ว','ยกเลิก'];
    const type_manage_car = ['รถต่างจังหวัด','กรุงเทพฯ-ปริมณฑล','SKCN-SKCA','SKCN-Kubota Farm'];

    const car_type = [
        ['รถตู้','รถเก๋ง'],
        ['รถเก๋ง','รถกระบะ'],
        ['รถเก๋ง','รถกระบะ','รถตู้']
    ];


    const [dataTable, setdataTable] = useState({
       page:1,
       size:10,
       mode:mode,
       filter:{
            
       }
    //    rows:new Array()
    });
    return (
        <>
            <Head>
                <title>{ title_name[mode] }</title>
                <meta name="description" content="reservation" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
           
            <Grid templateColumns='repeat(6, 1fr)'>
                <GridItem colSpan={6}>
                    <Box border="solid 1px #00A5A8" p={4} borderRadius={"10px"} justifySelf={"center"}>
                        <Text color={'#00A5A8'} fontSize='xl' as={'b'} className='lable-rentcar'>{ title_name[mode] }</Text>
                        <Grid style={{ justifyContent: "center" }} >
                        
                            <Flex p={2}  >
                                <label className='lable-statusrentcar' style={{ width: "150px" }}>ประเภทรถ</label>
                                <span>
                                    <Select placeholder='เลือกประเภทรถ' style={{ border: '1px #00A5A8 solid'}}>
                                    {
                                            car_type[mode].map((val, index) => {
                                            return (
                                                <option value={index}>{ val }</option>
                                            )})
                                    }
                                    </Select>
                                </span>
                                <label className='lable-statusrentcar' style={{ width: "150px" }}>ผู้ให้บริการ</label>
                                <Input style={{ border: '1px #00A5A8 solid', width: '150px' }}  type="text" />
                            </Flex>
                            <Flex p={2}  >
                                <label className='lable-statusrentcar' style={{ width: "150px" }}>ทะเบียนรถ</label>
                                <Input style={{ border: '1px #00A5A8 solid', width: '150px' }} type="text" />
                                { mode != 2 ? <label className='lable-statusrentcar' style={{ width: "150px" }}>ชื่อคนขับรถ</label> : '' }
                                { mode != 2 ? <Input style={{ border: '1px #00A5A8 solid', width: '150px' }} type="text" /> : '' }
                                
                                <Button className='lable-rentcar' type='submit' colorScheme='teal' size='md' ml={5}><AiOutlineSearch />ค้นหา</Button>
                                
                             </Flex>
                            <Flex p={2} justifyContent={"center"} >
                                <Button className='lable-rentcar' type='submit' colorScheme='teal' size='md' ml={5}><AiOutlineSearch />PDF</Button>
                                <Button className='lable-rentcar' type='submit' colorScheme='teal' size='md' ml={5}><AiOutlineSearch />Excel</Button>
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
                                        <Th color={"white"}>ผู้ให้บริการ</Th>
                                        <Th color={"white"}>ประเภทรถ</Th>
                                        <Th color={"white"}>ทะเบียนรถ</Th>
                                        <Th color={"white"}>วันที่จดทะเบียนรถ</Th>
                                        <Th color={"white"}>อายุรถ</Th>
                                        <Th color={"white"}>ชื่อคนขับรถ</Th>
                                        <Th color={"white"}>เบอร์โทรศัพท์</Th>
                                        <Th color={"white"}>แก้ไข</Th>
                                        <Th color={"white"}>ลบ</Th>
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
                                        <Td ><a href="#"><AiOutlineEdit /></a></Td>
                                        <Td ><a href="#"><AiOutlineDelete /></a></Td>
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