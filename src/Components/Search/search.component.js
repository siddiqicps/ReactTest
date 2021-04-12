// import logo from '../../logo.svg';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from "react";
import './Search.scss';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";import { Button } from 'react-bootstrap';
import { Form, Col  } from 'react-bootstrap';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product_name: '',
      product_price: '',
      expiry_date: ''
    }
  }

  onSearchSubmit(event) {
    event.preventDefault();
    this.props.onSubmitSearch(this.state);
  }

  onResetSubmit(event) {
    event.preventDefault();
    this.props.onSubmitSearch(null);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    console.log("Properties========================",this.props)
    // const meta = props.meta
    // const data = props.data

    return (
      <Form onSubmit={this.onSearchSubmit.bind(this)}>
        <Form.Row className="align-items-center">
          <Col sm={3} className="my-1">
            <Form.Label htmlFor="inlineFormInputName" srOnly>
              Product Name
            </Form.Label>
            <Form.Control id="inlineFormInputName" placeholder="Search Name" name="product_name"  value={this.state.product_name} onChange={this.handleChange.bind(this)}/>
          </Col>
          <Col sm={2} className="my-1">
            <Form.Label htmlFor="inlineFormInputGroupUsername" srOnly>
              Product Price
            </Form.Label>
            <Form.Control id="inlineFormInputName" placeholder="Max Price" name="product_price"  value={this.state.product_price} onChange={this.handleChange.bind(this)} />
          </Col>
          <Col sm={2} className="my-1">
            <Form.Label htmlFor="inlineFormInputGroupUsername" srOnly>
              Expiry Date
            </Form.Label>
            <Form.Control type="date" id="inlineFormInputName" placeholder="Expiry Date" name="expiry_date"  value={this.state.expiry_date} onChange={this.handleChange.bind(this)} />
          </Col>
          <Col xs="auto" className="my-1">
            <Button type="submit">Filter</Button>
          </Col>
          <Col xs="auto" className="my-1">
            <Button type="Reset" onClick={this.onResetSubmit.bind(this)}>Reset</Button>
          </Col>
        </Form.Row>
      </Form>
    );
  }

}
