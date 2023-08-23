import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import SignUpFormValidationSchema from "../../Schemas/SignUpFormValidationSchema"; // Import the validation schema
import { FormSignUpProps } from "../../Utils/types";

const FormSignUp = ({ handleSignUp }: FormSignUpProps) => {
  return (
    <>
      <h1>Sign Up</h1>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={SignUpFormValidationSchema}
        onSubmit={handleSignUp}
      >
        {({ errors, touched }) => (
          <Form id="signIn-form" className="">
            <div>
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <Field
                type="text"
                name="username"
                className="form-control mb-2"
                placeholder="Username"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="error-message text-danger"
              />
            </div>
            <div>
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <Field
                type="text"
                name="email"
                className="form-control mb-2"
                placeholder="Email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message text-danger"
              />
            </div>
            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <Field
                type="password"
                name="password"
                className="form-control mb-2"
                placeholder="Password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message text-danger"
              />
            </div>
            <button type="submit" className="btn btn-primary mt-2">
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormSignUp;
