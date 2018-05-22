import client from './http'

const url = "/api-catalogo/hoteles/"
export const HOTEL_LIST = "HOTEL_LIST"
export const hotelList = (list) => (
    {
        type: HOTEL_LIST,
        list
    }
)

export const HOTEL_LIST_FAILURE = 'HOTEL_LIST_FAILURE'
export const hotelListFailure = error => ({
    type: HOTEL_LIST_FAILURE,   
    error
})

export const getList = (q = '') => {
    let params = {
        params: {
            query: q
        }
    }
    return (dispatch) => {
        client.get(url, params).then(r => {
            dispatch(hotelList(r.data))
        }).catch(error => {
            //throw (error)
            //console.log('getList catch:' + JSON.stringify(error.response))
            if (error.response) {
                dispatch(hotelListFailure(error.response.data.detail))
            } else if (error.request) {
                console.log(error.request);
                dispatch(hotelListFailure(JSON.stringify('Error ' + error.request)))
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                dispatch(hotelListFailure('Error ' + error.message))
            }
            //console.log(error.config);

        })
    }
}


export const HOTEL_ADD = "HOTEL_ADD"
export const hotelAdd = () => (
    {
        type: HOTEL_ADD,
    }
)
export const save = (d, h) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            try {
                client.post(url, d).then(r => {
                    dispatch(hotelAdd())
                    resolve(h)
                })
            } catch (err) {
                reject(err)
            }
        })
    }
}


export const getById = (id) => {
    return (dispatch) => {
        return client.get(`${url}${id}`).then(r => {
            return r.data
        })
    }
}
/*
export const CATEGORIA_FETCH = "CATEGORIA_FETCH"
export const categoriaFetch = (data) => (
    {
        type: CATEGORIA_FETCH,
        dALMACEN
)
export const getByIdx = (id) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            try {
                client.get(`${url}${id}`).then(r => {
                    dispatch(categoriaFetch(r.data))
                    resolve(r)
                })
            } catch (err) {
                reject(err)
            }
        })
    }
}
*/
export const HOTEL_UPDATE = "HOTEL_UPDATE"
export const hotelUpdate = () => (
    {
        type: HOTEL_UPDATE,
    }
)
export const update = (d, h) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            try {
                client.put(`${url}${d.id}/`, d).then(r => {
                    dispatch(hotelUpdate())
                    resolve(h)
                })
            } catch (err) {
                reject(err)
            }
        })
    }
}

export const HOTEL_DELETE = "HOTEL_DELETE"
export const hotelDelete = (data) => (
    {
        type: HOTEL_DELETE,
        data
    }
)

export const del = (id) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            try {
                client.delete(`${url}${id}`).then(r => {
                    dispatch(hotelDelete(id))
                    resolve(r)
                })
            } catch (err) {
                reject(err)
            }
        })
    }
}
