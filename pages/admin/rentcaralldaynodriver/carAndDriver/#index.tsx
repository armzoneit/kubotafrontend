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
const CarsAndDriver = () => {
    const [value, setValue] = useState("1")
    const [datas, setDatas] = useState<any>([])
    const [date, setDate] = useState<any>(new Date())
    const { isOpen, onOpen, onClose } = useDisclosure()
    // console.log(value);
    const handleSubmit = (event: any) => {
        // alert('You clicked submit');
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // console.log(data.get('cost-enter'));

    }

    const handleSizeClick = (newSize) => {
        onOpen()
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
                <title>ข้อมูลรถและคนขับรถ</title>
                <meta name="description" content="reservation" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Modal onClose={onClose} size={"lg"} isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>แก้ไข</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <Grid 
                    templateRows='repeat(2, 1fr)'
                    templateColumns='repeat(12, 1fr)'
                    gap={4}>
                    <GridItem colSpan={12}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>ผู้ให้บริการ</FormLabel>
                            <Input  style={{ border: '1px #00AAAD solid' }} name='booking_date' />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={12}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>ยี่ห้อ/รุ่น</FormLabel>
                            <Input  style={{ border: '1px #00AAAD solid' }} name='booking_date'/>
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
                    
                </Grid>
                </ModalBody>
                <ModalFooter>
                <Button className='lable-rentcar' type='submit' colorScheme='teal' size='md' marginRight={"10px"}  >
                            Save
                        </Button>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
            <Grid templateColumns='repeat(6, 1fr)'>
                <GridItem colSpan={6}>
                    <Box border="solid 1px #00A5A8" p={4} borderRadius={"10px"} justifySelf={"center"}>
                        <Text color={'#00A5A8'} fontSize='xl' as={'b'} className='lable-rentcar'>ข้อมูลรถและคนขับรถ</Text>
                        <Grid style={{ justifyContent: "center" }} >
                        
                            <Flex p={2}  >
                                <label className='lable-statusrentcar' style={{ width: "150px" }}>ประเภทรถ</label>
                                <span>
                                    <Select placeholder='เลือกประเภทรถ' style={{ border: '1px #00A5A8 solid'}}>
                                        <option value='3'>ทั้งหมด</option>
                                        <option value='1'>รถเก๋ง</option>
                                        <option value='2'>รถตู้</option>
                                    </Select>
                                </span>
                                <label className='lable-statusrentcar' style={{ width: "150px" }}>ผู้ให้บริการ</label>
                                <Input style={{ border: '1px #00A5A8 solid', width: '150px' }} value={"บริษัท พี.ดี.อาร์.คาร์เซอร์วิส จำกัด"} type="text" />
                            </Flex>
                            
                            <Flex p={2} justifyContent={"center"} >
                            <Button className='lable-rentcar' type='submit' colorScheme='teal' size='md' ml={5}><AiOutlineSearch />ค้นหา</Button>

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
                                        <Th color={"white"}>ยี่ห้อ/รุ่น</Th>
                                        <Th color={"white"}>แก้ไข</Th>
                                        <Th color={"white"}>ลบ</Th>
                                    </Tr>
                                </Thead>
                                <Tbody >
                                    <Tr>
                                        <Td >PDR</Td>
                                        <Td>เก๋ง</Td>
                                        <Td>กท 1234</Td>
                                        <Td ><a href="#" onClick={() => handleSizeClick("g")}><AiOutlineEdit /></a></Td>
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