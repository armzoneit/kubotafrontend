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
    Container

} from '@chakra-ui/react'
import Head from 'next/head';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import DatePicker from 'react-datepicker';
import styled, { css, createGlobalStyle } from 'styled-components';
import { Controller } from 'react-hook-form';
import { localStorageLoad } from '../../../../utils/localStrorage';
import { getMe } from "../../../../data-hooks/me/getMe"
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
import { TimePicker } from 'antd';
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

const evaluation = ({ mode }) => {
    const me = getMe()
    const [value, setValue] = useState("1")
    const [datas, setDatas] = useState<any>([])
    const [date, setDate] = useState<any>(new Date())
    const [disread,setdisread] = useState<boolean>(false);
    // console.log(value);
    const [ckcar1,setckcar1] = useState<boolean>(false)
    const [ckcar2,setckcar2] = useState<boolean>(false)
    const [startDate2, setStartDate2] = useState(new Date());
    const title_name = ['','สรุปผลการประเมินความพึงพอใจรถเช่าเหมาวันพร้อมคนขับ','สรุปผลการประเมินความพึงพอใจรถเช่าเหมาวันไม่มีคนขับ','สรุปผลการประเมินความพึงพอใจงานรับส่งระหว่างวัน'];
    const edit_url = ['','rentcaralldaydriver','rentcaralldaynodriver','rentcarduring'];
    const [status, setstatus] = useState(['รอจัดรถ','จัดเสร็จแล้ว','ยกเลิก']);


    const handleSubmit = (event: any) => {
        // alert('You clicked submit');
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // console.log(data.get('cost-enter'));

    }
    const onChanges1 = (time: Dayjs, timeString: string) => {
        var ggg = timeString
        if(typeof timeString === "string" && timeString.length === 0)
            {
                ggg = "00:00";
            }
        setform(prev => ({...prev,timeIn:ggg}));
        
      };
      const onChanges2 = (time: Dayjs, timeString: string) => {
        console.log(timeString);
        var ggg = timeString
        if(typeof timeString === "string" && timeString.length === 0)
            {
                ggg = "00:00";
            }
        setform(prev => ({...prev,timeOut:ggg}));
        
      };
    const handleTrip = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { 
        let isnumber = /^[0-9\b]*$/;
        if(isnumber.test(event.target.value))
        {
            return {...prev,number_of_trips:event.target.value}
        } else{
            return {...prev}
        }
        
        
    })
    const [bookingnames,setbookingnames] = useState<string>("")
    
    const [datatables,setdatatable] = useState([])
    const handlebookingdate = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { 
        setStartDate(event);
    });
    const handlebookingdate1 = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { 
        setStartDate1(event);
    });
    const OverlayOne = () => (
        <ModalOverlay
          bg='blackAlpha.300'
          backdropFilter='blur(10px) hue-rotate(90deg)'
        />
      )
      const [overlay, setOverlay] = React.useState(<OverlayOne />)
    const [form, setform] = useState({
        idcarbooking:null,
        PlantId:"",
        employee_no:"",
        booking_date:"",
        bookingname:"",
        email:"",
        agency:"",
        division:"",
        tel:"",
        note:"",
        typecar:"",
        number_travelers:"0",
        number_cars:"0",
        person_count:"0",
        startdate:"",
        enddate:"",
        locationIn:"",
        timeIn:"00:00",
        LocationOut:"",
        timeOut:"00:00",
        operational_area:"",
        upcountry:"",
        overnight_stay:"",
        person_responsible_for_expenses:"",
        other:"",
        number_of_trips:"",
        province:"",
        GL:"",
        cost_enter:"",
        order:"",
        overnight:"0",
})
    const handlebookingname = (event:React.ChangeEvent<HTMLInputElement>) => setform(prev=> { console.log("test555"); return {...prev,bookingname:event.target.value}})
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
    const [editbutton,seteditbutton] = React.useState<boolean>(false);
    const FileDownload = require('js-file-download');
    const tokens = localStorageLoad("token")
    const downloadexcel = (event:any) => {
        var res1 = startDate.toISOString().slice(0,10)
        var res2 = startDate1.toISOString().slice(0,10)
        axios({
            url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/Export_Excel/CarWithDriver/'+res1+'/'+res2+'/'+(bookingnames == "" ? " " : bookingnames)+'/'+datasall.cartype,
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
    const [startDate, setStartDate] = useState(new Date());
    const [startDate1, setStartDate1] = useState(new Date());
    const downloadpdf = (event:any) => {
        axios({
            url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/Export_PDF/CarPickup_and_drop_WithDriver/1',
            method: 'GET',
            responseType: 'blob', // Important
        }).then((res) => {
            FileDownload(res.data,"PDF.pdf");
        });
    }
    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleSizeClick = (newSize) => {
        onOpen()
      }
    const [datasall,setdatas] = useState({
        cartype:0,
        person_responsible_for_expenses:""
    });
   
    useEffect(() => {
        const tokens = localStorageLoad("token")
        var res1 = startDate.toISOString().slice(0,10)
        var res2 = startDate1.toISOString().slice(0,10)
        const axios = require('axios');
        let data = '';
        let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/GetCheckStatus_ReserveCar2/'+mode+'/'+res1+'/'+res2+'/'+me?.data?.data?.planningBusUser.role+'/'+(bookingnames == "" ? " " : bookingnames)+'/'+datasall.cartype+'/1?page=1&size=100',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer '+tokens
        },
        data : data
        };
        console.log(config.url);
        
        axios.request(config)
        .then((response) => {
            setdatatable(response.data.data)
        })
        .catch((error) => {
            console.log(error);
        });
       
    }, [me.isLoading])
    const handleChange = (event: any) => {
        let value = event.target.value;
        setDatas({ ...datas, [event.target.name]: event.target.value })
    }
    // console.log(datas);
    const handlecartye = (event:React.ChangeEvent<HTMLInputElement>) => setdatas(prev=> { 
        console.log(event.target.value);
        return {...prev,cartype:event.target.value}}
    )
    
    const isError = datas.note === ''
    const search = (event:any) =>{
        const tokens = localStorageLoad("token")
        var res1 = startDate.toISOString().slice(0,10)
        var res2 = startDate1.toISOString().slice(0,10)
        const axios = require('axios');
        let data = '';
        let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/GetCheckStatus_ReserveCar2/'+mode+'/'+res1+'/'+res2+'/'+me?.data?.data?.planningBusUser.role+'/'+(bookingnames == "" ? " " : bookingnames)+'/'+datasall.cartype+'/0?page=1&size=100',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer '+tokens
        },
        data : data
        };
        axios.request(config)
        .then((response) => {
            setdatatable(response.data.data);
        })
        .catch((error) => {
            console.log(error);
        });

    }
    
    return (
        <>
            <Grid templateColumns='repeat(6, 1fr)'>
                <GridItem colSpan={6}>
                    <Box border="solid 1px #00A5A8" p={4} borderRadius={"10px"} justifySelf={"center"}>
                        <Text color={'#00A5A8'} fontSize='xl' as={'b'} className='lable-rentcar'>{ title_name[mode] }</Text>
                        <Grid style={{ justifyContent: "center" }} >
                        
                            <Flex p={2}  >
                                <label className='lable-statusrentcar' style={{ width: "150px" }}>วันที่ใช้รถเริ่มต้น</label>
                                <span>
                                    <DatePicker required dateFormat="dd-MM-yyyy" wrapperClassName='date_picker full-width' selected={startDate} onChange={(event)=>{setStartDate(event)}} />
                                </span>
                                <DatePickerWrapperStyles />
                                <label className='lable-statusrentcar' style={{ width: "150px" }}>วันที่ใช้รถสิ้นสุด</label>
                                <span>
                                    <DatePicker required dateFormat="dd-MM-yyyy" wrapperClassName='date_picker full-width' selected={startDate1} onChange={(event)=>{setStartDate1(event)}} />
                                </span>
                            </Flex>
                            <Flex p={2}  >
                                <label className='lable-statusrentcar' style={{ width: "150px" }}>ชื่อผู้จองรถ</label>
                                    <Input style={{ border: '1px #00A5A8 solid', width: '150px' }} type="text"  value={bookingnames} onChange={(e) => {setbookingnames(e.target.value)}}/>
                                <label className='lable-statusrentcar' style={{ width: "150px" }}>สถานะการจัดรถ</label>
                                <span>
                                    <Select  style={{ border: '1px #00A5A8 solid'}} value={datasall.cartype} onChange={handlecartye}>
                                    {
                                            status.map((val, index) => {
                                            return (
                                                <option value={index} >{ val }</option>
                                            )})
                                    }
                                    </Select>
                                </span>
                                    <Button className='lable-rentcar' type='button' onClick={search} colorScheme='teal' size='md' ml={5}><AiOutlineSearch />ค้นหา</Button>
                            </Flex>
                            <Flex p={2} justifyContent={"center"} >
                            <Button className='lable-rentcar' type='button' colorScheme='teal' size='md' ml={5}>ดูสรุปการประเมิน</Button>          
                            </Flex>
                        </Grid>
                    </Box>
                </GridItem>
                <GridItem colSpan={6} mt={"50px"} ml={"10px"}>
                      
                </GridItem>
                <GridItem colSpan={6}>

                    <Box mt={"0px"}  >
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
                                        <Th color={"white"}>การประเมิน</Th>
                                    </Tr>
                                </Thead>
                                <Tbody >
                                    
                                    {Array.isArray(datatables) && datatables.map((row, index) => {
                                        return (
                                            <Tr>
                                            <Td>{index+1}</Td>
                                            <Td>{row.booking_date}</Td>
                                            <Td>{row.bookingname}</Td>
                                            <Td>{row.agency}</Td>
                                            <Td>{row.division}</Td>
                                            <Td>{row.tel}</Td>
                                            <Td>{row.googleForm ? 'ประเมินแล้ว':'ยังไม่ได้ประเมิน'}</Td>
                                           
                                        </Tr>
                                        );
                                    })} {datatables.length == 0 && 
                                        <Tr>
                                            <Td colSpan={11} style={{textAlign:'center'}}>ไม่พบข้อมูล</Td>
                                            
                                        </Tr>
                                    }
                                    
                                </Tbody>

                            </Table>
                        </TableContainer>
                    </Box>
                </GridItem>
            </Grid>
        </>
    )
}

export default evaluation