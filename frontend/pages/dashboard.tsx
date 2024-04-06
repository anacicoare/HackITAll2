import {useRouter} from 'next/navigation';
import {useEffect} from "react";
import Layout from "@/contents/layout/Layout";
import React from 'react';

export default function DashboardPage() {
    const router = useRouter();

    useEffect(() => {
        console.log('here')
        const profile: any = localStorage.getItem('profile');
        if (!profile) {
            console.log('no access token')
            router?.push('/login');
        } else {
            console.log('have access token')
        }
    }, []);

    return (
        <React.Fragment>
            <Layout>
            <div className='absolute left-[20%] top-[80px]'>
                dashboard
            </div>
            </Layout>
        </React.Fragment>
    );
}