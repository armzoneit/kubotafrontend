import { Box, Button, Center, Flex, FormControl, FormErrorMessage, 
    FormHelperText, FormLabel, Grid, GridItem, Input, Radio, RadioGroup, Select,useToast, Stack, Text ,  
    Tooltip,
    IconButton,
    NumberInputField,
} from '@chakra-ui/react'
import Head from 'next/head';
import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form';
import DatePickerInput from '../../components/input/Datepicker';
import { localStorageLoad } from '../../utils/localStrorage';
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons"
import { getMe } from "../../data-hooks/me/getMe"
import { AiOutlineSearch, AiOutlineEdit, AiOutlineDelete, AiOutlineMessage } from "react-icons/ai";
import moment from 'moment';
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
    NumberInput,
} from '@chakra-ui/react'
import styled, { css, createGlobalStyle } from 'styled-components';
const DatePickerWrapperStyles = createGlobalStyle`
    tbody tr:hover{
        background-color:#E2EFEF;
        color:#000000;
    }
    .swal2-confirm{
        background-color:#00A8A9;
    }
    .swal2-cancel{
        background-color:#CCC5C5;
    }
`;
const axios = require('axios');
const Evaluation = () => {
    const me = getMe()
    const [value, setValue] = useState("1")
    const toast = useToast()
    const toastId4 = "success"
    const [loading,setloading] = useState<boolean>(false);
    const [optionsc,setoptions] = useState({
        withdriver : "",
        nodriver:"",
        pickupandrop:""
    });
    const [pagegination,setpagegination] = useState({
        page: 1,
        size: 30,
        pageOptions:0,
        canNextPage:false,
        canPreviousPage:false,
        
    })
    const nextpage = () =>{
        setpagegination(prev=>{
            let count = pagegination.page + 1;
            if(count == pagegination.pageOptions)
            {
                return {...prev,page:count,canNextPage:false,canPreviousPage:true}
            }else{

                return {...prev,page:count,canNextPage:true,canPreviousPage:true}
            }
            

        })
        
    }
    const prevpage = () =>{
        setpagegination(prev=>{
            let count = pagegination.page - 1;
            if(count == 1)
            {

                return {...prev,page:count,canNextPage:true,canPreviousPage:false}
            }else{

                return {...prev,page:count,canNextPage:true,canPreviousPage:true}
            }
            

        })
    }
    useEffect(()=>
    {
        if(pagegination.pageOptions != 0)
        {
            if(datasall.cartype == 1){
                const tokens = localStorageLoad("token")
                const axios = require('axios');
                let data = JSON.stringify({
                "carBookingType": 1,
                "startdate": "2024-02-13",
                "enddate": "2024-02-13"
                });
    
                let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/GetCarBookingWithDriver?page='+pagegination.page+'&size=30',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': 'Bearer '+tokens
                },
                data : data
                };
    
                axios.request(config)
                .then((response) => {
                    console.log(response);
                    if(response.data.data.data.length>0){
                        setdatatables(response.data.data.data)
                    }else{
                        setdatatables([])
                    }
                    setloading(false);
                })
                .catch((error) => {
                console.log(error);
                });
            }else if(datasall.cartype == 2){
                const tokens = localStorageLoad("token")
                const axios = require('axios');
                let data = JSON.stringify({
                "carBookingType": 1,
                "startdate": "2024-02-13",
                "enddate": "2024-02-13"
                });
    
                let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/GetCarBookingNoDriver?page='+pagegination.page+'&size=30',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': 'Bearer '+tokens
                },
                data : data
                };
    
                axios.request(config)
                .then((response) => {
                    console.log(response);
                    if(response.data.data.data.length>0){
                        setdatatables(response.data.data.data)
                    }else{
                        setdatatables([])
                    }
                    setloading(false);
                })
                .catch((error) => {
                console.log(error);
                });
            }else{
                const tokens = localStorageLoad("token")
                const axios = require('axios');
                let data = JSON.stringify({
                "carBookingType": 1,
                "startdate": "2024-02-13",
                "enddate": "2024-02-13"
                });
    
                let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/GetCarBookingPickupAndDrop?page='+pagegination.page+'&size=30',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': 'Bearer '+tokens
                },
                data : data
                };
    
                axios.request(config)
                .then((response) => {
                    console.log(response);
                    if(response.data.data.data.length>0){
                        setdatatables(response.data.data.data)
                    }else{
                        setdatatables([])
                    }
                    setloading(false);
                })
                .catch((error) => {
                console.log(error);
                });
            }
        }
    },[pagegination.page])
    const tokens = localStorageLoad("token")
    const [datas, setDatas] = useState<any>([])
    const [date, setDate] = useState<any>(new Date())
    // console.log(value);
    const handleSubmit = (event: any) => {
        // alert('You clicked submit');
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // console.log(data.get('cost-enter'));

    }
    const [datasall,setdatas] = useState({
        cartype:0,
        startdates:null,
        enddates:null
    });
    const [datatables,setdatatables] = useState([])

    const handleChange = (event: any) => {
        let value = event.target.value;
        setDatas({ ...datas, [event.target.name]: event.target.value })
    }
    const clickgoogleform = (id: number) => {
        
            
            let data = JSON.stringify({
            "carBookingType": 1,
            "startdate": "2024-02-13",
            "enddate": "2024-02-13"
            });

            let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/GoogleForm/'+id+'/'+datasall.cartype,
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer '+tokens
            },
            data : data
            };

            axios.request(config)
            .then((response) => {
                console.log(response.data.data);
                setdatatables(response.data.data.data)
                if(datasall.cartype == "1")
                {
                    window.open("https://forms.gle/LXdqQLjvxWohENUV7");

                }else if(datasall.cartype == "2")
                {
                    window.open("https://forms.gle/1BMXsrZ8eo6LhQ6M8");

                }else if(datasall.cartype == "3")
                {
                    window.open("https://forms.gle/NC9UWkbZ215QvGhp9");

                }
            })
            .catch((error) => {
            console.log(error);
            });
    }

    const handlecartye = (event:React.ChangeEvent<HTMLInputElement>) => setdatas(prev=> { 
        setdatatables([])
        setpagegination({
            page: 1,
            size: 30,
            pageOptions:0,
            canNextPage:false,
            canPreviousPage:false,
        });
        return {...prev,cartype:event.target.value

        
        }})
    const search = (event:any) =>{
        if(datasall.cartype < 1)
        {
            toast({
                id: toastId4,
                description: `เลือกประเภทการประเมิน`,
                status: "error",
                duration: 3000,
                isClosable: false,
            })
            return
        }
        setloading(true);
        if(datasall.cartype == 1){
            const tokens = localStorageLoad("token")
            const axios = require('axios');
            let data = JSON.stringify({
            "carBookingType": 1,
            "startdate": "2024-02-13",
            "enddate": "2024-02-13"
            });

            let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/GetCarBookingWithDriver?page='+pagegination.page+'&size=30',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer '+tokens
            },
            data : data
            };

            axios.request(config)
            .then((response) => {
                console.log(response);
                if(response.data.data.data.length>0){
                    setdatatables(response.data.data.data)
                    let pagesize = Math.ceil(parseFloat(response.data.total)/30)
                    setpagegination(prev=>{
                        if(pagesize > 1){
                            return {...prev,page:1,pageOptions:pagesize,canNextPage:true,canPreviousPage:false}

                        }else{
                            return {...prev,page:1,pageOptions:pagesize,canNextPage:false,canPreviousPage:false}
                        }
                    })
                }else{
                    setdatatables([])
                }
                setloading(false);
            })
            .catch((error) => {
            console.log(error);
            });
        }else if(datasall.cartype == 2){
            const tokens = localStorageLoad("token")
            const axios = require('axios');
            let data = JSON.stringify({
            "carBookingType": 1,
            "startdate": "2024-02-13",
            "enddate": "2024-02-13"
            });

            let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/GetCarBookingNoDriver?page='+pagegination.page+'&size=30',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer '+tokens
            },
            data : data
            };

            axios.request(config)
            .then((response) => {
                console.log(response);
                if(response.data.data.data.length>0){
                    setdatatables(response.data.data.data)
                    let pagesize = Math.ceil(parseFloat(response.data.total)/30)
                    setpagegination(prev=>{
                        if(pagesize > 1){
                            return {...prev,page:1,pageOptions:pagesize,canNextPage:true,canPreviousPage:false}

                        }else{
                        return {...prev,page:1,pageOptions:pagesize,canNextPage:false,canPreviousPage:false}
                        }
                    })
                }else{
                    setdatatables([])
                }
                setloading(false);
            })
            .catch((error) => {
            console.log(error);
            });
        }else{
            const tokens = localStorageLoad("token")
            const axios = require('axios');
            let data = JSON.stringify({
            "carBookingType": 1,
            "startdate": "2024-02-13",
            "enddate": "2024-02-13"
            });

            let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/GetCarBookingPickupAndDrop?page='+pagegination.page+'&size=30',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer '+tokens
            },
            data : data
            };

            axios.request(config)
            .then((response) => {
                console.log(response);
                if(response.data.data.data.length>0){
                    setdatatables(response.data.data.data)
                    let pagesize = Math.ceil(parseFloat(response.data.total)/30)
                    setpagegination(prev=>{
                        if(pagesize > 1){
                            return {...prev,page:1,pageOptions:pagesize,canNextPage:true,canPreviousPage:false}

                        }else{
                        return {...prev,page:1,pageOptions:pagesize,canNextPage:false,canPreviousPage:false}
                        }
                    })
                }else{
                    setdatatables([])
                }
                setloading(false);
            })
            .catch((error) => {
            console.log(error);
            });
        }
        
    }
    useEffect(()=>{
        let config5 = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/GetCheckGoogleForm',
            headers: { 
              'accept': '*/*', 
              'Authorization': 'Bearer '+tokens
            }
          };
          
          axios.request(config5)
          .then((response3) => {
            console.log(response3.data?.data[0]);
            setoptions({
                withdriver : "จองรถเช่าเหมาวัน(พร้อมคนขับ) ("+response3.data?.data[0].count_WithDriver+")",
                nodriver:"จองรถเช่าเหมาวัน(ไม่มีคนขับคนขับ) ("+response3.data?.data[0].count_NoDriver+")",
                pickupandrop:"จองรถรับส่งระหว่างวัน ("+response3.data?.data[0].count_PickupAndDrop+")"
            });
          })
          .catch((error3) => {
            console.log(error3);
          });
    },[me.isLoading])
    const isError = datas.note === ''
    const errorselect = datasall.cartype === 0
    return (
        <>
            <Head>
                <title>ตรวจสอบสถานะการจองรถ</title>
                <meta name="description" content="reservation" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <DatePickerWrapperStyles/>
            <Grid templateColumns='repeat(6, 1fr)'>
                <GridItem colSpan={6}>
                    <Box border="solid 1px #00A5A8" p={4} borderRadius={"10px"} justifySelf={"center"}>
                        <Text color={'#00A5A8'} fontSize='xl' as={'b'} className='lable-rentcar'>ประเมินความพึงพอใจ</Text>

                        <Grid style={{ justifyContent: "center" }} >
                            <Flex p={2} mt={2} >
                                <label className='lable-statusrentcar' style={{ width: "150px" }}>ประเภทการประเมิน</label>
                                <Select  width={'400px'} placeholder='เลือกประเภทการประเมิน' value={datasall.cartype} onChange={handlecartye}>
                                    <option value='1'>{optionsc.withdriver}</option>
                                    <option value='2'>{optionsc.nodriver}</option>
                                    <option value='3'>{optionsc.pickupandrop}</option>
                                </Select>
                                
                                <Button isLoading={loading}
    loadingText='ค้นหา'
    colorScheme='teal'
     className='lable-rentcar' type='submit' onClick={search} colorScheme='teal' size='md' ml={5}><AiOutlineSearch style={{marginRight:"3px"}}/>ค้นหา</Button>
                            </Flex>
                        </Grid>

                    </Box>
                </GridItem>
                <GridItem colSpan={6}>
                    <Box mt={"50px"}>
                        <TableContainer borderRadius={"10px"} border={'1px #00A5A8 solid'} height={"45vh"} overflowY={"auto"}>
                            <Table size='md' className='table-font'>
                                <Thead bgColor={'#00A5A8'} height={"40px"} position={"sticky"} top={"0"}>
                                    {datasall.cartype != "2" ? 
                                        <Tr>
                                        <Th color={"white"}>ลำดับ</Th>
                                        <Th color={"white"}>วันจอง/เวลา</Th>
                                        <Th color={"white"} >ชื่อผู้จองรถ</Th>
                                        <Th color={"white"}><Center>ประเภทรถ</Center></Th>
                                        <Th color={"white"}><Center>จำนวน(คัน)</Center></Th>
                                        <Th color={"white"}><Center>วันที่ใช้รถเริ่มต้น/เวลา</Center></Th>
                                        <Th color={"white"}><Center>วันที่ใช้รถสิ้นสุด/เวลา</Center></Th>
                                        <Th color={"white"} Width={"200px"}>สถานที่รับ</Th>
                                        <Th color={"white"}>สถานที่ส่ง</Th>
                                        <Th color={"white"}><Center>ทะเบียนรถ</Center></Th>
                                        <Th color={"white"}>ชื่อคนขับ</Th>
                                        <Th color={"white"}><Center>เบอร์โทร</Center></Th>
                                        <Th color={"white"}><Center>ผู้ให้บริการ</Center></Th>
                                        <Th color={"white"}><Center>ประเมินความพึงพอใจ</Center></Th>
                                    </Tr>
                                    :
                                    <Tr>
                                        <Th color={"white"}>ลำดับ</Th>
                                        <Th color={"white"}>วันจอง/เวลา</Th>
                                        <Th color={"white"}>ชื่อผู้ใช้รถ</Th>
                                        <Th color={"white"}><Center>ประเภทรถ</Center></Th>
                                        <Th color={"white"}><Center>จำนวน(คัน)</Center></Th>
                                        <Th color={"white"}><Center>วันที่ใช้รถเริ่มต้น/เวลา</Center></Th>
                                        <Th color={"white"}><Center>วันที่ใช้รถสิ้นสุด/เวลา</Center></Th>
                                        <Th color={"white"} maxWidth={"200px"}>สถานที่รับ</Th>
                                        <Th color={"white"} maxWidth={"200px"}>สถานที่ส่ง</Th>
                                        <Th color={"white"}><Center>ยี่ห้อ/รุ่น</Center></Th>
                                        <Th color={"white"}><Center>ประเมินความพึงพอใจ</Center></Th>
                                    </Tr>
                                    }
                                    
                                </Thead>
                                <Tbody>
                                    {datatables.map((x,i) =>
                                        datasall.cartype != "2" ? 
                                        <Tr key={i}>
                                            <Td>{(i)+1+((pagegination.page-1)*30)}</Td>
                                            <Td>{x.booking_date}</Td>
                                            <Td>{x.bookingname}</Td>
                                            <Td><Center>
                                            {x.number_travelers == 0 || x.number_travelers == null ? "" : "(รถตู้) "} { x.number_cars == 0 || x.number_cars == null ? "" : x.number_travelers != null && x.number_travelers != 0  ? "(รถเก๋ง)" : "(รถตู้)"} { x.number_cars2 == 0 || x.number_cars2 == null ? "" : "(รถกระบะ)"} { x.number_cars3 == 0 || x.number_cars3 == null ? "" : "(รถเก๋ง)"}
                                            </Center></Td>
                                            <Td><Center>
                                            {x.number_travelers == 0 || x.number_travelers == null ? "" : "("+x.number_travelers+")"} {x.number_cars == 0 || x.number_cars == null  ? "" : "("+x.number_cars+")"} {x.number_cars2 == 0 || x.number_cars2 == null  ? "" : "("+x.number_cars2+")"} {x.number_cars3 == 0 || x.number_cars3 == null  ? "" : "("+x.number_cars3+")"}
                                            </Center></Td>
                                            <Td ><Center>{x.startdate} {x.timeIn}</Center></Td>
                                            <Td><Center>{x.enddate} {x.timeOut}</Center></Td>
                                            <Td maxWidth={"200px"} overflow={"hidden"} textOverflow={"ellipsis"}>{x.locationIn}</Td>
                                            <Td maxWidth={"200px"} overflow={"hidden"} textOverflow={"ellipsis"}>{x.locationOut}</Td>
                                            <Td><Center></Center></Td>
                                            <Td></Td>
                                            <Td><Center></Center></Td>
                                            <Td><Center></Center></Td>
                                            {
                                                x.googleform == 1 ? <Td>ประเมินความพึงพอใจแล้ว</Td> : 
                                                <Td><Center>
                                                    {
                                                        moment() > moment(x.enddate.split('/')[2]+"-"+x.enddate.split('/')[1]+"-"+x.enddate.split('/')[0]) ? <Button onClick={() => clickgoogleform(x.idcarbooking)} fontSize={'12px'}><AiOutlineMessage />&nbsp; แบบประเมิน</Button>
                                                        : <Td><Center>รอสิ้นสุดใช้รถ</Center></Td>
                                                    }
                                                    
                                                </Center></Td>
                                            }
                                        </Tr>
                                        :
                                        <Tr key={i}>
                                            <Td>{(i)+1+((pagegination.page-1)*30)}</Td>
                                            <Td>{x.booking_date}</Td>
                                            <Td>{x.bookingname}</Td>
                                            <Td><Center>
                                            {x.number_travelers == 0 || x.number_travelers == null ? "" : "(รถตู้) "}  { x.number_cars == 0 || x.number_cars == null ? "" : "(รถกระบะ)"}
                                            </Center></Td>
                                            <Td><Center>
                                            {x.number_travelers == 0 || x.number_travelers == null ? "" : "("+x.number_travelers+")"}  {x.number_cars == 0 || x.number_cars == null  ? "" : "("+x.number_cars+")"}
                                            </Center></Td>
                                            <Td ><Center>{x.startdate} {x.timeIn}</Center></Td>
                                            <Td><Center>{x.enddate} {x.timeOut}</Center></Td>
                                            <Td maxWidth={"200px"} overflow={"hidden"} textOverflow={"ellipsis"}>{x.locationIn}</Td>
                                            <Td maxWidth={"200px"} overflow={"hidden"} textOverflow={"ellipsis"}>{x.locationOut}</Td>
                                            <Td ><Center></Center></Td>
                                            {
                                                x.googleform == 1 ? <Td>ประเมินความพึงพอใจแล้ว</Td> : 
                                                <Td><Center>
                                                    {
                                                        moment() > moment(x.enddate.split('/')[2]+"-"+x.enddate.split('/')[1]+"-"+x.enddate.split('/')[0]) ? <Button onClick={() => clickgoogleform(x.idcarbooking)} fontSize={'12px'}><AiOutlineMessage />&nbsp; แบบประเมิน</Button>
                                                        : <Td><Center>รอสิ้นสุดใช้รถ</Center></Td>
                                                    }
                                                    
                                                </Center></Td>
                                            }
                                        </Tr>
                                        
                                        
                                    )
                                    }
                                    {datatables.length == 0 && 
                                        <Tr>
                                            <Td colSpan={14} style={{textAlign:'center'}}>ไม่พบข้อมูล</Td>
                                            
                                        </Tr>
                                    }
                                    
                                </Tbody>

                            </Table>
                        </TableContainer>
                    </Box>
                    <Box>
                        <Flex justifyContent="flex-end" m={4} alignItems="center">
                            <Text flexShrink={0} mr={2}>
                                Page{" "}
                            </Text>
                            <Flex>
                                <Tooltip label="Previous Page">
                                <IconButton
                                    aria-label="previousPage"
                                    onClick={prevpage}
                                    isDisabled={!pagegination.canPreviousPage}
                                    icon={<ChevronLeftIcon h={6} w={6} />}
                                    variant="unstyled"
                                    _focus={{ boxShadow: "none" }}
                                />
                                </Tooltip>
                            </Flex>
                            <Flex alignItems="center">
                                <NumberInput
                                ml={2}
                                mr={5}
                                minW={14}
                                maxW={18}
                                min={1}
                                max={pagegination.pageOptions}
                                onChange={(value: any) => {
                                    const page = value ? value : 1
                                    setControlledPage(page)
                                }}
                                value={pagegination.page}
                                borderColor="primary.500"
                                >
                                <NumberInputField
                                    padding={0}
                                    textAlign="center"
                                    _focus={{
                                    borderColor: "#B2CCCC",
                                    boxShadow: "0 0 0 1px #00A5A8",
                                    }}
                                />
                                </NumberInput>
                                <Text flexShrink={0} mr={2}>
                                of{" "}
                                <Text fontWeight="bold" as="span">
                                    {pagegination.pageOptions}
                                </Text>
                                </Text>
                            </Flex>
                            <Flex>
                                <Tooltip label="Next Page">
                                <IconButton
                                    aria-label="nextPage"
                                    onClick={nextpage}
                                    isDisabled={!pagegination.canNextPage}
                                    icon={<ChevronRightIcon h={6} w={6} />}
                                    variant="unstyled"
                                    _focus={{ boxShadow: "none" }}
                                />
                                </Tooltip>
                            </Flex>
                        </Flex>
                    </Box>
                </GridItem>
            </Grid>
        </>
    )
}

export default Evaluation