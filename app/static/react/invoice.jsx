const App = () => {
    const [showCreateModal, setShowCreateModal] = React.useState(false);

    const [company, set_company] = React.useState([]);
    const [all_bill_to, set_all_bill_to] = React.useState([]);
    const [all_ship_from, set_all_ship_from] = React.useState([]);
    const [all_ship_to, set_all_ship_to] = React.useState([]);
    const [all_items, set_all_items] = React.useState([]);

    React.useEffect(() => {
        $("select").selectpicker();
    });

    React.useEffect(() => {
        fetchCompany();
        fetchBillTo();
        fetchShipFrom();
        fetchShipTo();
        fetchItems();
        fetchInvoice();

    }, []);
    function toggleCreateModal() {
        setShowCreateModal(!showCreateModal);
    }
    function fetchInvoice() {
        fetch("/get/invoice")
            .then((response) => response.json())
            .then((data) => {
                loadTable(data);
            })
            .catch((error) => {
                console.error("Error fetching invoice:", error);
            });
    }
    function loadTable(data) {
        $(document).ready(function () {
            var dataTable = $("#data-table").DataTable();

            data.forEach(function (item) {
                dataTable.row.add([item.name, item.address1, item.address2]).draw();
            });
        });
    }
    function fetchCompany() {
        fetch("/get/company")
            .then((response) => response.json())
            .then((data) => {
                set_company(data);
            })
            .catch((error) => {
                console.error("Error fetching company data:", error);
            });
    }
    function fetchBillTo() {
        fetch("/get/bill_to")
            .then((response) => response.json())
            .then((data) => {
                set_all_bill_to(data);
            })
            .catch((error) => {
                console.error("Error fetching invoice data:", error);
            });
    }
    function fetchShipFrom() {
        fetch("/get/ship_from")
            .then((response) => response.json())
            .then((data) => {
                set_all_ship_from(data);
            })
            .catch((error) => {
                console.error("Error fetching ship_from data:", error);
            });
    }
    function fetchShipTo() {
        fetch("/get/ship_to")
            .then((response) => response.json())
            .then((data) => {
                set_all_ship_to(data);
            })
            .catch((error) => {
                console.error("Error fetching ship_to data:", error);
            });
    }
    function fetchItems() {
        fetch("/get/item")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                set_all_items(data);
            })
            .catch((error) => {
                console.error("Error fetching items data:", error);
            });
    }

    function createInvoice() {
        const invoiceData = {
            company_id: company_id, // Replace with actual data
            terms: "Net 30", // Replace with actual data
            invoice1: "John Doe", // Replace with actual data
            // Add other fields as needed
        };

        fetch("/create/invoice", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(invoiceData),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Invoice created successfully");
                } else {
                    alert("Failed to create invoice");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }
    function deleteInvoice(invoiceId) {
        fetch(`/delete/invoice/${invoiceId}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) {
                    alert("Invoice deleted successfully");
                } else {
                    alert("Failed to delete invoice");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }
    function editInvoice(invoiceId) {
        const updatedInvoiceData = {
            date: "2023-11-07", // Replace with updated data
            terms: "Net 45", // Replace with updated data
            invoice1: "Jane Smith", // Replace with updated data
            // Add other fields as needed
        };

        fetch(`/edit/invoice/${invoiceId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedInvoiceData),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Invoice updated successfully");
                } else {
                    alert("Failed to update invoice");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }
    return (
        <div className="invoice">
            <h1>Invoice Details</h1>
            <div className="topbar">
                <button onClick={toggleCreateModal}>Create Invoice</button>
            </div>
            <table id="data-table" className="table table-striped">
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
                                <select>
                                    {all_bill_to.map(function (element) {
                                        return <option>{element.name}</option>;
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="input_field">
                            <div className="title">Ship To</div>
                            <div className="input">
                                <select>
                                    {all_ship_to.map(function (element) {
                                        return <option>{element.name}</option>;
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="input_field">
                            <div className="title">Ship From</div>
                            <div className="input">
                                <select>
                                    {all_ship_from.map(function (element) {
                                        return <option>{element.name}</option>;
                                    })}
                                </select>
                            </div>
                        </div>

                        <div className="input_field">
                            <div className="title">Items</div>
                            <div className="input">
                                <select id="item_select" className="" multiple="multiple">
                                    {all_items.map(function (element) {
                                        return <option>{element.name}</option>;
                                    })}
                                </select>
                            </div>
                        </div>
                        <button onClick={createInvoice}>Create</button>
                    </div>
                </div>
            )}
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
