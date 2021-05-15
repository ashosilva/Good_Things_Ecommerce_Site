import React, { Fragment } from 'react'
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <Fragment>
            <footer className="py-1">
                <div className="text-center mt-1">
                    <div>Good Things 2021</div>
                    <Link to="/about" exact className="text-yellow-700 hover:text-gray-500 hover:underline">
                        About Us</Link>
                </div>
            </footer>
        </Fragment>
    )
}

export default Footer
