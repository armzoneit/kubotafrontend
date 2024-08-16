import {
    Box, Button, Flex, FormControl, Checkbox, FormLabel, Grid, GridItem, Input, Select, Stack, Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Container,
    toast,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import styled, { css, createGlobalStyle } from 'styled-components';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import { TimePicker } from 'antd';
import { localStorageLoad } from '../../utils/localStrorage';
import axios from 'axios';

const DatePickerWrapperStyles = createGlobalStyle`
    .date_picker.full-width input {
        border: 1px #00AAAD solid;
        padding-top: 7px;
        padding-bottom: 7px;
        padding-left: 17px;
        padding-right: 17px;
        border-radius: 5px;
        width: 100%;
        margin-right:0px;
    }
    .react-datepicker-wrapper{
        width: 100%;
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
    tbody tr:hover{
        background-color:#E2EFEF;
        color:#000000;
    }
    .text-centers{
        text-align: center;
    }
    .swal2-confirm{
        background-color:#00A8A9;
    }
    .swal2-cancel{
        background-color:#CCC5C5;
    }
`;

const StatusRentCarModal = ({ isOpen , onClose, textcc, disread, datasall, form, setform }) => {

    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )

    const [overlay, setOverlay] = React.useState(<OverlayOne />)
    const [approvedbutton, setapprovedbutton] = React.useState<boolean>(false);
    const [editbutton, seteditbutton] = React.useState<boolean>(false);
    const [ckcar1, setckcar1] = useState<boolean>(false)
    const [ckcar2, setckcar2] = useState<boolean>(false)
    const [ckcar3, setckcar3] = useState<boolean>(false)
    const [startDate, setStartDate] = useState(new Date());
    const [startDate1, setStartDate1] = useState(new Date());
    const [startDate2, setStartDate2] = useState(new Date());
    const [value, setValue] = useState("1")
    const [datas, setDatas] = useState<any>([])
    const [date, setDate] = useState<any>(new Date())

    const handlebookingdate = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => {
        const vl = new Date(event)
        setStartDate(event);
        return { ...prev, booking_date: [vl.getFullYear(), vl.getMonth() + 1, vl.getDate()].join('-') + " 03:54:07.6233333 +00:00" }
    });
    const handlebookingname = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => { return { ...prev, bookingname: event.target.value } })
    const handleemail = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => { return { ...prev, email: event.target.value } })
    const handleagency = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => { return { ...prev, agency: event.target.value } })
    const handledivision = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => { return { ...prev, division: event.target.value } })
    const handletel = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => {
        let isnumber = /^[0-9\b]*$/;
        if (isnumber.test(event.target.value)) {
            return { ...prev, tel: event.target.value }
        } else {
            return { ...prev }
        }

    })
    const handlenote = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => { return { ...prev, note: event.target.value } })
    const handletypecar = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => { return { ...prev, typecar: event.target.value } })
    const handlenumber_travelers = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => {
        let isnumber = /^[0-9\b]*$/;
        if (isnumber.test(event.target.value)) {
            return { ...prev, number_travelers: event.target.value }
        } else {
            return { ...prev }
        }
    });
    const handlenumber_cars = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => {
        let isnumber = /^[0-9\b]*$/;
        if (isnumber.test(event.target.value)) {
            return { ...prev, number_cars: event.target.value }
        } else {
            return { ...prev }
        }
    });
    const handlestartdate = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => {
        const vl = new Date(event)
        setStartDate1(event);
        return { ...prev, startdate: [vl.getFullYear(), vl.getMonth() + 1, vl.getDate()].join('-') }
    })
    const handleenddate = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => {
        const vl = new Date(event)
        setStartDate2(event);
        return { ...prev, enddate: [vl.getFullYear(), vl.getMonth() + 1, vl.getDate()].join('-') }
    })
    const handlelocationIn = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => { return { ...prev, locationIn: event.target.value } })
    const handletimeIn = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => { return { ...prev, timeIn: event.target.value } })
    const handlelocationOut = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => { return { ...prev, LocationOut: event.target.value } })
    const handletimeOut = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => { return { ...prev, timeOut: event.target.value } })
    const handleoperational_area = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => { return { ...prev, operational_area: event.target.value } })
    const handleovernight_stay = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => { return { ...prev, overnight_stay: event.target.value } })
    const handleperson_responsible_for_expenses = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => { return { ...prev, person_responsible_for_expenses: event.target.value } })
    const handleTrip = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => {
        let isnumber = /^[0-9\b]*$/;
        if (isnumber.test(event.target.value)) {
            return { ...prev, number_of_trips: event.target.value }
        } else {
            return { ...prev }
        }


    })
    const handlerovince = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => { return { ...prev, province: event.target.value } })
    const handleGL = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => { return { ...prev, GL: event.target.value } })
    const handlecost_enter = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => { return { ...prev, cost_enter: event.target.value } })
    const handleorder = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => { return { ...prev, order: event.target.value } })
    const handleovernight = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => { return { ...prev, overnight: event.target.value } })
    const handleother = (event: React.ChangeEvent<HTMLInputElement>) => setform(prev => { return { ...prev, other: event.target.value } })
    const onChanges1 = (time: Dayjs, timeString: string) => {
        var ggg = timeString
        if (typeof timeString === "string" && timeString.length === 0) {
            ggg = "00:00";
        }
        setform(prev => ({ ...prev, timeIn: ggg }));

    };
    const onChanges2 = (time: Dayjs, timeString: string) => {
        console.log(timeString);
        var ggg = timeString
        if (typeof timeString === "string" && timeString.length === 0) {
            ggg = "00:00";
        }
        setform(prev => ({ ...prev, timeOut: ggg }));

    };

    const handleapproved = (ids: number) => {
        const tokens = localStorageLoad("token")
        let data = JSON.stringify({
            "type": datasall.cartype,
            "BookingNo": form?.idcarbooking,
        });
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/ApprovalStatus/' + datasall.cartype + '/' + form?.idcarbooking,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tokens
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                onClose();
                search(1);
                toast({
                    id: toastId4,
                    description: `อนุมัติสำเร็จ`,
                    status: "success",
                    duration: 3000,
                    isClosable: false,
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const isError = datas.note === ''
    return (
        <Modal isOpen={isOpen} size={"full"} onClose={onClose}>
            {overlay}
            <ModalContent>
                <ModalHeader><Text className='head-text' >แก้ไข {textcc}</Text></ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Container maxW={"100%"}>
                        <Grid
                            templateRows='repeat(2, 1fr)'
                            templateColumns='repeat(6, 1fr)'
                            gap={4}>
                            <GridItem colSpan={2} >
                                <FormControl >
                                    <FormLabel className='lable-rentcar'>วันที่จองรถ</FormLabel>
                                    {/* <Input style={{ border: '1px #00AAAD solid' }} name="booking_date" type="date" value={new Date(Date.now()).toISOString().split("T")[0]} /> */}
                                    <DatePicker disabled={disread} required dateFormat="dd-MM-yyyy" wrapperClassName='date_picker full-width' selected={startDate} onChange={handlebookingdate} />
                                    <DatePickerWrapperStyles />
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={4} />
                            <GridItem colSpan={2}>
                                <FormControl>

                                    <FormLabel className='lable-rentcar'>ชื่อผู้จองรถ</FormLabel>
                                    <Input disabled={disread} type='search' required style={{ border: '1px #00AAAD solid' }} name="bookingname" value={form?.bookingname} onChange={handlebookingname} />

                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={2}>
                                <FormControl>
                                    <FormLabel className='lable-rentcar'>Email</FormLabel>
                                    <Input disabled={disread} type='search' required style={{ border: '1px #00AAAD solid' }} name="email" value={form?.email} onChange={handleemail} />

                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={2} />
                            <GridItem colSpan={2}>
                                <FormControl>
                                    <FormLabel className='lable-rentcar'>หน่วยงาน</FormLabel>
                                    <Input required disabled={disread} type='search' style={{ border: '1px #00AAAD solid' }} name="agency" value={form?.agency} onChange={handleagency} />
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={2}>
                                <FormControl>
                                    <FormLabel className='lable-rentcar'>ส่วนงาน</FormLabel>
                                    <Input required type='search' disabled={disread} style={{ border: '1px #00AAAD solid' }} name="division" value={form?.division} onChange={handledivision} />
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={2}>
                                <FormControl>
                                    <FormLabel className='lable-rentcar'>เบอร์โทรศัพท์</FormLabel>
                                    <Input disabled={disread} required placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} type='search' onChange={handletel} name='search' pattern="[0-9]*" value={form?.tel} />
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={4}>
                                <FormControl isInvalid={isError}>
                                    <FormLabel className='lable-rentcar'>วัตถุประสงค์ในการจองรถ</FormLabel>
                                    <Input disabled={disread} required type='search' placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} onChange={handlenote} value={form?.note} name='note' />
                                    {/* {isError &&
                        <FormErrorMessage>Email is required.</FormErrorMessage>
                    } */}
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={6}>
                                <FormControl>
                                    <FormLabel className='lable-rentcar'>ประเภทรถที่ขอ</FormLabel>
                                    <Flex>
                                        <Checkbox disabled={disread} colorScheme='green' marginRight={"30px"} isChecked={ckcar1} onChange={(val) => ckcargg("1")}>
                                            รถตู้
                                        </Checkbox>
                                        <FormLabel className='lable-rentcar' style={{ marginTop: "10px" }}>จำนวนคัน</FormLabel>
                                        <Stack direction='row' alignItems={"baseline"}>

                                            <Input isDisabled={!ckcar1} style={{ border: '1px #00AAAD solid', margin: "0px 10px" }} maxWidth={"100"} value={datasall?.cartype != 3 ? form?.number_travelers : form?.number_cars} onChange={handlenumber_travelers} name={datasall?.cartype !== 3 ? 'number_travelers' : 'number_cars'} type='search' pattern="[0-9]*" />
                                            {/* <NumberInput isDisabled={!ckcar1} min={0} max={100} style={{ border: '1px #00AAAD solid', margin: "0px 10px" }} onChange={handlenumber_travelers}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput> */}

                                        </Stack>
                                        <Text style={{ marginTop: "10px" }}>คัน</Text>
                                    </Flex>
                                    {/* <RadioGroup onChange={setValue} value={value}>
                        <Stack direction='row'>
                            <Radio value='1'>รถตู้</Radio>
                            <Radio value='2'>รถกระบะ</Radio>
                        </Stack>
                    </RadioGroup> */}
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={6}>
                                <FormControl>
                                    <Flex>
                                        <Checkbox disabled={disread} colorScheme='green' marginRight={"20px"} isChecked={ckcar2} onChange={(val) => ckcargg("2")}>
                                            รถกระบะ
                                        </Checkbox>
                                        <FormLabel className='lable-rentcar' style={{ marginTop: "10px" }}>จำนวนคัน</FormLabel>
                                        <Stack direction='row' alignItems={"baseline"}>
                                            <Input isDisabled={!ckcar2} style={{ border: '1px #00AAAD solid', margin: "0px 10px" }} maxWidth={"100"} value={form?.number_cars} onChange={handlenumber_cars} type='search' name='number_cars' />
                                            {/* <NumberInput isDisabled={!ckcar2} min={0} max={100} style={{ border: '1px #00AAAD solid', margin: "0px 10px" }} value={form?.number_cars} onChange={(val) => console.log(val)}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput> */}
                                        </Stack>
                                        <Text style={{ marginTop: "10px" }}>คัน</Text>
                                    </Flex>
                                    {/* <RadioGroup onChange={setValue} value={value}>
                        <Stack direction='row'>
                            <Radio value='1'>รถตู้</Radio>
                            <Radio value='2'>รถกระบะ</Radio>
                        </Stack>
                    </RadioGroup> */}
                                </FormControl>
                            </GridItem>
                            {datasall?.cartype == 3 ?
                                <GridItem colSpan={6}>
                                    <FormControl>
                                        <Flex>
                                            <Checkbox disabled={disread} colorScheme='green' marginRight={"20px"} isChecked={ckcar3} onChange={(val) => ckcargg("3")}>
                                                รถเก๋ง
                                            </Checkbox>
                                            <FormLabel className='lable-rentcar' style={{ marginTop: "10px" }}>จำนวนคัน</FormLabel>
                                            <Stack direction='row' alignItems={"baseline"}>
                                                <Input isDisabled={!ckcar3} style={{ border: '1px #00AAAD solid', margin: "0px 10px" }} maxWidth={"100"} value={form?.number_cars3} onChange={handlenumber_cars} type='search' name='number_cars' />
                                                {/* <NumberInput isDisabled={!ckcar2} min={0} max={100} style={{ border: '1px #00AAAD solid', margin: "0px 10px" }} value={form?.number_cars} onChange={(val) => console.log(val)}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput> */}
                                            </Stack>
                                            <Text style={{ marginTop: "10px" }}>คัน</Text>
                                        </Flex>
                                        {/* <RadioGroup onChange={setValue} value={value}>
                        <Stack direction='row'>
                            <Radio value='1'>รถตู้</Radio>
                            <Radio value='2'>รถกระบะ</Radio>
                        </Stack>
                    </RadioGroup> */}
                                    </FormControl>
                                </GridItem>
                                : ''}
                            <GridItem colSpan={2}>
                                <FormControl>
                                    <Stack direction='row' alignItems={"baseline"}>
                                        <FormLabel className='lable-rentcar'>จำนวนผู้เดินทาง</FormLabel>
                                        <Input disabled={disread} required type='search' style={{ border: '1px #00AAAD solid' }} maxWidth={"100"} value={form?.number_of_trips} onChange={handleTrip} /><Text >คน</Text>
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
                                    {/* <Input style={{ border: '1px #00AAAD solid' }} type="date" value={form?.startdate} onChange={handlestartdate} /> */}
                                    <DatePicker disabled={disread} required placeholderText='วัน-เดือน-ปี' dateFormat="dd-MM-yyyy" minDate={new Date()} wrapperClassName='date_picker full-width' selected={startDate1} onChange={handlestartdate} />
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={2}>
                                <FormControl >
                                    <FormLabel className='lable-rentcar'>วันที่ใช้รถสิ้นสุด</FormLabel>
                                    {/* <Input style={{ border: '1px #00AAAD solid' }} type="date" value={form?.enddate} onChange={handleenddate} /> */}
                                    <DatePicker disabled={disread} required placeholderText='วัน-เดือน-ปี' dateFormat="dd-MM-yyyy" minDate={new Date()} wrapperClassName='date_picker full-width' selected={startDate2} onChange={handleenddate} />
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={2} />
                            <GridItem colSpan={2}>
                                <FormControl>
                                    <FormLabel className='lable-rentcar'>สถานที่รับ</FormLabel>
                                    <Input type='search' disabled={disread} required placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} value={form?.locationIn} onChange={handlelocationIn} />
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={2}>
                                <FormControl>
                                    <FormLabel className='lable-rentcar'>เวลา</FormLabel>
                                    {/* <Input style={{ border: '1px #00AAAD solid' }} type="time" value={form?.timeIn} onChange={handletimeIn} /> */}
                                    <TimePicker disabled={disread} required onChange={onChanges1} value={dayjs(form?.timeIn, "HH:mm")} format="HH:mm" />
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={2} />
                            <GridItem colSpan={2}>
                                <FormControl>
                                    <FormLabel className='lable-rentcar'>สถานที่ส่ง</FormLabel>
                                    <Input type='search' disabled={disread} required placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} value={form?.LocationOut} onChange={handlelocationOut} />
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={2}>
                                <FormControl>
                                    <FormLabel className='lable-rentcar'>เวลา</FormLabel>
                                    {/* <Input style={{ border: '1px #00AAAD solid' }} type="time" value={form?.timeOut} onChange={handletimeOut} /> */}
                                    <TimePicker required onChange={onChanges2} disabled={disread} value={dayjs(form?.timeOut, "HH:mm")} format="HH:mm" />
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={2} />
                            <GridItem colSpan={2}>
                                <FormControl>
                                    <FormLabel className='lable-rentcar'>พื้นที่การปฏิบัติงาน</FormLabel>
                                    <Select disabled={disread} required placeholder='เลือกพื้นที่การปฏิบัติงาน' style={{ border: '1px #00AAAD solid' }} value={form?.operational_area} onChange={handleoperational_area}>
                                        <option value='option1'>กรุงเทพฯ/ปริมณฑล</option>
                                        <option value='option2'>ต่างจังหวัด</option>
                                    </Select>
                                </FormControl>
                            </GridItem>
                            {
                                form?.operational_area == "option2" ?
                                    <GridItem colSpan={2}>
                                        <FormControl>
                                            <FormLabel className='lable-rentcar'>จังหวัด</FormLabel>
                                            <Input disabled={disread} type='search' required placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} value={form?.province} onChange={handlerovince} />
                                        </FormControl>
                                    </GridItem>
                                    :
                                    <GridItem colSpan={2} />
                            }
                            <GridItem colSpan={2} />
                            <GridItem colSpan={2}>
                                <FormControl>
                                    <FormLabel className='lable-rentcar'>ข้อมูลการพักค้างคืน</FormLabel>
                                    <Select disabled={disread} required placeholder='เลือกข้อมูลการพักค้างคืน' style={{ border: '1px #00AAAD solid' }} value={form?.overnight_stay} onChange={handleovernight_stay}>
                                        <option value='option1'>ค้างคืน</option>
                                        <option value='option2'>ไม่ค้างคืน</option>
                                    </Select>
                                </FormControl>
                            </GridItem>
                            {
                                form?.overnight_stay == "option1" ?
                                    <GridItem colSpan={2}>
                                        <FormControl>
                                            <FormLabel className='lable-rentcar'>จำนวนวันที่ค้างคืน (วัน)</FormLabel>
                                            <Input disabled={disread} type='search' required placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} value={form?.overnight} onChange={handleovernight} />
                                        </FormControl>
                                    </GridItem>
                                    :
                                    <GridItem colSpan={2} />
                            }

                            <GridItem colSpan={2} />
                            <GridItem colSpan={2}>
                                <FormControl>
                                    <FormLabel className='lable-rentcar'>ผู้รับผิดชอบค่าใช้จ่าย</FormLabel>
                                    <Select disabled={disread} required onChange={handleperson_responsible_for_expenses} name='pay' placeholder='เลือกผู้รับผิดชอบค่าใช้จ่าย' style={{ border: '1px #00AAAD solid' }} value={form?.person_responsible_for_expenses}>
                                        <option value='1'>SKC</option>
                                        <option value='2'>อื่นๆ</option>
                                    </Select>
                                </FormControl>
                            </GridItem>
                            {
                                form?.person_responsible_for_expenses == "2" ?
                                    <GridItem colSpan={4}>
                                        <FormControl>
                                            <FormLabel className='lable-rentcar'>รายละเอียด</FormLabel>
                                            <Input type='search' disabled={disread} required placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} value={form?.other} onChange={handleother} />
                                        </FormControl>
                                    </GridItem>

                                    :
                                    <GridItem colSpan={4} />
                            }
                            <GridItem colSpan={2}>
                                <FormControl>
                                    <FormLabel className='lable-rentcar'>GL</FormLabel>
                                    <Input type='search' required placeholder='กรุณากรอกข้อมูล' disabled={disread} style={{ border: '1px #00AAAD solid' }} value={form?.GL} onChange={handleGL} />
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={2}>
                                <FormControl>
                                    <FormLabel className='lable-rentcar'>Cost Center</FormLabel>
                                    <Input type='search' required placeholder='กรุณากรอกข้อมูล' disabled={disread} style={{ border: '1px #00AAAD solid' }} id='cost-enter' name='cost-enter' value={form?.cost_enter} onChange={handlecost_enter} />
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={2}>
                                <FormControl>
                                    <FormLabel className='lable-rentcar'>Order</FormLabel>
                                    <Input disabled={disread} type='search' required placeholder='กรุณากรอกข้อมูล' style={{ border: '1px #00AAAD solid' }} id='cost-enter' name='cost-enter' value={form?.order} onChange={handleorder} />
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={4}>
                                <Button hidden={editbutton} className='lable-rentcar' type='submit' colorScheme='teal' size='md' px={'10'} py={'5'} mb={"20px"}>
                                    แก้ไขข้อมูล
                                </Button>
                                <Button onClick={handleapproved} hidden={approvedbutton} className='lable-rentcar' type='submit' colorScheme='teal' size='md' px={'10'} py={'5'} mx={"3"} mb={"20px"}>
                                    อนุมัติ
                                </Button>

                            </GridItem>
                        </Grid>
                    </Container>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        ปิด
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    )
}


export default StatusRentCarModal
