import type { Metadata } from 'next';
import './styles/globals.scss';
import './styles/invoice_viewer.scss';
import Link from 'next/link';


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
                <title>Ginger</title>
            </head>
            <body>
                <nav>
                    <div className="nav_container">
                        <Link href="/company">Company</Link>
                        <Link href="/type/bill_to">Bill To</Link>
                        <Link href="/type/ship_from">Ship From</Link>
                        <Link href="/type/ship_to">Ship To</Link>
                        <Link href="/item">Items</Link>
                        <Link href="/shipment">Shipment</Link>
                        <Link href="/first_quote">First Quote</Link>
                        <Link href="/invoices">Invoices</Link>
                        <Link href="/type/vendor">Vendors</Link>
                        <Link href="/purchase_order">Purchase Order</Link>
                        <Link href="/daily_accounts">Daily Accounts</Link>
                        <Link href="/daily_receivable">Daily Receivable</Link>
                    </div>
                </nav>
                <main>{children}</main>
            </body>
        </html>
    );
}
