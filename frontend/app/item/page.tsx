'use client';

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react';
import React from 'react';
import Delete_button from '../components/DeleteBtn';
import DTable from '../components/DTable';

export default function App() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [name, set_name] = React.useState('');
    const [description, set_description] = React.useState('');
    const [price, set_price] = React.useState(0);
    const [vendor_id, set_vendor_id] = React.useState('Select Vendor');
    const [editItemId, setEditItemId] = React.useState(null);
    const [vendor_cost, set_vendor_cost] = React.useState(0);
    const [currency, set_currency] = React.useState("USD");
    const [quantity, set_quantity] = React.useState(1);

    const [all_vendors, set_all_vendors] = React.useState([]);

    const [tableData, setTableData] = React.useState([]);

    function toggleCreateModal() {
        set_name('');
        set_description('');
        set_price(0);
        set_quantity(1);
        set_vendor_cost(0);
        set_vendor_id('Select Vendor');
        setEditItemId(null);
        onOpen();
    }

    function toggleEditModal(itemId) {
        setEditItemId(itemId);
        onOpen();
        fetch(`http://86.38.217.198:5003/get/item/${itemId}`)
            .then((response) => response.json())
            .then((data) => {
                set_name(data.name);
                set_description(data.description);
                set_price(data.price);
                set_currency(data.currency);
                set_quantity(data.quantity);
                set_vendor_cost(data.vendor_cost);
                if (data.vendor_id) {
                    set_vendor_id(data.vendor_id);
                } else {
                    set_vendor_id('Select Vendor');
                }
            })
            .catch((error) => {
                console.error('Error fetching item details for editing:', error);
            });
    }

    React.useEffect(() => {
        fetchItem();
        fetchVendor();
    }, []);

    function fetchItem() {
        fetch('http://86.38.217.198:5003/get/item')
            .then((response) => response.json())
            .then((data) => {
                setTableData(data);
            })
            .catch((error) => {
                console.error('Error fetching item data:', error);
            });
    }

    function fetchVendor() {
        fetch('http://86.38.217.198:5003/get/vendor')
            .then((response) => response.json())
            .then((data) => {
                set_all_vendors(data);
            })
            .catch((error) => {
                console.error('Error fetching all vendor:', error);
            });
    }

    function createItem() {
        const itemData = {
            name: name,
            description: description,
            price: price,
            currency: currency,
            quantity: quantity,
            vendor_cost: vendor_cost,
            vendor_id: vendor_id,
        };

        fetch('http://86.38.217.198:5003/create/item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemData),
        })
            .then((response) => {
                if (response.ok) {
                    onClose();
                    fetchItem(); // Refresh the table after creating an item
                } else {
                    alert('Failed to create item');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    function editItem() {
        const itemData = {
            name: name,
            description: description,
            price: price,
            vendor_cost: vendor_cost,
            currency: currency,
            quantity: quantity,
            vendor_id: vendor_id,
        };

        fetch(`http://86.38.217.198:5003/edit/item/${editItemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemData),
        })
            .then((response) => {
                if (response.ok) {
                    onClose();
                    fetchItem(); // Refresh the table after editing an item
                } else {
                    alert('Failed to edit item');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    function handle_delete_click(item_id) {
        fetch(`http://86.38.217.198:5003/delete/item/${item_id}`, {
            method: 'DELETE',
        })
            .then((response) => response.text())
            .then((data) => {
                fetchItem();
            })
            .catch((error) => console.error('Error deleting bill_to:', error));
    }
    const headers = ['Name', 'Description', 'Price', "Actions"]
    const columns = ['name', 'description', 'price', 'actions']
    // const inputs_ = [{ 'title': "Name", "name": 'name' },
    // { 'title': "Description", "name": 'description' },
    // { 'title': "Price", "name": 'price', 'type': 'number' },
    // {
    //     'title': "Vendor", 'name': 'vendor', 'type': "select",
    //     'options': all_vendors.map(name => ({ name, value: name }))
    // }]

    return (
        <div className="item">
            <h1>Item Details</h1>
            <div className="topbar">
                <button onClick={toggleCreateModal}>Create Item</button>
            </div>

            <DTable headers={headers} columns={columns} table_data={tableData} edit_function={toggleEditModal} delete_function={handle_delete_click}></DTable>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size='lg'
            >
                <ModalContent>
                    <ModalHeader>{editItemId ? 'Edit Item' : 'Create Item'}</ModalHeader>
                    <ModalBody>
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
                                    <textarea
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
                                </div>
                            </div>
                            <div className="input_field">
                                <div className="title">Quantity</div>
                                <div className="input">
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => set_quantity(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="input_field">
                                <div className="title">Currency</div>
                                <div className="input">
                                    <select
                                        type="number"
                                        value={currency}
                                        onChange={(e) => set_currency(e.target.value)}
                                    >
                                        <option value="USD">USD</option>
                                        <option value="CAD">CAD</option>
                                    </select>
                                </div>
                            </div>
                            <div className="input_field">
                                <div className="title">Vendor</div>
                                <div className="input">
                                    <select
                                        value={vendor_id}
                                        onChange={(e) => {
                                            set_vendor_id(e.target.value);
                                        }}>
                                        <option value={'Select Vendor'}>Select Vendor</option>
                                        {all_vendors.map(function (vendor_) {
                                            return (
                                                <option
                                                    key={vendor_.id}
                                                    value={vendor_.id}>
                                                    {vendor_.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="input_field">
                                <div className="title">Vendor Cost</div>
                                <div className="input">
                                    <input
                                        type="number"
                                        value={vendor_cost}
                                        onChange={(e) => set_vendor_cost(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button
                            color="danger"
                            onClick={onClose}>
                            Close
                        </button>
                        <button
                            color="primary"
                            onClick={editItemId ? editItem : createItem}>
                            {editItemId ? 'Edit' : 'Create'}
                        </button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        </div >
    );
}
