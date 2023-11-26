const App = () => {

    React.useEffect(() => {
        fetchInvoice();
    }, []);

    function fetchInvoice() {
        fetch('/get/purchase_order')
            .then((response) => response.json())
            .then((data) => {
                loadTable(data);
            })
            .catch((error) => {
                console.error('Error fetching invoice:', error);
            });
    }
    function loadTable(data) {
        $(document).ready(function () {
            var dataTable = $('#data-table').DataTable();

            data.forEach(function (item) {
                var view_link = `<a class="button" href="/view_purchase_order/${item.id}">View</a>`;
                dataTable.row.add(["PUR - " + item.id*23123, item.vendor, item.bl_number, view_link]).draw();
            });
        });
    }

    return (
        <div className="invoice">
            <h1>Invoices</h1>
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
