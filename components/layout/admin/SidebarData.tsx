import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import {
  UserIcon,
  EmployeeIcon,
  TransportationProviderIcon,
  AreaIcon,
  BusLineIcon,
  TimeTableIcon,
  CarBookingIcon,
  PlanningIcon,
  ScheduleIcon,
  ReportIcon,
} from "../../Icon"
export const SidebarData = [
  {
    title: 'งานรถรับส่งพนักงาน',
    path: '/admin/rentcaralldaydriver/setCars',
    icon: <FaIcons.FaUser  />,
    iconClosed: <IoIcons.IoIosArrowDown  />,
    iconOpened: <IoIcons.IoIosArrowUp />,

    subNav: [
      {
        title: 'บัญชีผู้ใช้',
        path: '/admin/users',
        icon: UserIcon,
      },
      {
        title: 'พนักงาน',
        path: '/admin/employees',
        icon: EmployeeIcon,
      },
      {
        title: 'ผู้ให้บริการ',
        path: '/admin/transportationProviders',
        icon: TransportationProviderIcon,
      },
      {
        title: 'จุดจอดรถ',
        path: '/admin/areas',
        icon: AreaIcon,
      },
      {
        title: 'สายรถ',
        path: '/admin/busLines',
        icon: BusLineIcon,
      },
      {
        title: 'รอบการจัดรถ',
        path: '/admin/timeTables',
        icon: TimeTableIcon,
      },
      {
        title: 'การจัดรถ',
        path: '/admin/plannings',
        icon: PlanningIcon,
      },
      {
        title: 'การจองรถ',
        path: '/admin/bookings',
        icon: CarBookingIcon,
      },
      {
        title: 'จัดการปฏิทิน',
        path: '/admin/schedules',
        icon: ScheduleIcon,
      },
      {
        title: 'รายงาน',
        path: '/admin/reports',
        icon: ReportIcon,
      }
    ]
  },
  {
    title: 'งานรถเช่าเหมาวัน (พร้อมคนขับรถ)',
    path: '/admin/rentcaralldaydriver/setCars',
    icon: <FaIcons.FaCarAlt  />,
    iconClosed: <IoIcons.IoIosArrowDown  />,
    iconOpened: <IoIcons.IoIosArrowUp />,

    subNav: [
      {
        title: 'จัดรถเช่าเหมาวัน (พร้อมคนขับรถ)',
        path: '/admin/rentcaralldaydriver/setCars',
      },
      {
        title: 'เพิ่มข้อมูลรถและคนขับรถ',
        path: '/admin/CarManage/Driver',
      },
      // {
      //   title: 'รายงานข้อมูลรถและคนขับรถ',
      //   path: '/admin/rentcaralldaydriver/carAndDriver',
      // },
      {
        title: 'รายงานการขอใช้รถเช่าเหมาวัน (พร้อมคนขับ)',
        path: '/admin/rentcaralldaydriver/reportall',
      },
      
      {
        title: 'สรุปผลการประเมินความพึงพอใจรถเช่าเหมาวัน',
        path: '/overview/revenue',
      }
    ]
  },
  {
    title: 'งานรถเช่าเหมาวัน (ไม่มีคนขับรถ)',
    path: '/overview',
    icon: <FaIcons.FaCarAlt  />,
    iconClosed: <IoIcons.IoIosArrowDown  />,
    iconOpened: <IoIcons.IoIosArrowUp />,

    subNav: [
      {
        title: 'จัดรถเช่าเหมาวัน (ไม่มีคนขับรถ)',
        path: '/admin/rentcaralldaynodriver/setCars',
      },
      {
        title: 'เพิ่มข้อมูลรถ',
        path: '/admin/CarManage/noDriver',
      },
      // {
      //   title: 'รายงานข้อมูลรถ',
      //   path: '/admin/rentcaralldaynodriver/carAndDriver',
      // },
      {
        title: 'รายงานการขอใช้รถเช่าเหมาวัน (ไม่มีคนขับรถ)',
        path: '/admin/rentcaralldaynodriver/reportall',
      },
      
      {
        title: 'สรุปผลการประเมินความพึงพอใจรถเช่าเหมาวัน',
        path: '/overview/revenue',
      }
    ]
  },
  {
    title: 'งานรถรับส่งระหว่างวัน',
    path: '/overview',
    icon: <FaIcons.FaCarAlt  />,
    iconClosed: <IoIcons.IoIosArrowDown  />,
    iconOpened: <IoIcons.IoIosArrowUp />,

    subNav: [
      {
        title: 'งานรถรับส่งระหว่างวัน',
        path: '/admin/rentcarduring/setCars',
      },
      {
        title: 'เพิ่มข้อมูลรถและคนขับรถ',
        path: '/admin/CarManage/rentcarduring',
      },
      // {
      //   title: 'รายงานข้อมูลรถและคนขับรถ',
      //   path: '/admin/rentcarduring/carAndDriver',
      // },
      {
        title: 'รายงานการขอใช้รถรับส่งระหว่างวัน',
        path: '/admin/rentcarduring/reportall',
      },
      
      {
        title: 'สรุปผลการประเมินความพึงพอใจ รถรับส่งระหว่างวัน',
        path: '/overview/revenue',
      }
    ]
  },
  
 
];
