function App() {
    const [name, set_name] = React.useState();
    const [address1, set_address1] = React.useState();
    const [address2, set_address2] = React.useState();
    const [address3, set_address3] = React.useState();
    const [tel, set_tel] = React.useState();
    const [fax, set_fax] = React.useState();
    const [gst, set_gst] = React.useState();
    const [bank_details, set_bank_details] = React.useState();
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
    return (
        <div className="company">
            <h1>Company Details</h1>
            <div className="all_inputs">
                <div className="input_field">
                    <div className="title">Name</div>
                    <div className="input">
                        <input type="text" value={name} />
                    </div>
                </div>
                <div className="input_field">
                    <div className="title">Address Line 1</div>
                    <div className="input">
                        <input type="text" value={address1} />
                    </div>
                </div>
                <div className="input_field">
                    <div className="title">Address Line 2</div>
                    <div className="input">
                        <input type="text" value={address2} />
                    </div>
                </div>
                <div className="input_field">
                    <div className="title">Address Line 3</div>
                    <div className="input">
                        <input type="text" value={address3} />
                    </div>
                </div>
                <div className="input_field">
                    <div className="title">Tel</div>
                    <div className="input">
                        <input type="text" value={tel} />
                    </div>
                </div>
                <div className="input_field">
                    <div className="title">Fax</div>
                    <div className="input">
                        <input type="text" value={fax} />
                    </div>
                </div>
                <div className="input_field">
                    <div className="title">GST</div>
                    <div className="input">
                        <input type="text" value={gst} />
                    </div>
                </div>
                <div className="input_field">
                    <div className="title">Bank Details</div>
                    <div className="input">
                        <input type="text" value={bank_details} />
                    </div>
                </div>
                <button>Save</button>
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
