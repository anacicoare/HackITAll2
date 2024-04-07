import {
    TextInput,
    PasswordInput,
    Paper,
    Title,
    Text,
    Container,
    Button,
    Divider,
    Box, Select
} from '@mantine/core';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from '@mantine/form';
import React, {useContext, useEffect, useState} from 'react';
import { ProfileContext } from '@/contexts/ProfileContext';
import { useRouter } from 'next/router';
import bg from '../public/login-bg.jpg';
import {Simulate} from "react-dom/test-utils";
import select = Simulate.select;
import Maps from "@/contents/components/maps/Maps";
import axios from "axios";
import {loadModules} from "esri-loader";

/**
 * Login page
 * Use mantine form to validate
 */

const userTypes = [
    {value: 'normal', label: 'User'},
    {value: 'producer', label: 'Local producer'},
    {value: 'partner', label: 'Partner'},
]

export default function LoginPage() {
    const { register } = useContext(ProfileContext)
    const [selectedUserType, setSelectedUserType] = useState<string>('');
    const router = useRouter();

    const form = useForm({
        initialValues: { email: '', password: '', name: ''},

        // functions will be used to validate values at corresponding key
        validate: {
            email: (value) => {
                if (!value) {
                    return 'Email is required';
                }
                if (value !== '' && !value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
                    return 'Please enter a valid email address.';
                }
                return null;
            },
            password: (value) => {
                if (!value) {
                    return 'Password is required';
                }
                return null;
            },
            name: (value) => {
                if (!value) {
                    return 'Password is required';
                }
                return null;
            },
        },
    });

    const handleSubmit = (values: any) => {
        register({ email: values?.email, password: values?.password, user_type: selectedUserType, name: values?.name, latitude: values?.latitude, longitude: values?.longitude });
    }

    const [data, setData] = useState([]);
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);
    const [pointLat, setPointLat] = useState(0);
    const [pointLong, setPointLong] = useState(0);


    const [cityCoordinates, setCityCoordinates] = useState(null);

    const getCityCoordinates  = (city: any, country: any) => {
        axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${city},${country}&limit=1`).then((res: any) => {
            const res_data = res?.data;
            setData(res_data);

            console.log(res_data[0]?.lat);
            console.log(res_data[0]?.lon);

            setLat(parseFloat(res_data[0]?.lat));
            setLon(parseFloat(res_data[0]?.lon));
        })
    }

    // useEffect(() => {
    //     getCityCoordinates('Constanta', 'ROMANIA');
    // }, []);

    useEffect(() => {
        getCityCoordinates('Bucuresti', 'ROMANIA');
        loadModules(['esri/Map', 'esri/views/MapView', 'esri/Graphic', 'esri/symbols/TextSymbol'], { css: true })
            .then(([ArcGISMap, MapView, Graphic, TextSymbol]) => {
                const map = new ArcGISMap({
                    basemap: 'topo-vector'
                });

                const view = new MapView({
                    container: 'mapContainer',
                    map: map,
                    center: [lon, lat], // Longitude, Latitude
                    zoom: 13
                });

                let pointGraphic = null;

                // Event listener for click event on the map view
                view.on("click", (event: any) => {
                    // Get the clicked coordinates
                    const { mapPoint } = event;
                    const { latitude, longitude } = mapPoint;

                    setPointLat(latitude);
                    setPointLong(longitude);

                    // Create a marker symbol
                    const markerSymbol = {
                        type: "simple-marker",
                        color: [144, 238, 144], // Light green
                        outline: {
                            color: [255, 255, 255], // White
                            width: 1
                        }
                    };

                    // Create a point geometry
                    const point = {
                        type: "point",
                        longitude: longitude,
                        latitude: latitude
                    };

                    // Create a graphic for the marker
                    const newPointGraphic = new Graphic({
                        geometry: point,
                        symbol: markerSymbol
                    });

                    // Clear previous graphics
                    view.graphics.removeAll();

                    // Add the marker graphic to the view
                    view.graphics.add(newPointGraphic);

                    // Store the reference to the new point graphic
                    pointGraphic = newPointGraphic;

                    // Create a text symbol for the label
                    const textSymbol = {
                        type: "text",
                        color: [0, 0, 0], // Black
                        haloColor: [255, 255, 255], // White
                        haloSize: "1px",
                        text: "My Location", // Set the label text
                        xoffset: 0,
                        yoffset: 10,
                        font: {
                            size: 12,
                            family: "sans-serif"
                        }
                    };

                    // Create a graphic for the label
                    const textGraphic = new Graphic({
                        geometry: point,
                        symbol: textSymbol
                    });
                    // Add lat and long to input fields
                    form.setFieldValue('latitude', latitude);
                    form.setFieldValue('longitude', longitude);

                    // Add the label graphic to the view
                    view.graphics.add(textGraphic);
                });
            })
            .catch((err) => console.error(err));
    }, [lon, lat]);

    return (
        <div
            className='flex justify-center items-stretch position-absolute bg-cover bg-center bg-no-repeat w-screen h-screen'
            style={{backgroundImage: `url(${bg.src})`}}>
            <Box className='w-3/5 position-absolutess mt-10'>
                <Container size={420} my={40}>
                    <Paper withBorder shadow="md" p={20} mt={30} radius="md">
                        <form noValidate onSubmit={form.onSubmit(handleSubmit)}>
                            <TextInput
                                autoFocus
                                name='name'
                                label="Name"
                                placeholder="Enter your name"
                                required {...form.getInputProps('name')}
                                className={'mt-14'}
                            />
                            <TextInput
                                mt={'md'}
                                name='email'
                                label="Email"
                                placeholder="example@domain.com"
                                required {...form.getInputProps('email')}
                            />
                            <PasswordInput
                                label="Password"
                                name='password'
                                placeholder="Enter password"
                                required {...form.getInputProps('password')}
                                mt="md" />
                            <Select
                                data={userTypes}
                                label="User type"
                                placeholder="Select user type"
                                value={selectedUserType}
                                onChange={(value: any) => setSelectedUserType(value)}
                                mt="md" className="mb-2"
                            />
                            {selectedUserType === 'producer' &&
                                <div id="mapContainer" style={{height: '200px', width: '300px'}}/>}

                            {selectedUserType === 'producer' &&
                                <TextInput
                                    autoFocus
                                    name='longitude'
                                    label="Longitude"
                                    placeholder="Enter the longitude"
                                    required {...form.getInputProps('longitude')}
                                    className={'mt-3'}
                                />}
                            {selectedUserType === 'producer' &&
                                <TextInput
                                    autoFocus
                                    name='latitude'
                                    label="Latitude"
                                    placeholder="Enter the latitude"
                                    required {...form.getInputProps('latitude')}
                                    className={'mt-3'}
                                />}
                            <Button  variant="gradient" gradient={{ from: 'rgba(104, 152, 242, 1)', to: 'pink', deg: 196 }} type='submit' fullWidth mt="xl">
                                Register
                            </Button>
                            <Link href={'/register'}>
                                <Text className="-mb-3" size="sm" align="center" mt="md" variant="link">You already have an account? Login now!</Text>
                            </Link>
                        </form>
                    </Paper>
                </Container>
            </Box>
        </div>
    );
}
