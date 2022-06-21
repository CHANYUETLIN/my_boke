import { Message,Loading } from 'element-ui';

// 定义 loading 
let loading 
//请求的服务器的地址
const basePath = 'http://localhost:8888'

// loading开始 方法
function startLoading() {  
// element-ui loading 服务调用方式  
    loading = Loading.service({ 
        lock: true,
        text: '拼命加载中...',
        spinner: 'el-icon-loading',  // 自定义图标
        background: 'rgba(0, 0, 0, 0.7)'
    })
}

// loading结束 方法
function endLoading() {  
    loading.close()
}


// 定义一个变量，有请求变量加一，收到响应变量减一
let loadingCount = 0

/**
* 调用一次startLoadingAddCount() 方法 开启Loading 并 loadingCount + 1
* 调用一次endLoadingSubCount() 方法 loadingCount - 1 直到为0 关闭loading
*/
export function startLoadingAddCount() {
   if (loadingCount === 0) {
       startLoading()
   }
   loadingCount++
}

export function endLoadingSubCount() {
   loadingCount--
   if (loadingCount === 0) {
       endLoading()
   }
}



//创建 axios 实例
const axiosInstance = axios.create({
  baseURL: basePath,
  withCredentials: true,  //是否允许跨域
  timeout: 6000
});

   
//添加请求拦截器
axiosInstance.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么（可以在这里给头部添加token）
    console.log("axios请求拦截器的config：",config);
    if(sessionStorage.getItem("token")){
      config.headers.access_token = sessionStorage.getItem("token")
    }
    // 请求显示loading 效果
    startLoadingAddCount(); 

    return config;
  },
  error => {
    // 对请求错误做些什么
    console.log(error)
    endLoadingSubCount();
    return Promise.reject(error);
  }
);


//添加响应拦截器
axiosInstance.interceptors.response.use(
  response => {
   endLoadingSubCount();
    console.log("axios响应拦截器的数据：",response);
    /**
     * 对响应数据判断:
     *  如果成功返回数据，就通过return把数据返出去
     *  如果请求不成功，就在拦截器这里统一处理（组件的代码就不用关注错误的情况了）
     */
    if(response.status==200){
      return response.data;
    }else{
      handleErrorData(response.data);
    }
    return response;
  },
  error => { 
   endLoadingSubCount();
    // 对响应错误做点什么
    // console.log("axios响应拦截器的错误数据：",error);
    // Message.error(error.message);
    return Promise.reject(error);
  }
);
//对错误信息的处理函数
function handleErrorData(errMes){
  if(errMes.message){
    Message.error(errMes.message);
  }else{
    switch(errMes.code){
      case 401 :
        Message.error("未授权，请重新登录!");
        break;
      case 403 :
        Message.error("拒绝访问");
        break;
      case 404 :
        Message.error("很抱歉，资源未找到!");
        break;
      case 500 :
        Message.error("服务器错误!");
        break;
      case 504 :
        Message.error("网络超时!");
        break;
      default :
        Message.error("服务正在联调中，请稍后!");
        break;
    }
  }
}


export default axiosInstance