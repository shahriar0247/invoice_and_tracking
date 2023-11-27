const App = () => {
    const [showCreateModal, setShowCreateModal] = React.useState(false);

    const [company, set_company] = React.useState([]);
    const [all_vendor, set_all_vendor] = React.useState([]);
    const [all_items, set_all_items] = React.useState();
    const [selected_items, set_selected_items] = React.useState([]);

    const [company_information, set_company_information] = React.useState('');
    const [purchase_order_information, set_purchase_order_information] = React.useState('');
    const [vendor_information, set_vendor_information] = React.useState('');
    const [extra_information, set_extra_information] = React.useState('');
    const [bank_details_information, set_bank_details_information] = React.useState('');

    const [terms_and_conditions, set_terms_and_conditions] = React.useState('');
    const [purchase_order_type, set_purchase_order_type] = React.useState('First Quote');
    const [bl_number, set_bl_number] = React.useState('');
    const [vendor_id, set_vendor_id] = React.useState('');
    const [date, set_date] = React.useState('');
    
    const [vendor_name, set_vendor_name] = React.useState('');

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
        fetchVendor();
        fetchItems();
        fetchPurchase_Order();
    }, []);

    const edit_purchase_order_fields = (index, field, value) => {
        const updatedItems = [...selected_items];
        updatedItems[index][field] = value;
        set_selected_items(updatedItems);
    };

    const add_new_purchase_order_item = (event) => {
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
    function fetchPurchase_Order() {
        fetch('/get/purchase_order')
            .then((response) => response.json())
            .then((data) => {
                loadTable(data);
            })
            .catch((error) => {
                console.error('Error fetching purchase_order:', error);
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
    function fetchVendor() {
        fetch('/get/vendor')
            .then((response) => response.json())
            .then((data) => {
                set_all_vendor(data);
                data = data[0];
                set_vendor_id(data.id);
                set_vendor_name(data.name);
                set_vendor_information(
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

    function createPurchase_Order() {
        const purchase_orderData = {
            vendor_id: vendor_id,
            bank_details: bank_details_information,
            date: date,
            terms: terms_and_conditions,
            type: purchase_order_type,
            extra_info: extra_information,
            bl_number: bl_number,
            all_items: selected_items
        };
        console.log("purchase_orderData")
        console.log(purchase_orderData)

        fetch('/create/purchase_order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(purchase_orderData),
        })
            .then((response) => {
                if (response.ok) {
                    alert('Purchase_Order created successfully');
                } else {
                    alert('Failed to create purchase_order');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    function deletePurchase_Order(purchase_orderId) {
        fetch(`/delete/purchase_order/${purchase_orderId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    alert('Purchase_Order deleted successfully');
                } else {
                    alert('Failed to delete purchase_order');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    function editPurchase_Order(purchase_orderId) {
        const updatedPurchase_OrderData = {
            date: '2023-11-07', // Replace with updated data
            terms: 'Net 45', // Replace with updated data
            purchase_order1: 'Jane Smith', // Replace with updated data
            // Add other fields as needed
        };

        fetch(`/edit/purchase_order/${purchase_orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPurchase_OrderData),
        })
            .then((response) => {
                if (response.ok) {
                    alert('Purchase_Order updated successfully');
                } else {
                    alert('Failed to update purchase_order');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
function createPDF() {
        createPurchase_Order()
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
            pdf.save('Purchase Order - ' + vendor_name + " - " + date + '.pdf');
            $('.invoice_viewer').hide();
        });
    }
    
    return (
        <div className="invoice">
            <h1>Create Purchase_Order</h1>
            <div className="topbar">
                <button onClick={createPDF}>Create Purchase_Order</button>
            </div>

            <div className="all_inputs">
                <div className="input_field">
                    <div className="title">Bill To</div>
                    <div className="input">
                        <select
                            onChange={(e) => {
                                let value = e.target.value;
                                let data = JSON.parse(value);
                                set_vendor_id(data.id);
                                set_vendor_name(data.name)
                                set_vendor_information(
                                    <div>
                                        <div>{data.name}</div>
                                        <div>{data.address1}</div>
                                        <div>{data.address2}</div>
                                    </div>
                                );
                            }}>
                            {all_vendor.map(function (vendor) {
                                return <option value={JSON.stringify(vendor)}>{vendor.name}</option>;
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
                                set_purchase_order_type(e.target.value);
                            }}>
                            <option value="First Quote">First Quote</option>
                            <option value="Final Quote">Final Quote</option>
                            <option value="Purchase_Order">Purchase_Order</option>
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
                        id="invoice-table"
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
                                            onChange={(e) => edit_purchase_order_fields(index, 'name', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={item.description}
                                            onChange={(e) => edit_purchase_order_fields(index, 'description', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={item.price}
                                            onChange={(e) => edit_purchase_order_fields(index, 'price', parseFloat(e.target.value))}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => edit_purchase_order_fields(index, 'quantity', parseInt(e.target.value))}
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
                                    <select onChange={(e) => add_new_purchase_order_item(e)}>
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
                className="invoice_viewer"
                id="invoice_viewer">
                <div className="logo"></div>
                <h4>{purchase_order_type}</h4>
                <div className="first_section">
                    <div className="company_information">{company_information}</div>
                    <div className="invoice_information">
                        <br />
                        <br />
                        <div>Date: {date}</div>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: purchase_order_information.replace(/\n/g, '<br>'),
                            }}></div>
                    </div>
                </div>
                <div className="second_section">
                    <div className="vendor_information">
                        <h3>Vendor</h3>

                        {vendor_information}
                    </div>
                   
                </div>
                <div className="third_section">
                   
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
