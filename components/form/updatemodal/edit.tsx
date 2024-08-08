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
  position

} from '@chakra-ui/react'
import Head from 'next/head';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form';
import DatePickerInput from '../../../components/input/Datepicker';
import { AiOutlineSearch, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons"
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { localStorageLoad } from '../../../utils/localStrorage';
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import Swal from 'sweetalert2';
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

import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import styled, { css, createGlobalStyle } from 'styled-components';
import { TimePicker } from 'antd';

const DatePickerWrapperStyles = createGlobalStyle`
    .date_picker.full-width input {
        border: 1px #00AAAD solid;
        padding-top: 7px;
        padding-bottom: 7px;
        padding-left: 17px;
        padding-right: 17px;
        border-radius: 5px;
        width: 100%;
        margin-right:0px;
    }
    .react-datepicker-wrapper{
        width: 100%;
    }
    .date_picker.full-width input:focus {
        z-index: 1;
        box-shadow: 0 0 0 1px #3182ce !important;
    }
    .ant-picker.ant-picker-outlined{
        border: 1px #00AAAD solid;
        padding-top: 7px;
        padding-bottom: 7px;
        padding-left: 17px;
        padding-right: 17px;
        border-radius: 5px;
    }
    tbody tr:hover{
        background-color:#E2EFEF;
        color:#000000;
    }
    .text-centers{
        text-align: center;
    }
    .swal2-confirm{
        background-color:#00A8A9;
    }
    .swal2-cancel{
        background-color:#CCC5C5;
    }
`;

const modalEdit = () => {
    
}

export default modalEdit;