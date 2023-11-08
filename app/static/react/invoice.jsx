const App = () => {
    const [showCreateModal, setShowCreateModal] = React.useState(false);

    const [company, set_company] = React.useState([]);
    const [all_bill_to, set_all_bill_to] = React.useState([]);
    const [all_ship_from, set_all_ship_from] = React.useState([]);
    const [all_ship_to, set_all_ship_to] = React.useState([]);
    const [all_items, set_all_items] = React.useState([
        { id: 0, name: 'milk', description: 'a health drink', price: 20 },
        { id: 1, name: 'coffee', description: 'a very good drink', price: 30 },
        { id: 2, name: 'chocolate', description: 'something sweet', price: 40 },
    ]);
    const [selected_items, set_selected_items] = React.useState([]);

    const [company_information, set_company_information] = React.useState('');
    const [invoice_information, set_invoice_information] = React.useState('');
    const [bill_to_information, set_bill_to_information] = React.useState('');
    const [ship_from_information, set_ship_from_information] = React.useState('');
    const [ship_to_information, set_ship_to_information] = React.useState('');
    const [extra_information, set_extra_information] = React.useState('');
    const [bank_details_information, set_bank_details_information] = React.useState('');

    const [terms_and_conditions, set_terms_and_conditions] = React.useState('');

    const [total_price, set_total_price] = React.useState(0);

    React.useEffect(() => {
        let total_price_ = 0;
        selected_items.map(function (item) {
            total_price_ = total_price_ + item.price * item.quantity;
        });
        set_total_price(total_price_);
    }, [selected_items]);

    React.useEffect(() => {
        $('.form-select').selectpicker();
    });

    React.useEffect(() => {
        fetchCompany();
        fetchBillTo();
        fetchShipFrom();
        fetchShipTo();
        fetchItems();
        fetchInvoice();
    }, []);

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

    function toggleCreateModal() {
        setShowCreateModal(!showCreateModal);
    }
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
                        <div>{data.name}</div>
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
        fetch('/get/item')
            .then((response) => response.json())
            .then((data) => {
                // set_all_items(data);
            })
            .catch((error) => {
                console.error('Error fetching items data:', error);
            });
    }

    function createInvoice() {
        const invoiceData = {
            company_id: company_id, // Replace with actual data
            terms: 'Net 30', // Replace with actual data
            invoice1: 'John Doe', // Replace with actual data
            // Add other fields as needed
        };

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
    return (
        <div className="invoice">
            <h1>Invoice Details</h1>
            <div className="topbar">
                <button onClick={toggleCreateModal}>Create Invoice</button>
            </div>
            <table
                id="data-table"
                className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address 1</th>
                        <th>Address 1</th>
                        <th>Address 1</th>
                        <th>Address 1</th>
                        <th>Address 2</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            {showCreateModal && (
                <div className="modal-personal">
                    <div className="all_inputs">
                        <div className="input_field">
                            <div className="title">Bill To</div>
                            <div className="input">
                                <select
                                    className="form-select"
                                    onChange={(e) => {
                                        let value = e.target.value;
                                        let data = JSON.parse(value);
                                        set_bill_to_information(
                                            <div>
                                                <div>{data.name}</div>
                                                <div>{data.address1}</div>
                                                <div>{data.address2}</div>
                                            </div>
                                        );
                                    }}>
                                    {all_bill_to.map(function (bill_to) {
                                        return <option value={JSON.stringify(bill_to)}>{bill_to.name}</option>;
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="input_field">
                            <div className="title">Ship To</div>
                            <div className="input">
                                <select
                                    className="form-select"
                                    onChange={(e) => {
                                        let value = e.target.value;
                                        let data = JSON.parse(value);
                                        set_ship_to_information(
                                            <div>
                                                <div>{data.name}</div>
                                                <div>{data.address1}</div>
                                                <div>{data.address2}</div>
                                            </div>
                                        );
                                    }}>
                                    {all_ship_to.map(function (ship_to) {
                                        return <option value={JSON.stringify(ship_to)}>{ship_to.name}</option>;
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="input_field">
                            <div className="title">Ship From</div>
                            <div className="input">
                                <select
                                    className="form-select"
                                    onChange={(e) => {
                                        let value = e.target.value;
                                        let data = JSON.parse(value);
                                        set_ship_from_information(
                                            <div>
                                                <div>{data.name}</div>
                                                <div>{data.address1}</div>
                                                <div>{data.address2}</div>
                                            </div>
                                        );
                                    }}>
                                    {all_ship_from.map(function (ship_from) {
                                        return <option value={JSON.stringify(ship_from)}>{ship_from.name}</option>;
                                    })}
                                </select>
                            </div>
                        </div>

                        <div className="input_field">
                            <div className="title">Bank Details</div>
                            <div className="input">
                                <input
                                    type="text"
                                    value={bank_details_information}
                                    onChange={(e) => set_bank_details_information(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="input_field">
                            <div className="title">Date</div>
                            <div className="input">
                                <input type="date" />
                            </div>
                        </div>

                        <div className="input_field">
                            <div className="title">Terms</div>
                            <div className="input">
                                <textarea
                                    name=""
                                    id=""
                                    cols="30"
                                    rows="10"
                                    onChange={(e) => {
                                        set_terms_and_conditions(e.target.value);
                                    }}></textarea>
                            </div>
                        </div>

                        <div className="input_field">
                            <div className="title">Extra Info</div>
                            <div className="input">
                                <textarea
                                    name=""
                                    id=""
                                    cols="30"
                                    rows="10"
                                    onChange={(e) => {
                                        set_extra_information(e.target.value);
                                    }}></textarea>
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
                                        <th>Price per piece</th>
                                        <th>Quantity</th>
                                        <th>Total Price</th>
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
                                                    onChange={(e) => edit_invoice_fields(index, 'quantity', parseInt(e.target.value))}
                                                />
                                            </td>
                                            <td>{item.price * item.quantity}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td>
                                            <select onChange={(e) => add_new_invoice_item(e)}>
                                                <option value="none">New Item</option>
                                                <option value="blank">Black Item</option>
                                                {all_items.map(function (item) {
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
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <strong>Total Price</strong>
                                        </td>
                                        <td>{total_price}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                    <button onClick={createInvoice}>Create</button>
                </div>
            )}
            <div
                className="invoice_viewer"
                id="invoice_viewer">
                <div className="logo"></div>
                <div className="first_section">
                    <div className="company_information">{company_information}</div>
                    <div className="invoice_information">{invoice_information}</div>
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
                    <div className="extra_information">{extra_information}</div>
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
                    {bank_details_information}
                </div>
                <div className="sixth_section">
                    <center>THANK YOU FOR SHIPPING THROUGH MIANZ WE APPRECIATE YOUR BUSINESS</center>
                    <div className="terms_and_conditions">
                        <strong>Terms & Conditions: </strong>
                        {terms_and_conditions}
                    </div>
                    <div className="name">Ahmed Mukit</div>
                    <div className="nsf">All NSF Charges $25.00</div>
                </div>
            </div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
