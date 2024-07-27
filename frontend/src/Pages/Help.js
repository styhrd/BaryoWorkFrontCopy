import React from 'react'
import '../styles/help.css'

const Help = () => {
  return (
    <>
    <div class="help-container">
<main>
    <div class="help-header1">
        <h1>App Description</h1>
            <div class="help-img">
                <img src="/assets/images/logo1.png"></img>
            </div>
        <p>BaryoWork is a revolutionary mobile app that transforms the job search experience. 
            It connects job seekers with suitable opportunities based on their qualifications and preferences. 
            Users can create personalized profiles, browse tailored job listings, and track application statuses in real-time. 
            Employers can post, manage, and review candidate profiles seamlessly, streamlining the hiring process
        </p>
    </div>

    <div class="help-header1">
        <h1>Navigation</h1>
        <div class="help-img">
                <img src="/assets/images/navdesk.png" class="navdesk"></img>
                <img src="/assets/images/navmob.png" class="navdesk"></img>
            </div>
        <p>The navigation menu provides quick access to essential sections like finding a job, managing applications, 
            hiring employees, adjusting settings, accessing help, and logging out.
        </p>
    </div>

    <div class="help-header1">
        <h1>Dashboard</h1>
        <div class="help-img">
                <img src="/assets/images/dashdesk.png"></img>
                <img src="/assets/images/dashmob.png"></img>
            </div>
        <p> Upon logging in, the dashboard presents personalized job listings, an overview of your applications, 
            and, for employers, the ability to manage job postings.
        </p>
    </div>

    <div class="help-header1">
        <h1>Profile</h1>
        <div class="help-img">
                <img src="/assets/images/profiledesk.png"></img>
                <img src="/assets/images/profilemob.png"></img>
            </div>
        <p>When setting your profile account, you have to fill up the following information such as experience, skills, and education. 
            In experience you have to input your company name or name of the company you are working, 
            the timeline when you start and end at that company, and the details. After that input your skills then your educational attainment.
        </p>
    </div>

    <div class="help-header1">
        <h1>Find a Job</h1>
        <div class="help-img">
                <img src="/assets/images/finddesk.png"></img>
                <img src="/assets/images/findmob.png"></img>
            </div>
        <p>This section allows users to search for employment opportunities using various filters and view detailed job descriptions to match their qualifications.</p>
    </div>

    <div class="help-header1">
        <h1>My Applications</h1>
        <div class="help-img">
                <img src="/assets/images/myappdesk.png"></img>
                <img src="/assets/images/myappmob.png"></img>
            </div>
        <p>Users can monitor the status of their job applications, whether pending, accepted, or rejected regarding their applications.</p>
    </div>

    <div class="help-header1">
        <h1>Hire Employees</h1>
        <div class="help-img">
                <img src="/assets/images/hiredesk.png"></img>
                <img src="/assets/images/hiremob.png"></img>
            </div>
        <p>In this listing, you can input the company name, Job title, address, skills required, contact information, and details of the work if you are hiring. 
            You can also add, edit, or delete your listing. Plus you can accept and reject applicants in your listing.
        </p>
    </div>

    <div class="help-header1">
        <h1>Settings</h1>
        <div class="help-img">
                <img src="/assets/images/settingsdesk.png"></img>
                <img src="/assets/images/settingsmob.png"></img>
            </div>
        <p>In the settings of the BaryoWork app, users can edit their profile to keep information up-to-date and change their password for enhanced security. 
            They can review the app's terms and conditions to understand usage guidelines and access the privacy policy to learn how their data is protected. 
            Additionally, users can find essential information about the app in the "About" section.
        </p>
    </div>

</main>
</div>
</>
  )
}

export default Help;