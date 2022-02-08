import React from 'react'
import propTypes from 'prop-types'
export default function Header(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <a className="navbar-brand" href="test">{props.title}</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="test">About Us</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="google.com">Services</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="test" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Transaction history
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a className="dropdown-item" href="test">Credit</a></li>
              <li><a className="dropdown-item" href="test">Debit</a></li>
              <li><hr className="dropdown-divider" /></li>
            </ul>
          </li>
          <li className="nav-item">
          <a className="nav-link" href="google.com">Contact Us</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}
/**
 * define propType and default propType
 * @author: Ankit Mishra
 * @since: 03/02/2022
 */
Header.propTypes = {
    title: propTypes.string
}
//default propType
Header.defaultProps = {
    title: "Your Default Title"
}
