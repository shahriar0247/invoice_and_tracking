'use client';
import CreateModal from '@/app/components/CreateModal';
import DTable from '@/app/components/DTable';
import Delete_button from '@/app/components/DeleteBtn';
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
    const [create_mode, set_create_mode] = useState(true);
    const [edit_bill_to_id, set_edit_bill_to_id] = useState(0);
    const [tableData, setTableData] = useState([]);


    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        fetch_bill_to();
    }, []);

    function fetch_bill_to() {

        var fullPath = window.location.pathname;
        var pathParts = fullPath.split('/');
        var item = pathParts[pathParts.length - 1];


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
        set_create_data({});
        onOpen();
    }

    function get_bill_to_details(bill_to_id) {
        fetch(`http://localhost:5003/get/type/${item}/${bill_to_id}`)
            .then((response) => response.json())
            .then((data) => {
                set_create_data(data);
                set_edit_bill_to_id(data.id);
            })
            .catch((error) => {
                console.error('Error fetching bill_to data:', error);
            });
    }

    function edit_bill_to_id_() {

        const apiUrl = create_mode ? `http://localhost:5003/create/type/${item}` : `http://localhost:5003/edit/type/${item}/${edit_bill_to_id}`;

        fetch(apiUrl, {
            method: create_mode ? 'POST' : 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(create_data),
        })
            .then((response) => response.text())
            .then((data) => {
                onClose();
                setTableData([])
                fetch_bill_to()
            })
            .catch((error) => console.error('Error updating/creating bill_to:', error));
    }

    const headers = ['ID', "Name", "Address 1", "Address 2", "Actions"]
    const columns = ['id', 'name', 'address1', 'address2', 'actions']
    const inputs_ = [{ 'title': "Name", "name": 'name' }, { 'title': "Address 1", "name": 'address1' }, { 'title': "Address 2", "name": 'address2' }]
    const [create_data, set_create_data] = useState({});

    return (
        <div className="bill_to">
            <h1>{title} Details</h1>
            <div className="topbar">
                <button onClick={() => handle_create_click()}>Create {title}</button>
            </div>

            <DTable headers={headers} columns={columns} table_data={tableData} edit_function={handle_edit_click} delete_function={handle_delete_click}></DTable>
            <CreateModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} title={title} inputs_={inputs_} edit_function={edit_bill_to_id_} data={create_data} set_data={set_create_data}></CreateModal>

        </div>
    );
}

