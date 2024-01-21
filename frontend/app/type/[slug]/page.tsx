'use client';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';

export default function BillTo({ }) {
    var fullPath = window.location.pathname;
    var pathParts = fullPath.split('/');
    var item = pathParts[pathParts.length - 1];

    var title = 'Bill To';
    if (item == 'bill_to') {
        title = 'Bill To';
    } else if (item == 'ship_from') {
        title = 'Ship From';
    } else if (item == 'ship_to') {
        title = 'Ship To';
    } else if (item == 'vendor') {
        title = 'Vendor';
    }
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [name, set_name] = useState('');
    const [address1, set_address1] = useState('');
    const [address2, set_address2] = useState('');
    const [create_mode, set_create_mode] = useState(true);
    const [edit_bill_to_id, set_edit_bill_to_id] = useState(0);
    const [tableData, setTableData] = useState([]);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        fetch_bill_to();
    }, []);

    function fetch_bill_to() {
        fetch(`http://localhost:5003/get/type/${item}`)
            .then((response) => response.json())
            .then((data) => {
                setTableData(data);
            })
            .catch((error) => {
                console.error('Error fetching bill_to data:', error);
            });
    }

    function handle_delete_click(bill_to_id) {
        fetch(`http://localhost:5003/delete/type/${item}/${bill_to_id}`, {
            method: 'DELETE',
        })
            .then((response) => response.text())
            .then((data) => {
                setTableData([])
                fetch_bill_to()
            })
            .catch((error) => console.error('Error deleting bill_to:', error));
    }

    function handle_edit_click(bill_to_id) {
        set_edit_bill_to_id(bill_to_id);
        set_create_mode(false);
        onOpen();
        get_bill_to_details(bill_to_id);
    }

    function handle_create_click() {
        set_create_mode(true);
        set_name('');
        set_address1('');
        set_address2('');
        onOpen();
    }

    function get_bill_to_details(bill_to_id) {
        fetch(`http://localhost:5003/get/type/${item}/${bill_to_id}`)
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

    function edit_bill_to_id_(onClose) {
        const formData = {
            name: name,
            address1: address1,
            address2: address2,
        };

        const apiUrl = create_mode ? `http://localhost:5003/create/type/${item}` : `http://localhost:5003/edit/type/${item}/${edit_bill_to_id}`;

        fetch(apiUrl, {
            method: create_mode ? 'POST' : 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.text())
            .then((data) => {
                onClose();
                setTableData([])
                fetch_bill_to()
            })
            .catch((error) => console.error('Error updating/creating bill_to:', error));
    }

    return (
        <div className="bill_to">
            <h1>{title} Details</h1>
            <div className="topbar">
                <button onClick={() => handle_create_click()}>Create {title}</button>
            </div>
            <Table>
                <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Address 1</TableColumn>
                    <TableColumn>Address 2</TableColumn>
                    <TableColumn>Options</TableColumn>
                </TableHeader>
                <TableBody>
                    {tableData.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.address1}</TableCell>
                            <TableCell>{item.address2}</TableCell>
                            <TableCell>
                                <div className="grid grid-cols-2 gap-4">

                                    <button onClick={() => handle_edit_click(item.id)}>Edit</button>
                                    <Delete_button description={"Are you sure you want to delete " + item.name + " (" + item.id + ")"} delete_function={() => handle_delete_click(item.id)}></Delete_button>
                                </div>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size='lg'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {create_mode ? 'Create' : 'Edit'} {title}
                            </ModalHeader>
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
                                    onClick={() => edit_bill_to_id_(onClose)}>
                                    {create_mode ? 'Create' : 'Edit'}
                                </button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
function Delete_button({ description, delete_function }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div>
            <button
                color="danger"
                onClick={onOpen}>
                Delete
            </button>

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size='lg'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Are you sure you want to delete?
                            </ModalHeader>
                            <ModalBody>
                                {description}
                            </ModalBody>
                            <ModalFooter>
                                <button
                                    color="primary"
                                    onClick={onClose}>
                                    Close
                                </button>
                                <button
                                    color="danger"
                                    onClick={() => { delete_function(), onClose() }}>
                                    Delete
                                </button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </div>
    )
}