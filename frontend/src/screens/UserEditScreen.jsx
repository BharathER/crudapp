import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import { Button, Row, Col, Form } from 'react-bootstrap'
import { FaMapMarkerAlt } from 'react-icons/fa'
import InputGroup from 'react-bootstrap/InputGroup'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const UserEditScreen = () => {
  const input1Ref = useRef()
  const input3Ref = useRef()
  const input4Ref = useRef()
  const input5Ref = useRef()
  const input6Ref = useRef()
  const input7Ref = useRef()
  const input8Ref = useRef()
  const input9Ref = useRef()
  const input10Ref = useRef()
  const input11Ref = useRef()
  const input12Ref = useRef()
  const input13Ref = useRef()
  const input14Ref = useRef()

  const params = useParams()
  // const [customers, setCustomers] = useState([])
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

  useEffect(() => {
    fetchData()
  }, [])

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // console.log(position)
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
  const fetchData = async () => {
    Axios.get(`/api/data/${params.id}`)
      .then((response) => {
        // console.log(response.data[0])
        setName(response.data[0].CustomerName)
        setRpid(response.data[0].ResidentsPermitID)
        setMobile(response.data[0].CustomerMobile)
        setHouseName(response.data[0].HouseName)
        setAreaNumber(response.data[0].AreaNumber)
        setStreetNumber(response.data[0].StreetNumber)
        setStreetName(response.data[0].StreetName)
        setBuildNumber(response.data[0].BuildNumber)
        setLocationGps(response.data[0].LocationGPS)
        setLocationName(response.data[0].LocationName)
        setState(response.data[0].State)
        setDistrict(response.data[0].District)
        setCountry(response.data[0].Country)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }

  const SubmitHandler = (e) => {
    e.preventDefault()
    Axios.put('/api/data', {
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
          toast.success('Customer data updated successfully')
          let path = `/`
          navigate(path)
        }
        //console.log(response);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleKeyPress = (event, nextInputRef, preventSubmit = true) => {
    if (event.key === 'Enter' && preventSubmit) {
      event.preventDefault()
      if (nextInputRef && nextInputRef.current) {
        nextInputRef.current.focus() // Move focus to the next input field
      }
    }
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
          <h2>Update Customer</h2>
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
                ref={input1Ref}
                onKeyDown={(e) => handleKeyPress(e, input3Ref)}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Residents Permit ID</Form.Label>
              <Form.Control
                type='text'
                disabled
                placeholder='Residents Permit ID'
                //value={customer.ResidentsPermitID}
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
                //value={customer.CustomerMobile}
                value={mobile}
                ref={input3Ref}
                onKeyDown={(e) => handleKeyPress(e, input4Ref)}
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
                //value={customer.HouseName}
                value={houseName}
                ref={input4Ref}
                onKeyDown={(e) => handleKeyPress(e, input5Ref)}
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
                //value={customer.AreaNumber}
                value={areaNumber}
                ref={input5Ref}
                onKeyDown={(e) => handleKeyPress(e, input6Ref)}
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
                //value={customer.StreetNumber}
                value={streetNumber}
                ref={input6Ref}
                onKeyDown={(e) => handleKeyPress(e, input7Ref)}
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
                //value={customer.StreetName}
                value={streetName}
                ref={input7Ref}
                onKeyDown={(e) => handleKeyPress(e, input8Ref)}
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
                // value={customer.BuildNumber}
                value={buildNumber}
                ref={input8Ref}
                onKeyDown={(e) => handleKeyPress(e, input9Ref)}
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
                  //value={customer.LocationGPS}
                  value={locationGps}
                  ref={input9Ref}
                  onKeyDown={(e) => handleKeyPress(e, input10Ref)}
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
                //value={customer.LocationName}
                value={locationName}
                ref={input10Ref}
                onKeyDown={(e) => handleKeyPress(e, input11Ref)}
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
                //value={customer.State}
                value={state}
                ref={input11Ref}
                onKeyDown={(e) => handleKeyPress(e, input12Ref)}
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
                //value={customer.District}
                value={district}
                ref={input12Ref}
                onKeyDown={(e) => handleKeyPress(e, input13Ref)}
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
                //value={customer.Country}
                value={country}
                ref={input13Ref}
                onKeyDown={(e) => handleKeyPress(e, input14Ref, false)}
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

export default UserEditScreen
