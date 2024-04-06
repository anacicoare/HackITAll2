import axiosInstance from "../axiosInstance";

export const ProductsServices = {
    //Get project members
    addProduct: (data: any) => {
        return axiosInstance.post("/products/", data);
    },

    getProducts: () => {
        return axiosInstance.get("/products/")
    },
    deleteProduct: (name: any) => {
        return axiosInstance.delete(`/products/${name}/`);
    }
};
