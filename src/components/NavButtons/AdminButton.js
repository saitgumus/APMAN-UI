import React, { useState } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import Messages from "../../Types/Messages";

const AdminButton = (props) => {
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  return (
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret outline color={"primary"}>
        {Messages.MenuNames.Main.admin}
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>{Messages.MenuNames.Other.managment}</DropdownItem>
        <DropdownItem>
          <NavItem>
            <NavLink
              tag={Link}
              className="text-dark"
              to="/admin/DefineSiteApartment"
            >
              {Messages.MenuNames.Other.managment}
            </NavLink>
          </NavItem>
        </DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  );
};

export default AdminButton;
