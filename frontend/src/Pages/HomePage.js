import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/landing.css'

const HomePage = () => {
    return (
        <>
            <div className="landing-body">
                <div class="landing-main" id="home">
                    <div class="landing-nav">
                        <ul>
                            <li><a href="#home">Home</a></li>
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#services">Services</a></li>
                        </ul>

                        <div class="landing-buttons">
                            <button><Link to={'/login'}>Login</Link></button>
                            <button><Link to={'/register'}>Sign Up</Link></button>
                        </div>
                    </div>


                </div>
                <div class="landing-content">
                    <div class="landing-left">
                        <p class="head">BaryoWork: Where Your Perfect Job Finds You.</p>

                        <p class="desc">BaryoWork is a revolutionary mobile app that transforms the job search experience. It connects job seekers with suitable opportunities based on their qualifications and preferences. Users can create personalized profiles, browse tailored job listings, and track application statuses in real-time. Employers can post, manage, and review candidate profiles seamlessly, streamlining the hiring process</p>

                        <div class="landing-content-button">
                            <button><Link to={'/login'}>Login</Link></button>
                            <button><Link to={'/register'}>Sign Up</Link></button>
                        </div>

                    </div>


                    <div class="landing-right">
                        <img src="logo.png" />
                    </div>
                </div>

                <div class="landing-feature" id="services">
                    <div class="landing-window1">
                        <div class="landing-findjob try">
                            <p class="feature-header">Find Job</p>
                            <p class="feature-desc">Discover your dream job hassle-free with BaryoWork. Our app makes job hunting a breeze by matching you with opportunities that fit your skills and preferences perfectly. Say goodbye to endless scrolling and hello to your next career move with just a few taps.</p>
                        </div>


                        <div class="landing-hire try">
                            <p class="feature-header1">Hire Job</p>
                            <p class="feature-desc1">Finding the right talent is easy with BaryoWork. Post jobs, review applications, and manage candidates seamlessly in one place. Spend less time on paperwork and more time building your dream team with BaryoWork's streamlined hiring process.</p>
                        </div>
                    </div>

                    <div class="landing-window2">
                        <div class="landing-fast try">
                            <p class="feature-header2">Fast Process</p>
                            <p class="feature-desc2">Don't waste time waiting around. BaryoWork's real-time updates keep you in the loop, so you can make hiring decisions quickly. Say goodbye to delays and hello to your newest team member sooner with BaryoWork.</p>
                        </div>

                        <div class="landing-filter try">
                            <p class="feature-header">Job Filtering</p>
                            <p class="feature-desc">Find the perfect match faster with BaryoWork's smart filters. Narrow down your search by location, skills, and more to find exactly what you're looking for. Say goodbye to guesswork and hello to finding the perfect fit with BaryoWork.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="landing-about" id="about">
                    <div class="abt-logo">
                        <img src="360_logo.png" />
                    </div>
                    <div class="landing-abt-desc">
                        <p>We specialize in providing cost-effective white-labeled services encompassing system design, development, deployment, and maintenance, catering specifically to SMEs, startups, and NGOs. Our core focus lies in co-creating innovative technological solutions to address pressing social and environmental issues that often go unaddressed. With a mission to foster a global landscape where technology serves as a catalyst for maximum social and environmental impact, we strive to tackle current and future challenges, ensuring positive outcomes for communities worldwide.</p>
                    </div>
                </div>
            </div>
        </>

    )
}

export default HomePage