import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Grid, GridItem, Input, Radio, RadioGroup, Select, Stack, Text, useDisclosure, Modal } from '@chakra-ui/react';
import Head from 'next/head';
import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form';
import InfoCars from '../../../../components/admin/rentcarall/setCars/InfoCars';
import ModalCar from '../../../../components/admin/rentcarall/setCars/ModalCar';


const SetRentCarAllDayDriver = () => {
    const [value, setValue] = useState("1")
    const [datas, setDatas] = useState<any>([])
    const [date, setDate] = useState<any>(new Date())
    const [dataCars, setDataCars] = useState<any>([])
    // console.log(value);
    const handleSubmit = (event: any) => {
        // alert('You clicked submit');
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // console.log(data.get('cost-enter'));

    }

    // -- Start Modal Car
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [dataModal, setDataModal] = useState<any>([])
    const handleModalEdit = (data: any) => {
        console.log(data);
        setDataModal(data);
        onOpen();
    }

    const handleModalSubmit = (data: any) => {
        console.log(data);
    }
    // -- End Modal Car


    // -- Start Table
    useEffect(() => {
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
    }, [])

    const handleDelete = (data: any) => {
        console.log(data);
    }

    // -- End Table



    const handleChange = (event: any) => {
        let value = event.target.value;
        setDatas({ ...datas, [event.target.name]: event.target.value })
    }

    const isError = datas.note === ''
    return (
        <>
            <Head>
                <title>จัดรถเช่าเหมาวัน(พร้อมคนขับ)</title>
                <meta name="description" content="reservation" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <form onSubmit={handleSubmit}>
                <Text className='head-text' >จัดรถเช่าเหมาวัน(พร้อมคนขับ)</Text>
                <Text className='sub-text' >รายละเอียดการจอง</Text>
                <Grid h='200px'
                    templateRows='repeat(2, 1fr)'
                    templateColumns='repeat(6, 1fr)'
                    gap={4}>
                    <GridItem colSpan={2} >
                        <FormControl >
                            <FormLabel className='lable-rentcar'>วันที่จองรถ</FormLabel>
                            <Input style={{ border: '1px #00AAAD solid' }} type="date" />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4} />
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>ชื่อผู้จองรถ</FormLabel>
                            <Input style={{ border: '1px #00AAAD solid' }} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>Email</FormLabel>
                            <Input style={{ border: '1px #00AAAD solid' }} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2} />
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>หน่วยงาน</FormLabel>
                            <Input style={{ border: '1px #00AAAD solid' }} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>ส่วนงาน</FormLabel>
                            <Input style={{ border: '1px #00AAAD solid' }} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>เบอร์โทรศัพท์</FormLabel>
                            <Input style={{ border: '1px #00AAAD solid' }} onChange={handleChange} name='phone' />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <FormControl isInvalid={isError}>
                            <FormLabel className='lable-rentcar'>วัตถุประสงค์ในการจอดรถ</FormLabel>
                            <Input style={{ border: '1px #00AAAD solid' }} onChange={handleChange} name='note' />
                            {isError &&
                                <FormErrorMessage>Email is required.</FormErrorMessage>
                            }
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={6}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>ประเภทรถที่ขอ</FormLabel>
                            <RadioGroup onChange={setValue} value={value}>
                                <Stack direction='row'>
                                    <Radio value='1'>รถตู้</Radio>
                                    <Radio value='2'>รถเก๋ง</Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl>
                            <Stack direction='row' alignItems={"baseline"}>
                                <FormLabel className='lable-rentcar'>จำนวนผู้เดินทาง</FormLabel>
                                <Input style={{ border: '1px #00AAAD solid' }} maxWidth={"50"} /><Text >คน</Text>
                            </Stack>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4} />
                    <GridItem colSpan={2}>
                        <FormControl>
                            <Stack direction='row' alignItems={"baseline"}>
                                <FormLabel className='lable-rentcar'>จำนวนคัน</FormLabel>
                                <Input style={{ border: '1px #00AAAD solid', marginLeft: "48px" }} maxWidth={"50"} /><Text>คัน</Text>
                            </Stack>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4} />
                    <GridItem colSpan={2}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>วันที่ใช้รถเริ่มต้น</FormLabel>

                            <Input style={{ border: '1px #00AAAD solid' }} type="date" />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl isRequired>
                            <FormLabel className='lable-rentcar'>วันที่ใช้รถสิ้นสุด</FormLabel>
                            <Input style={{ border: '1px #00AAAD solid' }} type="date" />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2} />
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>สถานที่รับ</FormLabel>
                            <Input style={{ border: '1px #00AAAD solid' }} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>เวลา</FormLabel>
                            <Input style={{ border: '1px #00AAAD solid' }} type="time" />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2} />
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>สถานที่ส่ง</FormLabel>
                            <Input style={{ border: '1px #00AAAD solid' }} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>เวลา</FormLabel>
                            <Input style={{ border: '1px #00AAAD solid' }} type="time" />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2} />
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>พื้นที่การปฏิบัติงาน</FormLabel>
                            <Select placeholder='Select option' style={{ border: '1px #00AAAD solid' }}>
                                <option value='option1'>กรุงเทพฯ/ปริมณฑล</option>
                                <option value='option2'>ต่างจังหวัด</option>
                            </Select>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4} />
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>ข้อมูลการพักค้างคืน</FormLabel>
                            <Select placeholder='Select option' style={{ border: '1px #00AAAD solid' }}>
                                <option value='option1'>ค้างคืน</option>
                                <option value='option2'>ไม่ค้างคืน</option>
                            </Select>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4} />
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>ผู้รับผิดชอบค่าใช้จ่าย</FormLabel>
                            <Select onChange={handleChange} name='pay' placeholder='Select option' style={{ border: '1px #00AAAD solid' }}>
                                <option value='1'>SKC</option>
                                <option value='2'>อื่นๆ</option>
                            </Select>
                        </FormControl>
                    </GridItem>
                    {datas.pay == '2' ?
                        <>
                            <GridItem colSpan={2}>
                                <FormControl>
                                    <FormLabel className='lable-rentcar'>อื่นๆ</FormLabel>
                                    <Input style={{ border: '1px #00AAAD solid' }} />
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={2} />
                        </>
                        :
                        <GridItem colSpan={4} />
                    }
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>GL</FormLabel>
                            <Input style={{ border: '1px #00AAAD solid' }} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>Cost Enter</FormLabel>
                            <Input style={{ border: '1px #00AAAD solid' }} id='cost-enter' name='cost-enter' />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>Order</FormLabel>
                            <Input style={{ border: '1px #00AAAD solid' }} id='cost-enter' name='cost-enter' />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={6} borderTop={"2px"} marginTop={"5px"}>
                        <Text className='sub-text' >ข้อมูลการจัดรถ</Text>
                    </GridItem>
                    <GridItem colSpan={6} >
                        <InfoCars datatables={dataCars} onEdit={handleModalEdit} onDelete={handleDelete} />
                    </GridItem>
                    <GridItem colSpan={2} />

                    <GridItem colSpan={2}>
                        <Button className='lable-rentcar' type='submit' colorScheme='teal' size='md' px={'10'} py={'5'}>
                            บันทึก
                        </Button>
                    </GridItem>

                </Grid>

            </form >

            <ModalCar data={dataModal} isOpen={isOpen} onClose={onClose} onSubmit={handleModalSubmit} />

        </>

    )
}

export default SetRentCarAllDayDriver
