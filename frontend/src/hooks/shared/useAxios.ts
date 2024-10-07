import { AxiosError, isAxiosError } from "axios";

type Props={
    apiFunc:()=>Promise<any>,
    onSuccess:(data:any)=>void,
    onError:(error:AxiosError)=>void
}

const useAxios = ({apiFunc,onSuccess,onError}:Props) =>{
    const axiosFunc = async ()=>{
        try{
            const response = await apiFunc();
            onSuccess(response.data);
        }catch(error){
            if(isAxiosError(error)){
            onError(error);
        }
    }
    }
    return {axiosFunc};
}

export default useAxios