import React, { useEffect, useState } from 'react';
import Usermodal from '../components/shared/Usermodal.js'

import '../styles/settings.css'
import Tcmodal from '../components/shared/Tcmodal.js';

const Settings = () => {

    const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
    const [showtcmodal, setshowtcmodal] = useState(false);
    const handleShowUpdateUserModal = () => {
        setShowUpdateUserModal(true);
    };

    const handleCloseUpdateUserModal = () => {
        setShowUpdateUserModal(false);
    }

    const handleshowtcmodal = () => {
        setshowtcmodal(true);
    };

    const closetcmodal = () => {
        setshowtcmodal(false);
    }

    return (<>

        <div className='welcies'>
            <h1>SETTINGS</h1>
        </div>

        {showUpdateUserModal && (
            <div className="profmodal">
                <div className="prof-modal-content">
                    <span className="close" onClick={handleCloseUpdateUserModal}>&times;</span>
                    <Usermodal />
                </div>
            </div>
        )}

        {showtcmodal && (
            <div className="profmodal">
                <div className="prof-modal-content">
                    <span className="close" onClick={closetcmodal}>&times;</span>
                    <Tcmodal onClose={() => setshowtcmodal(false)} />
                </div>
            </div>
        )}

        <div className='setcont'>
            <div className='updatecreds' onClick={() => handleShowUpdateUserModal()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                </svg>
                <p>Edit Credentials</p>
            </div>

            <div className='updatecreds' onClick={handleshowtcmodal}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-exclamation-lg" viewBox="0 0 16 16">
                    <path d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0zM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0" />
                </svg>
                <p>Terms and Conditions & Privacy Policy</p>
            </div>

        </div>

        <div className="settings-content">
            <div class="settings-logo">
                <img src="/assets/images/360.png" />
            </div>
            <div class="settings-desc">
                <p>We specialize in providing cost-effective white-labeled services encompassing system design, development, deployment, and maintenance, catering specifically to SMEs, startups, and NGOs. Our core focus lies in co-creating innovative technological solutions to address pressing social and environmental issues that often go unaddressed. With a mission to foster a global landscape where technology serves as a catalyst for maximum social and environmental impact, we strive to tackle current and future challenges, ensuring positive outcomes for communities worldwide.</p>
            </div>
        </div>

        <div class="settings-content2">
            <div class="settings-desc1">
                <h2>WHO WE ARE?</h2>
            </div>

            <div class="setting-desc2">
                <h2>Brief Description</h2>
                <p class="settingstext">Bridge360 Inc. is a Philippine based app development startup and SEC- registered company (Company Reg No. CS202008380)
                    located in Salcedo St, Legaspi Village, Brgy San Lorenzo, Makati City.</p>

                <h2>What we Do?</h2>
                <p class="settingstext">We provide white-labeled system design, development, deployment and maintenance at affordable prices especially for SMEs,
                    startups and NGOs.</p>

                <h2>Our Mission</h2>
                <p class="settingstext">To co-create the best tech solutions to wicked social and environmental problems that few dare solve.</p>

                <h2>Our Vision</h2>
                <p class="settingstext">A world where technology products bring the maximum social and environmental impact to all communities
                    around the world given current and future challenges.</p>
            </div>
        </div>


    </>
    );
};

export default Settings;