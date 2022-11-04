import { ActionTypes } from "../constraints/action-type";

export const setNetwork = (products)=>{
    return {
        type:ActionTypes.SET_NETWORKS,
        payload:products
    }
}

export const setSubnet = (product) =>{
    return {
        type:ActionTypes.SET_SUBNETS,
        payload:product
    }
}