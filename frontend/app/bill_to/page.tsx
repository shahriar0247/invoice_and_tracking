function App() {
    const [showCreateModal, setShowCreateModal] = React.useState(false);

    const [name, set_name] = React.useState();
    const [address1, set_address1] = React.useState();
    const [address2, set_address2] = React.useState();

    const [create_mode, set_create_mode] = React.useState(true);
    const [edit_bill_to_id, set_edit_bill_to_id] = React.useState(0);

    function toggleCreateModal() {
        set_create_mode(true);
        setShowCreateModal(!showCreateModal);
    }

    React.useEffect(() => {
        fetchBill_to();
    }, []);

    function fetchBill_to() {
        fetch('http://localhost:5001/get/bill_to')
            .then((response) => response.json())
            .then((data) => {
                loadTable(data);
            })
            .catch((error) => {
                console.error('Error fetching bill_to data:', error);
            });
    }
    function createBill_to() {
        const bill_toData = {
            name: name,
            address1: address1,
            address2: address2,
        };

        fetch('http://localhost:5001/create/bill_to', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bill_toData),
        })
            .then((response) => {
                if (response.ok) {
                    location.reload();
                } else {
                    alert('Failed to create bill_to');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    function editBill_to() {
        const updatedBill_toData = {
            name: name,
            address1: address1,
            address2: address2,
        };

        fetch(`/edit/bill_to/${edit_bill_to_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBill_toData),
        })
            .then((response) => {
                if (response.ok) {
                    location.reload();
                } else {
                    alert('Failed to edit bill_to');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    function viewBill_to(bill_toId) {
        fetch(`/get/bill_to/${bill_toId}`)
            .then((response) => response.json())
            .then((data) => {
                set_name(data.name);
                set_address1(data.address1);
                set_address2(data.address2);
                set_edit_bill_to_id(data.id);
            })
            .catch((error) => {
                console.error('Error fetching bill_to data:', error);
            });
    }

    function loadTable(data) {
        $(document).ready(function () {
            var dataTable = $('#data-table').DataTable({
                dom: 'Bfrtip',
                buttons: ['copy', 'excel', 'pdf'],
                // other DataTable options
            });

            // Your data iteration logic with buttons
            data.forEach(function (item) {
                var rowNode = dataTable.row.add([item.name, item.address1, item.address2, '<button className="btn btn-primary">Your Button</button>']).draw().node();

                // Attach click event
                $(rowNode)
                    .find('button')
                    .on('click', function () {
                        set_create_mode(false);
                        setShowCreateModal(!showCreateModal);
                        viewBill_to(item.id);
                    });
            });
        });
    }
    return (
        <div className="bill_to">
            <h1>Bill To Details</h1>
            <div className="topbar">
                <button onClick={toggleCreateModal}>Create Bill To</button>
            </div>
            <table
                id="data-table"
                className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address 1</th>
                        <th>Address 2</th>
                        <th>Options</th>
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
                        {create_mode ? <button onClick={createBill_to}>Create</button> : <button onClick={editBill_to}>Edit</button>}
                    </div>
                </div>
            )}
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
