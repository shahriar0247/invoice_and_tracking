
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react';
import React from 'react';
import Delete_button from '../components/DeleteBtn';
import Link from 'next/link';

export default function DTable({ headers, table_data, columns, Custom_buttons = null, edit_function = null, delete_function = null, custom_function = [] }) {
    return (<Table>
        <TableHeader>
            {
                headers.map(function (header) {
                    return (
                        <TableColumn>{header}</TableColumn>
                    )
                })
            }
        </TableHeader>
        <TableBody>
            {table_data.map((item) => (
                <TableRow key={item.id}>
                    {columns.map(function (column) {
                        if (column == "actions") {
                            return (
                                <TableCell>
                                    <div className="grid grid-cols-2 gap-4">
                                        {edit_function &&
                                            <button onClick={() => edit_function(item.id)}>Edit</button>

                                        }
                                        {delete_function &&
                                            <Delete_button description={"Are you sure you want to delete " + item.name + " (" + item.id + ")"} delete_function={() => delete_function(item.id)}></Delete_button>

                                        }
                                        {Custom_buttons &&
                                            <Custom_buttons></Custom_buttons>
                                        }
                                    </div>
                                </TableCell>
                            )
                        }
                        else if (column == "shipment_actions") {
                            return (

                                <TableCell>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto', gridGap: '5px' }}>
 <button

                                            onClick={() => {
                                                window.location.href = '/tracking/' + item.id;
                                            }}>
                                            Tracking
                                        </button>
                                       <a
                                            className="button"
                                            href={`/shipment/${item.id}?edit=true`}>
                                            Edit
                                        </a>
                                 
 
                
                                        {edit_function &&
                                            <button onClick={() => edit_function(item.id)}>Edit</button>

                                        }
                                        {delete_function &&
                                            <Delete_button description={"Are you sure you want to delete " + item.name + " (" + item.id + ")"} delete_function={() => delete_function(item.id)}></Delete_button>

                                        }
                                        {Custom_buttons &&
                                            <Custom_buttons></Custom_buttons>
                                        }
                                       <select
                                            defaultValue={item.invoice_status}
                                            onChange={(e) => {
                                                custom_function[0](item.id, e.target.value);
                                            }}>
                              <option value="air">Air</option>
                            <option value="sea">Sea</option>
                            <option value="rail">Rail</option>
                            <option value="warhouse">Warehouse</option>
                            <option value="customs_released">Customs Released</option>
                                      </select>
                                    </div>

                                </TableCell>)

                        }
                        else if (column == "invoice_actions") {
                            return (

                                <TableCell>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '5px' }}>
                                        {edit_function &&
                                            <button onClick={() => edit_function(item.id)}>Edit</button>

                                        }
                                        {delete_function &&
                                            <Delete_button description={"Are you sure you want to delete " + item.name + " (" + item.id + ")"} delete_function={() => delete_function(item.id)}></Delete_button>

                                        }
                                        {Custom_buttons &&
                                            <Custom_buttons></Custom_buttons>
                                        }

                                        <a
                                            className="button"
                                            href={`/invoices/${item.id}?edit=true`}>
                                            Edit
                                        </a>
                                        <button

                                            onClick={() => {
                                                window.location.href = '/tracking/' + item.id;
                                            }}>
                                            Tracking
                                        </button>
                                        <select
                                            defaultValue={item.invoice_status}
                                            onChange={(e) => {
                                                custom_function[0](item.id, e.target.value);
                                            }}>
                                            <option value="pending">Pending</option>
                                            <option value="paid">Paid</option>
                                            <option value="partial">Partial</option>
                                        </select>
                                    </div>

                                </TableCell>)

                        }
                        else if (column == "date") {
                            <TableCell>   {new Date(item[column]).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</TableCell>
                        }
                        return (
                            <TableCell>{item[column]}</TableCell>
                        )
                    })
                    }

                </TableRow>
            ))}
        </TableBody>
    </Table>)
}
