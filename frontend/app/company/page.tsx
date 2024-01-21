'use client';

import React from 'react';
import '../styles/globals.scss';
import '../styles/invoice_viewer.scss';

export default function Company() {
    
    const [name, set_name] = React.useState("");
    const [address1, set_address1] = React.useState("");
    const [address2, set_address2] = React.useState("");
    const [address3, set_address3] = React.useState("");
    const [tel, set_tel] = React.useState("");
    const [fax, set_fax] = React.useState("");
    const [gst, set_gst] = React.useState("");
    const [bank_details, set_bank_details] = React.useState("");


    React.useEffect(() => {
        fetchCompany();
    }, []);
    
    
    function fetchCompany() {
        fetch('http://35.209.219.229:5003/get/company')
            .then((response) => response.json())
            .then((data) => {
                set_name(data['name']);
                set_address1(data['address1']);
                set_address2(data['address2']);
                set_address3(data['address3']);
                set_tel(data['tel']);
                set_fax(data['fax']);
                set_gst(data['gst']);
                set_bank_details(data['bank_details']);
            })
            .catch((error) => {
                console.error('Error fetching company data:', error);
            });
    }
    function createCompany() {
        const companyData = {
            name: name,
            address1: address1,
            address2: address2,
            address3: address3,
            tel: tel,
            fax: fax,
            gst: gst,
            bank_details: bank_details,
        };

        fetch('http://35.209.219.229:5003/create/company', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(companyData),
        })
            .then((response) => {
                if (response.ok) {
                    alert('Company created successfully');
                    location.reload();
                } else {
                    alert('Failed to create company');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
 
 
    return (
        <div className="company">
            <h1>Company Details</h1>
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
                <div className="input_field">
                    <div className="title">Address Line 3</div>
                    <div className="input">
                        <input
                            type="text"
                            value={address3}
                            onChange={(e) => {
                                set_address3(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="input_field">
                    <div className="title">Tel</div>
                    <div className="input">
                        <input
                            type="text"
                            value={tel}
                            onChange={(e) => {
                                set_tel(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="input_field">
                    <div className="title">Fax</div>
                    <div className="input">
                        <input
                            type="text"
                            value={fax}
                            onChange={(e) => {
                                set_fax(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="input_field">
                    <div className="title">GST</div>
                    <div className="input">
                        <input
                            type="text"
                            value={gst}
                            onChange={(e) => {
                                set_gst(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="input_field">
                    <div className="title">Bank Details</div>
                    <div className="input">
                        <textarea
                            type="text"
                            value={bank_details}
                            onChange={(e) => {
                                set_bank_details(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <button onClick={createCompany}>Save</button>
            </div>
        </div>
    );
}
