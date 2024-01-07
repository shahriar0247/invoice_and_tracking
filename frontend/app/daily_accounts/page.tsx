'use client';

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react';
import React from 'react';
import { usePDF } from 'react-to-pdf';

export default function Daily_Accounts({ create = true, daily_account_id_view = '' }) {
    const [data3, setData3] = React.useState([]);
    const [all_data, set_all_data] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const [invoice_search_term, set_invoice_search_term] = React.useState('');
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
        fetch_daily_accounts();

        try {
            const urlParams = new URLSearchParams(window.location.search);
            const edit = urlParams.get('edit');
            set_edit(edit === 'true');
        } catch (error) {
            console.log(error);
        }
    }, []);

    function fetch_daily_accounts() {
        fetch('http://localhost:5003/get/daily_account')
            .then((response) => response.json())
            .then((data) => {
                setData3(data);

                set_all_data(data);
                setUsers(getUniqueUsers(data));
            })
            .catch((error) => {
                console.error('Error fetching daily_accounts:', error);
            });
    }

    const { isOpen, onOpen, onClose } = useDisclosure();
    function getUniqueUsers(data) {
        const uniqueUsers = [...new Set(data.map((item) => item.invoice))];
        return uniqueUsers;
    }
    function deleteDaily_Account(daily_accountId) {
        fetch(`http://localhost:5003/delete/daily_account/${daily_accountId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    alert('Daily_Account deleted successfully');
                    window.location.reload();
                } else {
                    alert('Failed to delete daily_account');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    function filter() {
        var filteredData = all_data.filter(function (daily_account) {
            if (daily_account.invoice.includes(invoice_search_term)) {
                return true;
            }
        });

        var filteredData2 = filteredData.filter(function (daily_account) {
            return (
                (minDate === '' || new Date(daily_account.date) >= new Date(minDate)) &&
                (maxDate === '' || new Date(daily_account.date) <= new Date(maxDate)) &&
                Object.values(daily_account).some(function (value) {
                    if (value) {
                        return value.toLowerCase().includes(invoice_search_term);
                    }
                })
            );
        });

        setData3(filteredData2);
    }

    React.useEffect(() => {
        filter();
    }, [minDate, maxDate, invoice_search_term]);

    function change_daily_account_status(id, status) {
        const data = {
            id: id,
            status: status,
        };
        fetch(`http://localhost:5003/daily_account/change_status`, {
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
            <Create_daily_account
                edit={edit}
                create={create}
                onCloseParent={onClose}
                fetch_daily_accounts={fetch_daily_accounts}
                daily_account_id_view={daily_account_id_view}></Create_daily_account>
        );
    }
    return (
        <div className="invoice">
            <h1>Daily_Accounts</h1>
            <button onClick={onOpen}>Create Daily_Account</button>
            <Modal
                isOpen={isOpen}
                onClose={onClose}>
                <ModalContent>
                    <ModalHeader>Create Daily_Account</ModalHeader>
                    <ModalBody>
                        <Create_daily_account
                            fetch_daily_accounts={fetch_daily_accounts}
                            onCloseParent={onClose}
                        />
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                </ModalContent>
            </Modal>

            <h1>All Filters</h1>
            <div className="all_filters">
                <div>
                    <label>Invoice Search:</label>
                    <select onChange={(e) => set_invoice_search_term(e.target.value)}>
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
                    name: 'All Daily_Accounts',
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
                                <TableColumn>Invoice</TableColumn>
                                <TableColumn>B/L Number</TableColumn>
                                <TableColumn>Daily_Account Status</TableColumn>
                                <TableColumn></TableColumn>
                                <TableColumn></TableColumn>
                                <TableColumn></TableColumn>
                            </TableHeader>
                            <TableBody>
                                {value.data.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.description}</TableCell>
                                        <TableCell>{new Date(item.date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</TableCell>
                                        <TableCell>{item.invoice}</TableCell>
                                        <TableCell>{item.bl_number}</TableCell>

                                        <TableCell>
                                            <select
                                                defaultValue={item.daily_account_status}
                                                onChange={(e) => {
                                                    change_daily_account_status(item.id, e.target.value);
                                                }}>
                                                <option value="pending">Pending</option>
                                                <option value="paid">Paid</option>
                                                <option value="partial">Partial</option>
                                            </select>
                                        </TableCell>
                                        <TableCell>
                                            <a
                                                className="button"
                                                href={`/daily_accounts/${item.id}?edit=true`}>
                                                Edit
                                            </a>
                                        </TableCell>
                                        <TableCell>
                                            <button
                                                onClick={() => {
                                                    deleteDaily_Account(item.id);
                                                }}>
                                                Delete
                                            </button>
                                        </TableCell>
                                        <TableCell>
                                            <button
                                                onClick={() => {
                                                    deleteDaily_Account(item.id);
                                                }}>
                                                Tracking
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

function Create_daily_account({ create = true, daily_account_id_view = '', edit = false, fetch_daily_accounts, onCloseParent }) {
    const [company, set_company] = React.useState([]);
    const [all_invoice, set_all_invoice] = React.useState([]);
    const [all_ship_from, set_all_ship_from] = React.useState([]);
    const [all_purchase_order, set_all_purchase_order] = React.useState([]);
    const [all_items, set_all_items] = React.useState();
    const [selected_items, set_selected_items] = React.useState([]);

    const [company_information, set_company_information] = React.useState('');
    const [daily_account_information, set_daily_account_information] = React.useState('');
    const [invoice_information, set_invoice_information] = React.useState('');
    const [ship_from_information, set_ship_from_information] = React.useState('');
    const [purchase_order_information, set_purchase_order_information] = React.useState('');
    const [extra_information, set_extra_information] = React.useState('');
    const [description, set_description] = React.useState('');
    const [daily_account_status, set_daily_account_status] = React.useState('');
    const [bank_details_information, set_bank_details_information] = React.useState('');

    const [terms_and_conditions, set_terms_and_conditions] = React.useState('');
    const [daily_account_type, set_daily_account_type] = React.useState('First Quote');
    const [bl_number, set_bl_number] = React.useState('');
    const [invoice_id, set_invoice_id] = React.useState('');
    const [invoice, set_invoice] = React.useState('');
    const [purchase_order_id, set_purchase_order_id] = React.useState('');
    const [purchase_order, set_purchase_order] = React.useState('');
    const [ship_from_id, set_ship_from_id] = React.useState('');
    const [ship_from, set_ship_from] = React.useState('');
    const [date, set_date] = React.useState(getFormattedDate());
    const [due_date, set_due_date] = React.useState(getFormattedDate());
    const [daily_account_id, set_daily_account_id] = React.useState(`INV - ${Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000}`);
    const [all_vendors, set_all_vendors] = React.useState([]);

    const [total_price, set_total_price] = React.useState(0);

    React.useEffect(() => {
        let total_price_ = 0;
        selected_items.map(function (item) {
            total_price_ = total_price_ + item.price * item.quantity;
        });
        set_total_price(total_price_);
    }, [selected_items]);
    React.useEffect(() => {
        fetchCompany();
        fetchVendor();
        fetchInvoice();
        fetchPurchase_Order();
        fetchItems();
        fetchDaily_Account();
        if (!create) {
            get_daily_account_details();
        }
    }, []);

    function getFormattedDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    function fetch_daily_accounts_handler() {
        fetch_daily_accounts();
    }

    async function get_daily_account_details() {
        const response = await fetch('http://localhost:5003/get_daily_account_details/' + daily_account_id_view);
        const data = await response.json();
        const all_items_ = JSON.parse(data['all_items']);
        set_daily_account_id(data.id);
        set_selected_items(all_items_);
        set_invoice(JSON.stringify(data.invoice));
        set_invoice_id(data.invoice.id);
        set_purchase_order(JSON.stringify(data.purchase_order));
        set_purchase_order_id(data.purchase_order.id);
        set_ship_from(JSON.stringify(data.ship_from));
        set_ship_from_id(data.ship_from.id);
        set_invoice_information(
            <div>
                <div>{data.invoice.name}</div>
                <div>{data.invoice.address1}</div>
                <div>{data.invoice.address2}</div>
            </div>
        );
        set_purchase_order_information(
            <div>
                <div>{data.purchase_order.name}</div>
                <div>{data.purchase_order.address1}</div>
                <div>{data.purchase_order.address2}</div>
            </div>
        );
        set_ship_from_information(
            <div>
                <div>{data.ship_from.name}</div>
                <div>{data.ship_from.address1}</div>
                <div>{data.ship_from.address2}</div>
            </div>
        );
        set_daily_account_type(data.type);
        set_terms_and_conditions(data.terms);
        set_extra_information(data.extra_info);
        set_daily_account_status(data.daily_account_status);
        set_description(data.description);
        set_bank_details_information(data.bank_details);
        set_bl_number(data.bl_number);

        var dateObject = new Date(data.date);
        var year = dateObject.getFullYear();
        var month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
        var day = dateObject.getDate().toString().padStart(2, '0');
        set_date(`${year}-${month}-${day}`);
    }

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
    function fetchVendor() {
        fetch('http://localhost:5003/get/vendor')
            .then((response) => response.json())
            .then((data) => {
                set_all_vendors(data);
            })
            .catch((error) => {
                console.error('Error fetching all vendor:', error);
            });
    }
    function fetchDaily_Account() {
        fetch('http://localhost:5003/get/daily_account')
            .then((response) => response.json())
            .then((data) => {
                // setda(data);
            })
            .catch((error) => {
                console.error('Error fetching daily_account:', error);
            });
    }
    function fetchCompany() {
        fetch('http://localhost:5003/get/company')
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
    function fetchInvoice() {
        fetch('http://localhost:5003/get/invoice')
            .then((response) => response.json())
            .then((data) => {
                set_all_invoice(data);
                data = data[0];
                set_invoice_id(data.id);
                set_invoice_information(
                    <div>
                        <div>{data.name}</div>
                        <div>{data.address1}</div>
                        <div>{data.address2}</div>
                    </div>
                );
            })
            .catch((error) => {
                console.error('Error fetching daily_account data:', error);
            });
    }

    function fetchPurchase_Order() {
        fetch('http://localhost:5003/get/purchase_order')
            .then((response) => response.json())
            .then((data) => {
                set_all_purchase_order(data);
                data = data[0];
                set_purchase_order_id(data.id);
                set_purchase_order_information(
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
    function fetchItems() {
        console.log('here 2');
        fetch('http://localhost:5003/get/item')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                set_all_items(data);
            })
            .catch((error) => {
                console.error('Error fetching items data:', error);
            });
    }

    function createDaily_Account() {
        const daily_accountData = {
            id: daily_account_id,
            invoice_id: invoice_id,
            purchase_order_id: purchase_order_id,
            ship_from_id: ship_from_id,
            bank_details: bank_details_information,
            date: date,
            due_date: due_date,
            terms: terms_and_conditions,
            type: daily_account_type,
            extra_info: extra_information,
            daily_account_status: daily_account_status,
            description: description,
            bl_number: bl_number,
            all_items: selected_items,
            edit: edit,
        };

        fetch('http://localhost:5003/create/daily_account/' + daily_account_id, {
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

    const { toPDF, targetRef } = usePDF({ filename: daily_account_id + ' - Invoice -' + invoice.name + ' Date: ' + date + '.pdf' });

    function createPDF() {
        createDaily_Account();
        // toPDF();
        fetch_daily_accounts_handler();
        onClose();
        set_daily_account_id(`INV - ${Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000}`);
        onCloseParent();
    }

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currency, set_currency] = React.useState('USD');
    return (
        <div className="daily_account">
            <h1>Daily_Account Details</h1>
            <h2>{daily_account_id}</h2>

            <div className="all_inputs all_inputs2">
                {/* description 
                    date
                    purchase_order_id 
                    invoice_id  */}

                <div className="input_field">
                    <div className="title">Invoice</div>
                    <div className="input">
                        <select
                            value={invoice}
                            onChange={(e) => {
                                let value = e.target.value;
                                let data = JSON.parse(value);
                                set_invoice_id(data.id);
                                set_invoice(value);
                                set_invoice_information(
                                    <div>
                                        <div>{data.name}</div>
                                        <div>{data.address1}</div>
                                        <div>{data.address2}</div>
                                    </div>
                                );
                            }}>
                            {all_invoice.map(function (invoice) {
                                return (
                                    <option
                                        key={JSON.stringify(invoice)}
                                        value={JSON.stringify(invoice)}>
                                        {invoice.id + ' | Date: ' + invoice.date + ' | ' + invoice.description}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
                <div className="input_field">
                    <div className="title">Purchase Order</div>
                    <div className="input">
                        <select
                            value={purchase_order}
                            onChange={(e) => {
                                let value = e.target.value;
                                let data = JSON.parse(value);
                                set_purchase_order_id(data.id);
                                set_purchase_order(value);
                                set_purchase_order_information(
                                    <div>
                                        <div>{data.name}</div>
                                        <div>{data.address1}</div>
                                        <div>{data.address2}</div>
                                    </div>
                                );
                            }}>
                            {all_purchase_order.map(function (purchase_order) {
                                return (
                                    <option
                                        key={JSON.stringify(purchase_order)}
                                        value={JSON.stringify(purchase_order)}>
                                        {purchase_order.id + ' | Date: ' + purchase_order.date + ' | ' + purchase_order.description}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
         

                <div className="input_field">
                    <div className="title">Date</div>
                    <div className="input">
                        <input
                            value={date}
                            type="date"
                            onChange={(e) => {
                                set_date(e.target.value);
                            }}
                        />
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
            <div className="input_field">
                <div className="input">
                    <table
                        id="daily_account-table"
                        className="table table-striped">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                                <th>Vendor</th>
                                <th>Vendor Cost</th>
                                <th>Profit</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selected_items.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <input
                                            type="text"
                                            value={item.name}
                                            onChange={(e) => edit_daily_account_fields(index, 'name', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={item.description}
                                            onChange={(e) => edit_daily_account_fields(index, 'description', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={item.price}
                                            onChange={(e) => edit_daily_account_fields(index, 'price', parseFloat(e.target.value))}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => edit_daily_account_fields(index, 'quantity', parseFloat(e.target.value))}
                                        />
                                    </td>
                                    <td>{(item.price * item.quantity).toFixed(2)}</td>

                                    <td>
                                        <select
                                            value={item.vendor_id}
                                            onChange={(e) => edit_daily_account_fields(index, 'vendor_id', parseFloat(e.target.value))}>
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
                                            value={item.vendor_cost}
                                            onChange={(e) => edit_daily_account_fields(index, 'vendor_cost', parseFloat(e.target.value))}
                                        />
                                    </td>
                                    <td>{item.price - item.vendor_cost}</td>
                                    <td>
                                        <button onClick={() => removeItem(index)}>Remove</button> {/* Button to remove item */}
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td>
                                    <select onChange={(e) => add_new_daily_account_item(e)}>
                                        <option value="none">New Item</option>
                                        <option value="blank">Blank Item</option>
                                        {all_items &&
                                            all_items.map(function (item) {
                                                return (
                                                    <option
                                                        key={JSON.stringify(item)}
                                                        value={JSON.stringify(item)}>
                                                        {item.name} - {item.price} Price
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <strong>Total Price of all items: </strong>
                                </td>

                                <td>
                                    {' '}
                                    {currency} {total_price}
                                </td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            <button onClick={createPDF}>Create Daily_Account</button>
        </div>
    );
}
