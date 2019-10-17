import React, { useState, useEffect } from "react";
import axios from "axios";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

const UserForm = ({ values, touched, errors, status }) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
      status && setUsers(users => [...users, status]);
    }, [status]);

    return (
      <div>
        <Form>
          <Field type="text" name="name" placeholder="Name" />
          {touched.name && errors.name && <p>{errors.name}</p>}

          <Field type="text" name="email" placeholder="Email" />
          {touched.email && errors.email && <p>{errors.email}</p>}

          <Field type="password" name="password" placeholder="Password" />
          {touched.password && errors.password && <p>{errors.password}</p>}

          <label>
          {touched.tos && errors.tos && <p>{errors.tos}</p>} 
            Agree to Terms of Service
            <Field
              type="checkbox"
              name="tos"
              checked={values.tos}
            />
            <span className="checkmark" />
          </label>

          <button type="submit">Submit</button>

        </Form>
        {users.map(user => (
          <ul key={user.id}>
            <li>Name: {user.name}</li>
            <li>Email: {user.email}</li>
            <li>Password: {user.password}</li>

          </ul>
        ))}
      </div>
    );
  };

  const FormikForm = withFormik({


    mapPropsToValues({ name, email, password, tos }) {
      return {
        name: name || "",
        email: email || "",
        password: password || "",
        tos: tos || false,
      };
    },


    validationSchema: Yup.object().shape({

      name: Yup.string()
      .min(2, "Name must be at least two letters")
      .required("Please input a name"),

      email: Yup.string()
      .email("Enter a valid email address")
      .required("Email is a required field"),
      
      password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password must be entered"),

      tos: Yup.boolean()
      .oneOf([true], "You must accept the the Terms of Service"),

    }),


    handleSubmit(values, { setStatus }) {
      axios
        .post("https://reqres.in/api/users/", values)
        .then(res => {
            console.log(res.data)
          setStatus(res.data);
        })
        .catch(err => console.log(err.response));
    }
  })(UserForm);
  export default FormikForm;