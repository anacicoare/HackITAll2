import useWindowDimensions from "@/contents/components/sidebar/useWindowDimension";
import {NavLink, Tabs} from "@mantine/core";
import {useEffect, useState} from "react";
import {IconCategory, IconLogout2, IconFolderOpen, IconPointFilled, IconSettings} from "@tabler/icons-react";
import colors from "tailwindcss/colors";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useContext} from "react";
import {ProductsServices} from "@/services/products/products";

export default function NewSidebar() {
    const [active, setActive] = useState(0);
    const router = useRouter();
    const [products, setProducts] = useState([]);
    
    return (
        <div className='bg-white flex-col h-screen w-[15%] p-2 shadow-xl'>
            <div className='flex flex-row justify-center'>

            </div>
            <div className='flex flex-row'>
                <NavLink
                    onClick={() => setActive(0)}
                    active={active === 0}
                    label="Dashboard"
                    icon={<IconCategory/>}
                    className={'mt-20'}
                    color='indigo.8'
                    styles={(theme) => {
                        return {
                            label: {
                                color: colors.black,
                                fontSize: '1rem',
                                fontWeight: active === 0 && '600'
                            }
                        }
                    }}
                />
                {active == 0 && <div className='mt-20 bg-blue-900 w-0.5'></div>}
            </div>

            <div className='flex flex-row mt-[100px]'>
                <NavLink
                    onClick={() => setActive(3)}
                    active={active === 3}
                    label='Settings'
                    icon={<IconSettings/>}
                    color='indigo.8'
                    styles={(theme) => {
                        return {
                            label: {
                                color: colors.black,
                                fontSize: '1rem',
                                fontWeight: active === 3 && '600'
                            }
                        }
                    }}
                />
                {active == 3 && <div className=' bg-blue-900 w-0.5'></div>}
            </div>

            <NavLink
                label='Log out'
                icon={<IconLogout2/>}
                onClick={() => {
                    localStorage.removeItem('profile');
                    router.push('/login');
                }}
            />
        </div>


    )
}