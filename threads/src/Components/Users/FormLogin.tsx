import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import LoginFormValidationSchema from "../../Schemas/LogInFormValidationSchema";
import { FormLoginProps } from "../../Utils/types";

const FormLogin = ({ handleLogin }: FormLoginProps) => {
  return (
    <>
      <h1>Login</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginFormValidationSchema}
        onSubmit={handleLogin}
      >
        {({ errors, touched }) => (
          <Form id="signIn-form" className="">
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
              Login
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormLogin;
