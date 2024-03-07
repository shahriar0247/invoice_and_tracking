'use client';

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react';
import React from 'react';
import { usePDF } from 'react-to-pdf';
import { Accordion, AccordionItem } from '@nextui-org/react';

export default function ItemHistorys({ create = true, item_history_id_view = '' }) {
    const [data, setData] = React.useState([]);
    const [all_data, set_all_data] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const [vendor_search_term, set_vendor_search_term] = React.useState('');
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
        fetch_item_history();

        try {
            const urlParams = new URLSearchParams(window.location.search);
            const edit = urlParams.get('edit');
            set_edit(edit === 'true');
        } catch (error) {
            console.log(error);
        }
    }, []);

    function fetch_item_history() {
        fetch('http://89.116.50.93:5003/get/item_history')
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                set_all_data(data);
                setUsers(getUniqueUsers(data));
            })
            .catch((error) => {
                console.error('Error fetching item_history:', error);
            });
    }

    const { isOpen, onOpen, onClose } = useDisclosure();
    function getUniqueUsers(data) {
        const uniqueUsers = [...new Set(data.map((item) => item.vendor))];
        return uniqueUsers;
    }
    function deleteItemHistory(item_historyId) {
        fetch(`http://89.116.50.93:5003/delete/item_history/${item_historyId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    alert('ItemHistory deleted successfully');
                    window.location.reload();
                } else {
                    alert('Failed to delete item_history');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    function filter() {
        var filteredData = all_data.filter(function (item_history) {
            if (item_history.vendor.includes(vendor_search_term)) {
                return true;
            }
        });

        var filteredData2 = filteredData.filter(function (item_history) {
            return (
                (minDate === '' || new Date(item_history.date) >= new Date(minDate)) &&
                (maxDate === '' || new Date(item_history.date) <= new Date(maxDate)) &&
                Object.values(item_history).some(function (value) {
                    if (value) {
                        return value.toLowerCase().includes(vendor_search_term);
                    }
                })
            );
        });

        setData(filteredData2);
    }

    React.useEffect(() => {
        filter();
    }, [minDate, maxDate, vendor_search_term]);

    function change_item_history_status(id, status) {
        const data = {
            id: id,
            status: status,
        };
        fetch(`http://89.116.50.93:5003/item_history/change_status`, {
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
            <Create_item_history
                edit={edit}
                create={create}
                onCloseParent={onClose}
                fetch_item_history={fetch_item_history}
                item_history_id_view={item_history_id_view}></Create_item_history>
        );
    }
    return (
        <div className="invoice">
            <h1>Item History</h1>
            <button onClick={onOpen}>Create Item History</button>
            <Modal
                isOpen={isOpen}
                onClose={onClose}>
                <ModalContent>
                    <ModalHeader>Create ItemHistory</ModalHeader>
                    <ModalBody>
                        <Create_item_history
                            fetch_item_history={fetch_item_history}
                            onCloseParent={onClose}
                        />
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                </ModalContent>
            </Modal>

            <h1>All Filters</h1>
            <div className="all_filters">
                <div>
                    <label>Vendor Search:</label>
                    <select onChange={(e) => set_vendor_search_term(e.target.value)}>
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
                    name: 'All Item Historys',
                    data: data,
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
                                <TableColumn></TableColumn>
                                <TableColumn></TableColumn>
                            </TableHeader>
                            <TableBody>
                                {value.data.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.description}</TableCell>
                                        <TableCell>{new Date(item.date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</TableCell>
                                       
                                        <TableCell>
                                            <a
                                                className="button"
                                                href={`/item_history/${item.id}?edit=true`}>
                                                Edit
                                            </a>
                                        </TableCell>
                                        <TableCell>
                                            <button
                                                onClick={() => {
                                                    deleteItemHistory(item.id);
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

function Create_item_history({ create = true, item_history_id_view = '', edit = false, fetch_item_history, onCloseParent }) {
    const [company, set_company] = React.useState([]);
    const [all_vendor, set_all_vendor] = React.useState([]);
    const [all_ship_from, set_all_ship_from] = React.useState([]);
    const [all_invoice, set_all_invoice] = React.useState([]);
    const [all_items, set_all_items] = React.useState();
    const [selected_items, set_selected_items] = React.useState([]);

    const [company_information, set_company_information] = React.useState('');
    const [item_history_information, set_item_history_information] = React.useState('');
    const [vendor_information, set_vendor_information] = React.useState('');
    const [ship_from_information, set_ship_from_information] = React.useState('');
    const [invoice_information, set_invoice_information] = React.useState('');
    const [extra_information, set_extra_information] = React.useState('');
    const [description, set_description] = React.useState('');
    const [item_history_status, set_item_history_status] = React.useState('');
    const [bank_details_information, set_bank_details_information] = React.useState('');
    const [invoices, set_invoices] = React.useState([]);

    const [terms_and_conditions, set_terms_and_conditions] = React.useState('');
    const [item_history_type, set_item_history_type] = React.useState('First Quote');
    const [bl_number, set_bl_number] = React.useState('');
    const [vendor, set_vendor] = React.useState('');
    const [invoice_id, set_invoice_id] = React.useState('');
    const [invoice, set_invoice] = React.useState('');
    const [ship_from_id, set_ship_from_id] = React.useState('');
    const [ship_from, set_ship_from] = React.useState('');
    const [date, set_date] = React.useState(getFormattedDate());
    const [due_date, set_due_date] = React.useState(getFormattedDate());
    const [item_history_id, set_item_history_id] = React.useState(`IH - ${Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000}`);

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
        fetchItems();
        fetchInvoices();
        fetchVendor();
        if (!create) {
            get_item_history_details();
        }
    }, []);
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
    function getFormattedDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    function fetch_item_history_handler() {
        fetch_item_history();
    }

    async function get_item_history_details() {
        const response = await fetch('http://89.116.50.93:5003/get_item_history_details/' + item_history_id_view);
        const data = await response.json();
        const all_items_ = JSON.parse(data['all_items']);
        set_item_history_id(data.id);
        set_selected_items(all_items_);
        set_description(data.description);

        var dateObject = new Date(data.date);
        var year = dateObject.getFullYear();
        var month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
        var day = dateObject.getDate().toString().padStart(2, '0');
        set_date(`${year}-${month}-${day}`);

     
    }

    const edit_item_history_fields = (index, field, value) => {
        const updatedItems = [...selected_items];
        updatedItems[index][field] = value;
        set_selected_items(updatedItems);
    };

    const add_new_item_history_item = (event) => {
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
        fetch('http://89.116.50.93:5003/get/vendor')
            .then((response) => response.json())
            .then((data) => {
                set_all_vendors(data);
            })
            .catch((error) => {
                console.error('Error fetching all vendor:', error);
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

    function createItemHistory() {
        const item_historyData = {
            id: item_history_id,
            date: date,
            description: description,
            all_items: selected_items,
            edit: edit,
        };

        fetch('http://89.116.50.93:5003/create/item_history/' + item_history_id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item_historyData),
        })
            .then((response) => {
                if (response.ok) {
                    alert('ItemHistory created successfully');
                } else {
                    alert('Failed to create item_history');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const { toPDF, targetRef } = usePDF({ filename: item_history_id + ' - Vendor -' + vendor.name + ' Date: ' + date + '.pdf' });

    function createPDF() {
        createItemHistory();
        set_item_history_id(`IH - ${Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000}`);
        fetch_item_history_handler();
        // toPDF();
        onClose();
        onCloseParent();
        window.location.reload()
    }

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currency, set_currency] = React.useState('USD');
    return (
        <div className="invoice">
            <h1>Item History Details</h1>
            <h2>{item_history_id}</h2>

            <div className="all_inputs">
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
            <h2>PO Items</h2>
            <div className="input_field all_items_po">
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
                            {selected_items.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <input
                                            type="text"
                                            value={item.name}
                                            onChange={(e) => edit_item_history_fields(index, 'name', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={item.description}
                                            onChange={(e) => edit_item_history_fields(index, 'description', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={item.price}
                                            onChange={(e) => edit_item_history_fields(index, 'price', parseFloat(e.target.value))}
                                        />
                                    </td>
                                    <td>
                                        <select
                                            value={item.vendor_id}
                                            onChange={(e) => edit_item_history_fields(index, 'vendor_id', parseFloat(e.target.value))}>
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
                                            onChange={(e) => edit_item_history_fields(index, 'quantity', parseFloat(e.target.value))}
                                        />
                                    </td>
                                    <td>{(item.price * item.quantity).toFixed(2)}</td>
                                    <td>
                                        <button onClick={() => removeItem(index)}>Remove</button> {/* Button to remove item */}
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td>
                                    <select onChange={(e) => add_new_item_history_item(e)}>
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
                                <td></td>
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
            <h2>All Invoices</h2>

            <Accordion>
                {invoices.map((invoice) => {
                    return (
                        <AccordionItem
                            className="input_field"
                            key={invoice.id}
                            aria-label={invoice.description}
                            title={
                                invoice.id +
                                ' ' +
                                invoice.description +
                                ' ' +
                                new Date(invoice.date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) +
                                ' ' +
                                invoice.vendor
                            }>
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
                                                    <button onClick={() => set_selected_items([...selected_items, item])}>Add</button>
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
            <button onClick={createPDF}>Create Item History</button>
        </div>
    );
}
