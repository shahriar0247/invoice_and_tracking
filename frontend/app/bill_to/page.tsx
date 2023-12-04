'use client'
import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import '../styles/globals.scss';
import '../styles/invoice_viewer.scss';

export default function BillTo() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [name, set_name] = useState('');
  const [address1, set_address1] = useState('');
  const [address2, set_address2] = useState('');
  const [create_mode, set_create_mode] = useState(true);
  const [edit_bill_to_id, set_edit_bill_to_id] = useState(0);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchBill_to();
  }, []);

  function fetchBill_to() {
    fetch('http://localhost:5001/get/bill_to')
      .then((response) => response.json())
      .then((data) => {
        setTableData(data);
      })
      .catch((error) => {
        console.error('Error fetching bill_to data:', error);
      });
  }

  function handleViewClick(bill_toId) {
    set_create_mode(false);
    setShowCreateModal(!showCreateModal);
    viewBill_to(bill_toId);
  }

  function viewBill_to(bill_toId) {
    fetch(`/get/bill_to/${bill_toId}`)
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

  return (
    <div className="bill_to">
      <h1>Bill To Details</h1>
      <div className="topbar">
        <button onClick={() => setShowCreateModal(!showCreateModal)}>
          Create Bill To
        </button>
      </div>
      <Table>
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Address 1</TableColumn>
          <TableColumn>Address 2</TableColumn>
          <TableColumn>Options</TableColumn>
        </TableHeader>
        <TableBody>
          {tableData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.address1}</TableCell>
              <TableCell>{item.address2}</TableCell>
              <TableCell>
                <button
                  className="btn btn-primary"
                  onClick={() => handleViewClick(item.id)}
                >
                  Edit
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {showCreateModal && (
        <div className="modal-personal">
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
            {create_mode ? (
              <button onClick={createBill_to}>Create</button>
            ) : (
              <button onClick={editBill_to}>Edit</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
