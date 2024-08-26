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
import Evaluation from '../../../../components/admin/rentcarall/setCars/evaluation';
import { getMe } from "../../../../data-hooks/me/getMe";
import { useRouter } from "next/router"

const evaluation =  () => {
    const me = getMe()
    const router = useRouter()

    if(me.data){
        if(me.data.data.permissionReser){
            let pass =  me.data.data.permissionReser.find(x => x.mode == 1 && x.menu == 4)?.approved;
            if(!pass){
                router.push("/admin/users");
            }
        }else{
            router.push("/admin/users");
        }
    }
    return (
        <>
            <Evaluation mode={1} />
        </>
    )
}

export default evaluation