import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

export const metadata: Metadata = {
    title: 'Ginger',
    description: 'Ginger - An Advanced Invoice Application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <title>Invoice and Tracking</title>

                <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

                <script src="https://cdn.datatables.net/1.13.7/js/jquery.dataTables.min.js"></script>
                <script src="https://cdn.datatables.net/1.13.7/js/dataTables.bootstrap5.min.js"></script>
                <link
                    rel="stylesheet"
                    href="https://cdn.datatables.net/1.13.7/css/dataTables.bootstrap5.min.css"
                />

                <script
                    src="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/js/bootstrap.min.js"
                    integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd"
                    crossorigin="anonymous"></script>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap.min.css"
                    integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu"
                    crossorigin="anonymous"
                />

                <link
                    rel="stylesheet"
                    href="/static/styles/global.css"
                />
            </head>
            <body>
                <nav>
                    <a href="/company">Company</a>
                    <a href="/bill_to">Bill To</a>
                    <a href="/ship_from">Ship From</a>
                    <a href="/ship_to">Ship To</a>
                    <a href="/item">Items</a>
                    <a href="/invoices">Invoices</a>
                    <a href="/tracking">Tracking</a>
                    <a href="/vendor">Vendors</a>
                    <a href="/purchase_orders">Purchase Orders</a>
                    <a href="/daily_accounts">Daily Accounts</a>
                </nav>
                <div className="dummy"></div>
                <main>{children}</main>
            </body>
        </html>
    );
}
