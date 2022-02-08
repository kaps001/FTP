import React from 'react'

const Footer = () => {
   let footerStyle = {
        position: "absolute",
        top: "100vh",
        width: "100%"
    }
    return (
        <div className="jumbotron text-center bg-dark text-light py-3" style={footerStyle}>
            <p>Copyright @2022 | Designed With Ankit Mishra </p>
        </div>
    )
}
export default Footer
