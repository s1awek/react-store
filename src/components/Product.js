/** @format */

import React from 'react';
import styled from 'styled-components';
import { formatPrice } from '../utils/helpers';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Product = ({ image, name, price, id }) => {
  return (
    <Wrapper>
      <div className='container'>
        <Link className='link' to={`/products/${id}`}>
          <img src={image} alt={name} />
          <div className='icon-wrap'>
            <FaExternalLinkAlt />
          </div>
        </Link>
      </div>
      <footer>
        <h5>{name}</h5>
        <p>{formatPrice(price)}</p>
      </footer>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  .container {
    position: relative;
    border-radius: var(--radius);
    height: 225px;
    overflow: hidden;
  }

  img {
    width: 100%;
    display: block;
    object-fit: cover;
    border-radius: var(--radius);
    transition: var(--transition);
  }
  .link {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: var(--clr-black);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition);
    cursor: pointer;
    display: block;
    svg {
      font-size: 1.25rem;
      color: var(--clr-white);
      width: 1.25rem;
      height: 1.25rem;
    }
    .icon-wrap {
      width: 50px;
      height: 50px;
      border-radius: 100px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      top: calc(50% - 50px / 2);
      left: calc(50% - 50px / 2);
      position: absolute;
      background: var(--clr-primary-5);
      opacity: 0;
      transition: var(--transition);
    }
  }
  .container:hover img {
    opacity: 0.5;
  }
  .container:hover .link {
    .icon-wrap {
      opacity: 1;
    }
  }
  footer {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  footer h5,
  footer p {
    margin-bottom: 0;
    font-weight: 400;
  }

  footer p {
    color: var(--clr-primary-5);
    letter-spacing: var(--spacing);
  }
`;
export default Product;
