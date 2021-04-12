import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ProductService from '../../Utils/ProductService'

import Table from '../Table/table.component'
import Search from '../Search/search.component'

const productService = new ProductService()

export default class Dashboard extends Component {

    constructor(context) {
      super()
      this.state = {
        meta: [],
        data: [],
        loadingData: false,
        loginError:''
      }
    }

    onSearchSubmit = (searchData) => {
      // searchData = searchData
      productService.products(searchData)
          .then(result => {
            if (!result.data) {
              this.setState({loginError: result.message})
              this.props.history.push('/sign-in')
            }else{
              this.setState({meta:result.meta, data:result.data, loadingData: true})
              // this.setState({loadingData: true})
            }
            // this.props.auth.finishAuthentication(result.token)
            // this.context.router.push('/student-dashboard')
            // this.props.history.push('/dashboard')
        })
    }

    render() {
      console.log("Current State==================",this.state)
        const loading = this.state.loadingData
        const renderTable = () => {
          if (!loading) {
            return <p>Loading Please wait...</p>;
          } else {
            return <> <Search onSubmitSearch= { this.onSearchSubmit } /> <Table meta={this.state.meta} data={this.state.data} /> </>;
          }
        }
        const renderSearch = () => {
          return <Search />;
        }
        return (
              //renderSearch(),
               renderTable()
        );
    }

    componentDidMount() {
      console.log("Inside Component Did Mount")
      productService.products(null)
          .then(result => {
            if (!result.data) {
              this.setState({loginError: result.message})
              this.props.history.push('/sign-in')
            }else{
              this.setState({meta:result.meta, data:result.data, loadingData: true})
            }
        })
    }
}
