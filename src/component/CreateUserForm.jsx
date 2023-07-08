import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { BASE_URL } from "./Helper";
import { toast } from "react-toastify";

const CreateUserForm = () => {
  // Validation schema
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First Name is required")
      .min(5, "First Name must be at least 5 characters"),
    lastName: Yup.string()
      .required("Last Name is required")
      .min(5, "Last Name must be at least 5 characters"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobile: Yup.string()
      .required("Mobile is required")
      .matches(/^\+?\d{8,15}$/, "Invalid mobile number"),
    address1: Yup.string().required("Address 1 is required"),
    address2: Yup.string(),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
    zipCode: Yup.number().required("Zip Code is required"),
  });

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const navigation = useNavigate();
  // const countries = Country.getAllCountries();
  // const states = selectedCountry
  //   ? State.getStatesOfCountry(selectedCountry)
  //   : [];

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedState("");
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      // console.log(values);
      const response = await axios.post(`${BASE_URL}/user/create`, values);
      console.log(response.data);
      navigation("/getuser");
      toast.success("User is created...");
      resetForm();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="container">
        <Container className="mt-3 form-container">
          <div>
            <h2>Create User</h2>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                mobile: "",
                address1: "",
                address2: "",
                state: "",
                country: "",
                zipCode: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue, resetForm }) => (
                <Form>
                  <div className="mb-3 ">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <Field
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <Field
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <Field
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3 ">
                    <label htmlFor="mobile" className="form-label">
                      Mobile
                    </label>
                    <div className="input-group ">
                      <PhoneInput
                        country={selectedCountry}
                        value={values.mobile}
                        onChange={(phone) => setFieldValue("mobile", phone)}
                      />
                    </div>
                    <ErrorMessage
                      name="mobile"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="address1" className="form-label">
                      Address 1
                    </label>
                    <Field
                      type="text"
                      className="form-control"
                      id="address1"
                      name="address1"
                    />
                    <ErrorMessage
                      name="address1"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="address2" className="form-label">
                      Address 2
                    </label>
                    <Field
                      type="text"
                      className="form-control"
                      id="address2"
                      name="address2"
                    />
                    <ErrorMessage
                      name="address2"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="country" className="form-label">
                      Country
                    </label>
                    <CountryDropdown
                      id="country"
                      name="country"
                      value={selectedCountry}
                      onChange={(value) => {
                        handleCountryChange(value);
                        setFieldValue("country", value);
                      }}
                      placeholder="Select Country"
                    />
                    <ErrorMessage
                      name="country"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="state" className="form-label">
                      State
                    </label>
                    <RegionDropdown
                      id="state"
                      name="state"
                      country={selectedCountry}
                      value={selectedState}
                      onChange={(value) => {
                        handleStateChange(value);
                        setFieldValue("state", value);
                      }}
                      placeholder="Select State"
                      disableWhenEmpty
                      blankOptionLabel="Select State"
                    />
                    <ErrorMessage
                      name="state"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="zipCode" className="form-label">
                      Zip Code
                    </label>
                    <Field
                      type="text"
                      className="form-control"
                      id="zipCode"
                      name="zipCode"
                    />
                    <ErrorMessage
                      name="zipCode"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <Button type="submit" className=" btn btn-primary">
                    Create User
                  </Button>
                  <Button className="btn btn-primary">
                    <Link
                      to="/getuser"
                      className="text-white text-decoration-none"
                    >
                      Get user
                    </Link>
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </Container>
        <Container></Container>
      </div>
    </>
  );
};
export default CreateUserForm;
