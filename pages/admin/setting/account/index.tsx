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
import { localStorageLoad } from '../../../../utils/localStrorage';
import axios from 'axios';
import { getMe } from "../../../../data-hooks/me/getMe";

import { Controller } from 'react-hook-form';
import { useRouter } from "next/router"
import get from 'lodash/get';
// /users?page=1&size=30
const settingaccount = () => {
    const me = getMe()
    const isopen = useDisclosure()
    const router = useRouter()
    const tokens = localStorageLoad("token")
    const [menua1,setmenua1] = useState<boolean>(false);
    const [menua2,setmenua2] = useState<boolean>(false);
    const [menua3,setmenua3] = useState<boolean>(false);
    const [menua4,setmenua4] = useState<boolean>(false);


    const [menub1,setmenub1] = useState<boolean>(false);
    const [menub2,setmenub2] = useState<boolean>(false);
    const [menub3,setmenub3] = useState<boolean>(false);
    const [menub4,setmenub4] = useState<boolean>(false);

    const [menuc1,setmenuc1] = useState<boolean>(false);
    const [menuc2,setmenuc2] = useState<boolean>(false);
    const [menuc3,setmenuc3] = useState<boolean>(false);
    const [menuc4,setmenuc4] = useState<boolean>(false);


    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )
    const [overlay, setOverlay] = React.useState(<OverlayOne />);

    const [user, setuser] = useState<any>([]);
    const [user_menu, setuser_menu] = useState<any>([]);
    const [userEdit, setuserEdit] = useState<any>({
        
    });


    

    useEffect(() => {
        if(me.data){
            if(me.data.data.planningBusUser.role != 'admin'){
                router.push("/admin/users")
            }
        }
        let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/PermissionReserve/GetPermissionReserve?page=1&size=30',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer '+tokens
        }
        };
        axios.request(config)
        .then((response) => {
           setuser(response.data);
        //    console.log(response);
           
        })
        .catch((error) => {
            console.log(error);
        });
        // let um = new Array();
        // for(let x =1;x<=3;x++){
        //     for(let y =1;y<=3;y++){
        //         um.push({
        //             idPermissionReserve:0,
        //             plantId:0,
        //             employeeNo:0,
        //             menu:y,
        //             mode:x,
        //             approved:false
        //         });
        //     }
        // }
        // setuser_menu(um);
        
        
    }, [me.isLoading]);
    const setMenu = async (row,mod,men,app) => {
        // console.log('userEdit',row);
        
        let umenu = row.permissionReserve;
        if(umenu.find(x => x.mode == mod && x.menu == men)){
            umenu.find(x => x.mode == mod && x.menu == men).approved = app;
        }else{
            umenu.push({
                idPermissionReserve:0,
                plantId:row.plantId,
                employeeNo:row.employeeNo,
                menu:men,
                mode:mod,
                approved:app
            });
        }
        await setuser_menu(umenu);
        
    }
    const checkApprove = async (row) => {
        await setuserEdit(row);
        await setuser_menu(row.permissionReserve);

        let menu = row.permissionReserve;

        setmenua1(menu.find(x => x.mode == 1 && x.menu == 1)? menu.find(x => x.mode == 1 && x.menu == 1).approved : false);
        setMenu(row,1,1,menua1);

        setmenua2(menu.find(x => x.mode == 1 && x.menu == 2)? menu.find(x => x.mode == 1 && x.menu == 2).approved : false);
        setMenu(row,1,2,menua2);

        setmenua3(menu.find(x => x.mode == 1 && x.menu == 3)? menu.find(x => x.mode == 1 && x.menu == 3).approved : false);
        setMenu(row,1,3,menua3);

        setmenua4(menu.find(x => x.mode == 1 && x.menu == 4)? menu.find(x => x.mode == 1 && x.menu == 4).approved : false);
        setMenu(row,1,4,menua3);

        setmenub1(menu.find(x => x.mode == 2 && x.menu == 1)? menu.find(x => x.mode == 2 && x.menu == 1).approved : false);
        setMenu(row,2,1,menub1);

        setmenub2(menu.find(x => x.mode == 2 && x.menu == 2)? menu.find(x => x.mode == 2 && x.menu == 2).approved : false);
        setMenu(row,2,2,menub2);

        setmenub3(menu.find(x => x.mode == 2 && x.menu == 3)? menu.find(x => x.mode == 2 && x.menu == 3).approved : false);
        setMenu(row,2,3,menub3);

        setmenub4(menu.find(x => x.mode == 2 && x.menu == 4)? menu.find(x => x.mode == 2 && x.menu == 4).approved : false);
        setMenu(row,2,4,menub3);

        setmenuc1(menu.find(x => x.mode == 3 && x.menu == 1)? menu.find(x => x.mode == 3 && x.menu == 1).approved : false);
        setMenu(row,3,1,menuc1);

        setmenuc2(menu.find(x => x.mode == 3 && x.menu == 2)? menu.find(x => x.mode == 3 && x.menu == 2).approved : false);
        setMenu(row,3,2,menuc2);

        setmenuc3(menu.find(x => x.mode == 3 && x.menu == 3)? menu.find(x => x.mode == 3 && x.menu == 3).approved : false);
        setMenu(row,3,3,menuc3);

        setmenuc4(menu.find(x => x.mode == 3 && x.menu == 4)? menu.find(x => x.mode == 3 && x.menu == 4).approved : false);
        setMenu(row,3,4,menuc3);

        isopen.onOpen();
    }
    const savMenu = async () => {
        // console.log(user_menu);
        
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://d713apsi01-wa01kbtcom.azurewebsites.net/PermissionReserve/InsertPermissionReserve',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': 'Bearer '+tokens
                },
                data:user_menu
            };
            axios.request(config)
            .then((response) => {
                Swal.fire({
                    icon: "success",
                    title: "",
                    text: ""
                })
                // window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <>
        <Modal blockScrollOnMount={false} size={"xl"} isOpen={isopen.isOpen} onClose={isopen.onClose}>
            {overlay}
            <ModalContent>
                <ModalHeader>สิทธิ์เมนู</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <b>งานรถเช่าเหมาวัน (พร้อมคนขับรถ)</b>
                    <br />
                    <Checkbox colorScheme='green' marginRight={"30px"} isChecked={menua1}  onChange={(val) => { setMenu(userEdit,1,1,val.target.checked);setmenua1(val.target.checked); }}>
                        จัดรถเช่าเหมาวัน (พร้อมคนขับรถ)
                    </Checkbox>
                    <br />
                    <Checkbox colorScheme='green' marginRight={"30px"} isChecked={menua2}  onChange={(val) => { setMenu(userEdit,1,2,val.target.checked);setmenua2(val.target.checked); } }>
                        เพิ่มข้อมูลรถและคนขับรถ
                    </Checkbox>
                    <br />
                    <Checkbox colorScheme='green' marginRight={"30px"} isChecked={menua3}  onChange={(val) => { setMenu(userEdit,1,3,val.target.checked);setmenua3(val.target.checked); } }>
                        รายงานการขอใช้รถเช่าเหมาวัน (พร้อมคนขับ)
                    </Checkbox>
                    <br />
                    <Checkbox colorScheme='green' marginRight={"30px"} isChecked={menua4}  onChange={(val) => { setMenu(userEdit,1,4,val.target.checked);setmenua4(val.target.checked); } }>
                        สรุปผลการประเมินความพึงพอใจรถเช่าเหมาวัน
                    </Checkbox>
                    <hr />
                    <b>งานรถเช่าเหมาวัน (ไม่มีคนขับรถ)</b>
                    <br />
                    <Checkbox colorScheme='green' marginRight={"30px"} isChecked={menub1}  onChange={(val) => { setMenu(userEdit,2,1,val.target.checked);setmenub1(val.target.checked); } }>
                        จัดรถเช่าเหมาวัน (ไม่มีคนขับรถ)
                    </Checkbox>
                    <br />
                    <Checkbox colorScheme='green' marginRight={"30px"} isChecked={menub2}  onChange={(val) => { setMenu(userEdit,2,2,val.target.checked);setmenub2(val.target.checked); } }>
                        เพิ่มข้อมูลรถ
                    </Checkbox>
                    <br />
                    <Checkbox colorScheme='green' marginRight={"30px"} isChecked={menub3}  onChange={(val) => { setMenu(userEdit,2,3,val.target.checked);setmenub3(val.target.checked); } }>
                        รายงานการขอใช้รถเช่าเหมาวัน (ไม่มีคนขับรถ)
                    </Checkbox>
                    <br />
                    <Checkbox colorScheme='green' marginRight={"30px"} isChecked={menub4}  onChange={(val) => { setMenu(userEdit,2,4,val.target.checked);setmenub4(val.target.checked); } }>
                        สรุปผลการประเมินความพึงพอใจรถเช่าเหมาวัน
                    </Checkbox>
                    <hr />
                    <b>งานรถรับส่งระหว่างวัน</b>
                    <br />
                    <Checkbox colorScheme='green' marginRight={"30px"} isChecked={menuc1}  onChange={(val) => { setMenu(userEdit,3,1,val.target.checked);setmenuc1(val.target.checked); } }>
                            งานรถรับส่งระหว่างวัน
                    </Checkbox>
                    <br />
                    <Checkbox colorScheme='green' marginRight={"30px"} isChecked={menuc2}  onChange={(val) => { setMenu(userEdit,3,2,val.target.checked);setmenuc2(val.target.checked); } }>
                        เพิ่มข้อมูลรถและคนขับรถ
                    </Checkbox>
                    <br />
                    <Checkbox colorScheme='green' marginRight={"30px"} isChecked={menuc3}  onChange={(val) => { setMenu(userEdit,3,3,val.target.checked);setmenuc3(val.target.checked); } }>
                        รายงานการขอใช้รถรับส่งระหว่างวัน
                    </Checkbox>  
                    <br />
                    <Checkbox colorScheme='green' marginRight={"30px"} isChecked={menuc4}  onChange={(val) => { setMenu(userEdit,3,4,val.target.checked);setmenuc4(val.target.checked); } }>
                        สรุปผลการประเมินความพึงพอใจ รถรับส่งระหว่างวัน
                    </Checkbox>            
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' backgroundColor={"#00A5A8"} mr={3}
                        onClick={() => {
                            isopen.onClose();
                            savMenu();
                        }}>
                        บันทึก
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        <TableContainer borderRadius={"10px"} border={'1px #00A5A8 solid'} >
            <Table size='md' className='table-font' >
                <Thead bgColor={'#00A5A8'} height={"40px"}  >
                    <Tr>
                        <Th color={"white"}>รหัสพนักงาน</Th>
                        <Th color={"white"}>ชื่อ-นามสกุล</Th>
                        <Th color={"white"}>สิทธิการเข้าเมนู</Th>
                    </Tr>
                </Thead>
                <Tbody >
                   
                    {Array.isArray(user) && user.map((row, index) => {
                    return (
                        <Tr>
                        <Td>{row.employeeNo}</Td>
                        <Td>{row.name}</Td>
                        
                        <Td >
                        <a onClick={async(e)=>{
                            setuserEdit(row)
                            await checkApprove(row);
                            }} href="#"><AiOutlineEdit /></a>
                        </Td>
                    </Tr>
                    );
                })} {user.length == 0 && 
                    <Tr>
                        <Td colSpan={11} style={{textAlign:'center'}}>ไม่พบข้อมูล</Td>
                        
                    </Tr>
                }
                </Tbody>

            </Table>
        </TableContainer>
        </>
        
        
    );
}


export default settingaccount;
