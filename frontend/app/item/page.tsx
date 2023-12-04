function App() {
    const [showCreateModal, setShowCreateModal] = React.useState(false);

    const [name, set_name] = React.useState();
    const [description, set_description] = React.useState();
    const [price, set_price] = React.useState();

    function toggleCreateModal() {
        setShowCreateModal(!showCreateModal);
    }

    React.useEffect(() => {
        fetchItem();
    }, []);

    function fetchItem() {
        fetch("http://localhost:5001/get/item")
            .then((response) => response.json())
            .then((data) => {
                loadTable(data);
            })
            .catch((error) => {
                console.error("Error fetching item data:", error);
            });
    }
    function createItem() {
        const itemData = {
            name: name,
            description: description,
            price: price,
        };

        fetch("http://localhost:5001/create/item", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(itemData),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Item created successfully");
                    location.reload();
                } else {
                    alert("Failed to create item");
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
                dataTable.row.add([item.name, item.description, item.price]).draw();
            });
        });
    }
    return (
        <div className="item">
            <h1>Item Details</h1>
            <div className="topbar">
                <button onClick={toggleCreateModal}>Create Item</button>
            </div>
            <table id="data-table" className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
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
                            <div className="title">Description</div>
                            <div className="input">
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(e) => {
                                        set_description(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="input_field">
                            <div className="title">Price</div>
                            <div className="input">
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => {
                                        set_price(e.target.value);
                                    }}
                                />
                                {" "} {" "} {" "}CAD
                            </div>
                        </div>
                        <button onClick={createItem}>Create</button>
                    </div>
                </div>
            )}
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
