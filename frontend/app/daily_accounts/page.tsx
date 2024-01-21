'use client';

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react';
import React from 'react';
import { usePDF } from 'react-to-pdf';

export default function Daily_Accounts({ create = true, daily_account_id_view = '' }) {
    const [data3, setData3] = React.useState([]);
    const [all_data, set_all_data] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const [users2, setUsers2] = React.useState([]);
    const [vendor_search_term, set_vendor_search_term] = React.useState('');
    const [bill_to_search_term, set_bill_to_search_term] = React.useState('');
    const [edit, set_edit] = React.useState(false);
    const [summary_modal, set_summary_modal] = React.useState(false);

    const [minDate, setMinDate] = React.useState('');
    const [maxDate, setMaxDate] = React.useState('');

    const [dateFilter, setDateFilter] = React.useState(''); // State to store selected date filter

    const handleDateFilterChange = (filter) => {
        setDateFilter(filter);

        const today = new Date();
        let newMinDate = '';
        let newMaxDate = '';

        switch (filter) {
            case 'all':
                newMinDate = '';
                newMaxDate = '';
                break;
            case 'today':
                newMinDate = today.toISOString().split('T')[0];
                newMaxDate = today.toISOString().split('T')[0];
                break;
            case 'yesterday':
                const yesterday = new Date(today);
                yesterday.setDate(today.getDate() - 1);
                newMinDate = yesterday.toISOString().split('T')[0];
                newMaxDate = yesterday.toISOString().split('T')[0];
                break;
            case 'last7days':
                const last7Days = new Date(today);
                last7Days.setDate(today.getDate() - 6);
                newMinDate = last7Days.toISOString().split('T')[0];
                newMaxDate = today.toISOString().split('T')[0];
                break;
            case 'last30days':
                const last30days = new Date(today);
                last30days.setDate(today.getDate() - 6);
                newMinDate = last30days.toISOString().split('T')[0];
                newMaxDate = today.toISOString().split('T')[0];
                break;
            case 'last7days':
                const last60days = new Date(today);
                last60days.setDate(today.getDate() - 6);
                newMinDate = last60days.toISOString().split('T')[0];
                newMaxDate = today.toISOString().split('T')[0];
                break;
            default:
                break;
        }

        setMinDate(newMinDate);
        setMaxDate(newMaxDate);
    };

    React.useEffect(() => {
        fetch_daily_accounts();

        try {
            const urlParams = new URLSearchParams(window.location.search);
            const edit = urlParams.get('edit');
            set_edit(edit === 'true');
        } catch (error) {
            console.log(error);
        }
    }, []);

    function fetch_daily_accounts() {
        fetch('http://localhost:5003/get/daily_account')
            .then((response) => response.json())
            .then((data) => {
                setData3(data);

                set_all_data(data);
                setUsers(getUniqueUsers(data));
                setUsers2(getUniqueUsers2(data));
            })
            .catch((error) => {
                console.error('Error fetching daily_accounts:', error);
            });
    }

    const { isOpen, onOpen, onClose } = useDisclosure();
    function getUniqueUsers(data) {
        const uniqueUsers = [...new Set(data.map((item) => item.vendor.name))];
        return uniqueUsers;
    }
    function getUniqueUsers2(data) {
        const uniqueUsers = [...new Set(data.map((item) => item.bill_to.name))];
        return uniqueUsers;
    }
    function deleteDaily_Account(daily_accountId) {
        fetch(`http://localhost:5003/delete/daily_account/${daily_accountId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    alert('Daily_Account deleted successfully');
                    window.location.reload();
                } else {
                    alert('Failed to delete daily_account');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    function filter() {
        var filteredData3 = all_data.filter(function (daily_account) {
            if (vendor_search_term.length > 0 && vendor_search_term == daily_account.vendor.name) {
            } else if (vendor_search_term == 'All' || vendor_search_term == '') {
            } else {
                return false;
            }

            if (bill_to_search_term.length > 0 && bill_to_search_term == daily_account.bill_to.name) {
            } else if (bill_to_search_term == 'All' || bill_to_search_term == '') {
            } else {
                return false;
            }

            return (minDate === '' || new Date(daily_account.date) >= new Date(minDate)) && (maxDate === '' || new Date(daily_account.date) <= new Date(maxDate));
        });

        setData3(filteredData3);
    }

    React.useEffect(() => {
        filter();
    }, [minDate, maxDate, vendor_search_term, bill_to_search_term]);

    function change_daily_account_status(id, status) {
        const data = {
            id: id,
            status: status,
        };
        fetch(`http://localhost:5003/daily_account/change_status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.ok) {
                } else {
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    if (!create) {
        return (
            <Create_daily_account
                edit={edit}
                create={create}
                onCloseParent={onClose}
                fetch_daily_accounts={fetch_daily_accounts}
                daily_account_id_view={daily_account_id_view}></Create_daily_account>
        );
    }
    return (
        <div className="invoice">
            <h1>Daily Accounts</h1>
            <button onClick={onOpen}>Create Accounts</button>
            <Modal
                isOpen={isOpen}
                onClose={onClose}>
                <ModalContent>
                    <ModalHeader>Create Accounts</ModalHeader>
                    <ModalBody>
                        <Create_daily_account
                            fetch_daily_accounts={fetch_daily_accounts}
                            onCloseParent={onClose}
                        />
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                </ModalContent>
            </Modal>
            <h1>All Filters</h1>
            <div className="all_filters">
                <div>
                    <label>Vendor Search:</label>
                    <select onChange={(e) => set_vendor_search_term(e.target.value)}>
                        <option value="All">All</option>
                        {users.map(function (user, index) {
                            return (
                                <option
                                    key={index}
                                    value={user}>
                                    {user}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div>
                    <label>Bill To Search:</label>
                    <select onChange={(e) => set_bill_to_search_term(e.target.value)}>
                        <option value="All">All</option>
                        {users2.map(function (user, index) {
                            return (
                                <option
                                    key={index}
                                    value={user}>
                                    {user}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div>
                    <label>Date Search:</label>
                    <select
                        value={dateFilter}
                        onChange={(e) => handleDateFilterChange(e.target.value)}>
                        <option value="all">All</option>
                        <option value="today">Today</option>
                        <option value="yesterday">Yesterday</option>
                        <option value="last7days">Last 7 Days</option>
                        <option value="last30days">Last 30 Days</option>
                        <option value="last60days">Last 60 Days</option>
                    </select>
                </div>
            </div>
            <div>
                <h2>All Daily Accounts</h2>
                <Table>
                    <TableHeader>
                        <TableColumn>ID</TableColumn>
                        <TableColumn>Date</TableColumn>
                        <TableColumn>Vendor</TableColumn>
                        <TableColumn>Total Price</TableColumn>
                        <TableColumn></TableColumn>
                        <TableColumn></TableColumn>
                    </TableHeader>
                    <TableBody>
                        {data3.map(function (item) {
                            if (item.vendor.name == null) {
                                return;
                            }
                            return (
                                <TableRow key={item.id}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{new Date(item.date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</TableCell>
                                    <TableCell>{item.vendor.name}</TableCell>
                                    <TableCell>{JSON.parse(item.all_items).reduce((acc, item) => acc + item.price * item.quantity, 0) + ' ' + item.currency}</TableCell>
                                    <TableCell>
                                        <a
                                            className="button"
                                            href={`/daily_accounts/${item.id}?edit=true`}>
                                            Edit
                                        </a>
                                    </TableCell>
                                    <TableCell>
                                        <button
                                            onClick={() => {
                                                deleteDaily_Account(item.id);
                                            }}>
                                            Delete
                                        </button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
            <CreateSummary_Container data3={data3}></CreateSummary_Container>
            
        </div>
    );
}
function CreateSummary_Container(data3) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <div>
            <button onClick={onOpen}>Create Summary</button>
            <Modal
                isOpen={isOpen}
                onClose={onClose}>
                <ModalContent>
                    <ModalHeader>Create Summary</ModalHeader>
                    <ModalBody>
                        <CreateSummary data3={data3} />
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}
function CreateSummary(data3) {
    const [currency, set_currency] = React.useState('USD');
    const { toPDF, targetRef } = usePDF({ filename: 'Summary.pdf' });
    const totalPriceOfAllItems = data3.data3.data3.flatMap((invoice) => JSON.parse(invoice.all_items || '[]').map((item) => item.price)).reduce((acc, price) => acc + price, 0);
    console.log(data3.data3.data3)

    return (
        <div>
            <div >
                <label htmlFor="">Currency: </label>
                <select name="" id="" onChange={(e) => {set_currency(e.target.value)}}>
                    <option value="USD">USD</option>
                    <option value="CAD">CAD</option>
                </select>
                <div className='summary_print_container'>

                <div className='summary_print' ref={targetRef}>
                <h2>Summary</h2>

                    <Table>
                    <TableHeader>
                        <TableColumn>ID</TableColumn>
                        <TableColumn>Date</TableColumn>
                        <TableColumn>Vendor</TableColumn>
                        <TableColumn>Tax Amount</TableColumn>
                        <TableColumn>Total Price</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {data3.data3.data3.map(function (item) {
                            if (item.vendor.name == null) {
                                return;
                            }
                            return (
                                <TableRow key={item.id}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{new Date(item.date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</TableCell>
                                    <TableCell>{item.vendor.name}</TableCell>
                                    <TableCell>{JSON.parse(item.all_items).reduce((acc, item) => acc + (item.tax_amount) * item.quantity, 0) + ' ' + currency}</TableCell>
                                    <TableCell>{JSON.parse(item.all_items).reduce((acc, item) => acc + (item.price + item.tax_amount) * item.quantity, 0) + ' ' + currency}</TableCell>
                                </TableRow>
                            );
                        })}
                          <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell>Total Price: {totalPriceOfAllItems.toFixed(2)} {currency}</TableCell>
                            </TableRow>
                    </TableBody>
                </Table>
                </div>
                </div>
            </div>
            <button onClick={toPDF}>Download PDF</button>
        </div>
    );
}
function Create_daily_account({ create = true, daily_account_id_view = '', edit = false, fetch_daily_accounts, onCloseParent }) {
    const [company, set_company] = React.useState([]);
    const [all_vendor, set_all_vendor] = React.useState([]);
    const [all_ship_from, set_all_ship_from] = React.useState([]);
    const [all_bill_to, set_all_bill_to] = React.useState([]);
    const [all_items, set_all_items] = React.useState();
    const [selected_items, set_selected_items] = React.useState([]);

    const [company_information, set_company_information] = React.useState('');
    const [daily_account_information, set_daily_account_information] = React.useState('');
    const [vendor_information, set_vendor_information] = React.useState('');
    const [ship_from_information, set_ship_from_information] = React.useState('');
    const [bill_to_information, set_bill_to_information] = React.useState('');
    const [extra_information, set_extra_information] = React.useState('');
    const [description, set_description] = React.useState('');
    const [daily_account_status, set_daily_account_status] = React.useState('');
    const [bank_details_information, set_bank_details_information] = React.useState('');

    const [terms_and_conditions, set_terms_and_conditions] = React.useState('');
    const [daily_account_type, set_daily_account_type] = React.useState('First Quote');
    const [bl_number, set_bl_number] = React.useState(0);
    const [vendor_id, set_vendor_id] = React.useState(0);
    const [vendor, set_vendor] = React.useState('');
    const [bill_to_id, set_bill_to_id] = React.useState(0);
    const [bill_to, set_bill_to] = React.useState('');
    const [ship_from_id, set_ship_from_id] = React.useState('');
    const [ship_from, set_ship_from] = React.useState('');
    const [date, set_date] = React.useState(getFormattedDate());
    const [due_date, set_due_date] = React.useState(getFormattedDate());
    const [daily_account_id, set_daily_account_id] = React.useState(`DA - ${Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000}`);
    const [currency, set_currency] = React.useState('USD');
    const [all_vendors, set_all_vendors] = React.useState([]);

    const [total_price, set_total_price] = React.useState(0);

    React.useEffect(() => {
        let total_price_ = 0;

        selected_items.map(function (item) {
            console.log(item.tax_amount);
            if (item.tax_amount == undefined) {
                total_price_ = total_price_ + parseFloat(item.price) * item.quantity;
            } else {
                total_price_ = total_price_ + parseFloat(item.price) + parseFloat(item.tax_amount) * item.quantity;
            }
        });
        set_total_price(total_price_);
    }, [selected_items]);
    React.useEffect(() => {
        fetchCompany();
        fetchVendor();
        fetchVendor();
        fetchBill_To();
        fetchItems();
        fetchDaily_Account();
        if (!create) {
            get_daily_account_details();
        }
    }, []);

    function getFormattedDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    function fetch_daily_accounts_handler() {
        fetch_daily_accounts();
    }

    async function get_daily_account_details() {
        const response = await fetch('http://localhost:5003/get_daily_account_details/' + daily_account_id_view);
        const data = await response.json();
        const all_items_ = JSON.parse(data['all_items']);
        set_daily_account_id(data.id);
        set_selected_items(all_items_);
        set_vendor(JSON.stringify(data.vendor));
        set_vendor_id(data.vendor.id);
        set_bill_to(JSON.stringify(data.bill_to));
        set_bill_to_id(data.bill_to.id);
        set_description(data.description);
        set_currency(data.currency);

        var dateObject = new Date(data.date);
        var year = dateObject.getFullYear();
        var month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
        var day = dateObject.getDate().toString().padStart(2, '0');
        set_date(`${year}-${month}-${day}`);
    }

    const edit_daily_account_fields = (index, field, value) => {
        const updatedItems = [...selected_items];
        updatedItems[index][field] = value;
        set_selected_items(updatedItems);
    };

    const add_new_daily_account_item = (event) => {
        let selectedItemValue = event.target.value;

        if (selectedItemValue == 'none') return;

        if (selectedItemValue == 'blank') {
            set_selected_items([...selected_items, { id: 0, name: '', description: '', price: 0, quantity: 1 }]);
            event.target.value = 'none';
            return;
        }
        selectedItemValue = JSON.parse(selectedItemValue);
        const selectedItem = all_items.find((item) => item.id === selectedItemValue.id);
        if (selectedItem) {
            const selectedItemJson = JSON.stringify(selectedItem);
            set_selected_items([...selected_items, { ...selectedItem, quantity: 1 }]);
            event.target.value = 'none';
        } else {
            alert('Error item not found in the list');
        }
    };
    const removeItem = (index) => {
        const updatedItems = [...selected_items];
        updatedItems.splice(index, 1);
        set_selected_items(updatedItems);
    };
    function fetchVendor() {
        fetch('http://localhost:5003/get/type/vendor')
            .then((response) => response.json())
            .then((data) => {
                set_all_vendor(data);
            })
            .catch((error) => {
                console.error('Error fetching all vendor:', error);
            });
    }
    function fetchDaily_Account() {
        fetch('http://localhost:5003/get/daily_account')
            .then((response) => response.json())
            .then((data) => {
                // setda(data);
            })
            .catch((error) => {
                console.error('Error fetching daily_account:', error);
            });
    }
    function fetchCompany() {
        fetch('http://localhost:5003/get/company')
            .then((response) => response.json())
            .then((data) => {
                set_company(data);
                set_bank_details_information(data.bank_details);
                set_company_information(
                    <div>
                        <h1>{data.name}</h1>
                        <div>{data.address1}</div>
                        <div>{data.address2}</div>
                        <div>{data.address3}</div>
                        <div>Tel: {data.tel}</div>
                        <div>Fax: {data.fax}</div>
                        <div>GST Registration #: {data.gst}</div>
                    </div>
                );
            })
            .catch((error) => {
                console.error('Error fetching company data:', error);
            });
    }

    function fetchBill_To() {
        fetch('http://localhost:5003/get/type/bill_to')
            .then((response) => response.json())
            .then((data) => {
                set_all_bill_to(data);
            })
            .catch((error) => {
                console.error('Error fetching bill_to data:', error);
            });
    }
    function fetchItems() {
        fetch('http://localhost:5003/get/item')
            .then((response) => response.json())
            .then((data) => {
                set_all_items(data);
            })
            .catch((error) => {
                console.error('Error fetching items data:', error);
            });
    }

    function createDaily_Account() {
        const daily_accountData = {
            id: daily_account_id,
            vendor_id: vendor_id,
            bill_to_id: bill_to_id,
            date: date,
            currency: currency,
            description: description,
            all_items: selected_items,
            edit: edit,
        };

        fetch('http://localhost:5003/create/daily_account/' + daily_account_id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(daily_accountData),
        })
            .then((response) => {
                if (response.ok) {
                    alert('Daily_Account created successfully');
                    window.location.reload();
                } else {
                    alert('Failed to create daily_account');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    function createPDF() {
        createDaily_Account();
        fetch_daily_accounts_handler();
        onClose();
        set_daily_account_id(`DA - ${Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000}`);
        onCloseParent();
    }

    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <div className="daily_account">
            <h1>Daily_Account Details</h1>
            <h2>{daily_account_id}</h2>

        <p>A vendor is required</p>
            <div className="all_inputs all_inputs2">
                <div className="input_field">
                    <div className="title">Vendor</div>
                    <div className="input">
                        <select
                            value={vendor}
                            onChange={(e) => {
                                let value = e.target.value;
                                if (value && value != 0) {
                                    let data = JSON.parse(value);
                                    set_vendor_id(data.id);
                                    set_vendor(value);
                                } else {
                                    set_vendor_id(0);
                                    set_vendor(null);
                                }
                            }}>
                            <option value={0}>None</option>
                            {all_vendor.map(function (vendor) {
                                return (
                                    <option
                                        key={JSON.stringify(vendor)}
                                        value={JSON.stringify(vendor)}>
                                        {vendor.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
              
                <div className="input_field">
                    <div className="title">Currency</div>
                    <div className="input">
                        <select
                            value={currency}
                            onChange={(e) => {
                                let value = e.target.value;
                                set_currency(value);
                            }}>
                            <option value="USD">USD</option>
                            <option value="CAD">CAD</option>
                        </select>
                    </div>
                </div>
                <div className="input_field">
                    <div className="title">Date</div>
                    <div className="input">
                        <input
                            value={date}
                            type="date"
                            onChange={(e) => {
                                set_date(e.target.value);
                            }}
                        />
                    </div>
                </div>

                <div className="input_field">
                    <div className="title">Description</div>
                    <div className="input">
                        <textarea
                            type="text"
                            value={description}
                            onChange={(e) => {
                                set_description(e.target.value);
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="input_field">
                <div className="input">
                    <table
                        id="daily_account-table"
                        className="table table-striped">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Tax Amount</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                                <th>Vendor</th>
                                <th>Vendor Cost</th>
                                <th>Profit</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selected_items.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <input
                                            type="text"
                                            value={item.name}
                                            onChange={(e) => edit_daily_account_fields(index, 'name', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <textarea
                                            value={item.description}
                                            onChange={(e) => edit_daily_account_fields(index, 'description', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={item.price}
                                            onChange={(e) => edit_daily_account_fields(index, 'price', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={item.tax_amount}
                                            onChange={(e) => edit_daily_account_fields(index, 'tax_amount', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => edit_daily_account_fields(index, 'quantity', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        {item.tax_amount == undefined && item.tax_amount == ''
                                            ? (parseFloat(item.price) * item.quantity).toFixed(2)
                                            : (parseFloat(item.price) + parseFloat(item.tax_amount) * item.quantity).toFixed(2)}
                                    </td>
                                    <td>
                                        <select
                                            value={item.vendor_id}
                                            onChange={(e) => edit_daily_account_fields(index, 'vendor_id', e.target.value)}>
                                            <option value={'Select Vendor'}>No Vendor</option>
                                            {all_vendor.map(function (vendor_) {
                                                return (
                                                    <option
                                                        key={vendor_.id}
                                                        value={vendor_.id}>
                                                        {vendor_.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={item.vendor_cost}
                                            onChange={(e) => edit_daily_account_fields(index, 'vendor_cost', e.target.value)}
                                        />
                                    </td>
                                    <td>{item.price - item.vendor_cost}</td>
                                    <td>
                                        <button onClick={() => removeItem(index)}>Remove</button> {/* Button to remove item */}
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td>
                                    <select onChange={(e) => add_new_daily_account_item(e)}>
                                        <option value="none">New Item</option>
                                        <option value="blank">Blank Item</option>
                                        {all_items &&
                                            all_items.map(function (item) {
                                                return (
                                                    <option
                                                        key={JSON.stringify(item)}
                                                        value={JSON.stringify(item)}>
                                                        {item.name} - {item.price} Price
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <strong>Total Price of all items: </strong>
                                </td>

                                <td>
                                    {' '}
                                    {currency} {total_price}
                                </td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            <button onClick={createPDF}>Create Accounts</button>
        </div>
    );
}
