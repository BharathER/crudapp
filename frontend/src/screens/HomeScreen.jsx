import React from "react";
import { Row, Col, Table, Button, Container, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import Axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import loader from "../assets/loader.gif";
import alert from "../assets/alert.png";
const HomeScreen = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        //console.log(response);
        if (response.status === 200) {
          toast.success("Customer Record Deleted");
          fetchData();
        }
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
    /* try {
      const response = Axios.delete(`/api/data/${id}`);
      const { data, status } = response;
      if (status === 200) {
        toast.success("Customer Record Deleted");
      } else {
        toast.error("Delete Operation failed!");
      }
    } catch (err) {
      toast.error("Error deleting customer record");
      console.error(err);
    } */
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
                  Add User
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
                        {Array.from({ length: 1 }).map((_, index) => (
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
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((customer, index1) => (
                        <tr key={customer.CustomerID}>
                          {Array.from({ length: 1 }).map((_, index) => (
                            <>
                              <td>{index1 + 1}</td>
                              <td>{customer.CustomerName}</td>
                              <td>{customer.ResidentsPermitID}</td>
                              <td>{customer.CustomerMobile}</td>
                              <td>{customer.HouseName}</td>
                              <td>{customer.AreaNumber}</td>
                              <td>{customer.StreetNumber}</td>
                              <td>{customer.StreetName}</td>
                              <td>{customer.BuildNumber}</td>
                              <td>{customer.LocationGPS}</td>
                              <td>{customer.LocationName}</td>
                              <td>{customer.State}</td>
                              <td>{customer.District}</td>
                              <td>{customer.Country}</td>
                              <td>
                                <LinkContainer
                                  to={{
                                    pathname: `/usereditscreen/${customer.ResidentsPermitID}`,
                                    state: {
                                      customer,
                                    },
                                  }}
                                >
                                  <Button
                                    variant="light"
                                    className="btn-sm mx-2"
                                  >
                                    <FaEdit />
                                  </Button>
                                </LinkContainer>
                              </td>
                              <td>
                                <Button
                                  variant="light"
                                  className="btn-sm mx-2"
                                  onClick={() =>
                                    deleteHandler(customer.CustomerID)
                                  }
                                >
                                  <FaTrash />
                                </Button>
                              </td>
                            </>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
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
