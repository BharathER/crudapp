import React from "react";
import { Row, Col, Table, Button, Container, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import Axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import loader from "../assets/loader.gif";
import alert from "../assets/alert.png";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Pagination from "react-bootstrap/Pagination";
const HomeScreen = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const reccords = customers.slice(firstIndex, lastIndex);
  const npages = Math.ceil(customers.length / recordsPerPage);
  const numbers = [...Array(npages + 1).keys()].slice(1);

  useEffect(() => {
    fetchData();
    setIsLoading(false);
  }, []);

  const fetchData = () => {
    Axios.get("/api/data")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  };

  const deleteHandler = (id) => {
    Axios.delete(`/api/data/${id}`)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Customer Record Deleted");
          fetchData();
        }
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  };

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const changeCurrentPage = (id) => {
    setCurrentPage(id);
  };
  const nextPage = () => {
    if (currentPage !== npages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      {!isLoading ? (
        <>
          <Row className="align-items-center justify-content-between">
            <Col className="mt-3">
              <h1>Customer List</h1>
            </Col>
            <Col className="text-end">
              <LinkContainer to="/adduserscreen">
                <Button className="btn btn-sm">
                  <FaEdit className="mx-2" />
                  Add Customer
                </Button>
              </LinkContainer>
            </Col>
          </Row>
          {customers.length === 0 ? (
            <>
              <Container style={{ display: "flex", justifyContent: "center" }}>
                <Image src={alert} style={{ height: "100px" }} />
              </Container>
              <Container style={{ textAlign: "center" }}>
                <h2>Nothing to show</h2>
                <p>Please add data </p>
              </Container>
            </>
          ) : (
            <>
              <Row className="mt-3">
                <Container>
                  <Table responsive striped>
                    <thead>
                      <tr>
                        <>
                          <th>#</th>
                          <th>Name</th>
                          <th>RPID</th>
                          <th>Mobile</th>
                          <th>House Name</th>
                          <th>Area Number</th>
                          <th>Street Number</th>
                          <th>Street Name</th>
                          <th>Build Number</th>
                          <th>Location GPS</th>
                          <th>Location Name</th>
                          <th>State</th>
                          <th>District</th>
                          <th>Country</th>
                          <th>Edit</th>
                          <th>Delete</th>
                        </>
                      </tr>
                    </thead>
                    <tbody>
                      {reccords.map((customer, index1) => (
                        <tr key={index1}>
                          <td>
                            {lastIndex === recordsPerPage
                              ? index1 + 1
                              : index1 + lastIndex}
                          </td>
                          <OverlayTrigger
                            delay={{ hide: 150, show: 300 }}
                            overlay={(props) => (
                              <Tooltip {...props}>
                                {customer.CustomerName}
                              </Tooltip>
                            )}
                            placement="bottom"
                          >
                            <td>
                              {customer.CustomerName &&
                              customer.CustomerName.length > 10
                                ? `${customer.CustomerName.slice(0, 7)}...`
                                : customer.CustomerName}
                            </td>
                          </OverlayTrigger>
                          <OverlayTrigger
                            delay={{ hide: 150, show: 300 }}
                            overlay={(props) => (
                              <Tooltip {...props}>
                                {customer.ResidentsPermitID}
                              </Tooltip>
                            )}
                            placement="bottom"
                          >
                            <td>
                              {customer.ResidentsPermitID &&
                              customer.ResidentsPermitID.length > 10
                                ? `${customer.ResidentsPermitID.slice(0, 7)}...`
                                : customer.ResidentsPermitID}
                            </td>
                          </OverlayTrigger>

                          <td>{customer.CustomerMobile}</td>
                          <OverlayTrigger
                            delay={{ hide: 150, show: 300 }}
                            overlay={(props) => (
                              <Tooltip {...props}>{customer.HouseName}</Tooltip>
                            )}
                            placement="bottom"
                          >
                            <td>
                              {customer.HouseName &&
                              customer.HouseName.length > 10
                                ? `${customer.HouseName.slice(0, 7)}...`
                                : customer.HouseName}
                            </td>
                          </OverlayTrigger>
                          <OverlayTrigger
                            delay={{ hide: 150, show: 300 }}
                            overlay={(props) => (
                              <Tooltip {...props}>
                                {customer.AreaNumber}
                              </Tooltip>
                            )}
                            placement="bottom"
                          >
                            <td>
                              {customer.AreaNumber &&
                              customer.AreaNumber.length > 10
                                ? `${customer.AreaNumber.slice(0, 7)}...`
                                : customer.AreaNumber}
                            </td>
                          </OverlayTrigger>
                          <OverlayTrigger
                            delay={{ hide: 150, show: 300 }}
                            overlay={(props) => (
                              <Tooltip {...props}>
                                {customer.StreetNumber}
                              </Tooltip>
                            )}
                            placement="bottom"
                          >
                            <td>
                              {customer.StreetNumber &&
                              customer.StreetNumber.length > 10
                                ? `${customer.StreetNumber.slice(0, 7)}...`
                                : customer.StreetNumber}
                            </td>
                          </OverlayTrigger>
                          <OverlayTrigger
                            delay={{ hide: 150, show: 300 }}
                            overlay={(props) => (
                              <Tooltip {...props}>
                                {customer.StreetName}
                              </Tooltip>
                            )}
                            placement="bottom"
                          >
                            <td>
                              {customer.StreetName &&
                              customer.StreetName.length > 10
                                ? `${customer.StreetName.slice(0, 7)}...`
                                : customer.StreetName}
                            </td>
                          </OverlayTrigger>
                          <OverlayTrigger
                            delay={{ hide: 150, show: 300 }}
                            overlay={(props) => (
                              <Tooltip {...props}>
                                {customer.BuildNumber}
                              </Tooltip>
                            )}
                            placement="bottom"
                          >
                            <td>
                              {customer.BuildNumber &&
                              customer.BuildNumber.length > 10
                                ? `${customer.BuildNumber.slice(0, 7)}...`
                                : customer.BuildNumber}
                            </td>
                          </OverlayTrigger>

                          <OverlayTrigger
                            delay={{ hide: 150, show: 300 }}
                            overlay={(props) => (
                              <Tooltip {...props}>
                                {customer.LocationGPS}
                              </Tooltip>
                            )}
                            placement="bottom"
                          >
                            <td>
                              {customer.LocationGPS &&
                              customer.LocationGPS.length > 10
                                ? `${customer.LocationGPS.slice(0, 7)}...`
                                : customer.LocationGPS}
                            </td>
                          </OverlayTrigger>
                          <OverlayTrigger
                            delay={{ hide: 150, show: 300 }}
                            overlay={(props) => (
                              <Tooltip {...props}>
                                {customer.LocationName}
                              </Tooltip>
                            )}
                            placement="bottom"
                          >
                            <td>
                              {customer.LocationName &&
                              customer.LocationName.length > 10
                                ? `${customer.LocationName.slice(0, 7)}...`
                                : customer.LocationName}
                            </td>
                          </OverlayTrigger>
                          <OverlayTrigger
                            delay={{ hide: 150, show: 300 }}
                            overlay={(props) => (
                              <Tooltip {...props}>{customer.State}</Tooltip>
                            )}
                            placement="bottom"
                          >
                            <td>
                              {customer.State && customer.State.length > 10
                                ? `${customer.State.slice(0, 7)}...`
                                : customer.State}
                            </td>
                          </OverlayTrigger>
                          <OverlayTrigger
                            delay={{ hide: 150, show: 300 }}
                            overlay={(props) => (
                              <Tooltip {...props}>{customer.District}</Tooltip>
                            )}
                            placement="bottom"
                          >
                            <td>
                              {customer.District &&
                              customer.District.length > 10
                                ? `${customer.District.slice(0, 7)}...`
                                : customer.District}
                            </td>
                          </OverlayTrigger>
                          <OverlayTrigger
                            delay={{ hide: 150, show: 300 }}
                            overlay={(props) => (
                              <Tooltip {...props}>{customer.Country}</Tooltip>
                            )}
                            placement="bottom"
                          >
                            <td>
                              {customer.Country && customer.Country.length > 10
                                ? `${customer.Country.slice(0, 7)}...`
                                : customer.Country}
                            </td>
                          </OverlayTrigger>

                          <td>
                            <OverlayTrigger
                              delay={{ hide: 150, show: 300 }}
                              overlay={(props) => (
                                <Tooltip {...props}>Edit</Tooltip>
                              )}
                              placement="bottom"
                            >
                              <LinkContainer
                                to={{
                                  pathname: `/usereditscreen/${customer.ResidentsPermitID}`,
                                  state: {
                                    customer,
                                  },
                                }}
                              >
                                <Button variant="light" className="btn-sm mx-2">
                                  <FaEdit />
                                </Button>
                              </LinkContainer>
                            </OverlayTrigger>
                          </td>
                          <td>
                            <OverlayTrigger
                              delay={{ hide: 150, show: 300 }}
                              overlay={(props) => (
                                <Tooltip {...props}>Delete</Tooltip>
                              )}
                              placement="bottom"
                            >
                              <Button
                                variant="light"
                                className="btn-sm mx-2"
                                onClick={() =>
                                  deleteHandler(customer.CustomerID)
                                }
                              >
                                <FaTrash />
                              </Button>
                            </OverlayTrigger>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <br />
                  <Pagination>
                    <Pagination.Prev onClick={prePage} />
                    {numbers.map((n, i) =>
                      currentPage === n ? (
                        <Pagination.Item
                          active
                          onClick={() => changeCurrentPage(n)}
                        >
                          {n}
                        </Pagination.Item>
                      ) : (
                        <Pagination.Item onClick={() => changeCurrentPage(n)}>
                          {n}
                        </Pagination.Item>
                      )
                    )}

                    <Pagination.Next onClick={nextPage} />
                  </Pagination>
                  {/*  <nav>
                    <ul className="pagination">
                      <li className="page-item">
                        <a href="/#" className="page-link">
                          Prev
                        </a>
                      </li>
  <li
                          className={`page-item ${
                            currentPage === n ? "active" : ""
                          }`}
                          key={i}
                        >
                          <a
                            href="/#"
                            className="page-link"
                            
                          >
                            {n}
                          </a>
                        </li> 
                      <li className="page-item">
                        <a href="/#" className="page-link" onClick={nextPage}>
                          Next
                        </a>
                      </li>
                    </ul>
                  </nav> */}
                </Container>
              </Row>
            </>
          )}
        </>
      ) : (
        <Container style={{ display: "flex", justifyContent: "center" }}>
          <Image src={loader} />
        </Container>
      )}
    </>
  );
};

export default HomeScreen;
