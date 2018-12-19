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



export const updateTele=params=>{ return axios.post(`${base}/updateTele`,qs.stringify(params));};

//添加座位
//export const requestaddSeat=params=>{ return axios.post(`${base}/addSeat`,qs.stringify(params));};
//查询座位
export const requestgetSeats=()=>{ return axios.get(`${base}/getSeats`);};

//修改座位
export const requesteditSeatPrize=params=>{ return axios.post(`${base}/editSeatPrize`,qs.stringify(params));};
//删除座位
//export const requestdeleSeat=params=>{ return axios.post(`${base}/deleSeat`,qs.stringify(params));};

//查询车站
export const requestgetSpots=params=>{ return axios.get(`${base}/getSpots`,{ params: params });};
//添加车站
export const requestaddSpot=params=>{ return axios.post(`${base}/addSpot`,qs.stringify(params));};
//删除车站
export const requestdeleSpot=params=>{ return axios.post(`${base}/deleSpot`,qs.stringify(params));};
//修改车站名
export const requesteditSpotName=params=>{ return axios.post(`${base}/editSpotName`,qs.stringify(params));};

//添加车次
export const requestaddTrain=params=>{ return axios.post(`${base}/addTrain`,qs.stringify(params));};

//查询车次的id,和空调id
export const requestgetPartTrain=(params)=>{ return axios.get(`${base}/getPartTrain`,{ params: params });};

//查询空调id,车次list,站点list
export const requestgetTrainInfo=(params)=>{ return axios.get(`${base}/getTrainInfo`,{ params: params });};

//修改车次,空调,车站,座位
export const requestupdateTrain=params=>{ return axios.post(`${base}/updateTrain`,qs.stringify(params));};
//获取所有的城市,便于用户购票
export const requestFindTrain=(params)=>{ return axios.get(`${base}/FindTrain`,{ params: params });};
//查询车次
export const requestgetAllCity=()=>{ return axios.get(`${base}/getAllCity`);};

//获取座位的信息
export const requestFindSeat=(params)=>{ return axios.get(`${base}/FindSeat`,{ params: params });};

//获取座位的信息
export const requestTakeOrder=(params)=>{ return axios.post(`${base}/TakeOrder`,qs.stringify(params));};

//付款
export const requestPayOrder=(params)=>{ return axios.get(`${base}/PayOrder`,{ params: params });};
//退款
export const requestCancelOrder=(params)=>{ return axios.get(`${base}/CancelOrder`,{ params: params });};
//获取订单
export const requestGetOrder=(params)=>{ return axios.get(`${base}/GetOrder`,{ params: params });};
//获取订单号的乘客信息
export const requestGetPassengers=(params)=>{ return axios.get(`${base}/GetPassengers`,{ params: params });};
//获取订单号的乘客信息
export const requestSGetOrder=(params)=>{ return axios.get(`${base}/SGetOrder`,{ params: params });};

//改签
export const requestChangeOrder=(params)=>{ return axios.get(`${base}/ChangeOrder`,{ params: params });};
//乘客类型
export const requestGetPacType=(params)=>{
    switch(params){
        case 0:return "成人票";
        case 1:return "学生票";
        case 2:return "儿童票";
        case 3:return "军人票";
    }
    };
//乘客类型
export const requestGetPacMon=(params)=>{
    switch(params){
        case 0:return 1;
        case 1:return 0.75;
        case 2:return 0.5;
        case 3:return 0.5;
    }
    };
//判断乘客是否登陆
export const isLogin=()=>{ 
    var user = sessionStorage.getItem('user');
    if(user){
        user = JSON.parse(user);
        let Uname=user.name;
        return Uname;
    }else{
        return '';
    }  
};