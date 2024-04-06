import {useRouter} from 'next/navigation';
import {useEffect} from "react";
import Layout from "@/contents/layout/Layout";
import React from 'react';
import QrCard from "@/contents/components/qr_card/qrCard";

export default function ProducerHomepage() {
    const router = useRouter();

    // useEffect(() => {
    //     console.log('here')
    //     const accessToken: any = localStorage.getItem('accessToken');
    //     if (!accessToken) {
    //         console.log('no access token')
    //         router?.push('/login');
    //     } else {
    //         console.log('have access token')
    //     }
    // }, []);

    return (
        <React.Fragment>
        <Layout>
        </Layout>
<div className='absolute left-[20%] top-[80px]'>
    <h1>Producer Homepage</h1>
    {/*<div className='grid gap-2 grid-cols-2 mr-20'>*/}
    <QrCard></QrCard>
    {/*</div>*/}
</div>
        </React.Fragment>

    );
  // return (
  //   <div>
  //     <h1>Producer Homepage</h1>
  //   </div>
  // );
}
