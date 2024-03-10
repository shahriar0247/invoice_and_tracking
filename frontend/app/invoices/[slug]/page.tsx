'use client'

import Invoices from "../page";

export default function Invoices2({}){
    var fullPath = window.location.pathname;
    var pathParts = fullPath.split('/');
    var item = decodeURIComponent(pathParts[pathParts.length - 1]);
    return <Invoices create={false} invoice_id_view={item}></Invoices>
}