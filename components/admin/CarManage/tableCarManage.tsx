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
    const [fillForm, setfillForm] = useState<any>([])
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
            type_group:['รถเก๋ง','กระบะ'],
            license: true,
            register_date: false,
            driver: false,
            driver_phone:false
        },
        {
            serv: true,
            type: true,
            type_group:['รถเก๋ง','กระบะ','กระบะ'],
            license: true,
            register_date: false,
            driver: true,
            driver_phone:true
        }
    ]);
    //  const fil_form = addForm[mode]
    
     const [addData, setaddData] = React.useState({
        serv: null,
        type: null,
        license: null,
        register_date: null,
        driver: null,
        driver_phone:null,
        mode:mode+1,
        id:null
     });

    

    useEffect(() => {
        setfillForm(addForm[mode]);
        
    }, [me.isLoading]);

    const handleChange = async (event: any) => {
        
        await setaddForm({ ...addForm, [event.target.name]: event.target.value })
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
                            <Select name='type' placeholder='เลือกประเภทรถ' style={{ border: '1px #00AAAD solid' }} >
                                    { fillForm.type_group.map((type_name) => { return ( <option value={type_name}>{type_name}</option> )}) }
                            </Select>
                            : '' }

                            { fillForm.license ? <FormLabel className='lable-rentcar'>ทะเบียนรถ</FormLabel> : ''}
                            { fillForm.license ? <Input style={{ border: '1px #00AAAD solid' }} name="license" value={addData.license} onChange={handleChange}/> : ''}

                            { fillForm.register_date ? <FormLabel className='lable-rentcar'>วันที่จดทะเบียนรถ</FormLabel> : ''}
                            { fillForm.register_date ? <Input style={{ border: '1px #00AAAD solid' }} name="register_date" value={addData.register_date} onChange={handleChange}/> : ''}

                            { fillForm.driver ? <FormLabel className='lable-rentcar'>ชื่อคนขับรถ</FormLabel> : ''}
                            { fillForm.driver ? <Input style={{ border: '1px #00AAAD solid' }} name="driver" value={addData.driver} onChange={handleChange}/> : ''}

                            { fillForm.driver_phone ? <FormLabel className='lable-rentcar'>เบอร์โทรศัพท์คนขับรถ</FormLabel> : ''}
                            { fillForm.driver_phone ? <Input style={{ border: '1px #00AAAD solid' }} name="driver_phone" value={addData.driver_phone} onChange={handleChange}/> : ''}

                                           
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' backgroundColor={"#00A5A8"} mr={3}
                            onClick={() => {
                                isopen.onClose();
                               console.log(addData);
                            }}>
                            เพิ่มรถ
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Button colorScheme='blue' backgroundColor={"#00A5A8"} mb={3} onClick={isopen.onOpen}>เพิ่มรถ</Button>
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
                        
                        
                        
                    </Tbody>

                </Table>
            </TableContainer>
            
        </>
    );
}


export default tableCarManage;
