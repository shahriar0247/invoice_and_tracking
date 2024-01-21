
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react';
import React from 'react';
import Delete_button from '../components/DeleteBtn';

export default function DTable({ headers, table_date, columns, edit_function, delete_function }) {
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
            {table_date.map((item) => (
                <TableRow key={item.id}>
                    {columns.map(function (column) {
                        if (column == "actions") {
                            return (
                                <TableCell>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button onClick={() => edit_function(item.id)}>Edit</button>
                                        <Delete_button description={"Are you sure you want to delete " + item.name + " (" + item.id + ")"} delete_function={() => delete_function(item.id)}></Delete_button>
                                    </div>
                                </TableCell>
                            )
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