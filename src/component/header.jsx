import React from "react";
import { Button, Nav } from "react-bootstrap";

const Header = ({setTab}) => {

  const logOutUser = () =>{
    localStorage.clear();
    window.location.href = '/login';
  }

  return (
    <Nav variant="tabs" className="py-1 d-flex justify-content-between" defaultActiveKey="link-1">
      <div className="d-flex">
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={()=>setTab('myFeed')} >My Feed</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" onClick={()=>setTab('otherFeed')}>Other's Feed</Nav.Link>
        </Nav.Item>
      </div>
      <Nav.Item className="ml-auto">
        <Button className="btn btn-primary m-2 ml-auto" onClick={logOutUser} >Logout</Button>
      </Nav.Item>
    </Nav>
  );
};

export default Header;
