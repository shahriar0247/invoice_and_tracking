const App = () => {
    const [createModalOpen, setCreateModalOpen] = React.useState(false);

    function fetchInvoices() {
        fetch("/get/invoice")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error("Error fetching invoices:", error);
            });
    }
    function fetchCompany() {
        fetch("/get/company")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error("Error fetching company data:", error);
            });
    }
    function fetchBillTo() {
        fetch("/get/bill_to")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error("Error fetching bill_to data:", error);
            });
    }
    function fetchShipFrom() {
        fetch("/get/ship_from")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error("Error fetching ship_from data:", error);
            });
    }
    function fetchShipTo() {
        fetch("/get/ship_to")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error("Error fetching ship_to data:", error);
            });
    }

    function createInvoice() {
        const invoiceData = {
            company_id: company_id, // Replace with actual data
            terms: "Net 30", // Replace with actual data
            bill_to1: "John Doe", // Replace with actual data
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
            bill_to1: "Jane Smith", // Replace with updated data
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
        <div>
            <h1>Hello, React CDN Demo!</h1>
            <button onClick={fetchInvoices}>Get Invoices</button>
            {createModalOpen && (
                <div className="modal">
                    <h2>Create Invoice</h2>
                </div>
            )}
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
