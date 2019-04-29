import axios from 'axios';

import * as config from '../const/config';

export default function callApi(endpoint, method ='GET', body){
      return axios({ // tra ve promise
        method : method,
        url : `${config.API_TRANSPORT}/${endpoint}`,
        data : body
    }).catch( err => {
        console.log(err)
    })
}