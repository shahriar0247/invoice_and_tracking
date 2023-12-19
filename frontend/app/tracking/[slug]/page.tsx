'use client';

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react';
import React from 'react';

export default function Create_tracking({}) {
    var fullPath = window.location.pathname;
    var pathParts = fullPath.split('/');

    const [container, set_container] = React.useState('');
    const [departure, set_departure] = React.useState('');
    const [location_status, set_location_status] = React.useState('');
    const [custom_tracking, set_custom_tracking] = React.useState('');
    const [Deli, set_Deli] = React.useState('');
    const [Manifest, set_Manifest] = React.useState('');
    const [status, set_status] = React.useState('');
    const [invoice_id, set_invoice_id] = React.useState(decodeURIComponent(pathParts[pathParts.length - 1]));

    const [invoice_type, set_invoice_type] = React.useState('First Quote');
    const [bl_number, set_bl_number] = React.useState('');
    const [bill_to, set_bill_to] = React.useState('');
    const [ship_to, set_ship_to] = React.useState('');
    const [ship_from, set_ship_from] = React.useState('');
    const [date, set_date] = React.useState();
    const [due_date, set_due_date] = React.useState();
    const [extra_information, set_extra_information] = React.useState('');

    React.useEffect(() => {
        fetchTracking();
        get_tracking_details();
    }, []);

    async function get_tracking_details() {
        const response = await fetch('http://localhost:5003/get_invoice_details/' + invoice_id);
        const data = await response.json();
        set_container(data.container);
        set_departure(data.departure);
        set_location_status(data.location_status);
        set_custom_tracking(data.custom_tracking);
        set_Deli(data.Deli);
        set_Manifest(data.Manifest);
        set_status(data.status);
        set_invoice_id(data.id);

        set_invoice_id(data.id);
        set_bill_to(data.bill_to.name);
        set_ship_to(data.ship_to.name);
        set_ship_from(data.ship_from.name);
        set_invoice_type(data.type);
        set_extra_information(data.extra_info);
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

    function fetchTracking() {
        fetch('http://localhost:5003/get/tracking')
            .then((response) => response.json())
            .then((data) => {
                // setda(data);
            })
            .catch((error) => {
                console.error('Error fetching tracking:', error);
            });
    }

    function save() {
        const invoiceData = {
            id: invoice_id,
            container: container,
            departure: departure,
            location_status: location_status,
            custom_tracking: custom_tracking,
            Deli: Deli,
            status: status,
            Manifest: Manifest,
        };

        fetch('http://localhost:5003/save/invoice/tracking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(invoiceData),
        })
            .then((response) => {
                if (response.ok) {
                    window.location.reload();
                } else {
                    alert('Failed to create invoice');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    return (
        <div className="tracking">
            <h1>Tracking Details</h1>
            <h1>{invoice_id}</h1>
            <div className="all_inputs all_inputs2">
                <div className="input_field">
                    <div className="title">Container</div>
                    <div className="input">
                        <input
                            type="text"
                            value={container}
                            onChange={(e) => {
                                set_container(e.target.value);
                            }}
                        />
                    </div>
                </div>

                <div className="input_field">
                    <div className="title">Departure</div>
                    <div className="input">
                        <input
                            type="text"
                            value={departure}
                            onChange={(e) => {
                                set_departure(e.target.value);
                            }}
                        />
                    </div>
                </div>

                <div className="input_field">
                    <div className="title">Location Status</div>
                    <div className="input">
                        <select
                            name="status"
                            id=""
                            value={location_status}
                            onChange={(e) => {
                                set_location_status(e.target.value);
                            }}>
                            <option value="ocean">Ocean</option>
                            <option value="air">Air</option>
                            <option value="land">Land</option>
                        </select>
                    </div>
                </div>

                <div className="input_field">
                    <div className="title">Custom Tracking</div>
                    <div className="input">
                        <input
                            type="text"
                            value={custom_tracking}
                            onChange={(e) => {
                                set_custom_tracking(e.target.value);
                            }}
                        />
                    </div>
                </div>

                <div className="input_field">
                    <div className="title">Deli</div>
                    <div className="input">
                        <input
                            type="text"
                            value={Deli}
                            onChange={(e) => {
                                set_Deli(e.target.value);
                            }}
                        />
                    </div>
                </div>

                <div className="input_field">
                    <div className="title">Manifest</div>
                    <div className="input">
                        <input
                            type="text"
                            value={Manifest}
                            onChange={(e) => {
                                set_Manifest(e.target.value);
                            }}
                        />
                    </div>
                </div>

                <h2>Read Only Invoice Fields</h2>
                <div></div>
                <div></div>

                <div className="input_field">
                    <div className="title">Bill To</div>
                    <div className="input">
                        <input
                            readOnly
                            type="text"
                            value={bill_to}
                        />
                    </div>
                </div>

                <div className="input_field">
                    <div className="title">Ship To</div>
                    <div className="input">
                        <input
                            readOnly
                            type="text"
                            value={ship_to}
                        />
                    </div>
                </div>

                <div className="input_field">
                    <div className="title">Ship From</div>
                    <div className="input">
                        <input
                            readOnly
                            type="text"
                            value={ship_from}
                        />
                    </div>
                </div>

                <div className="input_field">
                    <div className="title">Date</div>
                    <div className="input">
                        <input
                            readOnly
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
                            readOnly
                            value={due_date}
                            type="date"
                            onChange={(e) => {
                                set_due_date(e.target.value);
                            }}
                        />
                    </div>
                </div>

                <div className="input_field">
                    <div className="title">Type</div>
                    <div className="input">
                        <input
                            readOnly
                            value={invoice_type}></input>
                    </div>
                </div>
                <div className="input_field">
                    <div className="title">Extra Info</div>
                    <div className="input">
                        <input
                            readOnly
                            value={extra_information}></input>
                    </div>
                </div>
                <div className="input_field">
                    <div className="title">B/L number #</div>
                    <div className="input">
                        <input
                            readOnly
                            type="text"
                            value={bl_number}
                        />
                    </div>
                </div>
            </div>

            <button onClick={save}>Save Tracking</button>
        </div>
    );
}
