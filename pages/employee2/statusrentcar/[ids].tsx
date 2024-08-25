import Head from 'next/head';
import { useRouter } from "next/router"
import React, { useEffect, useState } from 'react'
import CarDetailpage from '../../../components/form/updatemodal/statusrentcardetail';
const StatusRentCarDetail = () => {
    const router = useRouter()
    const cartype = router.query?.cartype;
    const [textcc, settextcc] = useState<string>("");
    useEffect(() => {
        if (cartype == '1') { settextcc("จองรถเช่าเหมาวัน(พร้อมคนขับ)"); }
        if (cartype == '2') { settextcc("จองรถเช่าเหมาวัน(ไม่มีคนขับ)"); }
        if (cartype == '3') { settextcc("จองรถรับส่งระหว่างวัน"); }
    }, []);

    return (
        <>
            <Head>
                <title>แก้ไข {textcc}</title>
                <meta name="description" content="reservation" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* <CarDetailpage id="202" type="1" /> */}
            <CarDetailpage />
        </>
    )
}

export default StatusRentCarDetail