'use client';

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react';
import React from 'react';
import { usePDF } from 'react-to-pdf';
import { Accordion, AccordionItem } from '@nextui-org/react';

export default function Purchase_Orders({ create = true, purchase_order_id_view = '' }) {
    const [data3, setData3] = React.useState([]);
    const [all_data, set_all_data] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const [bill_to_search_term, set_bill_to_search_term] = React.useState('');
    const [edit, set_edit] = React.useState(false);

    const [minDate, setMinDate] = React.useState('');
    const [maxDate, setMaxDate] = React.useState('');

    const [dateFilter, setDateFilter] = React.useState(''); // State to store selected date filter

    const handleDateFilterChange = (filter) => {
        setDateFilter(filter);

        const today = new Date();
        let newMinDate = '';
        let newMaxDate = '';

        switch (filter) {
            case 'all':
                newMinDate = '';
                newMaxDate = '';
                break;
            case 'today':
                newMinDate = today.toISOString().split('T')[0];
                newMaxDate = today.toISOString().split('T')[0];
                break;
            case 'yesterday':
                const yesterday = new Date(today);
                yesterday.setDate(today.getDate() - 1);
                newMinDate = yesterday.toISOString().split('T')[0];
                newMaxDate = yesterday.toISOString().split('T')[0];
                break;
            case 'last7days':
                const last7Days = new Date(today);
                last7Days.setDate(today.getDate() - 6);
                newMinDate = last7Days.toISOString().split('T')[0];
                newMaxDate = today.toISOString().split('T')[0];
                break;
            case 'last30days':
                const last30days = new Date(today);
                last30days.setDate(today.getDate() - 6);
                newMinDate = last30days.toISOString().split('T')[0];
                newMaxDate = today.toISOString().split('T')[0];
                break;
            case 'last7days':
                const last60days = new Date(today);
                last60days.setDate(today.getDate() - 6);
                newMinDate = last60days.toISOString().split('T')[0];
                newMaxDate = today.toISOString().split('T')[0];
                break;
            default:
                break;
        }

        setMinDate(newMinDate);
        setMaxDate(newMaxDate);
    };

    React.useEffect(() => {
        fetch_purchase_orders();

        try {
            const urlParams = new URLSearchParams(window.location.search);
            const edit = urlParams.get('edit');
            set_edit(edit === 'true');
        } catch (error) {
            console.log(error);
        }
    }, []);

    function fetch_purchase_orders() {
        fetch('http://89.116.50.93:5003/get/purchase_order')
            .then((response) => response.json())
            .then((data) => {
                setData3(data);
                set_all_data(data);
                setUsers(getUniqueUsers(data));
            })
            .catch((error) => {
                console.error('Error fetching purchase_orders:', error);
            });
    }

    const { isOpen, onOpen, onClose } = useDisclosure();
    function getUniqueUsers(data) {
        const uniqueUsers = [...new Set(data.map((item) => item.bill_to))];
        return uniqueUsers;
    }
    function deletePurchase_Order(purchase_orderId) {
        fetch(`http://89.116.50.93:5003/delete/purchase_order/${purchase_orderId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    alert('Purchase_Order deleted successfully');
                    window.location.reload();
                } else {
                    alert('Failed to delete purchase_order');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    function filter() {
        var filteredData = all_data.filter(function (purchase_order) {
            if (purchase_order.bill_to.includes(bill_to_search_term)) {
                return true;
            }
        });

        var filteredData2 = filteredData.filter(function (purchase_order) {
            return (
                (minDate === '' || new Date(purchase_order.date) >= new Date(minDate)) &&
                (maxDate === '' || new Date(purchase_order.date) <= new Date(maxDate)) &&
                Object.values(purchase_order).some(function (value) {
                    if (value) {
                        return value.toLowerCase().includes(bill_to_search_term);
                    }
                })
            );
        });

        setData3(filteredData2);
    }

    React.useEffect(() => {
        filter();
    }, [minDate, maxDate, bill_to_search_term]);

    function change_purchase_order_status(id, status) {
        const data = {
            id: id,
            status: status,
        };
        fetch(`http://89.116.50.93:5003/purchase_order/change_status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.ok) {
                } else {
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    if (!create) {
        return (
            <Create_purchase_order
                edit={edit}
                create={create}
                onCloseParent={onClose}
                fetch_purchase_orders={fetch_purchase_orders}
                purchase_order_id_view={purchase_order_id_view}></Create_purchase_order>
        );
    }
    return (
        <div className="invoice">
            <h1>Purchase Orders</h1>
            <button onClick={onOpen}>Create Purchase Order</button>
            <Modal
                isOpen={isOpen}
                onClose={onClose}>
                <ModalContent>
                    <ModalHeader>Create Purchase_Order</ModalHeader>
                    <ModalBody>
                        <Create_purchase_order
                            fetch_purchase_orders={fetch_purchase_orders}
                            onCloseParent={onClose}
                        />
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                </ModalContent>
            </Modal>

            <h1>All Filters</h1>
            <div className="all_filters">
                <div>
                    <label>Bill To Search:</label>
                    <select onChange={(e) => set_bill_to_search_term(e.target.value)}>
                        <option value="">All</option>
                        {users.map((user, index) => (
                            <option
                                key={index}
                                value={user}>
                                {user}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Date Search:</label>
                    <select
                        value={dateFilter}
                        onChange={(e) => handleDateFilterChange(e.target.value)}
                        clearable>
                        <option value="all">All</option>
                        <option value="today">Today</option>
                        <option value="yesterday">Yesterday</option>
                        <option value="last7days">Last 7 Days</option>
                        <option value="last30days">Last 30 Days</option>
                        <option value="last60days">Last 60 Days</option>
                    </select>
                </div>
            </div>
            {[
                {
                    name: 'All Purchase_Orders',
                    data: data3,
                },
            ].map((value, index) => {
                return (
                    <div key={value.name}>
                        <h2>{value.name}</h2>
                        <Table>
                            <TableHeader>
                                <TableColumn>ID</TableColumn>
                                <TableColumn>Description</TableColumn>
                                <TableColumn>Date</TableColumn>
                                <TableColumn>Bill To</TableColumn>
                                <TableColumn>B/L Number</TableColumn>
                                <TableColumn>Purchase_Order Status</TableColumn>
                                <TableColumn></TableColumn>
                                <TableColumn></TableColumn>
                            </TableHeader>
                            <TableBody>
                                {value.data.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.description}</TableCell>
                                        <TableCell>{new Date(item.date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</TableCell>
                                        <TableCell>{item.bill_to}</TableCell>
                                        <TableCell>{item.bl_number}</TableCell>

                                        <TableCell>
                                            <select
                                                defaultValue={item.purchase_order_status}
                                                onChange={(e) => {
                                                    change_purchase_order_status(item.id, e.target.value);
                                                }}>
                                                <option value="pending">Pending</option>
                                                <option value="paid">Paid</option>
                                                <option value="partial">Partial</option>
                                            </select>
                                        </TableCell>
                                        <TableCell>
                                            <a
                                                className="button"
                                                href={`/purchase_orders/${item.id}?edit=true`}>
                                                Edit
                                            </a>
                                        </TableCell>
                                        <TableCell>
                                            <button
                                                onClick={() => {
                                                    deletePurchase_Order(item.id);
                                                }}>
                                                Delete
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                );
            })}
        </div>
    );
}

function Create_purchase_order({ create = true, purchase_order_id_view = '', edit = false, fetch_purchase_orders, onCloseParent }) {
    const [company, set_company] = React.useState([]);
    const [all_bill_to, set_all_bill_to] = React.useState([]);
    const [all_ship_from, set_all_ship_from] = React.useState([]);
    const [all_ship_to, set_all_ship_to] = React.useState([]);
    const [all_items, set_all_items] = React.useState();
    const [selected_items, set_selected_items] = React.useState([]);

    const [company_information, set_company_information] = React.useState('');
    const [purchase_order_information, set_purchase_order_information] = React.useState('');
    const [bill_to_information, set_bill_to_information] = React.useState('');
    const [ship_from_information, set_ship_from_information] = React.useState('');
    const [ship_to_information, set_ship_to_information] = React.useState('');
    const [extra_information, set_extra_information] = React.useState('');
    const [description, set_description] = React.useState('');
    const [purchase_order_status, set_purchase_order_status] = React.useState('');
    const [bank_details_information, set_bank_details_information] = React.useState('');
    const [invoices, set_invoices] = React.useState([]);
    const [invoice_id, set_invoice_id] = React.useState('');
    const [invoice, set_invoice] = React.useState('');

    const [terms_and_conditions, set_terms_and_conditions] = React.useState('');
    const [purchase_order_type, set_purchase_order_type] = React.useState('First Quote');
    const [bl_number, set_bl_number] = React.useState('');
    const [bill_to_id, set_bill_to_id] = React.useState('');
    const [bill_to, set_bill_to] = React.useState('');
    const [ship_to_id, set_ship_to_id] = React.useState('');
    const [ship_to, set_ship_to] = React.useState('');
    const [ship_from_id, set_ship_from_id] = React.useState('');
    const [ship_from, set_ship_from] = React.useState('');
    const [date, set_date] = React.useState(getFormattedDate());
    const [due_date, set_due_date] = React.useState(getFormattedDate());
    const [purchase_order_id, set_purchase_order_id] = React.useState(`PO - ${Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000}`);

    const [total_price, set_total_price] = React.useState(0);

    const [vendor_id, set_vendor_id] = React.useState('Select Vendor');
    const [all_vendors, set_all_vendors] = React.useState([]);

    React.useEffect(() => {
        let total_price_ = 0;
        selected_items.map(function (item) {
            total_price_ = total_price_ + item.price * item.quantity;
        });
        set_total_price(total_price_);
    }, [selected_items]);
    React.useEffect(() => {
        fetchCompany();
        fetchItems();
        fetchInvoices();
        fetchVendor();
        if (!create) {
            get_purchase_order_details();
        }
    }, []);

    function getFormattedDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    function fetch_purchase_orders_handler() {
        fetch_purchase_orders();
    }

    async function get_purchase_order_details() {
        const response = await fetch('http://89.116.50.93:5003/get_purchase_order_details/' + purchase_order_id_view);
        const data = await response.json();
        const all_items_ = JSON.parse(data['all_items']);
        set_purchase_order_id(data.id);
        set_selected_items(all_items_);
        set_invoice_id(data.invoice_id);
        set_description(data.description);

        var dateObject = new Date(data.date);
        var year = dateObject.getFullYear();
        var month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
        var day = dateObject.getDate().toString().padStart(2, '0');
        set_date(`${year}-${month}-${day}`);

        dateObject = new Date(data.due_date);
        year = dateObject.getFullYear();
        month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
        day = dateObject.getDate().toString().padStart(2, '0');
        set_due_date(`${year}-${month}-${day}`);
    }

    const edit_purchase_order_fields = (index, field, value) => {
        const updatedItems = [...selected_items];
        updatedItems[index][field] = value;
        set_selected_items(updatedItems);
    };

    const add_new_purchase_order_item = (event) => {
        let selectedItemValue = event.target.value;

        if (selectedItemValue == 'none') return;

        if (selectedItemValue == 'blank') {
            set_selected_items([...selected_items, { id: 0, name: '', description: '', price: 0, quantity: 1 }]);
            event.target.value = 'none';
            return;
        }
        selectedItemValue = JSON.parse(selectedItemValue);
        const selectedItem = all_items.find((item) => item.id === selectedItemValue.id);
        if (selectedItem) {
            const selectedItemJson = JSON.stringify(selectedItem);
            set_selected_items([...selected_items, { ...selectedItem, quantity: 1 }]);
            event.target.value = 'none';
        } else {
            alert('Error item not found in the list');
        }
    };
    const removeItem = (index) => {
        const updatedItems = [...selected_items];
        updatedItems.splice(index, 1);
        set_selected_items(updatedItems);
    };
    function fetchInvoices() {
        fetch('http://89.116.50.93:5003/get/invoice')
            .then((response) => response.json())
            .then((data) => {
                set_invoices(data);
            })
            .catch((error) => {
                console.error('Error fetching purchase_order:', error);
            });
    }
    function fetchVendor() {
        fetch('http://89.116.50.93:5003/get/vendor')
            .then((response) => response.json())
            .then((data) => {
                set_all_vendors(data);
            })
            .catch((error) => {
                console.error('Error fetching all vendor:', error);
            });
    }
    function fetchCompany() {
        fetch('http://89.116.50.93:5003/get/company')
            .then((response) => response.json())
            .then((data) => {
                set_company(data);
                set_bank_details_information(data.bank_details);
                set_company_information(
                    <div>
                        <h1>{data.name}</h1>
                        <div>{data.address1}</div>
                        <div>{data.address2}</div>
                        <div>{data.address3}</div>
                        <div>Tel: {data.tel}</div>
                        <div>Fax: {data.fax}</div>
                        <div>GST Registration #: {data.gst}</div>
                    </div>
                );
            })
            .catch((error) => {
                console.error('Error fetching company data:', error);
            });
    }
    function fetchBillTo() {
        fetch('http://89.116.50.93:5003/get/type/bill_to')
            .then((response) => response.json())
            .then((data) => {
                set_all_bill_to(data);
                data = data[0];
                set_bill_to_id(data.id);
                set_bill_to_information(
                    <div>
                        <div>{data.name}</div>
                        <div>{data.address1}</div>
                        <div>{data.address2}</div>
                    </div>
                );
            })
            .catch((error) => {
                console.error('Error fetching purchase_order data:', error);
            });
    }
    function fetchShipFrom() {
        fetch('http://89.116.50.93:5003/get/type/ship_from')
            .then((response) => response.json())
            .then((data) => {
                set_all_ship_from(data);
                data = data[0];
                set_ship_from_id(data.id);
                set_ship_from_information(
                    <div>
                        <div>{data.name}</div>
                        <div>{data.address1}</div>
                        <div>{data.address2}</div>
                    </div>
                );
            })
            .catch((error) => {
                console.error('Error fetching ship_from data:', error);
            });
    }
    function fetchShipTo() {
        fetch('http://89.116.50.93:5003/get/type/ship_to')
            .then((response) => response.json())
            .then((data) => {
                set_all_ship_to(data);
                data = data[0];
                set_ship_to_id(data.id);
                set_ship_to_information(
                    <div>
                        <div>{data.name}</div>
                        <div>{data.address1}</div>
                        <div>{data.address2}</div>
                    </div>
                );
            })
            .catch((error) => {
                console.error('Error fetching ship_to data:', error);
            });
    }
    function fetchItems() {
        console.log('here 2');
        fetch('http://89.116.50.93:5003/get/item')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                set_all_items(data);
            })
            .catch((error) => {
                console.error('Error fetching items data:', error);
            });
    }

    function createPurchase_Order() {
        const purchase_orderData = {
            id: purchase_order_id,
            invoice_id: invoice_id,
            bank_details: bank_details_information,
            date: date,
            due_date: due_date,
            terms: terms_and_conditions,
            extra_info: extra_information,
            description: description,
            all_items: selected_items,
            edit: edit,
        };

        fetch('http://89.116.50.93:5003/create/purchase_order/' + purchase_order_id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(purchase_orderData),
        })
            .then((response) => {
                if (response.ok) {
                    alert('Purchase_Order created successfully');
                } else {
                    alert('Failed to create purchase_order');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const { toPDF, targetRef } = usePDF({ filename: purchase_order_id + ' - Bill To -' + bill_to.name + ' Date: ' + date + '.pdf' });

    function createPDF() {
        createPurchase_Order();
        toPDF();
        fetch_purchase_orders_handler();
        onClose();
        set_purchase_order_id(`INV - ${Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000}`);
        onCloseParent();
    }

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currency, set_currency] = React.useState('USD');
    return (
        <div className="invoice">
            <h1>Purchase_Order Details</h1>
            <h2>{purchase_order_id}</h2>

            <div className="all_inputs all_inputs2">
                <div className="input_field">
                    <div className="title">Invoice</div>
                    <div className="input">
                        <select
                            value={invoice}
                            onChange={(e) => {
                                let value = e.target.value;
                                set_invoice(value)
                                let data = JSON.parse(value);
                                set_invoice_id(data.id);
                            }}>
                            {invoices.map(function (invoice) {
                                return (
                                    <option
                                        key={JSON.stringify(invoice)}
                                        value={JSON.stringify(invoice)}>
                                        {invoice.id}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
                <div className="input_field">
                    <div className="title">Description</div>
                    <div className="input">
                        <textarea
                            type="text"
                            value={description}
                            onChange={(e) => {
                                set_description(e.target.value);
                            }}
                        />
                    </div>
                </div>
            </div>

            <Accordion>
                {invoices.map((invoice) => {
                    return (
                        <AccordionItem
                            className="input_field"
                            key={invoice.id}
                            aria-label={invoice.description}
                            title={invoice.id + ' ' + invoice.description + ' ' + invoice.date + ' ' + invoice.bill_to}>
                            <div className="input">
                                <table
                                    id="invoice-table"
                                    className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Item</th>
                                            <th>Description</th>
                                            <th>Price</th>
                                            <th>Vendor</th>
                                            <th>Quantity</th>
                                            <th>Total Price</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {JSON.parse(invoice.all_items).map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <input
                                                        type="text"
                                                        value={item.name}
                                                        readOnly
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        value={item.description}
                                                        readOnly
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        value={item.price}
                                                        readOnly
                                                    />
                                                </td>
                                                <td>
                                                    <select
                                                        value={item.vendor_id}
                                                        disabled={true}
                                                        readOnly>
                                                        <option value={'Select Vendor'}>No Vendor</option>
                                                        {all_vendors.map(function (vendor_) {
                                                            return (
                                                                <option
                                                                    key={vendor_.id}
                                                                    value={vendor_.id}>
                                                                    {vendor_.name}
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        value={item.quantity}
                                                        readOnly
                                                    />
                                                </td>
                                                <td>{(item.price * item.quantity).toFixed(2)}</td>
                                                <td>
                                                    <button onClick={() => removeItem(index)}>Add To PO</button> {/* Button to remove item */}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </AccordionItem>
                    );
                })}
            </Accordion>

            <Modal
                isOpen={isOpen}
                onClose={onClose}>
                <ModalContent>
                    <ModalHeader>Create Daily</ModalHeader>
                    <ModalBody>
                        <div className="invoice_viewer_container">
                            <div
                                ref={targetRef}
                                className="invoice_viewer"
                                id="invoice_viewer">
                                <div className="logo"></div>
                                <h4>{purchase_order_type}</h4>
                                <div className="first_section">
                                    <div className="company_information">{company_information}</div>
                                    <div className="purchase_order_information">
                                        <br />
                                        <br />

                                        <h1>{purchase_order_id}</h1>
                                        <div>Date: {date}</div>
                                        <div>Due Date: {due_date}</div>
                                        <div>B/L Number: {bl_number}</div>
                                        <div>Description: {description}</div>
                                        <div>Purchase_Order Status: {purchase_order_status}</div>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: purchase_order_information.replace(/\n/g, '<br>'),
                                            }}></div>
                                    </div>
                                </div>
                                <div className="second_section">
                                    <div className="bill_to_information">
                                        <h3>Bill To</h3>

                                        {bill_to_information}
                                    </div>
                                    <div className="ship_from_information">
                                        <h3>Ship From</h3>

                                        {ship_from_information}
                                    </div>
                                </div>
                                <div className="third_section">
                                    <div className="ship_to_information">
                                        <h3>Ship To </h3>
                                        {ship_to_information}
                                    </div>
                                    <div className="extra_information">
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: extra_information.replace(/\n/g, '<br>'),
                                            }}></div>
                                    </div>
                                </div>
                                <div className="forth_section">
                                    <Table>
                                        <TableHeader>
                                            <TableColumn>Item</TableColumn>
                                            <TableColumn>Description</TableColumn>
                                            <TableColumn>Price</TableColumn>
                                            <TableColumn>Quantity</TableColumn>
                                            <TableColumn>Total Price</TableColumn>
                                        </TableHeader>
                                        <TableBody>
                                            {selected_items.map((item, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{item.name}</TableCell>
                                                    <TableCell>{item.description}</TableCell>
                                                    <TableCell>
                                                        {currency} {item.price.toFixed(2)}
                                                    </TableCell>
                                                    <TableCell>{item.quantity}</TableCell>
                                                    <TableCell>
                                                        {currency} {(item.price * item.quantity).toFixed(2)}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    <div className="total_price_">
                                        Total Price: {total_price} {currency}
                                    </div>
                                </div>
                                <div className="fifth_section">
                                    <h3>Bank Details</h3>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: bank_details_information.replace(/\n/g, '<br>'),
                                        }}></div>
                                </div>
                                <div className="sixth_section">
                                    <center>THANK YOU FOR SHIPPING THROUGH MIANZ WE APPRECIATE YOUR BUSINESS</center>
                                    <div className="terms_and_conditions">
                                        <strong>Terms & Conditions: </strong>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: terms_and_conditions.replace(/\n/g, '<br>'),
                                            }}></div>
                                    </div>
                                    <div className="name">Ahmed Mukit</div>
                                    <div className="nsf">All NSF Charges $25.00</div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button onClick={createPDF}>Create Purchase_Order</button>
                        <button onClick={toPDF}>Download Purchase_Order</button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}
