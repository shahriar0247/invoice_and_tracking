'use client';
import DTable from '@/app/components/DTable';
import Delete_button from '@/app/components/DeleteBtn';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';


export default function CreateModal({ isOpen, onOpen, onClose, title, inputs_, edit_function, data, set_data }) {

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size='lg'>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    {title}
                </ModalHeader>
                <ModalBody>
                    <div className="all_inputs">
                        {inputs_.map(function (input_) {

                            if (input_['type'] == 'select') {
                                return (
                                    <div key={input_['name']} className="input_field">
                                        <div className="title">{input_['title']}</div>
                                        <div className="input">
                                            <select
                                                value={data[input_['name']]}
                                                onChange={(e) => {
                                                    set_data({ ...data, [input_['name']]: e.target.value });
                                                }}
                                            >
                                                {input_['options'].map(function (option) {
                                                    return (<option value={option['value']}>{option.name}</option>)
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <div key={input_['name']} className="input_field">
                                        <div className="title">{input_['title']}</div>
                                        <div className="input">
                                            <input
                                                type={input_['type']}
                                                value={data[input_['name']]}
                                                onChange={(e) => {
                                                    set_data({ ...data, [input_['name']]: e.target.value });
                                                }}
                                            />
                                        </div>
                                    </div>
                                )
                            }
                        })}
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
                        onClick={() => edit_function()}>
                        Submit
                    </button>
                </ModalFooter>
            </ModalContent>
        </Modal>

    )
}