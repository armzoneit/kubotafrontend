
import React, { useState } from 'react'
import IndexPage from '../../../../components/admin/rentcarall/report/indexPage';
import { getMe } from "../../../../data-hooks/me/getMe";
import { useRouter } from "next/router"
const CarsAndDriver = () => {
    // const me = getMe()
    // const router = useRouter()

    // if(me.data){
    //     if(me.data.data.permissionReserve){
    //         let pass =  me.data.data.permissionReserve.find(x => x.mode == 1 && x.menu == 4)?.approved;
    //         if(!pass){
    //             router.push("/admin/users");
    //         }
    //     }else{
    //         router.push("/admin/users");
    //     }
    // }
    return (
        <>
            <IndexPage mode={1}/>
        </>
    )
}

export default CarsAndDriver