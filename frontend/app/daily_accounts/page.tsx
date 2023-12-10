'use client';

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react';
import React from 'react';
function Create_Daily_Account({ create = true }) {
    const [all_items, set_all_items] = React.useState();
    const [invoice_all_items, set_invoice_all_items] = React.useState([]);
    const [purchase_orders_all_items, set_purchase_orders_all_items] = React.useState([]);
    const [selected_items, set_selected_items] = React.useState([]);

    const [purchase_orders, set_all_purchase_orders] = React.useState([]);
    const [purchase_order_id, set_purchase_order_id] = React.useState();

    const [all_invoices, set_all_invoices] = React.useState([]);
    const [invoice_id, set_invoice_id] = React.useState();

    const [total_price, set_total_price] = React.useState(0);
    const [total_invoice_price, set_total_invoice_price] = React.useState(0);
    const [total_purchase_order_price, set_total_purchase_order_price] = React.useState(0);

    const [vendor, set_vendor] = React.useState('');
    const [bill_to, set_bill_to] = React.useState('');
    const [ship_to, set_ship_to] = React.useState('');
    const [ship_from, set_ship_from] = React.useState('');

    React.useEffect(() => {
        let total_price_ = 0;
        selected_items.map(function (item) {
            total_price_ = total_price_ + item.price * item.quantity;
        });
        set_total_price(total_price_);
    }, [selected_items]);

    const edit_daily_account_fields = (index, field, value) => {
        const updatedItems = [...selected_items];
        updatedItems[index][field] = value;
        set_selected_items(updatedItems);
    };

    const add_new_daily_account_item = (event) => {
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

    React.useEffect(() => {
        let total_invoice_price_ = 0;
        invoice_all_items.map(function (item) {
            total_invoice_price_ = total_invoice_price_ + item.price * item.quantity;
        });
        set_total_invoice_price(total_invoice_price_);
    }, [invoice_all_items]);

    const edit_invoice_fields = (index, field, value) => {
        const updatedItems = [...invoice_all_items];
        updatedItems[index][field] = value;
        set_invoice_all_items(updatedItems);
    };

    const add_new_invoice_item = (event) => {
        let selectedItemValue = event.target.value;

        if (selectedItemValue == 'none') return;

        if (selectedItemValue == 'blank') {
            set_invoice_all_items([...invoice_all_items, { id: 0, name: '', description: '', price: 0, quantity: 1 }]);
            event.target.value = 'none';
            return;
        }
        selectedItemValue = JSON.parse(selectedItemValue);
        const selectedItem = all_items.find((item) => item.id === selectedItemValue.id);
        if (selectedItem) {
            const selectedItemJson = JSON.stringify(selectedItem);
            set_invoice_all_items([...invoice_all_items, { ...selectedItem, quantity: 1 }]);
            event.target.value = 'none';
        } else {
            alert('Error item not found in the list');
        }
    };
    const removeInvoiceItem = (index) => {
        const updatedItems = [...invoice_all_items];
        updatedItems.splice(index, 1);
        set_invoice_all_items(updatedItems);
    };

    React.useEffect(() => {
        let total_purchase_order_price_ = 0;
        purchase_orders_all_items.map(function (item) {
            total_purchase_order_price_ = total_purchase_order_price_ + item.price * item.quantity;
        });
        set_total_purchase_order_price(total_purchase_order_price_);
    }, [purchase_orders_all_items]);

    const edit_purchase_order_fields = (index, field, value) => {
        const updatedItems = [...purchase_orders_all_items];
        updatedItems[index][field] = value;
        set_purchase_orders_all_items(updatedItems);
    };

    const add_new_purchase_order_item = (event) => {
        let selectedItemValue = event.target.value;

        if (selectedItemValue == 'none') return;

        if (selectedItemValue == 'blank') {
            set_purchase_orders_all_items([...purchase_orders_all_items, { id: 0, name: '', description: '', price: 0, quantity: 1 }]);
            event.target.value = 'none';
            return;
        }
        selectedItemValue = JSON.parse(selectedItemValue);
        const selectedItem = all_items.find((item) => item.id === selectedItemValue.id);
        if (selectedItem) {
            const selectedItemJson = JSON.stringify(selectedItem);
            set_purchase_orders_all_items([...purchase_orders_all_items, { ...selectedItem, quantity: 1 }]);
            event.target.value = 'none';
        } else {
            alert('Error item not found in the list');
        }
    };
    const removePurchaseOrderItem = (index) => {
        const updatedItems = [...purchase_orders_all_items];
        updatedItems.splice(index, 1);
        set_purchase_orders_all_items(updatedItems);
    };

    React.useEffect(() => {
        if (create) {
            fetchPurchaseOrders();
        } else {
            get_purchase_order_details();
        }
    }, []);

    function fetchPurchaseOrders() {
        fetch('http://35.188.81.32:5003/get/purchase_order')
            .then((response) => response.json())
            .then((data) => {
                set_all_purchase_orders(data);
                data = data[0];
                set_purchase_order_id(data.id);
                set_invoice_id(data.invoice_id);
                set_purchase_orders_all_items(JSON.parse(data.all_items));
                set_vendor(data.vendor);

                fetchInvoice(data.invoice_id);
            })
            .catch((error) => {
                console.error('Error fetching purchase_order data:', error);
            });
    }
    async function get_purchase_order_details() {
        const number = window.location.href.split('/').pop();
        const response = await fetch('http://35.188.81.32:5003/get_daily_account_details/' + number);
        const data = await response.json();
        console.log(data);
        set_selected_items(JSON.parse(data['all_items']));
        set_invoice_id(data.invoice_id);
        set_invoice_all_items(JSON.parse(data.invoice.all_items));
        set_purchase_order_id(data.purchase_order_id);
        set_purchase_orders_all_items(JSON.parse(data.purchase_order.all_items));

        set_vendor(data.purchase_order.vendor);
        set_bill_to(data.invoice.bill_to);
        set_ship_from(data.invoice.ship_from);
        set_ship_to(data.invoice.ship_to);
    }
    function fetchInvoice(invoice_id_) {
        fetch('http://35.188.81.32:5003/get_invoice_details_for_daily_accounts/' + invoice_id_)
            .then((response) => response.json())
            .then((data) => {
                set_invoice_all_items(JSON.parse(data.all_items));
                set_bill_to(data.bill_to);
                set_ship_from(data.ship_from);
                set_ship_to(data.ship_to);
            })
            .catch((error) => {
                console.error('Error fetching invoice data:', error);
            });
    }
    function createDaily_Account() {
        const daily_accountData = {
            all_items: selected_items,
            purchase_order_id: purchase_order_id,
        };

        fetch('http://35.188.81.32:5003/create/daily_account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(daily_accountData),
        })
            .then((response) => {
                if (response.ok) {
                    alert('Daily_Account created successfully');
                } else {
                    alert('Failed to create daily_account');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div className="daily_account">
            {create ? <h1>Create Daily Account</h1> : <h1>View Daily Account</h1>}
            {create && (
                <div className="topbar">
                    <button onClick={createDaily_Account}>Create Daily Account</button>
                </div>
            )}
            <div className="all_inputs">
                {create && (
                    <div className="input_field">
                        <div className="title">Connect PO</div>
                        <div className="input">
                            <select
                                onChange={(e) => {
                                    let value = e.target.value;
                                    let data = JSON.parse(value);
                                    set_purchase_order_id(data.id);
                                    set_invoice_id(data.invoice_id);
                                    set_purchase_orders_all_items(JSON.parse(data.all_items));
                                    fetchInvoice(data.invoice_id);
                                }}>
                                {purchase_orders &&
                                    purchase_orders.map(function (po) {
                                        return (
                                            <option  key={JSON.stringify(po)} value={JSON.stringify(po)}>
                                                {po.id} - {po.vendor} - {po.date}
                                            </option>
                                        );
                                    })}{' '}
                            </select>
                        </div>
                    </div>
                )}
                <div className="input_field">
                    <div className="title">Purchase Order</div>
                    <div className="input">
                        <input
                            type="text"
                            value={purchase_order_id}
                            disabled
                        />
                    </div>
                </div>

                <div className="input_field">
                    <div className="title">Invoice</div>
                    <div className="input">
                        <input
                            type="text"
                            value={invoice_id}
                            disabled
                        />
                    </div>
                </div>

                <div className="input_field">
                    <div className="title">Vendor</div>
                    <div className="input">
                        <input
                            type="text"
                            value={vendor}
                            disabled
                        />
                    </div>
                </div>

                <div className="input_field">
                    <div className="title">Bill To</div>
                    <div className="input">
                        <input
                            type="text"
                            value={bill_to}
                            disabled
                        />
                    </div>
                </div>

                <div className="input_field">
                    <div className="title">Ship to</div>
                    <div className="input">
                        <input
                            type="text"
                            value={ship_to}
                            disabled
                        />
                    </div>
                </div>

                <div className="input_field">
                    <div className="title">Ship From</div>
                    <div className="input">
                        <input
                            type="text"
                            value={ship_from}
                            disabled
                        />
                    </div>
                </div>
            </div>

            <h2>Petty Cash</h2>

            <div className="input_field">
                <div className="input">
                    <Table>
                        <TableHeader>
                            <TableColumn>Item</TableColumn>
                            <TableColumn>Description</TableColumn>
                            <TableColumn>Price per piece</TableColumn>
                            <TableColumn>Quantity</TableColumn>
                            <TableColumn>Total Price</TableColumn>
                            <TableColumn>Actions</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {selected_items.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <input
                                            type="text"
                                            value={item.name}
                                            onChange={(e) => edit_daily_account_fields(index, 'name', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <input
                                            type="text"
                                            value={item.description}
                                            onChange={(e) => edit_daily_account_fields(index, 'description', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <input
                                            type="number"
                                            value={item.price}
                                            onChange={(e) => edit_daily_account_fields(index, 'price', parseFloat(e.target.value))}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => edit_daily_account_fields(index, 'quantity', parseInt(e.target.value))}
                                        />
                                    </TableCell>
                                    <TableCell>{item.price * item.quantity}</TableCell>
                                    <TableCell>
                                        <button onClick={() => removeItem(index)}>Remove</button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div>Total Price: {total_price}</div>
                    <select onChange={(e) => add_new_daily_account_item(e)}>
                        <option value="none">Select Item</option>
                        {all_items &&
                            all_items.map(function (item) {
                                return (
                                    <option key={JSON.stringify(item)} value={JSON.stringify(item)}>
                                        {item.name} - {item.price} Price
                                    </option>
                                );
                            })}
                    </select>

                    <button
                        onClick={() => {
                            set_selected_items([...selected_items, { id: 0, name: '', description: '', price: 0, quantity: 1 }]);
                            event.target.value = 'none';
                        }}>
                        New Item
                    </button>
                </div>
            </div>
            <br />

            <h2>Invoice</h2>

            <div className="input_field">
                <div className="input">
                    <Table>
                        <TableHeader>
                            <TableColumn>Item</TableColumn>
                            <TableColumn>Description</TableColumn>
                            <TableColumn>Price per piece</TableColumn>
                            <TableColumn>Quantity</TableColumn>
                            <TableColumn>Total Price</TableColumn>
                            <TableColumn>Actions</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {invoice_all_items.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <input
                                            type="text"
                                            value={item.name}
                                            onChange={(e) => edit_invoice_fields(index, 'name', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <input
                                            type="text"
                                            value={item.description}
                                            onChange={(e) => edit_invoice_fields(index, 'description', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <input
                                            type="number"
                                            value={item.price}
                                            onChange={(e) => edit_invoice_fields(index, 'price', parseFloat(e.target.value))}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => edit_invoice_fields(index, 'quantity', parseInt(e.target.value))}
                                        />
                                    </TableCell>
                                    <TableCell>{item.price * item.quantity}</TableCell>
                                    <TableCell>
                                        <button onClick={() => removeInvoiceItem(index)}>Remove</button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div>Total Price: {total_invoice_price}</div>
                </div>
            </div>

            <br />
            <h2>Purchase Order</h2>

            <div className="input_field">
                <div className="input">
                    <Table>
                        <TableHeader>
                            <TableColumn>Item</TableColumn>
                            <TableColumn>Description</TableColumn>
                            <TableColumn>Price per piece</TableColumn>
                            <TableColumn>Quantity</TableColumn>
                            <TableColumn>Total Price</TableColumn>
                            <TableColumn>Actions</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {purchase_orders_all_items.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <input
                                            type="text"
                                            value={item.name}
                                            onChange={(e) => edit_purchase_order_fields(index, 'name', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <input
                                            type="text"
                                            value={item.description}
                                            onChange={(e) => edit_purchase_order_fields(index, 'description', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <input
                                            type="number"
                                            value={item.price}
                                            onChange={(e) => edit_purchase_order_fields(index, 'price', parseFloat(e.target.value))}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => edit_purchase_order_fields(index, 'quantity', parseInt(e.target.value))}
                                        />
                                    </TableCell>
                                    <TableCell>{item.price * item.quantity}</TableCell>
                                    <TableCell>
                                        <button onClick={() => removePurchaseOrderItem(index)}>Remove</button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div>Total Price: {total_purchase_order_price}</div>
                </div>
            </div>
        </div>
    );
}

export default function Daily_Accounts() {
    const [data, setData] = React.useState([]);
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        fetchDaily_Account();
    }, []);

    function fetchDaily_Account() {
        fetch('http://35.188.81.32:5003/get/daily_account')
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setUsers(getUniqueUsers(data));
                loadTable(data);
            })
            .catch((error) => {
                console.error('Error fetching daily_account:', error);
            });
    }

    function getUniqueUsers(data) {
        // Extract unique users from the data (assuming "Bill To" is the user field)
        const uniqueUsers = [...new Set(data.map((item) => item.bill_to))];
        return uniqueUsers;
    }
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <div className="invoice">
            <h1>Daily_Accounts</h1>
            <button onClick={onOpen}>Create Daily Account</button>
            <Modal
                isOpen={isOpen}
                onClose={onClose}>
                <ModalContent>
                    <ModalHeader>Create Daily</ModalHeader>
                    <ModalBody>
                        <Create_Daily_Account />
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                </ModalContent>
            </Modal>

            <div className="all_filters">
                <div>
                    <label>User:</label>
                    <select id="user-filter">
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
                    <label>From:</label>
                    <input
                        type="date"
                        id="min-date"
                    />
                </div>

                <div>
                    <label>To:</label>
                    <input
                        type="date"
                        id="max-date"
                    />
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>Invoice</TableColumn>
                    <TableColumn>Purchase Order</TableColumn>
                    <TableColumn></TableColumn>
                </TableHeader>
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.invoice_id}</TableCell>
                            <TableCell>{item.purchase_order_id}</TableCell>
                            <TableCell>
                                <a
                                    className="button"
                                    href={`/view_daily_account/${item.id}`}>
                                    View
                                </a>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
