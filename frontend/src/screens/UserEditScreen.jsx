import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { Button, Row, Col, Form } from "react-bootstrap";
import { FaMapMarkerAlt } from "react-icons/fa";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const UserEditScreen = () => {
  const params = useParams();
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [rpid, setRpid] = useState("");
  const [mobile, setMobile] = useState("");
  const [houseName, setHouseName] = useState("");
  const [areaNumber, setAreaNumber] = useState(0);
  const [streetNumber, setStreetNumber] = useState(0);
  const [streetName, setStreetName] = useState("");
  const [buildNumber, setBuildNumber] = useState("");
  const [locationGps, setLocationGps] = useState("");
  const [locationName, setLocationName] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const gpsCoordinates = `${latitude},${longitude}`;
        setLocationGps(gpsCoordinates);
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  };
  let navigate = useNavigate();
  const fetchData = async () => {
    Axios.get(`/api/data/${params.id}`)
      .then((response) => {
        console.log(response.data[0]);
        setName(response.data[0].CustomerName);
        setRpid(response.data[0].ResidentsPermitID);
        setMobile(response.data[0].CustomerMobile);
        setHouseName(response.data[0].HouseName);
        setAreaNumber(response.data[0].AreaNumber);
        setStreetNumber(response.data[0].StreetNumber);
        setStreetName(response.data[0].StreetName);
        setBuildNumber(response.data.BuildNumber);
        setLocationGps(response.data[0].LocationGPS);
        setLocationName(response.data[0].LocationName);
        setState(response.data[0].State);
        setDistrict(response.data[0].District);
        setCountry(response.data[0].Country);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
    Axios.put("/api/data", {
      CustomerName: name,
      ResidentsPermitID: rpid,
      CustomerMobile: mobile,
      HouseName: houseName,
      AreaNumber: areaNumber,
      StreetNumber: streetNumber,
      StreetName: streetName,
      BuildNumber: buildNumber,
      LocationGPS: locationGps,
      LocationName: locationName,
      State: state,
      District: district,
      Country: country,
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Customer data updated successfully");
          let path = `/`;
          navigate(path);
        }
        //console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    /*  try {
      const response = axios
        .put("/api/data", {
          CustomerName: name,
          ResidentsPermitID: rpid,
          CustomerMobile: mobile,
          HouseName: houseName,
          AreaNumber: areaNumber,
          StreetNumber: streetNumber,
          StreetName: streetName,
          BuildNumber: buildNumber,
          LocationGPS: locationGps,
          LocationName: locationName,
          State: state,
          District: district,
          Country: country,
        })
        .then((responses) => {
          console.log(responses);
        });
      toast.success("Customer data updated successfully");
      setTimeout(() => {}, 2000);
      let path = `/`;
      navigate(path);
    } catch (error) {
      console.error("Error submitting form:", error);
    } */
  };

  return (
    <>
      <Row className="align-items-center justify-content-between">
        <Col md={1}>
          <Link to={"/"} className="btn btn-light btn-sm mb-3">
            Go Back
          </Link>
        </Col>
        <Col md={11}>
          {" "}
          <h2>Update Customer</h2>
        </Col>
      </Row>
      <Form onSubmit={SubmitHandler}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Customer Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Residents Permit ID</Form.Label>
              <Form.Control
                type="text"
                disabled
                placeholder="Residents Permit ID"
                //value={customer.ResidentsPermitID}
                value={rpid}
                onChange={(e) => setRpid(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Customer Mobile</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Customer Mobile"
                //value={customer.CustomerMobile}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your number with anyone else.
              </Form.Text>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>House Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="House Name"
                //value={customer.HouseName}
                value={houseName}
                onChange={(e) => setHouseName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Area Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Area Number"
                //value={customer.AreaNumber}
                value={areaNumber}
                onChange={(e) => setAreaNumber(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Street Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Street Number"
                //value={customer.StreetNumber}
                value={streetNumber}
                onChange={(e) => setStreetNumber(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Street Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Street Name"
                //value={customer.StreetName}
                value={streetName}
                onChange={(e) => setStreetName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Build Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Build Number"
                // value={customer.BuildNumber}
                value={buildNumber}
                onChange={(e) => setBuildNumber(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Location (GPS)</Form.Label>

              <InputGroup>
                <Form.Control
                  readOnly={true}
                  onFocus={getLocation}
                  type="text"
                  placeholder="Click here to Fetch GPS location"
                  //value={customer.LocationGPS}
                  value={locationGps}
                  onChange={(e) => setLocationGps(e.target.value)}
                />
                <InputGroup.Text>
                  <FaMapMarkerAlt />
                </InputGroup.Text>
              </InputGroup>
              <Form.Text className="text-muted">
                We'll never share your Location (GPS) with anyone else.
              </Form.Text>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Location Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location name"
                //value={customer.LocationName}
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter State"
                //value={customer.State}
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>District</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter District"
                //value={customer.District}
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Country"
                //value={customer.Country}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default UserEditScreen;
