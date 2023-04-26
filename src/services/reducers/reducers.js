import {GET_USER_DETAILS} from '../constaints'

const initialState={
    userData:{},
}

export default function userItems(state=initialState,action){
    switch(action.type){
        case GET_USER_DETAILS:
            console.log("reducer--->",action)
            return{
                ...state,
                userData:action.payload
            }
            // eslint-disable-next-line
            break;
            default:
                return state
    }
}
