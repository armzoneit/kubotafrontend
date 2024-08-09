import { Box, Button, Flex,Spacer, FormControl, FormErrorMessage, FormHelperText,Checkbox, FormLabel, Grid, GridItem, Input, Radio, RadioGroup, Select, Stack,useToast, Text ,
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

import { Controller } from 'react-hook-form';
import { useRouter } from "next/router"
const InfoCars = ({ type }) => {
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

    const [cars, setCars] = useState<any>([]);
    const [editCars, seteditCars] = useState<any>([]);
    const [addCars, setaddCars] = React.useState({
        service_id:null,
        car_id:null,
        driver_id:null,
        type:type,
        id:id
    });
    useEffect(() => {
        axios({
            url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/GetCar',
            method: 'GET',
            headers: { 
                'accept': '*/*', 
                'Authorization': 'Bearer '+tokens,
            }
        }).then(async (res) => {
            console.log(res.data);
        }).catch( error =>{
            console.log(error);
        });
    },[me.isLoading])
    const addCar = () => {
        console.log(addCars);
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
                                            <FormLabel className='lable-rentcar'>เลือกผู้ให้บริการ</FormLabel>
                                            <Select name='car_id' placeholder='เลือกรถ' style={{ border: '1px #00AAAD solid' }} value={addCars.car_id}>
                                                
                                            </Select>
                                            <FormLabel className='lable-rentcar'>เลือกรถ</FormLabel>
                                            <Select name='car_id' placeholder='เลือกรถ' style={{ border: '1px #00AAAD solid' }} value={addCars.car_id}>
                                                
                                            </Select>
                                            <FormLabel className='lable-rentcar'>เลือกคนขับ</FormLabel>
                                            <Select name='car_id' placeholder='เลือกคนขับ' style={{ border: '1px #00AAAD solid' }} value={addCars.driver_id}>
                                                
                                            </Select>
                                        </FormControl>
                                    </GridItem>
                                </Grid>
                            </Container>
                        </Box>
                    </ModalBody>
                        
                    <ModalFooter>
                    <Button colorScheme='blue'  backgroundColor={"#00A5A8"} mr={3} 
                                onClick={() => {
                                    isopen.onClose();
                                    addCar();
                                    console.log(1);
                                    
                                }}>
                                    เพิ่มรถ
                            </Button>
                    
                    
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Grid templateRows='repeat(2, 1fr)'
                    templateColumns='repeat(12, 1fr)'gap={4}>
                <GridItem colSpan={3}>
                    <Button colorScheme='blue' backgroundColor={"#00A5A8"} mr={3} onClick={isopen.onOpen}>เพิ่มรถ</Button>
                </GridItem>
                <GridItem colSpan={3}>
                    <Select name='status' placeholder='เลือกสถานะ' style={{ border: '1px #00AAAD solid' }} >
                                        
                    </Select>
                </GridItem>
                <GridItem colSpan={3}>
                        <Button colorScheme='blue' backgroundColor={"#00A5A8"} mr={3} onClick={isopen.onOpen}>
                                ปรับสถานะ
                        </Button>
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
                        <Th color={"white"} colSpan={2} align="center">แก้ไข</Th>
                    </Tr>
                </Thead>
                <Tbody >
                   
                </Tbody>

            </Table>
        </TableContainer>
        </>
    );
}


export default InfoCars;
