/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "react-query"
import { EmployeeUsageInfoDataTypes } from "./types"
import { useAxios } from "../../providers/http-client"
import { localStorageLoad } from '../../utils/localStrorage';
export const getApproved = (empno:string) => {
    const axios = useAxios()
    const tokens = localStorageLoad("token")
    let token = "";
    let data = JSON.stringify({
        "UserName": "ShuttleBus_system",
        "Password": "ShuttleAPI2021*"
      });
      
    //   let config = {
    //     method: 'post',
    //     maxBodyLength: Infinity,
    //     url: 'https://p701apsi01-la02skc.azurewebsites.net/skcapi/token',
    //     headers: { 
    //       'Content-Type': 'application/json', 
    //       'Cookie': 'ARRAffinity=200703092ce0bcefc5a577de10c8a6d87d044b9ef897fff69a4487fb9b9cc02a; ARRAffinitySameSite=200703092ce0bcefc5a577de10c8a6d87d044b9ef897fff69a4487fb9b9cc02a'
    //     },
    //     data : data
    //   };
      
    //   axios.request(config)
    //   .then((response) => {
    //     console.log(JSON.stringify(response.data.accessToken));
    //     token = JSON.stringify(response.data.accessToken)
        
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // let config1 = {
    //     method: 'get',
    //     maxBodyLength: Infinity,
    //     url: 'https://p701apsi01-la01skc.azurewebsites.net/skcapi/approval/'+empno,
    //     headers: { 
    //     'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiU2h1dHRsZUJ1c19zeXN0ZW0iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTcyMTExNzYxNiwiaXNzIjoiaHR0cHM6Ly9wNzAxYXBzaTAxLWxhMDFza2MuYXp1cmV3ZWJzaXRlcy5uZXQiLCJhdWQiOiJodHRwczovL3A3MDFhcHNpMDEtbGEwMXNrYy5henVyZXdlYnNpdGVzLm5ldCJ9.CZOZjYdtRnvoRMDAQnFs19AxsUAdvMisEN6uWvARK2M", 
    //     'Cookie': 'ARRAffinity=200703092ce0bcefc5a577de10c8a6d87d044b9ef897fff69a4487fb9b9cc02a; ARRAffinitySameSite=200703092ce0bcefc5a577de10c8a6d87d044b9ef897fff69a4487fb9b9cc02a'
    //     }
    // };
  
    // axios.request(config1)
    // .then((response1) => {
    //     console.log(JSON.stringify(response1.data));
    // })
    // .catch((error1) => {
    //     console.log(error1);
    // });
    
    return "success";
}