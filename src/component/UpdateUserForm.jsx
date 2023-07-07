import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { BASE_URL } from "./Helper";

const UpdateUserForm = ({ user, updateUser }) => {
  // Validation schema
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First Name is required")
      .min(5, "First Name must be at least 5 characters"),
    lastName: Yup.string()
      .required("Last Name is required")
      .min(5, "Last Name must be at least 5 characters"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobile: Yup.string().required("Mobile is required"),
    address1: Yup.string().required("Address 1 is required"),
    address2: Yup.string(),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
    zipCode: Yup.number().required("Zip Code is required"),
  });

  const handleSubmit = async (values) => {
    try {
      await axios.put(`${BASE_URL}/user/update/${user._id}`, values);
      updateUser(user._id, values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <div>
        <h2>Update User</h2>
        <Formik
          initialValues={{
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            mobile: user.mobile,
            address1: user.address1,
            address2: user.address2,
            state: user.state,
            country: user.country,
            zipCode: user.zipCode,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="mb-3">
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

              <div className="mb-3">
                <label htmlFor="mobile" className="form-label">
                  Mobile
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="mobile"
                  name="mobile"
                />
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
                  value={values.country}
                  onChange={(value) => setFieldValue("country", value)}
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
                  country={values.country}
                  value={values.state}
                  onChange={(value) => setFieldValue("state", value)}
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

              <Button type="submit">Update User</Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default UpdateUserForm;
