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
    background,

} from '@chakra-ui/react'
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react'
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { localStorageLoad } from '../../../utils/localStrorage';
import axios from 'axios';
import { getMe } from "../../../data-hooks/me/getMe";

import { Controller } from 'react-hook-form';
import { useRouter } from "next/router"
import get from 'lodash/get';
const tableCarManage = ({ mode }) => {
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
    const [fillForm, setfillForm] = useState<any>([]);
    const [allCars, setallCars] = useState<any>([]);

    const [addForm, setaddForm] = useState<any>([
        {
            serv: true,
            type: true,
            type_group:['รถตู้','รถเก๋ง'],
            license: true,
            register_date: true,
            driver: true,
            driver_phone:true
        },
        {
            serv: true,
            type: true,
            type_group:['รถเก๋ง','รถกระบะ'],
            license: true,
            register_date: false,
            driver: false,
            driver_phone:false
        },
        {
            serv: true,
            type: true,
            type_group:['รถเก๋ง','รถกระบะ','รถตู้'],
            license: true,
            register_date: false,
            driver: true,
            driver_phone:true
        }
    ]);
    //  const fil_form = addForm[mode]
    
     const [addData, setaddData] = React.useState({
        serv: '',
        type: 0,
        license: '',
        register_date: '',
        driver: '',
        driver_phone:'',
        car_model:'',
        car_registration:'',
        mode:mode+1,
        id:0,
        plantId: 0,
     });

    

    useEffect(() => {
        setfillForm(addForm[mode]);
        axios.get('https://d713apsi01-wa01kbtcom.azurewebsites.net/CarDetail/GetCarDetail').then(async (response) => {
            let data = await response.data.filter(x => x.mode*1 == mode+1);
            await setallCars(data);
        }).catch((error) => {
            console.log(error);
        });
    }, [me.isLoading]);

    const handleChange = async (event: any) => {
        
        await setaddData({ ...addData, [event.target.name]: event.target.value })
    }

    const resetData = async (i) => {
        console.log('i',i);
        
        if(i >= 0){
            let data = {
                serv: allCars[i].serv,
                type: allCars[i].type,
                license: allCars[i].license,
                register_date: allCars[i].dateRegisterCar,
                driver: allCars[i].driver,
                driver_phone:allCars[i].driverPhone,
                car_model:allCars[i].carModel,
                car_registration:allCars[i].car_registration,
                mode:mode+1,
                id:allCars[i].id,
                plantId:allCars[i].plantId
             };
             setaddData(data);
        }else{
            let data = {
                serv: null,
                type: 0,
                license: null,
                register_date: null,
                driver: null,
                driver_phone:null,
                car_model:null,
                car_registration:'',
                mode:mode+1,
                id:0,
                plantId: 0,
             };
            setaddData(data);
        }
        
    }

   

    const insertData = async () => {
        addData.type = parseInt(addData.type);
        addData.mode = addData.mode.toString();
        addData.driver = addData.driver ? addData.driver : '';
        addData.driver_phone = addData.driver_phone ? addData.driver_phone : '';
        addData.register_date = addData.register_date ? addData.register_date : '';
        let check_form = false;
        for(let x in fillForm){
            if(fillForm[x] == true){
                if(!addData[x]){
                    check_form = true;
                    break;
                }
            }
        }
        if(check_form){
            Swal.fire({
                icon: "error",
                title: "กรุณากรอกข้อมูลให้ครบถ้วน!",
                text: ""
            });
            return false;

        }
        // console.log(check_form);

        // return false;
        
        if(addData.id){
            axios.put('https://d713apsi01-wa01kbtcom.azurewebsites.net/CarDetail/UpdateCarDetail',addData).then(async(response) => {
                Swal.fire({
                    icon: "success",
                    title: "บันทึกข้อมูลสำเร็จ!",
                    text: ""
                });
                await setallCars(response.data.data);
            }).catch((error) => {
                console.log(error);
            });
        }else{
            axios.post('https://d713apsi01-wa01kbtcom.azurewebsites.net/CarDetail/InsertCarDetail',addData).then(async(response) => {
                Swal.fire({
                    icon: "success",
                    title: "บันทึกข้อมูลสำเร็จ!",
                    text: ""
                    
                });
                await setallCars(response.data.data);
            }).catch((error) => {
                console.log(error);
            });
        }
       
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
                axios.delete('https://d713apsi01-wa01kbtcom.azurewebsites.net/CarDetail/DeletetCarDetail/'+id).then(async(response) => {
                    Swal.fire({
                        icon: "success",
                        title: "ลบข้อมูลสำเร็จ!",
                        text: ""
                    });
                    axios.get('https://d713apsi01-wa01kbtcom.azurewebsites.net/CarDetail/GetCarDetail').then(async (response) => {
                        let data = await response.data.filter(x => x.mode*1 == mode+1);
                        await setallCars(data);
                    }).catch((error) => {
                        console.log(error);
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
                    <ModalHeader>รายการเพิ่ม</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                            { fillForm.serv ? <FormLabel className='lable-rentcar'>ผู้ให้บริการ</FormLabel> : ''}
                            { fillForm.serv ? <Input style={{ border: '1px #00AAAD solid' }} name="serv" value={addData.serv} onChange={handleChange}/> : ''}
                            
                            
                            { fillForm.type ? <FormLabel className='lable-rentcar'>ประเภท</FormLabel> : ''}
                            { fillForm.type ?
                            <Select name='type' placeholder='เลือกประเภทรถ' style={{ border: '1px #00AAAD solid' }} onChange={handleChange}>
                                    { fillForm.type_group.map((type_name,index) => { 
                                        return ( 
                                            <option value={index*1} selected={index == addData.type}>{type_name}</option> 
                                            )
                                        }) 
                                    }
                            </Select>
                            : '' }

                            { fillForm.license ? <FormLabel className='lable-rentcar'>ทะเบียนรถ</FormLabel> : ''}
                            { fillForm.license ? <Input style={{ border: '1px #00AAAD solid' }} name="license" value={addData.license} onChange={handleChange}/> : ''}
                            <FormLabel className='lable-rentcar'>รุ่นรถ</FormLabel> 
                            <Input style={{ border: '1px #00AAAD solid' }} name="car_model" value={addData.car_model} onChange={handleChange}/> 
                           
                            { fillForm.register_date ? <FormLabel className='lable-rentcar'>วันที่จดทะเบียนรถ</FormLabel> : ''}
                            { fillForm.register_date ? <Input type="date" style={{ border: '1px #00AAAD solid' }} name="register_date" value={addData.register_date} onChange={handleChange}/> : ''}

                            { fillForm.driver ? <FormLabel className='lable-rentcar'>ชื่อคนขับรถ</FormLabel> : ''}
                            { fillForm.driver ? <Input style={{ border: '1px #00AAAD solid' }} name="driver" value={addData.driver} onChange={handleChange}/> : ''}

                            { fillForm.driver_phone ? <FormLabel className='lable-rentcar'>เบอร์โทรศัพท์คนขับรถ</FormLabel> : ''}
                            { fillForm.driver_phone ? <Input style={{ border: '1px #00AAAD solid' }} name="driver_phone" value={addData.driver_phone} onChange={handleChange}/> : ''}

                                           
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
            <Button colorScheme='blue' backgroundColor={"#00A5A8"} mb={3}  onClick={() => {
                                isopen.onOpen();
                                resetData(-1);

                            }}>เพิ่มรถ</Button>
            <TableContainer borderRadius={"10px"} border={'1px #00A5A8 solid'} >
                <Table size='md' className='table-font' >
                    <Thead bgColor={'#00A5A8'} height={"40px"}  >
                        <Tr>
                            <Th color={"white"}>ลำดับ</Th>
                            <Th color={"white"}>ผู้ให้บริการ</Th>
                            <Th color={"white"}>ประเภทรถ</Th>
                            <Th color={"white"}>วันที่จดทะเบียนรถ</Th>
                            <Th color={"white"}>ชื่อคนขับ</Th>
                            <Th color={"white"}>เบอร์โทร</Th>
                            <Th color={"white"} colSpan={2}>จัดการ</Th>
                        </Tr>
                    </Thead>
                    <Tbody >
                        {Array.isArray(allCars) && allCars.map((row, index) => {
                            
                            return (
                                <Tr>
                                    <Td>{index+1}</Td>
                                    <Td>{row.serv}</Td>
                                    <Td>{ fillForm.type_group[row.type]}</Td>
                                    <Td>{ new Date(row.dateRegisterCar).toLocaleDateString() }</Td>
                                    <Td>{row.driver}</Td>
                                    <Td>{row.driverPhone}</Td>
                                  
                                    <Td >
                                         <a onClick={(e)=>{resetData(index);isopen.onOpen();}} href="#">
                                            <AiOutlineEdit />
                                        </a>
                                        
                                    </Td>
                                    <Td >
                                        <a onClick={(e)=>{deleteData(row.id);}} href="#">
                                            <AiOutlineDelete />
                                        </a>
                                    </Td>
                                </Tr>
                            );
                        })} 
                        {allCars.length == 0 && 
                            <Tr>
                                <Td colSpan={17} style={{textAlign:'center'}}>ไม่พบข้อมูล</Td>
                                
                            </Tr>
                        }
                        
                    </Tbody>

                </Table>
            </TableContainer>
            
        </>
    );
}


export default tableCarManage;
