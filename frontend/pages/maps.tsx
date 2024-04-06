import {useRouter} from 'next/navigation';
import {useEffect, useState} from "react";
import Layout from "@/contents/layout/Layout";
import React from 'react';
import { loadModules } from 'esri-loader';
import QrCard from "@/contents/components/qr_card/qrCard";
import axios from "axios";

export default function Maps() {
    const router = useRouter();
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

    useEffect(() => {
        getCityCoordinates('Constanta', 'ROMANIA');
    }, []);

    useEffect(() => {
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
                        text: "Producer 1", // Set the label text
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

                    // Add the label graphic to the view
                    view.graphics.add(textGraphic);
                });
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <React.Fragment>
            <Layout>
            </Layout>
            <div className='absolute left-[20%] top-[80px]'>
                <h1>User Homepage</h1>
                <div id="mapContainer" style={{height: '350px', width: '700px'}}/>
            </div>
        </React.Fragment>

    );
}
