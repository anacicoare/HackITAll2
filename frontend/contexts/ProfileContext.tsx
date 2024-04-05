import { AuthServices } from '@/services/authentication/authservices';
import { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import Cookies from "js-cookie";
import { useRouter } from 'next/router';
import { notifications } from '@mantine/notifications';

type ProfileContextProps = {
    authorized: boolean;
    profile: any;
    violationData: any;
    login: (data: any) => void;
    register: (data: any) => void;
    logout: () => void;
};

export const ProfileContext = createContext<ProfileContextProps>({
    authorized: false,
    profile: {},
    violationData: null,
    login: () => { },
    register: () => { },
    logout: () => { },
});

export const ProfileProvider = ({ children }: any) => {
    const [authorized, setAuthorized] = useState(false);
    const [profile, setProfile] = useState({});
    const [violationData, setViolationData] = useState<any>(null);
    const router = useRouter()

    useEffect(() => {
        getUserProfile();
    }, [])

    /**
     * When load page, check cookies to see if user is logged in
     */
    const getUserProfile = () => {
        const accessToken: any = localStorage.getItem('accessToken');
        //Case not authenticated
        if (!accessToken) {
            setAuthorized(false)
        } else {
            //Case have accessToken
            const decodedData: any = jwtDecode(accessToken);
            setProfile({
                email: decodedData?.email,
                role: decodedData?.role,
                firstName: decodedData?.firstName,
                lastName: decodedData?.lastName,
                phoneNumber: decodedData?.phoneNumber,
                avatarUrl: decodedData?.avatarUrl
            })

            //Case logged in
            setAuthorized(true);
        }
    }

    const login = (data: any) => {
        // Call api login
        console.log("call api login...");
        AuthServices.callApiLogin(data).then((response: any) => {
            if (response && response?.data) {
                const dataResponse = response?.data;
                //If the authentication succeeds, update the state with the user's profile
                localStorage.setItem('accessToken', dataResponse);

                const decodedData: any = jwtDecode(dataResponse);
                setProfile({
                    email: decodedData?.email,
                    role: decodedData?.role,
                    firstName: decodedData?.firstName,
                    lastName: decodedData?.lastName,
                    phoneNumber: decodedData?.phoneNumber,
                    avatarUrl: decodedData?.avatarUrl
                })
                setAuthorized(true);
                router.push(`/dashboard`)

                console.log("login success");
            } else {
                console.log("login failed");
                setAuthorized(false);
            }
        }).catch((error: any) => {
            if (error?.response?.status === 400) {
                console.log("login failed because");
                console.log(error?.response?.data);
                notifications.show({
                    title: 'Error',
                    message: error?.response?.data,
                    color: 'red',
                    withBorder: true,
                    styles: (theme) => ({
                        root: {
                            backgroundColor: theme.colors.red[6],
                            borderColor: theme.colors.red[6],

                            '&::before': { backgroundColor: theme.white },
                        },

                        title: { color: theme.white },
                        description: { color: theme.white },
                        closeButton: {
                            color: theme.white,
                            '&:hover': { backgroundColor: theme.colors.blue[7] },
                        },
                    }),
                })
            } else {
                console.error(error);
            }
        })

    };

    const register = (data: any) => {
        // Call api login
        console.log("call api register...");
        AuthServices.callApiRegister(data).then((response: any) => {
            if (response && response?.data) {
                const dataResponse = response?.data;

                //If the authentication succeeds, update the state with the user's profile
                setProfile({
                    email: dataResponse?.email,
                    role: "Student",
                    firstName: dataResponse?.firstName,
                    lastName: dataResponse?.lastName,
                    phoneNumber: dataResponse?.phoneNumber,
                    avatarUrl: ""
                })
                setAuthorized(true);

                console.log('access token is:');
                console.log(response?.headers['x-auth-token']);
                localStorage.setItem('accessToken', response?.headers['x-auth-token']);

                console.log("register success");
                router?.push('/login');
            } else {
                console.log("register failed");
                setAuthorized(false);
            }
        }).catch((error: any) => {
            if (error?.response?.status === 400) {
                console.log("register failed because");
                console.log(error?.response?.data);
                notifications.show({
                    title: 'Error',
                    message: error?.response?.data,
                    color: 'red',
                    withBorder: true,
                    styles: (theme) => ({
                        root: {
                            backgroundColor: theme.colors.red[6],
                            borderColor: theme.colors.red[6],

                            '&::before': { backgroundColor: theme.white },
                        },

                        title: { color: theme.white },
                        description: { color: theme.white },
                        closeButton: {
                            color: theme.white,
                            '&:hover': { backgroundColor: theme.colors.blue[7] },
                        },
                    }),
                })
            } else {
                console.error(error);
            }
        })

    };

    const logout = () => {
        //Set authorization false
        setAuthorized(false);
        setProfile({});
        //Remove accessToken and refreshToken from localStorage/Cookies
        localStorage.removeItem('accessToken');
        Cookies.remove('refreshToken');
        //Redirect to login page
        router.push(`/start/dashboard`)
    };
    
    return (
        <ProfileContext.Provider value={{ authorized, profile, login, register, logout, violationData}}>
            {children}
        </ProfileContext.Provider>
    );
};