import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <Navbar color="faded" light toggleable>
        <NavbarToggler right onClick={this.toggle} />
        <NavbarBrand href="/">WFPT</NavbarBrand>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/tour">Tour</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/specials">Specials</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/trailers">Trailers</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/submit">Submit</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/shop">Shop</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Header;
