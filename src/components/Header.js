import { FaShoppingCart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import {
  Badge,
  Button,
  Container,
  Dropdown,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { CartState } from "../context/Context";
import "./styles.css";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {

  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = CartState();

  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ height: 80 }} expand="lg">
        <Container>
          <Navbar.Brand>
            <Link to="/">Shopping Cart</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className=" bg-dark">
            {useLocation().pathname.split("/")[1] !== "cart" && (
              <Navbar.Text className="search mx-5">
                <FormControl
                  style={{ width: 500 }}
                  type="search"
                  placeholder="Search a product..."
                  className="m-auto "
                  aria-label="Search"
                  onChange={(e) => {
                    productDispatch({
                      type: "FILTER_BY_SEARCH",
                      payload: e.target.value,
                    });
                  }}
                />
              </Navbar.Text>
            )}
            <Nav>
              <Dropdown alignRight className=" mx-3">
                <Dropdown.Toggle variant="success">
                  <FaShoppingCart color="white" fontSize="25px" />
                  <Badge>{cart.length}</Badge>
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ minWidth: 370 }}>
                  {cart.length > 0 ? (
                    <>
                      {cart.map((prod) => (
                        <span className="cartitem" key={prod.id}>
                          <img
                            src={prod.image}
                            className="cartItemImg"
                            alt={prod.name}
                          />
                          <div className="cartItemDetail">
                            <span>{prod.name}</span>
                            <span>₹ {prod.price.split(".")[0]}</span>
                          </div>
                          <AiFillDelete
                            fontSize="20px"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              dispatch({
                                type: "REMOVE_FROM_CART",
                                payload: prod,
                              })
                            }
                          />
                        </span>
                      ))}
                      <Link to="/cart">
                        <Button style={{ width: "95%", margin: "0 10px" }}>
                          Go To Cart
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <span style={{ padding: 10 }}>Cart is Empty!</span>
                  )}
                </Dropdown.Menu>
              </Dropdown>

              {isAuthenticated && <p className=" text-white mx-2">{user.name}</p>}
              {isAuthenticated ? (
                <Button variant="primary"
                  onClick={() => logout({ returnTo: window.location.origin })}>
                  Log Out
                </Button>
              ) : (<Button variant="primary"
                onClick={() => loginWithRedirect()}>Log In</Button>)}


            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
