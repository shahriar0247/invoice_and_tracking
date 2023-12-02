const App = () => {
    const [data, setData] = React.useState([]);
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        fetchDaily_Account();
    }, []);

    function fetchDaily_Account() {
        fetch('/get/daily_account')
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setUsers(getUniqueUsers(data));
                loadTable(data);
            })
            .catch((error) => {
                console.error('Error fetching daily_account:', error);
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
                    { title: 'ID', data: (item) => 'DA - ' + item.id * 23123 },
                    { title: 'Invoice', data: 'invoice_id' },
                    { title: 'Purchase Order', data: 'purchase_order_id' },
                    {
                        title: '',
                        data: (item) => `<a class="button" href="/view_daily_account/${item.id}">View</a>`,
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
            <h1>Daily_Accounts</h1>
            <a className="button" href="/create_daily_account">Create Daily_Account</a>
           
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
                        <th>Invoice</th>
                        <th>Purchase Order</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
