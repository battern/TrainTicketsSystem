import axios from 'axios';
import Vue from 'vue'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
import qs from 'qs'
Vue.prototype.$axios = axios;
let base = 'http://localhost:8082';
// 
// export const getUserdata=(url)=>{ return axios.get(`${base}/${url}`);};
// export const getUserInfoByPage=params=>{ return axios.get(`${base}/users/getUserInfoByPage`, { params: params });};


//TODO:校验用户登录信息
export const requestLogin=params=>{ return axios.post(`${base}/loginin`,qs.stringify(params));};
//TODO:校验用户注册信息
export const requestSign=params=>{ return axios.post(`${base}/signin`,qs.stringify(params));};
//TODO:根据用户要求获取满足条件的车次
//TODO:根据订单消息,实现购票:车次 发车时间 出发站 目的站

//TODO:获取订单数据 传入参数 用户id type(0:全部订单,1:未完成订单,2:未出行订单,3:已失效订单) 页数 每页条数

//添加座位
export const requestaddSeat=params=>{ return axios.post(`${base}/addSeat`,qs.stringify(params));};
//查询座位
export const requestgetSeats=()=>{ return axios.get(`${base}/getSeats`);};

//修改座位
export const requesteditSeatPrize=params=>{ return axios.post(`${base}/editSeatPrize`,qs.stringify(params));};
//删除座位
export const requestdeleSeat=params=>{ return axios.post(`${base}/deleSeat`,qs.stringify(params));};

//查询车站
export const requestgetSpots=()=>{ return axios.get(`${base}/getSpots`);};
//添加车站
export const requestaddSpot=params=>{ return axios.post(`${base}/addSpot`,qs.stringify(params));};
//删除车站
export const requestdeleSpot=params=>{ return axios.post(`${base}/deleSpot`,qs.stringify(params));};
//修改车站名
export const requesteditSpotName=params=>{ return axios.post(`${base}/editSpotName`,qs.stringify(params));};