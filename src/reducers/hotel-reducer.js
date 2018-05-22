import {
    HOTEL_LIST,
    HOTEL_LIST_FAILURE,
    HOTEL_ADD, HOTEL_UPDATE,
    HOTEL_DELETE
} from '../actions/habitacion'
//import { CATEGORIA_FETCH,  } from '../actions/categoria-action'

const initialState = {
    list: [],
    data: {},
    error: null
}

const hotelReducer = (state = initialState, action) => {
    switch (action.type) {
        case HOTEL_LIST:
            return {
                ...state,
                list: action.list,
                error: null
            }
        case HOTEL_LIST_FAILURE: return {
            ...state,
            list: [],
            error: action.error,
        }
        case HOTEL_ADD:
            return {
                ...state,
            }
        /*
    case CATEGORIA_FETCH:
        return {
            ...state,
            data: action.data
        }*/
        case HOTEL_UPDATE:
            return {
                ...state,
            }
        case HOTEL_DELETE:
            const id = action.data
            return {
                ...state,
                list: state.list.filter(item => item.id !== id)
            }
        default:
            return state;
    }
}
export default hotelReducer