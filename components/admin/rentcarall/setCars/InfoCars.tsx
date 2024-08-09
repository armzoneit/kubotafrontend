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

import { Controller } from 'react-hook-form';
import { useRouter } from "next/router"
import get from 'lodash/get';
const InfoCars = ({ type, idcarbooking }) => {
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
        service_id: null,
        car_id: null,
        driver_id: null,
        type: type,
        id: id
    });

    const getCar = async () => {
        try {
            let config: any = {
                url: '/',
                method: 'GET',
                headers: {
                    'accept': '*/*',
                    'Authorization': 'Bearer ' + tokens,
                }
            }

            console.log(type);


            if (type == 'ไม่มีคนขับ') {
                config.url = 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/GetCarBooking/2/' + idcarbooking
            } else if (type == 'พร้อมคนขับ') {
                config.url = 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/GetCarBooking/1/' + idcarbooking
            } else if (type == 'ระหว่างวัน') {
                config.url = 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/GetCarBooking/3/' + idcarbooking
            }

            const { data } = await axios(config)

            setCars(data);


        } catch (error) {
            console.log(error);
        }
    }

    const hendleDeleteCar = async (id: any) => {
        try {
            let config: any = {
                url: '/',
                method: 'GET',
                headers: {
                    'accept': '*/*',
                    'Authorization': 'Bearer ' + tokens,
                }
            }

            if (type == 'ไม่มีคนขับ') {
                config.url = 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/DeleteCarBooking/' + id + '/2'
            } else if (type == 'พร้อมคนขับ') {
                config.url = 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/DeleteCarBooking/' + id + '/1'
            } else if (type == 'ระหว่างวัน') {
                config.url = 'https://d713apsi01-wa01kbtcom.azurewebsites.net/ReserveCar/DeleteCarBooking/' + id + '/3'
            }

            const { data } = await axios(config)

            setCars(data);


        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCar();
    }, [me.isLoading, idcarbooking]);

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
                        <Button colorScheme='blue' backgroundColor={"#00A5A8"} mr={3}
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
                templateColumns='repeat(12, 1fr)' gap={4}>
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
                            <Th color={"white"} colSpan={2} align="center">ลบ</Th>
                        </Tr>
                    </Thead>
                    <Tbody >
                        {
                            cars.map((car, index) => {
                                return (
                                    <Tr key={index}>
                                        <Td>{car.TransportationProvider}</Td>
                                        <Td>{car.typeCar}</Td>
                                        <Td>
                                            {car.Car_registration}
                                        </Td>
                                        <Td>
                                            {car.DateRegisterCar}
                                        </Td>
                                        <Td>
                                            {car.Car_age}
                                        </Td>
                                        <Td>
                                            {car.DriverName}
                                        </Td>
                                        <Td>
                                            {car.Tel}
                                        </Td>
                                        <Td>
                                            <IconButton
                                                aria-label="Edit"
                                                icon={<AiOutlineEdit />}
                                                onClick={() => {
                                                    isopen.onOpen();
                                                    seteditCars(car);
                                                }}
                                            />
                                        </Td>
                                        <Td>
                                            <IconButton
                                                aria-label="Delete"
                                                icon={<AiOutlineDelete />}
                                                onClick={() => {
                                                    hendleDeleteCar(car.id)
                                                }}
                                            />
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
