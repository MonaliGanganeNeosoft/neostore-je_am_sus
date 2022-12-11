import axios from 'axios'
 import { MAIN_URL } from './Url'
 export function getPosts(){
     return axios.get(`${MAIN_URL}fetchpost`);
 }
 export function getOrders(){
    return axios.get(`${MAIN_URL}fetchorders`);
}

 export function addOrders(){
    return axios.post(`${MAIN_URL}addorder`);
}
export function addUser(data){
    return axios.post(`${MAIN_URL}adduser`,data);
}
export function verify(){
    return axios.get(`${MAIN_URL}verify`);
}
// export function deletePosts(){
//     return axios.post(`${MAIN_URL}posts/deletepost/:id`);
// }