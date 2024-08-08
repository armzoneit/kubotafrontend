import {
    TableContainer,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const InfoCars = ({ datatables, onEdit }) => {

    const handleEdit = (data: any) => {
       return () => {
            onEdit(data);
        }
    }

    return (
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
                        <Th color={"white"}>แก้ไข</Th>
                    </Tr>
                </Thead>
                <Tbody >
                    {Array.isArray(datatables) && datatables.map((data, index) => {
                        return (
                            <Tr>
                                <Td>
                                    PDR
                                </Td>
                                <Td>
                                    รถเก๋ง
                                </Td>
                                <Td>
                                    กข-1234
                                </Td>
                                <Td>
                                    12/12/2024
                                </Td>
                                <Td>
                                    3
                                </Td>
                                <Td>
                                    นาย สมชาย
                                </Td>
                                <Td>
                                    089-123-4567
                                </Td>
                                <Td >
                                    <a href='javascript:void(0)' onClick={handleEdit(data)}>
                                        <AiOutlineEdit />
                                    </a>
                                </Td>
                            </Tr>
                        )
                    })}{datatables.length == 0 &&
                        <Tr>
                            <Td colSpan={8} style={{ textAlign: 'center' }}>ไม่พบข้อมูล</Td>

                        </Tr>
                    }
                </Tbody>

            </Table>
        </TableContainer>

    );
}


export default InfoCars;
