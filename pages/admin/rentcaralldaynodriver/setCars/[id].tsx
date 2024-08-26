import React, { useEffect, useState } from 'react'
import Detailpage from '../../../../components/admin/rentcarall/setCars/detailpage';
import { getMe } from "../../../../data-hooks/me/getMe";
import { useRouter } from "next/router"
const SetRentCarAllDayDriver = () => {
    const me = getMe()
    const router = useRouter()

    if(me.data){
        if(me.data.data.permissionReser){
            let pass =  me.data.data.permissionReser.find(x => x.mode == 2 && x.menu == 1)?.approved;
            if(!pass){
                router.push("/admin/users");
            }
        }else{
            router.push("/admin/users");
        }
    }
    return (
        <>
            <Detailpage mode={2} />
        </>

    )
}

export default SetRentCarAllDayDriver
