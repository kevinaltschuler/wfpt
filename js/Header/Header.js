import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

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
              <NavLink href="/tour/">Tour</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/specials">Specials</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/trailers">Trailers</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/submit">Submit</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/shop">Shop</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Header;
