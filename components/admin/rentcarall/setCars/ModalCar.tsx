import { Button, FormControl, FormLabel, Grid, GridItem, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Select } from '@chakra-ui/react';
import { useEffect, useState } from 'react';


const ModalCar = ({ data, isOpen, onClose, onSubmit }) => {
    // ผู้ให้บริการ
    const [form, setForm] = useState({});
    // set ค่าให้กับ form ที่ดึงมาจาก setData
    useEffect(() => {
        console.log(data);

        setForm(data); // อัพเดตค่า input เมื่อ initialValue เปลี่ยน
    }, [data]);
    //set ค่าให้กับ form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    // ส่งค่าให้กับตาราง
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    }

    return (
        <Modal onClose={onClose} size={'lg'} isOpen={isOpen} >
            <ModalOverlay />
            <ModalContent>
                <ModalBody>
                    <Grid
                        templateRows='repeat(2, 1fr)'
                        templateColumns='repeat(6, 1fr)'
                        gap={4}>

                        <GridItem colSpan={3}>
                            <FormControl>
                                <FormLabel className='lable-rentcar'>ผู้ให้บริการ</FormLabel>
                                <Input style={{ border: '1px #00AAAD solid' }} value={form.name} name='name' onChange={handleChange} />
                            </FormControl>
                        </GridItem>
                        <GridItem colSpan={3}>
                            <FormControl>
                                <FormLabel className='lable-rentcar'>ประเภทรถ</FormLabel>
                                <Select onChange={handleChange} name='typecar' placeholder='Select option' style={{ border: '1px #00AAAD solid' }}>
                                    <option value='1'>รถเก๋ง</option>
                                    <option value='2'>รถตู้</option>
                                </Select>
                            </FormControl>
                        </GridItem>
                        <GridItem colSpan={3}>
                            <FormControl>
                                <FormLabel className='lable-rentcar'>ทะเบียนรถ</FormLabel>
                                <Input style={{ border: '1px #00AAAD solid' }} id='cost-enter' name='cost-enter' />
                            </FormControl>
                        </GridItem>
                        <GridItem colSpan={3}>
                            <FormControl>
                                <FormLabel className='lable-rentcar'>ชื่อคนขับ</FormLabel>
                                <Input style={{ border: '1px #00AAAD solid' }} id='cost-enter' name='cost-enter' />
                            </FormControl>
                        </GridItem>
                        <GridItem colSpan={3}>
                            <FormControl>
                                <FormLabel className='lable-rentcar'>เบอร์โทรศัพท์</FormLabel>
                                <Input style={{ border: '1px #00AAAD solid' }} id='cost-enter' name='cost-enter' />
                            </FormControl>
                        </GridItem>
                        <GridItem colSpan={3}>
                            <FormControl>
                                <FormLabel className='lable-rentcar'>สถานะการจัดรถ</FormLabel>
                                <Select onChange={handleChange} name='typecar' placeholder='Select option' style={{ border: '1px #00AAAD solid' }}>
                                    <option value='1'>รถเก๋ง</option>
                                    <option value='2'>รถตู้</option>
                                </Select>
                            </FormControl>
                        </GridItem>
                    </Grid>
                </ModalBody>
                <ModalFooter>
                    <Button className='lable-rentcar' type='submit' colorScheme='teal' size='md' marginRight={"10px"} onClick={handleSubmit}  >
                        Save
                    </Button>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    );

}


export default ModalCar;
