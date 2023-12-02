const App = () => {
    const [showCreateModal, setShowCreateModal] = React.useState(false);

    const [company, set_company] = React.useState([]);
    const [all_bill_to, set_all_bill_to] = React.useState([]);
    const [all_ship_from, set_all_ship_from] = React.useState([]);
    const [all_ship_to, set_all_ship_to] = React.useState([]);
    const [all_items, set_all_items] = React.useState();
    const [selected_items, set_selected_items] = React.useState([]);

    const [company_information, set_company_information] = React.useState('');
    const [daily_account_information, set_daily_account_information] = React.useState('');
    const [bill_to_information, set_bill_to_information] = React.useState('');
    const [ship_from_information, set_ship_from_information] = React.useState('');
    const [ship_to_information, set_ship_to_information] = React.useState('');
    const [extra_information, set_extra_information] = React.useState('');
    const [bank_details_information, set_bank_details_information] = React.useState('');

    const [terms_and_conditions, set_terms_and_conditions] = React.useState('');
    const [daily_account_type, set_daily_account_type] = React.useState('First Quote');
    const [bl_number, set_bl_number] = React.useState('');
    const [bill_to_id, set_bill_to_id] = React.useState('');
    const [ship_to_id, set_ship_to_id] = React.useState('');
    const [ship_from_id, set_ship_from_id] = React.useState('');
    const [date, set_date] = React.useState('');

    const [bill_to_name, set_bill_to_name] = React.useState('')

    const [total_price, set_total_price] = React.useState(0);

    React.useEffect(() => {
        let total_price_ = 0;
        selected_items.map(function (item) {
            total_price_ = total_price_ + item.price * item.quantity;
        });
        set_total_price(total_price_);
    }, [selected_items]);

    React.useEffect(() => {
        console.log('here 1')

        fetchCompany();
        fetchBillTo();
        fetchShipFrom();
        fetchShipTo();
        console.log('here 1')
        fetchItems();
        fetchDaily_Account();
    }, []);

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
    function fetchDaily_Account() {
        fetch('/get/daily_account')
            .then((response) => response.json())
            .then((data) => {
                loadTable(data);
            })
            .catch((error) => {
                console.error('Error fetching daily_account:', error);
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
                set_bill_to_name(data.name)
                set_bill_to_information(
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
        console.log('here 2')
        fetch('/get/item')
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                set_all_items(data);
            })
            .catch((error) => {
                console.error('Error fetching items data:', error);
            });
    }

    function createDaily_Account() {
        const daily_accountData = {
            bill_to_id: bill_to_id,
            ship_to_id: ship_to_id,
            ship_from_id: ship_from_id,
            bank_details: bank_details_information,
            date: date,
            terms: terms_and_conditions,
            type: daily_account_type,
            extra_info: extra_information,
            bl_number: bl_number,
            all_items: selected_items
        };
        console.log("daily_accountData")
        console.log(daily_accountData)

        fetch('/create/daily_account', {
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
    function deleteDaily_Account(daily_accountId) {
        fetch(`/delete/daily_account/${daily_accountId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    alert('Daily_Account deleted successfully');
                } else {
                    alert('Failed to delete daily_account');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    function editDaily_Account(daily_accountId) {
        const updatedDaily_AccountData = {
            date: '2023-11-07', // Replace with updated data
            terms: 'Net 45', // Replace with updated data
            daily_account1: 'Jane Smith', // Replace with updated data
            // Add other fields as needed
        };

        fetch(`/edit/daily_account/${daily_accountId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedDaily_AccountData),
        })
            .then((response) => {
                if (response.ok) {
                    alert('Daily_Account updated successfully');
                } else {
                    alert('Failed to update daily_account');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    function createPDF() {
        createDaily_Account()
        var HTML_Width = $('.daily_account_viewer').width();
        var HTML_Height = $('.daily_account_viewer').height();
        var top_left_margin = 15;
        var PDF_Width = HTML_Width + top_left_margin * 2;
        var PDF_Height = PDF_Width * 1.5 + top_left_margin * 2;
        var canvas_image_width = HTML_Width;
        var canvas_image_height = HTML_Height;

        var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

        html2canvas($('.daily_account_viewer')[0]).then(function (canvas) {
            var imgData = canvas.toDataURL('image/jpeg', 1.0);
            var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
            pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
            for (var i = 1; i <= totalPDFPages; i++) {
                pdf.addPage(PDF_Width, PDF_Height);
                pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + top_left_margin * 4, canvas_image_width, canvas_image_height);
            }
            pdf.save('Daily_Account - ' + daily_account_type + ' - ' + bill_to_name + " - " + date + '.pdf');
            $('.daily_account_viewer').hide();
        });
    }
    
    return (
        <div className="daily_account">
            <h1>Create Daily_Account</h1>
            <div className="topbar">
                <button onClick={createPDF}>Create Daily_Account</button>
            </div>

            <div className="all_inputs">
                <div className="input_field">
                    <div className="title">Bill To</div>
                    <div className="input">
                        <select
                            onChange={(e) => {
                                let value = e.target.value;
                                let data = JSON.parse(value);
                                set_bill_to_id(data.id);
                                set_bill_to_name(data.name)
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
                                return <option value={JSON.stringify(ship_to)}>{ship_to.name}</option>;
                            })}
                        </select>
                    </div>
                </div>
                <div className="input_field">
                    <div className="title">Ship From</div>
                    <div className="input">
                        <select
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
                                return <option value={JSON.stringify(ship_from)}>{ship_from.name}</option>;
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
                            name=""
                            id=""
                            cols="30"
                            rows="10"
                            onChange={(e) => {
                                let value = e.target.value;
                                value = value.replace(/\n/g, '<br />');
                                set_terms_and_conditions(value);
                            }}></textarea>
                    </div>
                </div>
                <div className="input_field">
                    <div className="title">Type</div>
                    <div className="input">
                        <select
                            onChange={(e) => {
                                set_daily_account_type(e.target.value);
                            }}>
                            <option value="First Quote">First Quote</option>
                            <option value="Final Quote">Final Quote</option>
                            <option value="Daily_Account">Daily_Account</option>
                        </select>
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
                        id="daily_account-table"
                        className="table table-striped">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Description</th>
                                <th>Price per piece</th>
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
                                            onChange={(e) => edit_daily_account_fields(index, 'quantity', parseInt(e.target.value))}
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
                                    <select onChange={(e) => add_new_daily_account_item(e)}>
                                        <option value="none">New Item</option>
                                        <option value="blank">Black Item</option>
                                        { all_items && all_items.map(function (item) {
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
                className="daily_account_viewer"
                id="daily_account_viewer">
                <div className="logo"></div>
                <h4>{daily_account_type}</h4>
                <div className="first_section">
                    <div className="company_information">{company_information}</div>
                    <div className="daily_account_information">
                        <br />
                        <br />
                        <div>Date: {date}</div>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: daily_account_information.replace(/\n/g, '<br>'),
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
                        id="daily_account-table"
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
