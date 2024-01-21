'use client';

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react';
import React from 'react';
import { usePDF } from 'react-to-pdf';
import DTable from '../components/DTable';

export default function Shipments({ type = null, create = true, shipment_id_view = '' }) {
    const [data3, setData3] = React.useState([]);
    const [all_data, set_all_data] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const [issued_to_search_term, set_issued_to_search_term] = React.useState('');
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
        fetch_shipments();

        try {
            const urlParams = new URLSearchParams(window.location.search);
            const edit = urlParams.get('edit');
            set_edit(edit === 'true');
        } catch (error) {
            console.log(error);
        }
    }, []);

    function fetch_shipments() {
        fetch('http://localhost:5003/get/shipment')
            .then((response) => response.json())
            .then((data) => {
                setData3(data);
                set_all_data(data);
                setUsers(getUniqueUsers(data));
            })
            .catch((error) => {
                console.error('Error fetching shipments:', error);
            });
    }

    const { isOpen, onOpen, onClose } = useDisclosure();
    function getUniqueUsers(data) {
        const uniqueUsers = [...new Set(data.map((item) => item.issued_to))];
        return uniqueUsers;
    }
    function deleteShipment(shipmentId) {
        fetch(`http://localhost:5003/delete/shipment/${shipmentId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    alert('Shipment deleted successfully');
                    window.location.reload();
                } else {
                    alert('Failed to delete shipment');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    function filter() {
        var filteredData = all_data.filter(function (shipment) {
            if (shipment.issued_to.includes(issued_to_search_term)) {
                return true;
            }
        });

        var filteredData2 = filteredData.filter(function (shipment) {
            return (
                (minDate === '' || new Date(shipment.arrival_date) >= new Date(minDate)) &&
                (maxDate === '' || new Date(shipment.arrival_date) <= new Date(maxDate))
            );
        });

        setData3(filteredData2);
    }

    React.useEffect(() => {
        filter();
    }, [minDate, maxDate, issued_to_search_term]);

    function change_shipment_status(id, status) {
        const data = {
            id: id,
            status: status,
        };
        fetch(`http://localhost:5003/shipment/change_status`, {
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
            <Create_shipment
                edit={edit}
                create={create}
                onCloseParent={onClose}
                fetch_shipments={fetch_shipments}
                shipment_id_view={shipment_id_view}></Create_shipment>
        );
    }


    const headers = ['ID', 'Arrival Date', 'Issued To', "BL Number", "Actions"]
    const columns = ['id', 'arrival_date', 'issued_to', 'bl_number', 'shipment_actions']


    return (
        <div className="invoice">
            <h1>Shipments</h1>
            <button onClick={onOpen}>Create Shipment</button>
            <Modal
                isOpen={isOpen}
                onClose={onClose}>
                <ModalContent>
                    <ModalHeader>Create Shipment</ModalHeader>
                    <ModalBody>
                        <Create_shipment
                            fetch_shipments={fetch_shipments}
                            onCloseParent={onClose}
                        />
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                </ModalContent>
            </Modal>

            <h1>All Filters</h1>
            <div className="all_filters">
                <div>
                    {type == "shipment" ? <label>Advise To Search:</label> : <label>Issued To Search:</label>}

                    <select onChange={(e) => set_issued_to_search_term(e.target.value)}>
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

            <h2>Shipments</h2>
            <DTable headers={headers} columns={columns} table_data={data3} delete_function={deleteShipment} custom_function={[change_shipment_status]}></DTable>


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
    const [header, set_header] = React.useState('Header');
    const [footer, set_footer] = React.useState('');
    const { toPDF, targetRef } = usePDF({ filename: 'Summary.pdf', size: 'A4' });
    const totalPriceOfAllItems = data3.data3.data3.flatMap((shipment) => JSON.parse(shipment.all_items || '[]').map((item) => item.price)).reduce((acc, price) => acc + price, 0);
    function download_excel() {
        let excel_data = [
            ["ID",
                "Date",
                "Issued To",
                "B/L Number",
                "Total Value",
            ]
        ]
        data3.data3.data3.map(function (item) {
            let arrival_date = (new Date(item.arrival_date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }));
            let total_price = JSON.parse(item.all_items).reduce((acc, item) => acc + item.price * item.quantity, 0) + " " + currency
            excel_data.push([item.id, arrival_date, item.issued_to, item.bl_number, total_price])
        })
        excel_data.push(["", "", "", "", "Total Price: " + totalPriceOfAllItems.toFixed(2) + " " + currency])

        fetch("http://localhost:5003/daily_accounts/download", {

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
            <div >
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
                            <TableColumn>Issued To</TableColumn>
                            <TableColumn>B/L Number</TableColumn>
                            <TableColumn>Total Value</TableColumn>
                        </TableHeader>
                        <TableBody>

                            {data3.data3.data3.map(function (item) {
                                return (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{new Date(item.arrival_date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</TableCell>
                                        <TableCell>{item.issued_to}</TableCell>
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
function Create_shipment({ create = true, shipment_id_view = '', edit = false, fetch_shipments, onCloseParent }) {
    const [company, set_company] = React.useState([]);
    const [all_issued_to, set_all_issued_to] = React.useState([]);
    const [all_ship_from, set_all_ship_from] = React.useState([]);
    const [all_ship_to, set_all_ship_to] = React.useState([]);
    const [all_items, set_all_items] = React.useState();
    const [selected_items, set_selected_items] = React.useState([]);

    const [company_information, set_company_information] = React.useState('');
    const [shipment_information, set_shipment_information] = React.useState('');
    const [issued_to_information, set_issued_to_information] = React.useState('');
    const [ship_from_information, set_ship_from_information] = React.useState('');
    const [ship_to_information, set_ship_to_information] = React.useState('');
    const [container_numberrmation, set_container_numberrmation] = React.useState('');
    const [description, set_description] = React.useState('');
    const [shipment_status, set_shipment_status] = React.useState('');
    const [shipping_details_information, set_shipping_details_information] = React.useState('');

    const [terms_and_conditions, set_terms_and_conditions] = React.useState('');
    const [shipment_type, set_shipment_type] = React.useState('First Quote');
    const [bl_number, set_bl_number] = React.useState('');
    const [issued_to_id, set_issued_to_id] = React.useState('');
    const [issued_to, set_issued_to] = React.useState('');
    const [invoice, set_invoice] = React.useState('');
    const [ship_to_id, set_ship_to_id] = React.useState('');
    const [ship_to, set_ship_to] = React.useState('');
    const [ship_from_id, set_ship_from_id] = React.useState('');
    const [ship_from, set_ship_from] = React.useState('');
    const [weight, set_weight] = React.useState('');
    const [arrival_date, set_arrival_date] = React.useState(getFormattedDate());
    const [due_date, set_due_date] = React.useState(getFormattedDate());
    const [shipment_id, set_shipment_id] = React.useState(`Shipment - ${Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000}`);
    const [all_vendors, set_all_vendors] = React.useState([]);
    const [invoices, set_invoices] = React.useState([]);

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
        fetchInvoices();
        if (!create) {
            get_shipment_details();
        }
    }, []);

    function getFormattedDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    function fetch_shipments_handler() {
        fetch_shipments();
    }

    async function get_shipment_details() {
        const response = await fetch('http://localhost:5003/get_shipment_details/' + shipment_id_view);
        const data = await response.json();
        const all_items_ = JSON.parse(data['all_items']);
        set_shipment_id(data.id);
        set_selected_items(all_items_);
        set_issued_to(JSON.stringify(data.issued_to));
        set_issued_to_id(data.issued_to.id);
        set_ship_to(JSON.stringify(data.ship_to));
        set_ship_to_id(data.ship_to.id);
        set_ship_from(JSON.stringify(data.ship_from));
        set_ship_from_id(data.ship_from.id);
        set_issued_to_information(
            <div>
                <div>{data.issued_to.name}</div>
                <div>{data.issued_to.address1}</div>
                <div>{data.issued_to.address2}</div>
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
        set_shipment_type(data.type);
        set_terms_and_conditions(data.terms);
        set_container_numberrmation(data.container_number);
        set_shipment_status(data.shipment_status);
        set_description(data.description);
        set_shipping_details_information(data.shipping_details);
        set_bl_number(data.bl_number);
        set_invoice(data.invoice_id);

        var dateObject = new Date(data.arrival_date);
        var year = dateObject.getFullYear();
        var month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
        var day = dateObject.getDate().toString().padStart(2, '0');
        set_arrival_date(`${year}-${month}-${day}`);

        dateObject = new Date(data.due_date);
        year = dateObject.getFullYear();
        month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
        day = dateObject.getDate().toString().padStart(2, '0');
        set_due_date(`${year}-${month}-${day}`);
    }

    const edit_shipment_fields = (index, field, value) => {
        const updatedItems = [...selected_items];
        updatedItems[index][field] = value;
        set_selected_items(updatedItems);
    };

    const add_new_shipment_item = (event) => {
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
    function fetchInvoices() {
        fetch('http://localhost:5003/get/invoice')
            .then((response) => response.json())
            .then((data) => {
                set_invoices(data);
                // set_invoice(data[0].id)
            })
            .catch((error) => {
                console.error('Error fetching purchase_order:', error);
            });
    }
    function fetchCompany() {
        fetch('http://localhost:5003/get/company')
            .then((response) => response.json())
            .then((data) => {
                set_company(data);
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
                set_all_issued_to(data);
                data = data[0];
                set_issued_to_id(data.id);
                set_issued_to_information(
                    <div>
                        <div>{data.name}</div>
                        <div>{data.address1}</div>
                        <div>{data.address2}</div>
                    </div>
                );
            })
            .catch((error) => {
                console.error('Error fetching shipment data:', error);
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
        fetch('http://localhost:5003/get/item')
            .then((response) => response.json())
            .then((data) => {
                set_all_items(data);
            })
            .catch((error) => {
                console.error('Error fetching items data:', error);
            });
    }

    function createShipment() {
        const shipmentData = {
            id: shipment_id,
            issued_to_id: issued_to_id,
            invoice_id: invoice,
            ship_to_id: ship_to_id,
            ship_from_id: ship_from_id,
            shipping_details: shipping_details_information,
            arrival_date: arrival_date,
            due_date: due_date,
            terms: terms_and_conditions,
            type: shipment_type,
            weight: weight,
            container_number: container_numberrmation,
            shipment_status: shipment_status,
            description: description,
            bl_number: bl_number,
            all_items: selected_items,
            edit: edit,
        };

        fetch('http://localhost:5003/create/shipment/' + shipment_id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(shipmentData),
        })
            .then((response) => {
                if (response.ok) {
                    alert('Shipment created successfully');
                } else {
                    alert('Failed to create shipment');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const { toPDF, targetRef } = usePDF({ filename: shipment_id + ' - Issued To -' + issued_to.name + ' Date: ' + arrival_date + '.pdf' });

    function createPDF() {
        createShipment();
        toPDF();
        fetch_shipments_handler();
        onClose();
        set_shipment_id(`Shipment - ${Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000}`);
        onCloseParent();
    }

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currency, set_currency] = React.useState('USD');
    return (
        <div className="shipment">
            <h1>Shipment Details</h1>
            <h2>{shipment_id}</h2>

            <div className="all_inputs all_inputs2">

                <div className="input_field">


                    <div className="title">Invoices</div>
                    <div className="input">
                        <select
                            value={invoice}
                            onChange={(e) => {
                                let value = e.target.value;
                                set_invoice(value);
                            }}>
                            {invoices.map(function (invoice) {
                                return (
                                    <option
                                        key={invoice.id}
                                        value={invoice.id}>
                                        {invoice.id}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
                <div className="input_field">


                    <div className="title">Issued To</div>
                    <div className="input">
                        <select
                            value={issued_to}
                            onChange={(e) => {
                                let value = e.target.value;
                                let data = JSON.parse(value);
                                set_issued_to_id(data.id);
                                set_issued_to(value);
                                set_issued_to_information(
                                    <div>
                                        <div>{data.name}</div>
                                        <div>{data.address1}</div>
                                        <div>{data.address2}</div>
                                    </div>
                                );
                            }}>
                            {all_issued_to.map(function (issued_to) {
                                return (
                                    <option
                                        key={JSON.stringify(issued_to)}
                                        value={JSON.stringify(issued_to)}>
                                        {issued_to.name}
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
                    <div className="title">Shipping Details</div>
                    <div className="input">
                        <textarea
                            type="text"
                            value={shipping_details_information}
                            onChange={(e) => set_shipping_details_information(e.target.value)}
                        />
                    </div>
                </div>

                <div className="input_field">
                    <div className="title">Arrival Date</div>
                    <div className="input">
                        <input
                            value={arrival_date}
                            type="date"
                            onChange={(e) => {
                                set_arrival_date(e.target.value);
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
                            value={shipment_type}
                            onChange={(e) => {
                                set_shipment_type(e.target.value);
                            }}>
                            <option value="Delivery Order">Delivery Order</option>
                            <option value="Pre Alert">Pre Alert</option>
                        </select>
                    </div>
                </div>
                <div className="input_field">
                    <div className="title">Weight</div>
                    <div className="input">
                        <input
                            value={weight}
                            type="date"
                            onChange={(e) => {
                                set_weight(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="input_field">
                    <div className="title">Extra Info</div>
                    <div className="input">
                        <textarea
                            value={container_numberrmation}
                            name=""
                            id=""
                            cols="30"
                            rows="10"
                            onChange={(e) => {
                                set_container_numberrmation(e.target.value);
                            }}></textarea>
                    </div>
                </div>

                <div className="input_field">
                    <div className="title">Shipment Status</div>
                    <div className="input">
                        <select
                            value={shipment_status}
                            defaultValue={'pending'}
                            onChange={(e) => {
                                set_shipment_status(e.target.value);
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
                        id="shipment-table"
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
                                            onChange={(e) => edit_shipment_fields(index, 'name', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={item.description}
                                            onChange={(e) => edit_shipment_fields(index, 'description', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={item.price}
                                            onChange={(e) => edit_shipment_fields(index, 'price', parseFloat(e.target.value))}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => edit_shipment_fields(index, 'quantity', parseFloat(e.target.value))}
                                        />
                                    </td>
                                    <td>{(item.price * item.quantity).toFixed(2)}</td>

                                    <td>
                                        <select
                                            value={item.vendor_id}
                                            onChange={(e) => edit_shipment_fields(index, 'vendor_id', parseFloat(e.target.value))}>
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
                                            onChange={(e) => edit_shipment_fields(index, 'vendor_cost', parseFloat(e.target.value))}
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
                                    <select onChange={(e) => add_new_shipment_item(e)}>
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
            <button onClick={onOpen}>View Shipment</button>

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
                                <h4>{shipment_type}</h4>
                                <div className="first_section">
                                    <div className="company_information">{company_information}</div>
                                    <div className="shipment_information">
                                        <br />
                                        <br />

                                        <h1>{shipment_id}</h1>
                                        <div>Arrival Date: {arrival_date}</div>
                                        <div>Due Date: {due_date}</div>
                                        <div>B/L Number: {bl_number}</div>
                                        <div>Description: {description}</div>
                                        <div>Shipment Status: {shipment_status}</div>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: shipment_information.replace(/\n/g, '<br>'),
                                            }}></div>
                                    </div>
                                </div>
                                <div className="second_section">
                                    <div className="issued_to_information">
                                        <h3>Issued To</h3>

                                        {issued_to_information}
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
                                    <div className="container_numberrmation">
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: container_numberrmation.replace(/\n/g, '<br>'),
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
                                    <h3>Shipping Details</h3>
                                    {shipping_details_information &&

                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: shipping_details_information.replace(/\n/g, '<br>'),
                                            }}>
                                        </div>
                                    }


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
                        <button onClick={createPDF}>Create Shipment</button>
                        <button onClick={toPDF}>Download Shipment</button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div >
    );
}
