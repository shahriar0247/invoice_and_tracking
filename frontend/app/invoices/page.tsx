'use client';

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react';
import React from 'react';
import { usePDF } from 'react-to-pdf';

export default function Invoices({create=true, invoice_id_view=""}) {
    const [data, setData] = React.useState([]);
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        fetch_invoices();
    }, []);

    function fetch_invoices() {
        fetch('http://localhost:5003/get/invoice')
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                // setUsers(getUniqueUsers(data));
            })
            .catch((error) => {
                console.error('Error fetching invoices:', error);
            });
    }

    const { isOpen, onOpen, onClose } = useDisclosure();

    if (!create){
        return <Create_invoice create={create} invoice_id_view={invoice_id_view}></Create_invoice>;
    }
    return (
        <div className="invoice">
            <h1>Invoices</h1>
            <button onClick={onOpen}>Create Invoice</button>
            <Modal
                isOpen={isOpen}
                onClose={onClose}>
                <ModalContent>
                    <ModalHeader>Create Invoice</ModalHeader>
                    <ModalBody>
                        <Create_invoice />
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
                    <TableColumn>Date</TableColumn>
                    <TableColumn>Due Date</TableColumn>
                    <TableColumn>Bill To</TableColumn>
                    <TableColumn>Ship To</TableColumn>
                    <TableColumn>Ship From</TableColumn>
                    <TableColumn></TableColumn>
                </TableHeader>
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.date}</TableCell>
                            <TableCell>{item.due_date}</TableCell>
                            <TableCell>{item.bill_to}</TableCell>
                            <TableCell>{item.ship_to}</TableCell>
                            <TableCell>{item.ship_from}</TableCell>
                            <TableCell>
                                <a
                                    className="button"
                                    href={`/invoices/${item.id}`}>
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

function Create_invoice({ create = true, invoice_id_view = "" }) {
    const [company, set_company] = React.useState([]);
    const [all_bill_to, set_all_bill_to] = React.useState([]);
    const [all_ship_from, set_all_ship_from] = React.useState([]);
    const [all_ship_to, set_all_ship_to] = React.useState([]);
    const [all_items, set_all_items] = React.useState();
    const [selected_items, set_selected_items] = React.useState([]);

    const [company_information, set_company_information] = React.useState('');
    const [invoice_information, set_invoice_information] = React.useState('');
    const [bill_to_information, set_bill_to_information] = React.useState('');
    const [ship_from_information, set_ship_from_information] = React.useState('');
    const [ship_to_information, set_ship_to_information] = React.useState('');
    const [extra_information, set_extra_information] = React.useState('');
    const [bank_details_information, set_bank_details_information] = React.useState('');

    const [terms_and_conditions, set_terms_and_conditions] = React.useState('');
    const [invoice_type, set_invoice_type] = React.useState('First Quote');
    const [bl_number, set_bl_number] = React.useState('');
    const [bill_to_id, set_bill_to_id] = React.useState('');
    const [ship_to_id, set_ship_to_id] = React.useState('');
    const [ship_from_id, set_ship_from_id] = React.useState('');
    const [date, set_date] = React.useState('');
    const [due_date, set_due_date] = React.useState('');
    const [invoice_id, set_invoice_id] = React.useState(`INV - ${Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000}`);

    const [total_price, set_total_price] = React.useState(0);

    React.useEffect(() => {
        let total_price_ = 0;
        selected_items.map(function (item) {
            total_price_ = total_price_ + item.price * item.quantity;
        });
        set_total_price(total_price_);
    }, [selected_items]);
    React.useEffect(() => {
        console.log(bill_to_id);
    });
    React.useEffect(() => {
        fetchCompany();
        fetchBillTo();
        fetchShipFrom();
        fetchShipTo();
        fetchItems();
        fetchInvoice();
        if (!create) {
            get_invoice_details();
        }
    }, []);

    async function get_invoice_details() {
        const response = await fetch('http://localhost:5003/get_invoice_details/' + invoice_id_view);
        const data = await response.json();
        console.log(data);
        const all_items_ = JSON.parse(data['all_items']);
        set_selected_items(all_items_);
        set_bill_to_id(data.bill_to);
        set_ship_to_id(data.ship_to);
        set_ship_from_id(data.ship_from);
        set_invoice_type(data.type);
        set_terms_and_conditions(data.terms);
        set_extra_information(data.extra_info);
        set_bank_details_information(data.bank_details);
        set_bl_number(data.bl_number);
        set_invoice_id(data.id);

        const dateObject = new Date(data.date);
        const year = dateObject.getFullYear();
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
        const day = dateObject.getDate().toString().padStart(2, '0');
        set_date(`${year}-${month}-${day}`);
    }

    const edit_invoice_fields = (index, field, value) => {
        const updatedItems = [...selected_items];
        updatedItems[index][field] = value;
        set_selected_items(updatedItems);
    };

    const add_new_invoice_item = (event) => {
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
    function fetchInvoice() {
        fetch('http://localhost:5003/get/invoice')
            .then((response) => response.json())
            .then((data) => {
                // setda(data);
            })
            .catch((error) => {
                console.error('Error fetching invoice:', error);
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
    function fetchBillTo() {
        fetch('http://localhost:5003/get/type/bill_to')
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
                console.error('Error fetching invoice data:', error);
            });
    }
    function fetchShipFrom() {
        fetch('http://localhost:5003/get/type/ship_from')
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
        fetch('http://localhost:5003/get/type/ship_to')
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

    function createInvoice() {
        const invoiceData = {
            id: invoice_id,
            bill_to_id: bill_to_id,
            ship_to_id: ship_to_id,
            ship_from_id: ship_from_id,
            bank_details: bank_details_information,
            date: date,
            due_date: due_date,
            terms: terms_and_conditions,
            type: invoice_type,
            extra_info: extra_information,
            bl_number: bl_number,
            all_items: selected_items,
        };
        console.log('invoiceData');
        console.log(invoiceData);

        fetch('http://localhost:5003/create/invoice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(invoiceData),
        })
            .then((response) => {
                if (response.ok) {
                    alert('Invoice created successfully');
                } else {
                    alert('Failed to create invoice');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    function deleteInvoice(invoiceId) {
        fetch(`/delete/invoice/${invoiceId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    alert('Invoice deleted successfully');
                } else {
                    alert('Failed to delete invoice');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    function editInvoice(invoiceId) {
        const updatedInvoiceData = {
            date: '2023-11-07', // Replace with updated data
            terms: 'Net 45', // Replace with updated data
            invoice1: 'Jane Smith', // Replace with updated data
            // Add other fields as needed
        };

        fetch(`/edit/invoice/${invoiceId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedInvoiceData),
        })
            .then((response) => {
                if (response.ok) {
                    alert('Invoice updated successfully');
                } else {
                    alert('Failed to update invoice');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const { toPDF, targetRef } = usePDF({ filename: invoice_id + '.pdf' });

    function createPDF() {
        createInvoice();
        toPDF();
    }

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <div className="invoice">
            <h1>Invoice Details</h1>

            <div className="all_inputs all_inputs2">
                <div className="input_field">
                    <div className="title">Bill To</div>
                    <div className="input">
                        <select
                            value={bill_to_id}
                            onChange={(e) => {
                                let value = e.target.value;
                                let data = JSON.parse(value);
                                set_bill_to_id(data.id);
                                set_bill_to_information(
                                    <div>
                                        <div>{data.name}</div>
                                        <div>{data.address1}</div>
                                        <div>{data.address2}</div>
                                    </div>
                                );
                            }}>
                            {all_bill_to.map(function (bill_to) {
                                return <option value={bill_to.id}>{bill_to.name}</option>;
                            })}
                        </select>
                    </div>
                </div>
                <div className="input_field">
                    <div className="title">Ship To</div>
                    <div className="input">
                        <select
                            value={ship_to_id}
                            onChange={(e) => {
                                let value = e.target.value;
                                let data = JSON.parse(value);
                                set_ship_to_id(data.id);
                                set_ship_to_information(
                                    <div>
                                        <div>{data.name}</div>
                                        <div>{data.address1}</div>
                                        <div>{data.address2}</div>
                                    </div>
                                );
                            }}>
                            {all_ship_to.map(function (ship_to) {
                                return <option value={ship_to.id}>{ship_to.name}</option>;
                            })}
                        </select>
                    </div>
                </div>
                <div className="input_field">
                    <div className="title">Ship From</div>
                    <div className="input">
                        <select
                            value={ship_from_id}
                            onChange={(e) => {
                                let value = e.target.value;
                                let data = JSON.parse(value);
                                set_ship_from_id(data.id);
                                set_ship_from_information(
                                    <div>
                                        <div>{data.name}</div>
                                        <div>{data.address1}</div>
                                        <div>{data.address2}</div>
                                    </div>
                                );
                            }}>
                            {all_ship_from.map(function (ship_from) {
                                return <option value={ship_from.id}>{ship_from.name}</option>;
                            })}
                        </select>
                    </div>
                </div>

                <div className="input_field">
                    <div className="title">Bank Details</div>
                    <div className="input">
                        <textarea
                            type="text"
                            value={bank_details_information}
                            onChange={(e) => set_bank_details_information(e.target.value)}
                        />
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
                    <div className="title">Due Date</div>
                    <div className="input">
                        <input
                            value={due_date}
                            type="date"
                            onChange={(e) => {
                                set_due_date(e.target.value);
                            }}
                        />
                    </div>
                </div>

                <div className="input_field">
                    <div className="title">Terms</div>
                    <div className="input">
                        <textarea
                            value={terms_and_conditions}
                            name=""
                            id=""
                            cols="30"
                            rows="10"
                            onChange={(e) => {
                                let value = e.target.value;
                                set_terms_and_conditions(value);
                            }}></textarea>
                    </div>
                </div>
                <div className="input_field">
                    <div className="title">Type</div>
                    <div className="input">
                        <select
                            value={invoice_type}
                            onChange={(e) => {
                                set_invoice_type(e.target.value);
                            }}>
                            <option value="First Quote">First Quote</option>
                            <option value="Final Quote">Final Quote</option>
                            <option value="Invoice">Invoice</option>
                        </select>
                    </div>
                </div>
                <div className="input_field">
                    <div className="title">Extra Info</div>
                    <div className="input">
                        <textarea
                            value={extra_information}
                            name=""
                            id=""
                            cols="30"
                            rows="10"
                            onChange={(e) => {
                                set_extra_information(e.target.value);
                            }}></textarea>
                    </div>
                </div>
                <div className="input_field">
                    <div className="title">B/L number #</div>
                    <div className="input">
                        <input
                            type="text"
                            value={bl_number}
                            onChange={(e) => {
                                set_bl_number(e.target.value);
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="input_field">
                <div className="input">
                    <table
                        id="invoice-table"
                        className="table table-striped">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Currency</th>
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
                                            onChange={(e) => edit_invoice_fields(index, 'name', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={item.description}
                                            onChange={(e) => edit_invoice_fields(index, 'description', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={item.price}
                                            onChange={(e) => edit_invoice_fields(index, 'price', parseFloat(e.target.value))}
                                        />
                                    </td>
                                    <td>
                                        <select
                                            value={item.currency}
                                            onChange={(e) => edit_invoice_fields(index, 'currency', e.target.value)}
                                            id="">
                                            <option value="">Select</option>
                                            <option value="USD">USD</option>
                                            <option value="CAD">CAD</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => edit_invoice_fields(index, 'quantity', parseInt(e.target.value))}
                                        />
                                    </td>
                                    <td>{item.price * item.quantity}</td>
                                    <td>
                                        <button onClick={() => removeItem(index)}>Remove</button> {/* Button to remove item */}
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td>
                                    <select onChange={(e) => add_new_invoice_item(e)}>
                                        <option value="none">New Item</option>
                                        <option value="blank">Blank Item</option>
                                        {all_items &&
                                            all_items.map(function (item) {
                                                return (
                                                    <option value={JSON.stringify(item)}>
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

                                <td> {total_price}</td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            <button onClick={onOpen}>View Invoice</button>

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
                                <h4>{invoice_type}</h4>
                                <div className="first_section">
                                    <div className="company_information">{company_information}</div>
                                    <div className="invoice_information">
                                        <br />
                                        <br />

                                        <h1>{invoice_id}</h1>
                                        <div>Date: {date}</div>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: invoice_information.replace(/\n/g, '<br>'),
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
                                                        {item.price} {item.currency}
                                                    </TableCell>
                                                    <TableCell>{item.quantity}</TableCell>
                                                    <TableCell>
                                                        {item.price * item.quantity} {item.currency}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
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
                        <button onClick={createPDF}>Create Invoice</button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}
