'use client'

import Daily_Accounts from "../page";

export default function Daily_Accounts2(){
    var fullPath = window.location.pathname;
    var pathParts = fullPath.split('/');
    var item = decodeURIComponent(pathParts[pathParts.length - 1]);
    return <Daily_Accounts create={false} daily_account_id_view={item}></Daily_Accounts>
}