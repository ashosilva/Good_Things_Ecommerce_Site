import React, { Fragment } from 'react'
import { NavLink } from "react-router-dom"

const Footer = () => {
    return (
        <Fragment>
             <footer className="py-1">
                <p className="text-center mt-1">
                    Good Things 2021
                 </p>
                <NavLink to="/about" exact className="flex justify-center text-yellow-700 hover:text-gray-500 hover:underline">
                    About Us
                </NavLink>
            </footer>
        </Fragment>
    )
}

export default Footer
