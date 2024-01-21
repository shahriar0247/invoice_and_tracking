'use client';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';

export default function Delete_button({ description, delete_function }) {
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