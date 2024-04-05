import {useRouter} from 'next/navigation';
import {useEffect} from "react";
import Layout from "@/contents/layout/Layout";

export default function DashboardPage() {
    const router = useRouter();

    useEffect(() => {
        console.log('here')
        const accessToken: any = localStorage.getItem('accessToken');
        if (!accessToken) {
            console.log('no access token')
            router?.push('/login');
        } else {
            console.log('have access token')
        }
    }, []);

    return (
            <Layout>
            <div className='absolute left-[20%] top-[80px]'>
                dashboard
            </div>
            </Layout>
    );
}