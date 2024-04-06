import {useRouter} from 'next/navigation';
import {useEffect} from "react";
import Layout from "@/contents/layout/Layout";
import React from 'react';
import QrCard from "@/contents/components/qr_card/qrCard";
import {ProductsServices} from "@/services/products/products";
import {Card} from "@mantine/core";
import ProductsCard from "@/contents/components/products/ProductsCard";

export default function ProducerHomepage() {
    const router = useRouter();
    const [products, setProducts] = React.useState<any>([]);

    // useEffect(() => {
    //     console.log('here')
    //     const accessToken: any = localStorage.getItem('profile');
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
                <div className='flex flex-row p-2'>
                    <div className={'grow-0 h-96 pr-10 -ml-5'}>
                        <QrCard />
                    </div>
                    <div>
                        <ProductsCard   />
                    </div>

                </div>
            </div>
        </React.Fragment>

    );
}
