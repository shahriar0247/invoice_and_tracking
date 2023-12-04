function App() {
    const [showCreateModal, setShowCreateModal] = React.useState(false);

    const [name, set_name] = React.useState();
    const [address1, set_address1] = React.useState();
    const [address2, set_address2] = React.useState();

    function toggleCreateModal() {
        setShowCreateModal(!showCreateModal);
    }

    React.useEffect(() => {
        fetchShip_from();
    }, []);

    function fetchShip_from() {
        fetch("http://localhost:5001/get/ship_from")
            .then((response) => response.json())
            .then((data) => {
                loadTable(data);
            })
            .catch((error) => {
                console.error("Error fetching ship_from data:", error);
            });
    }
    function createShip_from() {
        const ship_fromData = {
            name: name,
            address1: address1,
            address2: address2,
        };

        fetch("http://localhost:5001/create/ship_from", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ship_fromData),
        })
            .then((response) => {
                if (response.ok) {
                    location.reload();
                } else {
                    alert("Failed to create ship_from");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
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
    return (
        <div className="ship_from">
            <h1>Ship From Details</h1>
            <div className="topbar">
                <button onClick={toggleCreateModal}>Create Ship From</button>
            </div>
            <table id="data-table" className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
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
                        <button onClick={createShip_from}>Create</button>
                    </div>
                </div>
            )}
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
