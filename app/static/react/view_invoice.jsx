const App = () => {
    const [showCreateModal, setShowCreateModal] = React.useState(false);

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
    const [invoice_id, set_invoice_id] = React.useState('');

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
        get_invoice_details();
    }, []);

    async function get_invoice_details() {
        const number = window.location.href.split('/').pop();
        const response = await fetch('/get_invoice_details/' + number);
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
        fetch('/get/invoice')
            .then((response) => response.json())
            .then((data) => {
                loadTable(data);
            })
            .catch((error) => {
                console.error('Error fetching invoice:', error);
            });
    }
    function loadTable(data) {
        $(document).ready(function () {
            var dataTable = $('#data-table').DataTable();

            data.forEach(function (item) {
                dataTable.row.add([item.name, item.address1, item.address2]).draw();
            });
        });
    }
    function fetchCompany() {
        fetch('/get/company')
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
        fetch('/get/bill_to')
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
        fetch('/get/ship_from')
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
        fetch('/get/ship_to')
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
        fetch('/get/item')
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
            bill_to_id: bill_to_id,
            ship_to_id: ship_to_id,
            ship_from_id: ship_from_id,
            bank_details: bank_details_information,
            date: date,
            terms: terms_and_conditions,
            type: invoice_type,
            extra_info: extra_information,
            bl_number: bl_number,
            all_items: selected_items,
        };
        console.log('invoiceData');
        console.log(invoiceData);

        fetch('/create/invoice', {
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
    function createPDF() {
        createInvoice();
        var HTML_Width = $('.invoice_viewer').width();
        var HTML_Height = $('.invoice_viewer').height();
        var top_left_margin = 15;
        var PDF_Width = HTML_Width + top_left_margin * 2;
        var PDF_Height = PDF_Width * 1.5 + top_left_margin * 2;
        var canvas_image_width = HTML_Width;
        var canvas_image_height = HTML_Height;

        var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

        html2canvas($('.invoice_viewer')[0]).then(function (canvas) {
            var imgData = canvas.toDataURL('image/jpeg', 1.0);
            var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
            pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
            for (var i = 1; i <= totalPDFPages; i++) {
                pdf.addPage(PDF_Width, PDF_Height);
                pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + top_left_margin * 4, canvas_image_width, canvas_image_height);
            }
            pdf.save('Your_PDF_Name.pdf');
            $('.invoice_viewer').hide();
        });
    }

    return (
        <div className="invoice">
            <h1>Invoice Details</h1>
            <div className="topbar">
                <button onClick={createPDF}>Create Invoice</button>
            </div>

            <div className="all_inputs">
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
                                            onChange={(e) => edit_invoice_fields(index, 'currency', parseFloat(e.target.value))}
                                            name=""
                                            id="">
                                            <option value="usd">USD</option>
                                            <option value="cad">CAD</option>
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
            <div
                className="invoice_viewer"
                id="invoice_viewer">
                <div className="logo"></div>
                <h4>{invoice_type}</h4>
                <div className="first_section">
                    <div className="company_information">{company_information}</div>
                    <div className="invoice_information">
                        <br />
                        <br />

                        <h3>{invoice_id}</h3>
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
                    <table
                        id="invoice-table"
                        className="table table-striped">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Description</th>
                                <th>Price per piece</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>

                        <tbody>
                            {selected_items.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price * item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <strong>Total Price of all Items: {total_price}</strong>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
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
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
