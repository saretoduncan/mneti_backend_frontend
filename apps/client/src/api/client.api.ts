import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials:true
});

export const apiWithInterceptor = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

apiWithInterceptor.interceptors.response.use(
    (response)=>response, async(error:AxiosError)=>{
        const originalRequest = error.config as AxiosRequestConfig & {
            _retry?:boolean
        }
        const isTokenError= error.response?.status===401;
        if(isTokenError && originalRequest._retry){
            return Promise.reject(error)
        }
        if(isTokenError && !originalRequest._retry ){
            originalRequest._retry=true;
            if(!isRefreshing){
                return new Promise((resolve, reject)=>{
                    failedQueue.push({
                        resolve:(token:string)=>{
                            originalRequest.headers = {
                                ...originalRequest.headers,
                                Authorization:`Bearer ${token}`
        
                            };
                            resolve(apiWithInterceptor(originalRequest))
                        },
                        reject
                    })
                })

            }
            isRefreshing=true;
            try{
                const refreshResponse : AxiosResponse<{accessToken:string}>=await api.post("/auth/refreshToken")
                const newToken = refreshResponse.data.accessToken
                apiWithInterceptor.defaults.headers.common[
                    "Authorization"
                
                ]=`Bearer ${newToken}`
                processQueue(null, newToken);
                originalRequest.headers = {
                    ...originalRequest.headers, Authorization:`Bearer ${newToken}`
                }
                return apiWithInterceptor(originalRequest)
                

                
            }catch(refreshTkError){
                processQueue(refreshTkError)
                return Promise.reject(refreshTkError);
            }finally{
                isRefreshing=false
            }
        }
    }
)
