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
    const { isOpen, onOpen, onClose } = useDisclosure()
    // console.log(value);
    const handleSubmit = (event: any) => {
        // alert('You clicked submit');
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // console.log(data.get('cost-enter'));

    }

    const [form, setform] = useState({
        idcarbooking:null,
        PlantId:"",
        employee_no:"",
        booking_date:"2023-12-06 03:54:07.6233333 +00:00",
        bookingname:"",
        email:"",
        agency:"",
        division:"",
        tel:"",
        note:"",
        typecar:"",
        number_travelers:"",
        number_cars:"",
        startdate:"",
        enddate:"",
        locationIn:"",
        timeIn:"",
        LocationOut:"",
        timeOut:"",
        operational_area:"",
        overnight_stay:"",
        person_responsible_for_expenses:"",
        GL:"",
        cost_enter:"",
        order:"",
})
    const handlebookingname = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,bookingname:event.target.value}})
    const handleemail = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,email:event.target.value}})
    const handleagency = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,agency:event.target.value}})
    const handledivision = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,division:event.target.value}})
    const handletel = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,tel:event.target.value}})
    const handlenote = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,note:event.target.value}})
    const handletypecar = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,typecar:event.target.value}})
    const handlenumber_travelers = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,number_travelers:event.target.value}})
    const handlenumber_cars = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,number_cars:event.target.value}})
    const handlestartdate = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,startdate:event.target.value}})
    const handleenddate = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,enddate:event.target.value}})
    const handlelocationIn = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,locationIn:event.target.value}})
    const handletimeIn = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,timeIn:event.target.value}})
    const handlelocationOut = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,LocationOut:event.target.value}})
    const handletimeOut = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,timeOut:event.target.value}})
    const handleoperational_area = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,operational_area:event.target.value}})
    const handleovernight_stay = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,overnight_stay:event.target.value}})
    const handleperson_responsible_for_expenses = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,person_responsible_for_expenses:event.target.value}})
    const handleGL = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,GL:event.target.value}})
    const handlecost_enter = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,cost_enter:event.target.value}})
    const handleorder = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { return {...prev,order:event.target.value}})

    const FileDownload = require('js-file-download');
    const tokens = localStorageLoad("token")
    const downloadexcel = (event:any) => {
        console.log("gggg");
        var res1 = startDate.toISOString().slice(0,10)
        var res2 = startDate1.toISOString().slice(0,10)
        axios({
            url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/Export_Excel/CarPickup_and_drop/'+res1+'/'+res2,
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
                <title>งานรับส่งระหว่างวัน</title>
                <meta name="description" content="reservation" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>ข้อมูล</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <Grid 
                    templateRows='repeat(2, 1fr)'
                    templateColumns='repeat(6, 1fr)'
                    gap={4}>
                    <GridItem colSpan={2} >
                        <FormControl >
                            <FormLabel className='lable-rentcar'>วันที่จองรถ</FormLabel>
                            <Input style={{ border: '1px #00AAAD solid' }} name="booking_date" type="date" value={new Date(Date.now()).toISOString().split("T")[0]} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4} />
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>ชื่อผู้จองรถ</FormLabel>
                            <Input style={{ border: '1px #00AAAD solid' }} name="bookingname" value={form.bookingname} onChange={handlebookingname}  />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>Email</FormLabel>
                            <Input style={{ border: '1px #00AAAD solid' }} name="email" value={form.email} onChange={handleemail} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2} />
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>หน่วยงาน</FormLabel>
                            <Input style={{ border: '1px #00AAAD solid' }} name="agency" value={form.agency} onChange={handleagency} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>ส่วนงาน</FormLabel>
                            <Input style={{ border: '1px #00AAAD solid' }} name="division" value={form.division} onChange={handledivision} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>เบอร์โทรศัพท์</FormLabel>
                            <Input placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} onChange={handletel} name='tel' value={form.tel}  />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <FormControl isInvalid={isError}>
                            <FormLabel className='lable-rentcar'>วัตถุประสงค์ในการจอดรถ</FormLabel>
                            <Input placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} onChange={handlenote} value={form.note} name='note' />
                            {/* {isError &&
                                <FormErrorMessage>Email is required.</FormErrorMessage>
                            } */}
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={6}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>ประเภทรถที่ขอ</FormLabel>
                            <Flex>
                                <Checkbox colorScheme='green' marginRight={"30px"} >
                                    รถตู้
                                </Checkbox>
                                <Stack direction='row' alignItems={"baseline"}>
                                    <FormLabel className='lable-rentcar'>จำนวนคัน</FormLabel>
                                    <Input style={{ border: '1px #00AAAD solid', margin: "0px 10px" }} maxWidth={"100"} value={form.number_travelers} onChange={handlenumber_travelers} name='number_travelers' /><Text>คัน</Text>
                                </Stack>
                            </Flex>
                            {/* <RadioGroup onChange={setValue} value={value}>
                                <Stack direction='row'>
                                    <Radio value='1'>รถตู้</Radio>
                                    <Radio value='2'>รถเก๋ง</Radio>
                                </Stack>
                            </RadioGroup> */}
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={6}>
                        <FormControl>
                            <Flex>
                                <Checkbox colorScheme='green' marginRight={"20px"} >
                                รถเก๋ง
                                </Checkbox>
                                <Stack direction='row' alignItems={"baseline"}>
                                    <FormLabel className='lable-rentcar'>จำนวนคัน</FormLabel>
                                    <Input style={{ border: '1px #00AAAD solid', margin: "0px 10px" }} maxWidth={"100"} value={form.number_cars} onChange={handlenumber_cars} name='number_cars' /><Text>คัน</Text>
                                </Stack>
                            </Flex>
                            {/* <RadioGroup onChange={setValue} value={value}>
                                <Stack direction='row'>
                                    <Radio value='1'>รถตู้</Radio>
                                    <Radio value='2'>รถเก๋ง</Radio>
                                </Stack>
                            </RadioGroup> */}
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
                        {/* <FormControl>
                            <Stack direction='row' alignItems={"baseline"}>
                                <FormLabel className='lable-rentcar'>จำนวนคัน</FormLabel>
                                <Input style={{ border: '1px #00AAAD solid', marginLeft: "48px" }} maxWidth={"50"} /><Text>คัน</Text>
                            </Stack>
                        </FormControl> */}
                    </GridItem>
                    <GridItem colSpan={4} />
                    <GridItem colSpan={2}>
                        <FormControl >
                            <FormLabel className='lable-rentcar'>วันที่ใช้รถเริ่มต้น</FormLabel>
                            {/* <Controller
                                name={`date`}
                                control={control}
                                render={({ field, fieldState }) => (
                                    <DatePickerInput
                                        date={date ?? null}
                                        minDate={new Date()}
                                        field={field}
                                        fieldState={fieldState}
                                        dateFormat="dd/MM/yyyy (ccc)"
                                        customOnChange={true}
                                        onChange={(date: any) => {
                                            field.onChange(date)
                                            handleSetDate(date)
                                            if (date == null) {
                                                setError("date", {
                                                    message: "กรุณาเลือกวันที่",
                                                    type: "required",
                                                })
                                            } else {
                                                clearErrors("date")
                                            }

                                            if (!(date === watchDate)) {
                                                setValue(`timeTableRoundId`, null)
                                            }
                                            unregister(`timeTableRoundId`)
                                        }}
                                    />
                                )}
                                rules={{
                                    required: "กรุณาเลือกวันที่",
                                }}
                            /> */}
                            <Input style={{ border: '1px #00AAAD solid' }} type="date" value={form.startdate} onChange={handlestartdate} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl >
                            <FormLabel className='lable-rentcar'>วันที่ใช้รถสิ้นสุด</FormLabel>
                            <Input style={{ border: '1px #00AAAD solid' }} type="date" value={form.enddate} onChange={handleenddate} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2} />
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>สถานที่รับ</FormLabel>
                            <Input placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} value={form.locationIn} onChange={handlelocationIn} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>เวลา</FormLabel>
                            <Input style={{ border: '1px #00AAAD solid' }} type="time" value={form.timeIn} onChange={handletimeIn} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2} />
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>สถานที่ส่ง</FormLabel>
                            <Input placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} value={form.LocationOut} onChange={handlelocationOut} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>เวลา</FormLabel>
                            <Input style={{ border: '1px #00AAAD solid' }} type="time" value={form.timeOut} onChange={handletimeOut} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2} />
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>พื้นที่การปฏิบัติงาน</FormLabel>
                            <Select placeholder='Select option' style={{ border: '1px #00AAAD solid' }} value={form.operational_area} onChange={handleoperational_area}>
                                <option value='option1'>กรุงเทพฯ/ปริมณฑล</option>
                                <option value='option2'>ต่างจังหวัด</option>
                            </Select>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4} />
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>ข้อมูลการพักค้างคืน</FormLabel>
                            <Select placeholder='Select option' style={{ border: '1px #00AAAD solid' }} value={form.overnight_stay} onChange={handleovernight_stay}>
                                <option value='option1'>ค้างคืน</option>
                                <option value='option2'>ไม่ค้างคืน</option>
                            </Select>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4} />
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>ผู้รับผิดชอบค่าใช้จ่าย</FormLabel>
                            <Select onChange={handleperson_responsible_for_expenses} name='pay' placeholder='Select option' style={{ border: '1px #00AAAD solid' }} value={form.person_responsible_for_expenses}>
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
                            <Input placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} value={form.GL} onChange={handleGL} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>Cost Center</FormLabel>
                            <Input placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} id='cost-enter' name='cost-enter' value={form.cost_enter} onChange={handlecost_enter} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>Order</FormLabel>
                            <Input placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} id='cost-enter' name='cost-enter' value={form.order} onChange={handleorder} />
                        </FormControl>
                    </GridItem>


                    
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>ประเภทการจัดรถ</FormLabel>
                            <Select placeholder='Select option' style={{ border: '1px #00AAAD solid' }}>
                                <option value='option1'>Option 1</option>
                                <option value='option2'>Option 2</option>
                                <option value='option3'>Option 3</option>
                            </Select>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>ผู้ให้บริการ</FormLabel>
                            <Select placeholder='Select option' style={{ border: '1px #00AAAD solid' }}>
                                <option value='option1'>Option 1</option>
                                <option value='option2'>Option 2</option>
                                <option value='option3'>Option 3</option>
                            </Select>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>ทะเบียนรถ</FormLabel>
                            <Select placeholder='Select option' style={{ border: '1px #00AAAD solid' }}>
                                <option value='option1'>Option 1</option>
                                <option value='option2'>Option 2</option>
                                <option value='option3'>Option 3</option>
                            </Select>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>ชื่อคนขับรถ</FormLabel>
                            <Input readOnly placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} value={form.GL} onChange={handleGL} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>เบอร์โทร</FormLabel>
                            <Input readOnly placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} id='cost-enter' name='cost-enter' value={form.cost_enter} onChange={handlecost_enter} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel className='lable-rentcar'>สถานะการจัดรถ</FormLabel>
                            <Input readOnly placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} id='cost-enter' name='cost-enter' value={form.order} onChange={handleorder} />
                        </FormControl>
                    </GridItem>
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
                        <Text color={'#00A5A8'} fontSize='xl' as={'b'} className='lable-rentcar'>งานรับส่งระหว่างวัน</Text>
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
                                <Button onClick={downloadexcel} className='lable-rentcar' type='submit' colorScheme='teal' size='md' ml={5}><AiOutlineSearch  />Excel</Button>
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
                                        <Th color={"white"}>หน่วยงาน</Th>
                                        <Th color={"white"}>ส่วนงาน</Th>
                                        <Th color={"white"}>เบอร์โทร</Th>
                                        <Th color={"white"}>ประเภทรถที่ขอ</Th>
                                        <Th color={"white"}>จำนวน(คัน)</Th>
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
                                        <Td isNumeric>25.4</Td>
                                        <Td>inches</Td>
                                        <Td>millimetres (mm)</Td>
                                        <Td textDecoration={"underline"} ><a href="#">รอจัดรถ</a></Td>
                                        <Td ><a href="#" onClick={() => handleSizeClick("g")}><AiOutlineEdit /></a></Td>
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