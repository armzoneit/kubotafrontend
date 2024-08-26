
import React, { useState } from 'react'
import IndexPage from '../../../../components/admin/rentcarall/report/indexPage';
import { getMe } from "../../../../data-hooks/me/getMe";
import { useRouter } from "next/router"
const CarsAndDriver = () => {
    const me = getMe()
    const router = useRouter()

    if(me.data){
        if(me.data.data.permissionReser){
            let pass =  me.data.data.permissionReser.find(x => x.mode == 2 && x.menu == 3)?.approved;
            if(!pass){
                router.push("/admin/users");
            }
        }else{
            router.push("/admin/users");
        }
    }
    return (
        <>
            <IndexPage mode={2}/>
        </>
    )
}

export default CarsAndDriver