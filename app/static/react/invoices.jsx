const App = () => {
    const [data, setData] = React.useState([]);
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        fetchInvoice();
    }, []);

    function fetchInvoice() {
        fetch('/get/invoice')
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setUsers(getUniqueUsers(data));
                loadTable(data);
            })
            .catch((error) => {
                console.error('Error fetching invoice:', error);
            });
    }

    function getUniqueUsers(data) {
        // Extract unique users from the data (assuming "Bill To" is the user field)
        const uniqueUsers = [...new Set(data.map((item) => item.bill_to))];
        return uniqueUsers;
    }

    function loadTable(data) {
        $(document).ready(function () {
            var dataTable = $('#data-table').DataTable({
                data: data,
                columns: [
                    { title: 'ID', data: (item) => 'INV - ' + item.id * 23123 },
                    { title: 'Bill To', data: 'bill_to' },
                    { title: 'Ship From', data: 'ship_from' },
                    { title: 'Ship To', data: 'ship_to' },
                    { title: 'BL Number', data: 'bl_number' },
                    { title: 'Date', data: 'date' },
                    {
                        title: '',
                        data: (item) => `<a class="button" href="/view_invoice/${item.id}">View</a>`,
                    },
                ],
            });

            // Adding date filtering
            $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
                const minDate = $('#min-date').val();
                const maxDate = $('#max-date').val();
                const currentDate = new Date(data[5]); // Assuming date is in the sixth column

                if ((!minDate || currentDate >= new Date(minDate)) && (!maxDate || currentDate <= new Date(maxDate))) {
                    return true;
                }
                return false;
            });

            // Adding user filtering
            $('#user-filter').on('change', function () {
                const selectedUser = $(this).val();
                dataTable.column(1).search(selectedUser).draw();
            });

            // Refresh table on date filter change
            $('#min-date, #max-date').on('change', function () {
                dataTable.draw();
            });
        });
    }

    return (
        <div className="invoice">
            <h1>Invoices</h1>
            <a className="button" href="/create_invoice">Create Invoice</a>
            <div className="all_filters">
                <div>
                    <label>User:</label>
                    <select id="user-filter">
                        <option value="">All</option>
                        {users.map((user, index) => (
                            <option
                                key={index}
                                value={user}>
                                {user}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>From:</label>
                    <input
                        type="date"
                        id="min-date"
                    />
                </div>

                <div>
                    <label>To:</label>
                    <input
                        type="date"
                        id="max-date"
                    />
                </div>
            </div>
            <table
                id="data-table"
                className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Bill To</th>
                        <th>Ship From</th>
                        <th>Ship To</th>
                        <th>BL Number</th>
                        <th>Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
