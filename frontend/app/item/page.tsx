'use client';

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react';
import React from 'react';

export default function App() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [name, set_name] = React.useState('');
    const [description, set_description] = React.useState('');
    const [price, set_price] = React.useState('');
    const [vendor_id, set_vendor_id] = React.useState(0);
    const [editItemId, setEditItemId] = React.useState(null);

    const [all_vendors, set_all_vendors] = React.useState([]);

    const [tableData, setTableData] = React.useState([]);

    function toggleCreateModal() {
        set_name("");
        set_description("");
        set_price("");
        set_vendor_id(0);
        onOpen();
    }

    function toggleEditModal(itemId) {
        setEditItemId(itemId);
        onOpen();
        fetch(`http://localhost:5003/get/item/${itemId}`)
            .then((response) => response.json())
            .then((data) => {
                set_name(data.name);
                set_description(data.description);
                set_price(data.price);
                set_vendor_id(data.vendor_id);
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
        fetch('http://localhost:5003/get/item')
            .then((response) => response.json())
            .then((data) => {
                setTableData(data);
            })
            .catch((error) => {
                console.error('Error fetching item data:', error);
            });
    }

    function fetchVendor() {
        fetch('http://localhost:5003/get/vendor')
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
            vendor_id: vendor_id,
        };

        fetch('http://localhost:5003/create/item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemData),
        })
            .then((response) => {
                if (response.ok) {
                    alert('Item created successfully');
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
            vendor_id: vendor_id,
        };

        fetch(`http://localhost:5003/edit/item/${editItemId}`, {
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

    return (
        <div className="item">
            <h1>Item Details</h1>
            <div className="topbar">
                <button onClick={toggleCreateModal}>Create Item</button>
            </div>

            <Table>
                <TableHeader>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Description</TableColumn>
                    <TableColumn>Price</TableColumn>
                    <TableColumn>Actions</TableColumn>
                </TableHeader>
                <TableBody>
                    {tableData.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell>
                                <button onClick={() => toggleEditModal(item.id)}>Edit</button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Modal
                isOpen={isOpen}
                onClose={onClose}>
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
                                        <option value={0}>Select Vendor</option>
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
            </Modal>
        </div>
    );
}
