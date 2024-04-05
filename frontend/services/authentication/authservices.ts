import axiosInstance from "../axiosInstance";

export const AuthServices = {
    //Get project members
    callApiLogin: (data: any) => {
        return axiosInstance.post("auth/login", data);
    },

    callApiRegister: (data: any) => {
        return axiosInstance.post("auth/register", data)
    },
};
