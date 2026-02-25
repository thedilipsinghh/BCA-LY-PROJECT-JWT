import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-5 pb-4 mt-auto">
            <div className="container text-center text-md-left">
                <div className="row text-center text-md-left">
                    <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                        <h5 className="text-uppercase mb-4 font-weight-bold text-primary">AuthPractice</h5>
                        <p>Providing secure and reliable authentication solutions for modern web applications.</p>
                    </div>

                    <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                        <h5 className="text-uppercase mb-4 font-weight-bold text-primary">Quick Links</h5>
                        <p><a href="/" className="text-white" style={{ textDecoration: 'none' }}>Home</a></p>
                        <p><a href="/register" className="text-white" style={{ textDecoration: 'none' }}>Register</a></p>
                        <p><a href="/login" className="text-white" style={{ textDecoration: 'none' }}>Login</a></p>
                    </div>

                    <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                        <h5 className="text-uppercase mb-4 font-weight-bold text-primary">Contact</h5>
                        <p><i className="fas fa-envelope mr-3"></i> ds4718421@gmail.com</p>
                        <p><i className="fas fa-phone mr-3"></i> +91 xxxxx xxxxx</p>
                    </div>

                    <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                        <h5 className="text-uppercase mb-4 font-weight-bold text-primary">Follow Me</h5>
                        <div className="d-flex justify-content-center gap-3">
                            <a href="https://github.com/thedilipsinghh" target="_blank" rel="noopener noreferrer" className="text-white bg-primary p-2 rounded-circle d-flex align-items-center justify-content-center shadow" style={{ width: '40px', height: '40px' }}>
                                <i className="bi bi-github fs-5"></i>
                            </a>
                            <a href="https://www.linkedin.com/in/thedilipsinghh" target="_blank" rel="noopener noreferrer" className="text-white bg-primary p-2 rounded-circle d-flex align-items-center justify-content-center shadow" style={{ width: '40px', height: '40px' }}>
                                <i className="bi bi-linkedin fs-5"></i>
                            </a>
                        </div>
                    </div>

                </div>

                <hr className="mb-4" />

                <div className="row align-items-center">
                    <div className="col-md-12 text-center">
                        <p>
                            Copyright © {new Date().getFullYear()} All rights reserved to
                            <a href="https://github.com/thedilipsinghh" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                <strong className="text-primary mx-1">thedilipsinghh</strong>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
