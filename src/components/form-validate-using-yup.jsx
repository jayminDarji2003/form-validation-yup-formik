import React, { useState } from "react";
import { object, string, number, date, ref, array } from "yup";

const FormValidateUsingYup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    interests: [],
    dateOfBirth: "",
  });

  const [errors, setErrors] = useState({});

  const validationSchema = object({
    firstName: string().required("first name is required"),
    lastName: string().required("last name is required"),
    email: string().required("email is required").email("invalid email"),
    phoneNumber: string()
      .matches(/^\d{10}$/, "phone number must be 10 digit")
      .required("phone number is required"),
    password: string()
      .required("password must be required")
      .min(8, "password must be at least 8 characters")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "password must contain at least one symbol"
      )
      .matches(/[0-9]/, "password must contain at least one number")
      .matches(/[a-z]/, "password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "password must contain at least one uppercase letter"),
    confirmPassword: string()
      .oneOf([ref("password")], "passwords must be matched")
      .required("confirm password must be required"),
    age: number()
      .typeError("age must be a number")
      .min(18, "min age should be 18")
      .max(100, "max age should be 100")
      .required("age must be required"),
    gender: string().required("gender must be required"),
    interests: array()
      .min(1, "select at least one interest")
      .required("interests must be required"),
    dateOfBirth: date().required("date of birth must be required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      console.log("form submission successful", formData);
    } catch (error) {
      // console.log("error : ", error.inner);
      const newError = {};

      error.inner.forEach((err) => {
        newError[err.path] = err.message;
      });

      setErrors(newError);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    let updatedInterests = [...formData.interests];
    if (checked) {
      updatedInterests.push(name);
    } else {
      updatedInterests = updatedInterests.filter(
        (interest) => interest !== name
      );
    }
    setFormData({
      ...formData,
      interests: updatedInterests,
    });
  };

  console.log(errors);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First name: </label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          placeholder="Enter first name"
          onChange={handleChange}
        />
        {errors.firstName && <div className="error">{errors.firstName}</div>}
      </div>
      <div>
        <label>Last name: </label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          placeholder="Enter last name"
          onChange={handleChange}
        />
        {errors.lastName && <div className="error">{errors.lastName}</div>}
      </div>
      <div>
        <label>Enter email: </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Enter email"
          onChange={handleChange}
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      <div>
        <label>Phone number: </label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          placeholder="Enter phone number"
          onChange={handleChange}
        />
        {errors.phoneNumber && (
          <div className="error">{errors.phoneNumber}</div>
        )}
      </div>
      <div>
        <label>Enter password: </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Enter password"
          onChange={handleChange}
        />
        {errors.password && <div className="error">{errors.password}</div>}
      </div>
      <div>
        <label>Confirm password: </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          placeholder="Confirm password"
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <div className="error">{errors.confirmPassword}</div>
        )}
      </div>
      <div>
        <label>Enter age: </label>
        <input
          type="number"
          name="age"
          value={formData.age}
          placeholder="Enter age"
          onChange={handleChange}
        />
        {errors.age && <div className="error">{errors.age}</div>}
      </div>
      <div>
        <label>Gender: </label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <div className="error">{errors.gender}</div>}
      </div>
      <div>
        <label>Interests: </label>
        <label>
          <input
            type="checkbox"
            name="coding"
            checked={formData.interests.includes("coding")}
            onChange={handleCheckboxChange}
          />
          Coding
        </label>
        <label>
          <input
            type="checkbox"
            name="sports"
            checked={formData.interests.includes("sports")}
            onChange={handleCheckboxChange}
          />
          Sports
        </label>
        <label>
          <input
            type="checkbox"
            name="travelling"
            checked={formData.interests.includes("travelling")}
            onChange={handleCheckboxChange}
          />
          Travelling
        </label>

        {errors.interests && <div className="error">{errors.interests}</div>}
      </div>
      <div>
        <label>Date of birth: </label>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
        {errors.dateOfBirth && (
          <div className="error">{errors.dateOfBirth}</div>
        )}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormValidateUsingYup;
