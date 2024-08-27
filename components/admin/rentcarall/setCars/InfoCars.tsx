import {
    Box, Button, Flex, Spacer, FormControl, FormErrorMessage, FormHelperText, Checkbox, FormLabel, Grid, GridItem, Input, Radio, RadioGroup, Select, Stack, useToast, Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Center,
    Container,
    Tooltip,
    IconButton,
    NumberInputField,
    effect,
    Link,
    position,
    TableContainer,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,

} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { localStorageLoad } from '../../../../utils/localStrorage';
import axios from 'axios';
import { getMe } from "../../../../data-hooks/me/getMe";
import Swal from 'sweetalert2';

import { Controller } from 'react-hook-form';
import { useRouter } from "next/router"
import get from 'lodash/get';
const InfoCars = ({ mode, idcarbooking,booking }) => {
    const me = getMe()
    const isopen = useDisclosure()
    const router = useRouter()
    const id = router?.query?.id
    const tokens = localStorageLoad("token")
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )
    const [overlay, setOverlay] = React.useState(<OverlayOne />);
    const [selectCars, setselectCars] = useState<any>([]);
    const [allCars, setallCars] = useState<any>([]);
    const [cars, setCars] = useState<any>([]);
    const [carsId, setCarsId] = useState<any>([]);

    const [editCars, seteditCars] = useState<any>([]);
    const bookingname = booking.bookingname ? booking.bookingname : booking.bookingName;
    
    const [addCars, setaddCars] = React.useState({
        id: 0,
        type_manage: 0,
        car_id: 0,
        mode: mode,
        booking_id: idcarbooking,
        bookingname: booking.bookingname ? booking.bookingname : booking.bookingName,
        type_car: 0,
        serv: "string",
        license: "string"
    });
    console.log(addCars);
    console.log(booking.bookingName);
    
    const [carForm, setcarForm] = useState<any>([
        {
            serv: {name:'ผู้ให้บริการ', value:'',key:'serv'},
            type: {name:['รถตู้','รถเก๋ง'],value:'',key:'type'},
            license: {name:'ทะเบียนรถ',value:'',key:'license'},
            car_model: { name:'รุ่นรถ',value:'',key:'carModel'},
            register_date: {name:'วันที่จดทะเบียนรถ',value:'',key:'dateRegisterCar'},
            driver: {name:'ชื่อคนขับรถ',value:'',key:'driver'},
            driver_phone: {name:'เบอร์โทรศัพท์คนขับรถ',value:'',key:'driverPhone'}
        },
        {
            type: {name:['รถเก๋ง','รถกระบะ'],value:'',key:'type'},
            license: {name:'ทะเบียนรถ',value:'',key:'license'},
            car_model: { name:'รุ่นรถ',value:'',key:'carModel'},
            register_date: {name:'วันที่จดทะเบียนรถ',value:'',key:'dateRegisterCar'},
        },
        {
            type: {name:['รถเก๋ง','รถกระบะ','รถตู้'],value:'',key:'type'},
            license: {name:'ทะเบียนรถ',value:'',key:'license'},
            car_model: { name:'รุ่นรถ',value:'',key:'carModel'},
            register_date: {name:'วันที่จดทะเบียนรถ',value:'',key:'dateRegisterCar'},
            driver: {name:'ชื่อคนขับรถ',value:'',key:'driver'},
            driver_phone: {name:'เบอร์โทรศัพท์คนขับรถ',value:'',key:'driverPhone'}
        },
    ]);
    const [carsInfo, setCarsInfo] = useState<any>([]);

    const [status, setstatus] = useState(['รอจัดรถ','จัดเสร็จแล้ว','ยกเลิก']);
    const [chgstat, setchgstat] = useState(0);
    
    const type_manage = ['รถต่างจังหวัด','กรุงเทพฯ-ปริมณฑล','SKCN-SKCA','SKCN-Kubota Farm'];
    const main_url = ['','rentcaralldaydriver','rentcaralldaynodriver','rentcarduring'];

    // const getCar = async () => {
    //     try {
    //         let config: any = {
    //             url: '/',
    //             method: 'GET',
    //             headers: {
    //                 'accept': '*/*',
    //                 'Authorization': 'Bearer ' + tokens,
    //             }
    //         }

    //         console.log(type);


    //         if (type == 'ไม่มีคนขับ') {
    //             config.url = 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/GetCarBooking/2/' + idcarbooking
    //         } else if (type == 'พร้อมคนขับ') {
    //             config.url = 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/GetCarBooking/1/' + idcarbooking
    //         } else if (type == 'ระหว่างวัน') {
    //             config.url = 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/GetCarBooking/3/' + idcarbooking
    //         }

    //         const { data } = await axios(config)

    //         setCars(data);


    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    useEffect(() => {
        // getCar();
       
        
        setCarsInfo(carForm[mode-1]);
        resetAllcar();
        setchgstat(booking.status);
        getAllCars();
    }, [me.isLoading, idcarbooking]);
    const getAllCars = async () => {
        axios.get('https://d713apsi01-wa01kbtcom.azurewebsites.net/CarDetail/GetCarDetail').then(async (response) => {
            let data = await response.data.filter(x => x.mode == mode &&  !carsId.includes(x.id));
            // let data = await response.data.filter(x =>);
            console.log(data,'getAllCars');
            
            await setallCars(data);
        }).catch((error) => {
            console.log(error);
        });
    }
    const resetAllcar = async () => {
        axios.get('https://d713apsi01-wa01kbtcom.azurewebsites.net/CarBooking/GetCarBooking/'+mode+'/'+idcarbooking).then(async (response) => {
            // let data = await response.data.filter(x => x.mode*1 == mode+1);
            let ir = new Array();
            for(let x in response.data){
                ir.push(response.data.carId);
            }
            await setCarsId(ir);
            await getAllCars();
            await setCars(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }
    const handleChange = async (event: any) => {
        let ac = addCars;
        ac[event.target.name] = event.target.value;
        // await setaddCars({ ...addCars, [event.target.name]: event.target.value })
        if(event.target.name === 'car_id'){
            showCarDetail(event.target.value);
        }
        await setaddCars(ac);

        
    }
    
    const showCarDetail = async (id) =>{

        if(!id){
            return false;
        }
        let showCar = await allCars.find(x => x.id == id);
        let data = carsInfo;

        for(let x in data){
            data[x].value = showCar[data[x].key]
        }
        let text = '';
        let ac = addCars;
        
        for(let x in carsInfo){
            text = Array.isArray(carsInfo[x].name) ? text + '<b>ประเภทรถ</b> :'+carsInfo[x].name[carsInfo[x].value]+'<br>': text + '<b>'+carsInfo[x].name+'</b> :'+carsInfo[x].value+'<br>';
        }
        ac.type_car = showCar.type;
        ac.serv = showCar.serv;
        ac.license = carsInfo.license.value;

        await setaddCars(ac);
        
        document.getElementById('car_infomation').innerHTML = text;
    }

    const insertData = async () => {
        
        addCars.booking_id = parseInt(addCars.booking_id);
        addCars.car_id = parseInt(addCars.car_id);

        addCars.type_car = addCars.type_car.toString();
        addCars.type_manage = addCars.type_manage.toString();
        addCars.mode = addCars.mode.toString();
        addCars.serv = addCars.serv.toString();
        if(addCars.id){
           axios.put('https://d713apsi01-wa01kbtcom.azurewebsites.net/CarBooking/UpdateCarBooking',addCars,{ 
                accept: '*/*', 
                Authorization: 'Bearer '+tokens,
            }).then(async(response) => {
                Swal.fire({
                    icon: "success",
                    title: "บันทึกข้อมูลสำเร็จ!",
                    text: ""
                });
                await setCars(response.data.data);
                resetAllcar();
            }).catch((error) => {
                console.log(error);
            });
        }else{
 
            axios.post('https://d713apsi01-wa01kbtcom.azurewebsites.net/CarBooking/InsertCarBooking',addCars,{ 
                accept: '*/*', 
                Authorization: 'Bearer '+tokens,
            }).then(async(response) => {
                Swal.fire({
                    icon: "success",
                    title: "บันทึกข้อมูลสำเร็จ!",
                    text: ""
                });
                // await setCars(response.data.data);
                resetAllcar();
            }).catch((error) => {
                console.log(error);
            });
            
        }
       
    }

    const resetData= async (data) => {

        let ac = addCars;
        ac.booking_id = data.bookingId;
        ac.bookingname = data.bookingName;
        ac.car_id = data.carId;
        ac.id = data.id;
        ac.license = data.license;
        ac.mode = data.mode;
        ac.serv = data.serv;
        ac.type_car = data.type_car;
        ac.type_manage = data.type_manage;

        await setaddCars(ac);
        showCarDetail(data.carId);
    }

    const deleteData = async (id) => {
        Swal.fire({
            title: "คุณต้องการลบใช่ไหม?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ลบ!",
            cancelButtonText: "ยกเลิก",

        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete('https://d713apsi01-wa01kbtcom.azurewebsites.net/CarBooking/DeleteCarBooking/'+id).then(async(response) => {
                    Swal.fire({
                        icon: "success",
                        title: "ลบข้อมูลสำเร็จ!",
                        text: ""
                    });
                resetAllcar();
                    
                }).catch((error) => {
                    console.log(error);
                });
            }
          });
    }

    const chgStatus = async () => {
        if(!cars.length && chgstat == 1){
            Swal.fire({
                icon: "error",
                title: "กรุณาเพิ่มรถเข้ารายการจองก่อนค่ะ!",
                text: ""
            });
            return false;
        }
        
        Swal.fire({
            title: "คุณต้องการปรับสถานะใช่ไหม?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ปรับสถานะ!",
            cancelButtonText: "ยกเลิก",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/UpdateStatusBooking',{
                    id:parseInt(idcarbooking),
                    mode:mode,
                    status:parseInt(chgstat)
                }).then(async(response) => {
                    Swal.fire({
                        icon: "success",
                        title: "ปรับสถานะข้อมูลสำเร็จ!",
                        text: ""
                    }).then( () => {
                        router.push('/admin/'+main_url[mode]+'/setCars')
                    });
                    
                    
                }).catch((error) => {
                    console.log(error);
                });
            }
        });
    }
    
    return (
        <>
            <Modal blockScrollOnMount={false} size={"xl"} isOpen={isopen.isOpen} onClose={isopen.onClose}>
                {overlay}
                <ModalContent>
                    <ModalHeader>เพิ่มรายการรถ</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <Box>
                            <Container maxW={"100%"}>
                                <Grid templateRows='repeat(2, 1fr)' templateColumns='repeat(6, 1fr)' gap={4}>
                                    <GridItem colSpan={12}>
                                        <FormControl>
                                            { mode == 1 ? <FormLabel className='lable-rentcar'>ประเภทการจัดรถ :</FormLabel> : ''}
                                            { mode == 1  ?
                                           <Select name='type_manage' placeholder='เลือกประเภทการจัดรถ' style={{ border: '1px #00AAAD solid' }} value={addCars.type_manage} onChange={handleChange}>
                                                {
                                                        type_manage.map((val, index) => {
                                                        return (
                                                            <option value={index}>{ val }</option>
                                                        )})
                                                }
                                                
                                            </Select>
                                            : '' }
                                            
                                            <FormLabel className='lable-rentcar'>เลือกรถ</FormLabel>
                                            <Select name='car_id' placeholder='เลือกรถ' style={{ border: '1px #00AAAD solid' }} value={addCars.car_id} onChange={handleChange}>
                                                {
                                                      allCars.map((val) => {
                                                        return (
                                                            <option value={val.id} selected={val.id == addCars.car_id}>{ val.carModel } ( { val.license } )</option>
                                                        )})
                                                }
                                            </Select>
                                            <FormLabel className='lable-rentcar'>ข้อมูลรถที่เลือก</FormLabel>
                                            <div id="car_infomation">

                                            </div>
                                        </FormControl>
                                    </GridItem>
                                </Grid>
                            </Container>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' backgroundColor={"#00A5A8"} mr={3}
                            onClick={() => {
                                isopen.onClose();
                                insertData();
                            }}>
                            เพิ่มรถ
                        </Button>


                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Grid templateRows='repeat(2, 1fr)'
                templateColumns='repeat(12, 1fr)' gap={4}>
                <GridItem colSpan={3}>
                    { !booking.status ? <Button colorScheme='blue' backgroundColor={"#00A5A8"} mr={3} onClick={isopen.onOpen}>เพิ่มรถ</Button> : ''}
                    
                </GridItem>
                <GridItem colSpan={3}>
                    <Select id='status' placeholder='เลือกสถานะ' style={{ border: '1px #00AAAD solid' }} onChange={(e) => { setchgstat(e.target.value);}}>
                    {
                            status.map((val, index) => {
                            return (
                                <option value={index} selected={index == booking.status}>{ val }</option>
                            )})
                    }
                    </Select>
                </GridItem>
                <GridItem colSpan={3}>
                    {/* <a  onClick={chgStatus()} href="#"> */}
                    <Button colorScheme='blue' backgroundColor={"#00A5A8"} mr={3}  onClick={() => {
                                // isopen.onClose();
                                chgStatus();
                            }}>
                        ปรับสถานะ
                    </Button>
                    {/* </a> */}
                </GridItem>
            </Grid>


            <TableContainer borderRadius={"10px"} border={'1px #00A5A8 solid'} >
                <Table size='md' className='table-font' >
                    <Thead bgColor={'#00A5A8'} height={"40px"}  >
                        <Tr>
                            <Th color={"white"}>ผู้ให้บรืการ</Th>
                            <Th color={"white"}>ประเภทรถ</Th>
                            <Th color={"white"}>ทะเบียนรถ</Th>
                            <Th color={"white"}>วันทีจดทะเบียน</Th>
                            <Th color={"white"}>อายุรถ</Th>
                            <Th color={"white"}>ชื่อคนขับ</Th>
                            <Th color={"white"}>เบอร์โทรศัพท์</Th>
                    
                            <Th color={"white"} colSpan={2}>จัดการ</Th>
                        </Tr>
                    </Thead>
                    <Tbody >
                        { Array.isArray(cars) &&
                            cars.map((car, index) => {
                                return (
                                    <Tr key={index}>
                                        <Td>{car.serv}</Td>
                                        <Td>{ carsInfo.type.name[car.typeCar]}</Td>
                                        <Td>
                                            {car.license}
                                        </Td>
                                        <Td>
                                            
                                        </Td>
                                        <Td>
                                            
                                        </Td>
                                        <Td>
                                            
                                        </Td>
                                        <Td>
                                           
                                        </Td>
                                        <Td >
                                        { !booking.status ?   <a onClick={(e)=>{resetData(car);isopen.onOpen();}} href="#">
                                                <AiOutlineEdit />
                                            </a>
                                            : '' }
                                        </Td>
                                        <Td >
                                        { !booking.status ?  
                                            <a onClick={(e)=>{deleteData(car.id);}} href="#">
                                                <AiOutlineDelete />
                                            </a>
                                            :''}
                                        </Td>
                                    </Tr>
                                )
                            })
                        }
                    </Tbody>

                </Table>
            </TableContainer>
        </>
    );
}


export default InfoCars;
