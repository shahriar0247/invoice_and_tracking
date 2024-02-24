'use client';

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react';
import React from 'react';
import { usePDF } from 'react-to-pdf';
import DTable from '../components/DTable';

export default function Invoices({ type = null, create = true, invoice_id_view = '' }) {
    const [data1, setData1] = React.useState([]);
    const [data2, setData2] = React.useState([]);
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
        fetch_invoices();

        try {
            const urlParams = new URLSearchParams(window.location.search);
            const edit = urlParams.get('edit');
            set_edit(edit === 'true');
        } catch (error) {
            console.log(error);
        }
    }, []);

    function fetch_invoices() {
        fetch('http://86.38.217.198:5003/get/invoice')
            .then((response) => response.json())
            .then((data) => {
                setData1(data.filter((item) => item.type === 'First Quote'));
                setData2(data.filter((item) => item.type === 'Final Quote'));
                setData3(data.filter((item) => item.type === 'Invoice'));

                set_all_data(data);
                setUsers(getUniqueUsers(data));
            })
            .catch((error) => {
                console.error('Error fetching invoices:', error);
            });
    }

    const { isOpen, onOpen, onClose } = useDisclosure();
    function getUniqueUsers(data) {
        const uniqueUsers = [...new Set(data.map((item) => item.bill_to))];
        return uniqueUsers;
    }
    function deleteInvoice(invoiceId) {
        fetch(`http://86.38.217.198:5003/delete/invoice/${invoiceId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    alert('Invoice deleted successfully');
                    window.location.reload();
                } else {
                    alert('Failed to delete invoice');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    function filter() {
        var filteredData = all_data.filter(function (invoice) {
            if (invoice.bill_to.includes(bill_to_search_term)) {
                console.log(bill_to_search_term)
                return true;
            }
        });

        var filteredData2 = filteredData.filter(function (invoice) {
            return (
                (minDate === '' || new Date(invoice.date) >= new Date(minDate)) &&
                (maxDate === '' || new Date(invoice.date) <= new Date(maxDate))
            );
        });

        setData1(filteredData2.filter((item) => item.type === 'First Quote'));
        setData2(filteredData2.filter((item) => item.type === 'Final Quote'));
        setData3(filteredData2.filter((item) => item.type === 'Invoice'));
    }

    React.useEffect(() => {
        filter();
    }, [minDate, maxDate, bill_to_search_term]);

    function change_invoice_status(id, status) {
        const data = {
            id: id,
            status: status,
        };
        fetch(`http://86.38.217.198:5003/invoice/change_status`, {
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
            <Create_invoice
                edit={edit}
                create={create}
                onCloseParent={onClose}
                fetch_invoices={fetch_invoices}
                invoice_id_view={invoice_id_view}></Create_invoice>
        );
    }
    let all_data_array;
    if (type == "shipment") {
        all_data_array = [
            {
                name: 'All First Quotes',
                data: data1,
            }]
    }
    else {
        all_data_array = [
            {
                name: 'All Invoices',
                data: data3,
            },
            {
                name: 'All Final Quotes',
                data: data2,
            },

        ];
    }

    const headers = ['ID', 'Date', 'Bill To', "BL Number", "Actions"]
    const columns = ['id', 'date', 'bill_to', 'bl_number', 'invoice_actions']


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
                        <Create_invoice
                            fetch_invoices={fetch_invoices}
                            onCloseParent={onClose}
                        />
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                </ModalContent>
            </Modal>

            <h1>All Filters</h1>
            <div className="all_filters">
                <div>
                    {type == "shipment" ? <label>Advise To Search:</label> : <label>Bill To Search:</label>}

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
            {type == "shipment" ? console.log('hi') :
                <CreateSummary_Container data3={data3}></CreateSummary_Container>
            }

            {all_data_array.map((value, index) => {
                console.log(data3)
                return (
                    <div key={value.name}>
                        <h2>{value.name}</h2>
                        <DTable headers={headers} columns={columns} table_data={value.data} delete_function={deleteInvoice} custom_function={[change_invoice_status]}></DTable>


                    </div>
                );
            })}
        </div>
    );
}
function CreateSummary_Container(data3) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <div>
            <button onClick={onOpen}>Create Summary</button>
            <Modal
                isOpen={isOpen}
                onClose={onClose}>
                <ModalContent>
                    <ModalHeader>Create Summary</ModalHeader>
                    <ModalBody>
                        <CreateSummary data3={data3} />
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}
function CreateSummary(data3) {
    const [currency, set_currency] = React.useState('USD');
    const [header, set_header] = React.useState('');
    const [footer, set_footer] = React.useState('');
    const { toPDF, targetRef } = usePDF({ filename: 'Summary.pdf', size: 'A4' });
    const totalPriceOfAllItems = data3.data3.data3.flatMap((invoice) => JSON.parse(invoice.all_items || '[]').map((item) => item.price)).reduce((acc, price) => acc + price, 0);
    function download_excel() {
        let excel_data = [
            ["ID",
                "Date",
                "Bill To",
                "B/L Number",
                "Total Value",
            ]
        ]
        data3.data3.data3.map(function (item) {
            let date = (new Date(item.date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }));
            let total_price = JSON.parse(item.all_items).reduce((acc, item) => acc + item.price * item.quantity, 0) + " " + currency
            excel_data.push([item.id, date, item.bill_to, item.bl_number, total_price])
        })
        excel_data.push(["", "", "", "", "Total Price: " + totalPriceOfAllItems.toFixed(2) + " " + currency])

        fetch("http://86.38.217.198:5003/daily_accounts/download", {

            method: "post",
            body: JSON.stringify(excel_data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => res.blob())
            .then(blob => {
                var file = window.URL.createObjectURL(blob);
                window.location.assign(file);
            });
    }
    return (
        <div>
            <div className='create_summary'>
                <div className="all_inputs all_inputs2">

                    <div className="input_field">

                        <label htmlFor="">Currency: </label>
                        <select name="" id="" onChange={(e) => { set_currency(e.target.value) }}>
                            <option value="USD">USD</option>
                            <option value="CAD">CAD</option>
                        </select>

                    </div>

                    <div className="input_field">
                        <label htmlFor="">Header</label>
                        <textarea type="text" value={header} onChange={(e) => { set_header(e.target.value) }} />
                    </div>

                    <div className="input_field">
                        <label htmlFor="">Footer</label>
                        <textarea type="text" value={footer} onChange={(e) => set_footer(e.target.value)} />
                    </div>

                    <div className="input_field">
                        <button onClick={() => {
                            const summaryPrintElement = targetRef.current;
                            toPDF();
                        }}>
                            Download PDF
                        </button>

                    </div>
                    <div className="input_field">
                        <button onClick={download_excel}>Download Excel</button>

                    </div>
                </div>
                <div className='summary_print' ref={targetRef}>

                    <center>
                        <h2>{header}</h2>
                    </center>
                    <Table>
                        <TableHeader>
                            <TableColumn>ID</TableColumn>
                            <TableColumn>Date</TableColumn>
                            <TableColumn>Bill To</TableColumn>
                            <TableColumn>B/L Number</TableColumn>
                            <TableColumn>Total Value</TableColumn>
                        </TableHeader>
                        <TableBody>

                            {data3.data3.data3.map(function (item) {
                                return (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{new Date(item.date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</TableCell>
                                        <TableCell>{item.bill_to}</TableCell>
                                        <TableCell>{item.bl_number}</TableCell>
                                        <TableCell>{JSON.parse(item.all_items).reduce((acc, item) => acc + item.price * item.quantity, 0) + " " + currency}</TableCell>
                                    </TableRow>
                                )
                            })}
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell>Total Price: {totalPriceOfAllItems.toFixed(2)} {currency}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <center>
                        <h2>{footer}</h2>
                    </center>
                </div>
            </div>

        </div>
    );
}
function Create_invoice({ create = true, invoice_id_view = '', edit = false, fetch_invoices, onCloseParent }) {
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
    const [description, set_description] = React.useState('');
    const [invoice_status, set_invoice_status] = React.useState('');
    const [bank_details_information, set_bank_details_information] = React.useState('');

    const [terms_and_conditions, set_terms_and_conditions] = React.useState('');
    const [invoice_type, set_invoice_type] = React.useState('First Quote');
    const [bl_number, set_bl_number] = React.useState('');
    const [bill_to_id, set_bill_to_id] = React.useState('');
    const [bill_to, set_bill_to] = React.useState('');
    const [ship_to_id, set_ship_to_id] = React.useState('');
    const [ship_to, set_ship_to] = React.useState('');
    const [ship_from_id, set_ship_from_id] = React.useState('');
    const [ship_from, set_ship_from] = React.useState('');
    const [date, set_date] = React.useState(getFormattedDate());
    const [due_date, set_due_date] = React.useState(getFormattedDate());
    const [invoice_id, set_invoice_id] = React.useState(`INV - ${Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000}`);
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
        fetchBillTo();
        fetchShipFrom();
        fetchShipTo();
        fetchItems();
        fetchInvoice();
        if (!create) {
            get_invoice_details();
        }
    }, []);

    function getFormattedDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    function fetch_invoices_handler() {
        fetch_invoices();
    }

    async function get_invoice_details() {
        const response = await fetch('http://86.38.217.198:5003/get_invoice_details/' + invoice_id_view);
        const data = await response.json();
        const all_items_ = JSON.parse(data['all_items']);
        set_invoice_id(data.id);
        set_selected_items(all_items_);
        set_bill_to(JSON.stringify(data.bill_to));
        set_bill_to_id(data.bill_to.id);
        set_ship_to(JSON.stringify(data.ship_to));
        set_ship_to_id(data.ship_to.id);
        set_ship_from(JSON.stringify(data.ship_from));
        set_ship_from_id(data.ship_from.id);
        set_bill_to_information(
            <div>
                <div>{data.bill_to.name}</div>
                <div>{data.bill_to.address1}</div>
                <div>{data.bill_to.address2}</div>
            </div>
        );
        set_ship_to_information(
            <div>
                <div>{data.ship_to.name}</div>
                <div>{data.ship_to.address1}</div>
                <div>{data.ship_to.address2}</div>
            </div>
        );
        set_ship_from_information(
            <div>
                <div>{data.ship_from.name}</div>
                <div>{data.ship_from.address1}</div>
                <div>{data.ship_from.address2}</div>
            </div>
        );
        set_invoice_type(data.type);
        set_terms_and_conditions(data.terms);
        set_extra_information(data.extra_info);
        set_invoice_status(data.invoice_status);
        set_description(data.description);
        set_bank_details_information(data.bank_details);
        set_bl_number(data.bl_number);

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
    function fetchVendor() {
        fetch('http://86.38.217.198:5003/get/vendor')
            .then((response) => response.json())
            .then((data) => {
                set_all_vendors(data);
            })
            .catch((error) => {
                console.error('Error fetching all vendor:', error);
            });
    }
    function fetchInvoice() {
        fetch('http://86.38.217.198:5003/get/invoice')
            .then((response) => response.json())
            .then((data) => {
                // setda(data);
            })
            .catch((error) => {
                console.error('Error fetching invoice:', error);
            });
    }
    function fetchCompany() {
        fetch('http://86.38.217.198:5003/get/company')
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
        fetch('http://86.38.217.198:5003/get/type/bill_to')
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
        fetch('http://86.38.217.198:5003/get/type/ship_from')
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
        fetch('http://86.38.217.198:5003/get/type/ship_to')
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
        fetch('http://86.38.217.198:5003/get/item')
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
            invoice_status: invoice_status,
            description: description,
            bl_number: bl_number,
            all_items: selected_items,
            edit: edit,
        };

        fetch('http://86.38.217.198:5003/create/invoice/' + invoice_id, {
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

    const { toPDF, targetRef } = usePDF({ filename: invoice_id + ' - Bill To -' + bill_to.name + ' Date: ' + date + '.pdf' });

    function createPDF() {
        createInvoice();
        toPDF();
        fetch_invoices_handler();
        onClose();
        set_invoice_id(`INV - ${Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000}`);
        onCloseParent();
    }

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currency, set_currency] = React.useState('USD');
    return (
        <div className="invoice">
            <h1>Invoice Details</h1>
            <h2>{invoice_id}</h2>

            <div className="all_inputs all_inputs2">
                <div className="input_field">
                    <div className="title">Bill To</div>
                    <div className="input">
                        <select
                            value={bill_to}
                            onChange={(e) => {
                                let value = e.target.value;
                                let data = JSON.parse(value);
                                set_bill_to_id(data.id);
                                set_bill_to(value);
                                set_bill_to_information(
                                    <div>
                                        <div>{data.name}</div>
                                        <div>{data.address1}</div>
                                        <div>{data.address2}</div>
                                    </div>
                                );
                            }}>
                            {all_bill_to.map(function (bill_to) {
                                return (
                                    <option
                                        key={JSON.stringify(bill_to)}
                                        value={JSON.stringify(bill_to)}>
                                        {bill_to.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
                <div className="input_field">
                    <div className="title">Ship To</div>
                    <div className="input">
                        <select
                            value={ship_to}
                            onChange={(e) => {
                                let value = e.target.value;
                                let data = JSON.parse(value);
                                set_ship_to_id(data.id);
                                set_ship_to(value);
                                set_ship_to_information(
                                    <div>
                                        <div>{data.name}</div>
                                        <div>{data.address1}</div>
                                        <div>{data.address2}</div>
                                    </div>
                                );
                            }}>
                            {all_ship_to.map(function (ship_to) {
                                return (
                                    <option
                                        key={JSON.stringify(ship_to)}
                                        value={JSON.stringify(ship_to)}>
                                        {ship_to.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
                <div className="input_field">
                    <div className="title">Ship From</div>
                    <div className="input">
                        <select
                            value={ship_from}
                            onChange={(e) => {
                                let value = e.target.value;
                                let data = JSON.parse(value);
                                set_ship_from_id(data.id);
                                set_ship_from(value);
                                set_ship_from_information(
                                    <div>
                                        <div>{data.name}</div>
                                        <div>{data.address1}</div>
                                        <div>{data.address2}</div>
                                    </div>
                                );
                            }}>
                            {all_ship_from.map(function (ship_from) {
                                return (
                                    <option
                                        key={JSON.stringify(ship_from)}
                                        value={JSON.stringify(ship_from)}>
                                        {ship_from.name}
                                    </option>
                                );
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
                    <div className="title">Currency</div>
                    <div className="input">
                        <select
                            value={currency}
                            onChange={(e) => {
                                let value = e.target.value;
                                set_currency(value);
                            }}>
                            <option value="USD">USD</option>
                            <option value="CAD">CAD</option>
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
                    <div className="title">Invoice Status</div>
                    <div className="input">
                        <select
                            value={invoice_status}
                            defaultValue={'pending'}
                            onChange={(e) => {
                                set_invoice_status(e.target.value);
                            }}>
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                            <option value="partial">Partial</option>
                        </select>
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
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => edit_invoice_fields(index, 'quantity', parseFloat(e.target.value))}
                                        />
                                    </td>
                                    <td>{(item.price * item.quantity).toFixed(2)}</td>

                                    <td>
                                        <select
                                            value={item.vendor_id}
                                            onChange={(e) => edit_invoice_fields(index, 'vendor_id', parseFloat(e.target.value))}>
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
                                            onChange={(e) => edit_invoice_fields(index, 'vendor_cost', parseFloat(e.target.value))}
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
                                    <select onChange={(e) => add_new_invoice_item(e)}>
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
                                        <div>Due Date: {due_date}</div>
                                        <div>B/L Number: {bl_number}</div>
                                        <div>Description: {description}</div>
                                        <div>Invoice Status: {invoice_status}</div>
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
                        <button onClick={createPDF}>Create Invoice</button>
                        <button onClick={toPDF}>Download Invoice</button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}
