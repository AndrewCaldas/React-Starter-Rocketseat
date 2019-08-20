import React, { Component } from 'react';
import api from '../../services/api';
import './style.css'
import { Link } from 'react-router-dom'

export default class Main extends Component {
  state = {
    products: [],
    productInfo: {},
    page: 1
  }

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`);

    const { docs, ...productInfo } = response.data;

    this.setState({ products: docs, productInfo, page });

    // console.log('sys: ', productInfo)
  }

  prevPage = () => {
    const { page, productInfo } = this.state;

    if (page === 1) return;

    const pageNumber = page - 1;

    this.loadProducts(pageNumber);
  }

  nextPage = () => {
    const { page, productInfo } = this.state;

    if (page === productInfo.pages) return;
    
    const pageNumber = page + 1;

    this.loadProducts(pageNumber);
  }

  render() {
    const { page, products, productInfo } = this.state;
    return (
      <div className="product-list">
      { products.map(el => (
        <article key={el._id}>
          <strong>{el.title}</strong>
          <p> {el.description} </p>
          <Link to={`/products/${el._id}`}>Acessar</Link>
        </article>
        // <h3 key={el._id}>{ el.title }</h3>
      ))}
      <div className="actions">
        <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
        <button disabled={page === productInfo.pages} onClick={this.nextPage}>Seguinte</button>
      </div>
      </div>
      // return <h1>Contagem de produtos: { this.state.products.length } </h1>;
    )
  }
}
