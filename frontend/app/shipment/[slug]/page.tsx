'use client'

import Shipments from "../page";

export default function Shipments2(){
    var fullPath = window.location.pathname;
    var pathParts = fullPath.split('/');
    var item = decodeURIComponent(pathParts[pathParts.length - 1]);
    return <Shipments create={false} shipment_id_view={item}></Shipments>
}