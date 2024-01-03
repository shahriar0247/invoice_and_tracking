'use client'

import ItemHistorys from "../page";

export default function Invoices2(){
    var fullPath = window.location.pathname;
    var pathParts = fullPath.split('/');
    var item = decodeURIComponent(pathParts[pathParts.length - 1]);
    return <ItemHistorys create={false} item_history_id_view={item}></ItemHistorys>
}