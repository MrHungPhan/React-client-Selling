import axios from 'axios';
import { Cookies } from 'react-cookie'

import * as config from '../const/config';

export default function callApi(endpoint, method ='GET', body){
    const cookie = new Cookies();
    const token = cookie.get('token');
    if(token){
      return axios({ // tra ve promise
        method : method,
        url : `${config.API_URL_SERVER}/${endpoint}`,
        headers : {
            'authorization' : token
        },
        data : body
    }).catch( err => {
        console.log(err)
        return Promise.reject(err);
    })
    }else{
        return axios({ // tra ve promise
            method : method,
            url : `${config.API_URL_SERVER}/${endpoint}`,
            data : body
        }).catch( err => {
            console.log(err)
            return Promise.reject(err);
        })
    }
}