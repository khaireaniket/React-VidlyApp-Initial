import React, { Component } from "react";
import Input from "./Input";
import Joi from "joi-browser";
import DropDownList from "./DropDownList";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validateForm = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, options);

    if (!result.error) return null;

    const errors = {};
    result.error.details.map((err) => {
      errors[err.path[0]] = err.message;
    });

    return errors;
  };

  validateProperty = (input) => {
    const options = { abortEarly: false };
    const obj = { [input.name]: input.value };
    const schema = { [input.name]: this.schema[input.name] };
    const result = Joi.validate(obj, schema, options);

    return result.error ? result.error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validateForm();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = (e) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.currentTarget);

    if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    else delete errors[e.currentTarget.name];

    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data, errors });
  };

  renderButton = (label) => {
    return (
      <button className="btn btn-primary" disabled={this.validateForm()}>
        {label}
      </button>
    );
  };

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        value={data[name]}
        type={type}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };

  renderDropDownList = (name, label, options) => {
    const { data, errors } = this.state;
    return (
      <DropDownList
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };
}

export default Form;
