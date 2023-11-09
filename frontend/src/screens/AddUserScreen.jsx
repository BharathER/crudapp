import React from 'react'
import { Button, Row, Col, Form } from 'react-bootstrap'
import { useState } from 'react'
import Axios from 'axios'
import { toast } from 'react-toastify'
import { FaMapMarkerAlt } from 'react-icons/fa'
import InputGroup from 'react-bootstrap/InputGroup'
import { useNavigate, Link } from 'react-router-dom'
const AddUserScreen = () => {
  const [name, setName] = useState('')
  const [rpid, setRpid] = useState('')
  const [mobile, setMobile] = useState('')
  const [houseName, setHouseName] = useState('')
  const [areaNumber, setAreaNumber] = useState(0)
  const [streetNumber, setStreetNumber] = useState(0)
  const [streetName, setStreetName] = useState('')
  const [buildNumber, setBuildNumber] = useState('')
  const [locationGps, setLocationGps] = useState('')
  const [locationName, setLocationName] = useState('')
  const [state, setState] = useState('')
  const [district, setDistrict] = useState('')
  const [country, setCountry] = useState('')

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        const gpsCoordinates = `${latitude},${longitude}`
        setLocationGps(gpsCoordinates)
      },
      (error) => {
        console.error('Error getting location:', error)
      }
    )
  }

  let navigate = useNavigate()

  const SubmitHandler = (e) => {
    e.preventDefault()
    Axios.post('/api/data', {
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
        toast.success('Customer data added successfully')
        let path = `/`
        navigate(path)
      }
    })
    /*   try {
      const response = Axios.post("/api/data", {
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
      }).then((responses) => {
        console.log("responses");
        console.log(responses);
        console.log("responses 2");
      });
      console.log(response.data);
      toast.success("data inserted");

      let path = `/`;
      navigate(path);
    } catch (error) {
      console.log("Bharath");
      console.log("Error submitting form:", error);
    } */
  }
  return (
    <>
      <Row className='align-items-center justify-content-between'>
        <Col md={1}>
          <Link to={'/'} className='btn btn-light btn-sm mb-3'>
            Go Back
          </Link>
        </Col>
        <Col md={11}>
          {' '}
          <h2>Add New Customer</h2>
        </Col>
      </Row>

      <Form onSubmit={SubmitHandler}>
        <Row>
          <Col md={6}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Customer Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Residents Permit ID</Form.Label>
              <Form.Control
                type='text'
                placeholder='Residents Permit ID'
                value={rpid}
                onChange={(e) => setRpid(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Customer Mobile</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Customer Mobile'
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <Form.Text className='text-muted'>
                We'll never share your number with anyone else.
              </Form.Text>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>House Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='House Name'
                value={houseName}
                onChange={(e) => setHouseName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Area Number</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Area Number'
                value={areaNumber}
                onChange={(e) => setAreaNumber(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Street Number</Form.Label>
              <Form.Control
                type='number'
                placeholder='Street Number'
                value={streetNumber}
                onChange={(e) => setStreetNumber(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Street Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Street Name'
                value={streetName}
                onChange={(e) => setStreetName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Build Number</Form.Label>
              <Form.Control
                type='text'
                placeholder='Build Number'
                value={buildNumber}
                onChange={(e) => setBuildNumber(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Location (GPS)</Form.Label>
              <InputGroup>
                <Form.Control
                  readOnly={true}
                  onFocus={getLocation}
                  type='text'
                  placeholder='Click here to Fetch GPS location'
                  value={locationGps}
                  onChange={(e) => setLocationGps(e.target.value)}
                />
                <InputGroup.Text>
                  <FaMapMarkerAlt />
                </InputGroup.Text>
              </InputGroup>
              <Form.Text className='text-muted'>
                We'll never share your Location (GPS) with anyone else.
              </Form.Text>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Location Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter location name'
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>State</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter State'
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>District</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter District'
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Country</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Country'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </>
  )
}

export default AddUserScreen
