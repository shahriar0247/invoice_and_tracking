const App = () => {
    const [all_items, set_all_items] = React.useState();
    const [invoice_all_items, set_invoice_all_items] = React.useState([]);
    const [purchase_orders_all_items, set_purchase_orders_all_items] = React.useState([]);
    const [selected_items, set_selected_items] = React.useState([]);

    const [purchase_orders, set_all_purchase_orders] = React.useState([]);
    const [purchase_order_id, set_purchase_order_id] = React.useState();

    const [all_invoices, set_all_invoices] = React.useState([]);
    const [invoice_id, set_invoice_id] = React.useState();

    const [total_price, set_total_price] = React.useState(0);

    React.useEffect(() => {
        let total_price_ = 0;
        selected_items.map(function (item) {
            total_price_ = total_price_ + item.price * item.quantity;
        });
        set_total_price(total_price_);
    }, [selected_items]);

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

    React.useEffect(() => {
        let total_price_ = 0;
        invoice_all_items.map(function (item) {
            total_price_ = total_price_ + item.price * item.quantity;
        });
        set_total_price(total_price_);
    }, [invoice_all_items]);

    const edit_invoice_fields = (index, field, value) => {
        const updatedItems = [...invoice_all_items];
        updatedItems[index][field] = value;
        set_invoice_all_items(updatedItems);
    };

    const add_new_invoice_item = (event) => {
        let selectedItemValue = event.target.value;

        if (selectedItemValue == 'none') return;

        if (selectedItemValue == 'blank') {
            set_invoice_all_items([...invoice_all_items, { id: 0, name: '', description: '', price: 0, quantity: 1 }]);
            event.target.value = 'none';
            return;
        }
        selectedItemValue = JSON.parse(selectedItemValue);
        const selectedItem = all_items.find((item) => item.id === selectedItemValue.id);
        if (selectedItem) {
            const selectedItemJson = JSON.stringify(selectedItem);
            set_invoice_all_items([...invoice_all_items, { ...selectedItem, quantity: 1 }]);
            event.target.value = 'none';
        } else {
            alert('Error item not found in the list');
        }
    };
    const removeInvoiceItem = (index) => {
        const updatedItems = [...invoice_all_items];
        updatedItems.splice(index, 1);
        set_invoice_all_items(updatedItems);
    };

    React.useEffect(() => {
        let total_price_ = 0;
        purchase_orders_all_items.map(function (item) {
            total_price_ = total_price_ + item.price * item.quantity;
        });
        set_total_price(total_price_);
    }, [purchase_orders_all_items]);

    const edit_purchase_order_fields = (index, field, value) => {
        const updatedItems = [...purchase_orders_all_items];
        updatedItems[index][field] = value;
        set_purchase_order_all_items(updatedItems);
    };

    const add_new_purchase_order_item = (event) => {
        let selectedItemValue = event.target.value;

        if (selectedItemValue == 'none') return;

        if (selectedItemValue == 'blank') {
            set_purchase_orders_all_items([...purchase_orders_all_items, { id: 0, name: '', description: '', price: 0, quantity: 1 }]);
            event.target.value = 'none';
            return;
        }
        selectedItemValue = JSON.parse(selectedItemValue);
        const selectedItem = all_items.find((item) => item.id === selectedItemValue.id);
        if (selectedItem) {
            const selectedItemJson = JSON.stringify(selectedItem);
            set_purchase_orders_all_items([...purchase_orders_all_items, { ...selectedItem, quantity: 1 }]);
            event.target.value = 'none';
        } else {
            alert('Error item not found in the list');
        }
    };
    const removePurchaseOrderItem = (index) => {
        const updatedItems = [...purchase_orders_all_items];
        updatedItems.splice(index, 1);
        set_purchase_orders_all_items(updatedItems);
    };

    React.useEffect(() => {
        fetchPurchaseOrders();
    }, []);

    function fetchPurchaseOrders() {
        fetch('/get/purchase_order')
            .then((response) => response.json())
            .then((data) => {
                set_all_purchase_orders(data);
                data = data[0];
                set_purchase_order_id(data.id);
                set_invoice_id(data.invoice_id);
                set_purchase_orders_all_items(JSON.parse(data.all_items));
                fetchInvoice(data.invoice_id);
            })
            .catch((error) => {
                console.error('Error fetching purchase_order data:', error);
            });
    }

    function fetchInvoice(invoice_id_) {
        console.log(invoice_id_);
        console.log(invoice_id_);
        fetch('/get_invoice_details/' + invoice_id_)
            .then((response) => response.json())
            .then((data) => {
                set_invoice_all_items(JSON.parse(data.all_items));
            })
            .catch((error) => {
                console.error('Error fetching invoice data:', error);
            });
    }

    function createDaily_Account() {
        const daily_accountData = {
            all_items: selected_items,
            purchase_order_id: purchase_order_id,
        };

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


    return (
        <div className="daily_account">
            <h1>Create Daily_Account</h1>
            <div className="topbar">
                <button onClick={createDaily_Account}>Create Daily_Account</button>
            </div>
            <div className="all_inputs">
                <div className="input_field">
                    <div className="title">Connect PO</div>
                    <div className="input">
                        <select
                            onChange={(e) => {
                                let value = e.target.value;
                                let data = JSON.parse(value);
                                set_purchase_order_id(data.id);
                                set_invoice_id(data.invoice_id);
                                set_purchase_orders_all_items(JSON.parse(data.all_items));
                                fetchInvoice(data.invoice_id);
                            }}>
                            {purchase_orders &&
                                purchase_orders.map(function (po) {
                                    return (
                                        <option value={JSON.stringify(po)}>
                                            {po.id} - {po.vendor} - {po.date}
                                        </option>
                                    );
                                })}{' '}
                        </select>
                    </div>
                </div>
            </div>

            <h2>Petty Cash</h2>

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

            <h2>Invoice</h2>

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
                            {invoice_all_items.map((item, index) => (
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
                                    <td>
                                        <button onClick={() => removeItem(index)}>Remove</button> {/* Button to remove item */}
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td>
                                    <select onChange={(e) => add_new_invoice_item(e)}>
                                        <option value="none">New Item</option>
                                        <option value="blank">Black Item</option>
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

            <h2>Purchase Order</h2>

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
                            {purchase_orders_all_items.map((item, index) => (
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
                                        <button onClick={() => removePurchaseOrderItem(index)}>Remove</button> {/* Button to remove item */}
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td>
                                    <select onChange={(e) => add_new_purchase_order_item(e)}>
                                        <option value="none">New Item</option>
                                        <option value="blank">Black Item</option>
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
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
