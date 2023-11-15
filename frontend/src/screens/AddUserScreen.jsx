import React from "react";
import { Button, Row, Col, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import { FaMapMarkerAlt } from "react-icons/fa";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
const AddUserScreen = () => {
  const [name, setName] = useState("");
  const [rpid, setRpid] = useState("");
  const [mobile, setMobile] = useState("");
  const [houseName, setHouseName] = useState("");
  const [areaNumber, setAreaNumber] = useState();
  const [streetNumber, setStreetNumber] = useState();
  const [streetName, setStreetName] = useState("");
  const [buildNumber, setBuildNumber] = useState("");
  const [locationGps, setLocationGps] = useState("");
  const [locationName, setLocationName] = useState("");
  const [manualLocName, setManualLocName] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [country, setCountry] = useState("");
  const [locObj, setLocObj] = useState([]);

  const [rpidError, setRpidError] = useState("");

  // const [show, setShow] = useState(false)

  const [show, setShow] = useState(false);
  const [showManualInput, setShowManualInput] = useState(false);

  // const handleClose = () => setShow(false)
  const handleShow = () => setShow(true);

  const validateRpid = () => {
    if (rpid.trim() === "") {
      setRpidError("Residents Permit ID is required");
      setTimeout(() => {
        setRpidError("");
      }, 3500);
      return false;
    }
    setRpidError("");
    return true;
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
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

  const SubmitHandler = (e) => {
    e.preventDefault();

    if (!validateRpid()) {
      console.log("hai");
      // If validation fails, return without submitting the form
      return;
    }

    Axios.post("/api/data", {
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
    }).then((response) => {
      if (response.status === 200) {
        toast.success("Customer data added successfully");
        let path = `/`;
        navigate(path);
      }
    });
  };

  var API = "pk.c225272bac1d1ed39b196d1bc1e6c3ed";
  var locUrl = `https://api.locationiq.com/v1/autocomplete?key=${API}&q=${manualLocName}&limit=5&dedupe=1&countrycodes=in`;

  if (manualLocName) {
    axios
      .get(`${locUrl}`)
      .then((response) => {
        setLocObj(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleClose = () => {
    setShow(false);
    setManualLocName("");
    setLocObj([]);
    setShowManualInput(false); // Reset the manual input state when closing the modal
  };

  const handleFetchLiveLocation = () => {
    getLocation();
    handleClose();
  };

  const handleEnterManually = () => {
    setShowManualInput(true);
    setLocationGps("");
  };
  const handleGet = (locData) => {
    const latitude = locData.lat;
    const longitude = locData.lon;
    const gpsCoordinates = `${latitude},${longitude}`;
    setLocationGps(gpsCoordinates);
    handleClose();
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
          <h2>Add New Customer</h2>
        </Col>
      </Row>

      <Form onSubmit={SubmitHandler}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                type="text"
                autoComplete="new-password"
                placeholder="Enter Customer Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label style={{ color: rpidError ? "red" : "grey" }}>
                {rpidError ? rpidError : "Residents Permit ID "}
              </Form.Label>
              <Form.Control
                type="text"
                autoComplete="new-password"
                placeholder="Residents Permit ID"
                value={rpid}
                // required
                isInvalid={!!rpidError}
                onChange={(e) => {
                  setRpid(e.target.value);
                  setRpidError("");
                }}
              />
              {/*  <Form.Control.Feedback type="invalid">
                {rpidError}
              </Form.Control.Feedback> */}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Customer Mobile</Form.Label>
              <Form.Control
                type="text"
                autoComplete="new-password"
                placeholder="Enter Customer Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              {/* <Form.Text className="text-muted">
                We'll never share your number with anyone else.
              </Form.Text> */}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>House Name</Form.Label>
              <Form.Control
                type="text"
                autoComplete="new-password"
                placeholder="House Name"
                value={houseName}
                onChange={(e) => setHouseName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Area Number</Form.Label>
              <Form.Control
                type="text"
                autoComplete="new-password"
                placeholder="Enter Area Number"
                value={areaNumber}
                onChange={(e) => setAreaNumber(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Street Number</Form.Label>
              <Form.Control
                type="text"
                autoComplete="new-password"
                placeholder="Street Number"
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
                autoComplete="new-password"
                placeholder="Enter Street Name"
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
                autoComplete="new-password"
                placeholder="Build Number"
                value={buildNumber}
                onChange={(e) => setBuildNumber(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Select Your Choice</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row className="align-items-center justify-content-between mx-0">
                  <Col md={5}>
                    <Button variant="primary" onClick={handleFetchLiveLocation}>
                      Fetch Live Location
                    </Button>
                  </Col>
                  <Col md={1}>
                    <p className="pt-3">Or</p>
                  </Col>
                  <Col md={6}>
                    <Button variant="primary" onClick={handleEnterManually}>
                      Enter Location Manually
                    </Button>
                  </Col>
                </Row>
                {showManualInput ? (
                  <Row className="align-items-center justify-content-between mx-0">
                    <Modal.Title className="mb-1">Enter location</Modal.Title>
                    <Col md={12}>
                      <Form.Control
                        type="text"
                        placeholder="Search by location names"
                        onChange={(e) => setManualLocName(e.target.value)}
                      />

                      {manualLocName.length !== 0 &&
                        locObj.map((value, index) => {
                          return (
                            <>
                              <Form.Control
                                readOnly={true}
                                // onFocus={getLocation}
                                onClick={() => handleGet(value)}
                                type="text"
                                placeholder={value.display_name}
                                value={locationGps}
                              />
                            </>
                            /*  <Row md={10}>
                            <Button variant="light">
                              <p>{value.display_name}</p>
                            </Button>
                          </Row> */
                          );
                        })}
                    </Col>
                  </Row>
                ) : (
                  <></>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Location (GPS)</Form.Label>
              <InputGroup>
                <Form.Control
                  readOnly={true}
                  // onFocus={getLocation}
                  onClick={handleShow}
                  type="text"
                  placeholder="Click here to Fetch GPS location"
                  value={locationGps}
                  onChange={(e) => setLocationGps(e.target.value)}
                />
                <InputGroup.Text>
                  <FaMapMarkerAlt />
                </InputGroup.Text>
              </InputGroup>
              {/*  <Form.Text className="text-muted">
                We'll never share your Location (GPS) with anyone else.
              </Form.Text> */}
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Location Name</Form.Label>
              <Form.Control
                type="text"
                autoComplete="new-password"
                placeholder="Enter location name"
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
                autoComplete="new-password"
                placeholder="Enter State"
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
                autoComplete="new-password"
                placeholder="Enter District"
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
                autoComplete="new-password"
                placeholder="Enter Country"
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

export default AddUserScreen;
