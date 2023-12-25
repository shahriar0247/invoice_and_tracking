import type { Metadata } from 'next';
import './styles/globals.scss';
import './styles/invoice_viewer.scss';


export const metadata: Metadata = {
    title: 'Ginger',
    description: 'Ginger - An Advanced Invoice Application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <title>Invoice and Tracking</title>
            </head>
            <body>
                <nav>
                    <a href="/company">Company</a>
                    <a href="/type/bill_to">Bill To</a>
                    <a href="/type/ship_from">Ship From</a>
                    <a href="/type/ship_to">Ship To</a>
                    <a href="/item">Items</a>
                    <a href="/invoices">Invoices</a>
                    <a href="/type/vendor">Vendors</a>
                    <a href="/purchase_order">Purchase Orders</a>
                    {/* <a href="/daily_accounts">Daily Accounts</a> */}
                </nav>
                <div className="dummy"></div>
                <main>{children}</main>
            </body>
        </html>
    );
}
