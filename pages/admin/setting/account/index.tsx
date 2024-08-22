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
const settingaccount = () => {
    const me = getMe()
    const isopen = useDisclosure()
    const router = useRouter()
    const tokens = localStorageLoad("token")
   


    

    useEffect(() => {
      
    }, [me.isLoading]);

   
    return (
        <TableContainer borderRadius={"10px"} border={'1px #00A5A8 solid'} >
            <Table size='md' className='table-font' >
                <Thead bgColor={'#00A5A8'} height={"40px"}  >
                    <Tr>
                        <Th color={"white"}>ลำดับ</Th>
                       
                    </Tr>
                </Thead>
                <Tbody >
                   
                    
                </Tbody>

            </Table>
        </TableContainer>
    );
}


export default settingaccount;
