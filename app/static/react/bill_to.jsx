function App() {

    const [showCreateModal, setShowCreateModal] = React.useState()
    const [showEditModal, setShowEditModal] = React.useState()

    const [name, set_name] = React.useState();
    const [address1, set_address1] = React.useState();
    const [address2, set_address2] = React.useState();
    const [address3, set_address3] = React.useState();

    React.useEffect(() => {
        fetchBill_to();
    }, []);
    function fetchBill_to() {
        fetch("/get/bill_to")
            .then((response) => response.json())
            .then((data) => {
                set_name(data["name"]);
                set_address1(data["address1"]);
                set_address2(data["address2"]);
                set_address3(data["address3"]);
            })
            .catch((error) => {
                console.error("Error fetching bill_to data:", error);
            });
    }
    function createBill_to() {
        const bill_toData = {
            name: name,
            address1: address1,
            address2: address2,
            address3: address3,
        };

        fetch("/create/bill_to", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bill_toData),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Bill_to created successfully");
                    location.reload();
                } else {
                    alert("Failed to create bill_to");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }
    return (
        <div className="bill_to">
            <h1>Bill_to Details</h1>
            .modal
            <div className="all_inputs">
                <div className="input_field">
                    <div className="title">Name</div>
                    <div className="input">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => {
                                set_name(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="input_field">
                    <div className="title">Address Line 1</div>
                    <div className="input">
                        <input
                            type="text"
                            value={address1}
                            onChange={(e) => {
                                set_address1(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="input_field">
                    <div className="title">Address Line 2</div>
                    <div className="input">
                        <input
                            type="text"
                            value={address2}
                            onChange={(e) => {
                                set_address2(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="input_field">
                    <div className="title">Address Line 3</div>
                    <div className="input">
                        <input
                            type="text"
                            value={address3}
                            onChange={(e) => {
                                set_address3(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <button onClick={createBill_to}>Save</button>
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
