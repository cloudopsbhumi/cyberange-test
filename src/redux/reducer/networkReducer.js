import { ActionTypes } from "../constraints/action-type";

const initialState={
    products:[]
}

export const networkReducer = (state={initialState}, {type,payload})=>{
    switch(type){
        case ActionTypes.SET_NETWORKS:
            return {...state,products:payload}

            default:
                return state;
    }
   

}