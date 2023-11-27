const App = () => {
    const [data, setData] = React.useState([]);
    const [vendors, setVendors] = React.useState([]);

    React.useEffect(() => {
        fetchInvoice();
    }, []);

    function fetchInvoice() {
        fetch('/get/purchase_order')
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setVendors(getUniqueVendors(data));
                loadTable(data);
            })
            .catch((error) => {
                console.error('Error fetching invoice:', error);
            });
    }

    function getUniqueVendors(data) {
        // Extract unique vendors from the data
        const uniqueVendors = [...new Set(data.map((item) => item.vendor))];
        return uniqueVendors;
    }

    function loadTable(data) {
        $(document).ready(function () {
            var dataTable = $('#data-table').DataTable({
                data: data,
                columns: [
                    { title: 'ID', data: (item) => 'PUR - ' + item.id * 23123 },
                    { title: 'Vendor', data: 'vendor' },
                    { title: 'BL Number', data: 'bl_number' },
                    {
                        title: '',
                        data: (item) => `<a class="button" href="/view_purchase_order/${item.id}">View</a>`,
                    },
                ],
            });

            // Adding date filtering
            $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
                const minDate = $('#min-date').val();
                const maxDate = $('#max-date').val();
                const currentDate = new Date(data[3]); // Assuming date is in the fourth column

                if ((!minDate || currentDate >= new Date(minDate)) && (!maxDate || currentDate <= new Date(maxDate))) {
                    return true;
                }
                return false;
            });

            // Adding vendor filtering
            $('#vendor-filter').on('change', function () {
                const selectedVendor = $(this).val();
                dataTable.column(1).search(selectedVendor).draw();
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
            <div className="all_filters">
                <div>
                    <label>Vendor:</label>
                    <select id="vendor-filter">
                        <option value="">All</option>
                        {vendors.map((vendor, index) => (
                            <option
                                key={index}
                                value={vendor}>
                                {vendor}
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
                        <th>Vendor</th>
                        <th>BL Number</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
