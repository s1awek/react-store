/** @format */

import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaCheck, FaShoppingCart } from 'react-icons/fa';
import { useCartContext } from '../context/cart_context';
import AmountButtons from './AmountButtons';
import { convertHex } from '../utils/helpers';
const AddToCart = ({ product }) => {
  const { id, stock, colors } = product;
  const [mainColor, setMainColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const increase = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount + 1;
      if (tempAmount <= stock) {
        return tempAmount;
      } else {
        return oldAmount;
      }
    });
  };
  const decrease = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount - 1;
      if (tempAmount >= 1) {
        return tempAmount;
      } else {
        return oldAmount;
      }
    });
  };
  return (
    <Wrapper>
      <div className='colors'>
        <span>colors: </span>
        <div>
          {colors.map((color, index) => {
            const isMain = color === mainColor;

            return (
              <button
                key={index}
                className={isMain ? 'color-btn active' : 'color-btn'}
                style={{ backgroundColor: color, color: `${convertHex(color)}60` }}
                onClick={() => {
                  setMainColor(colors[index]);
                }}
              >
                <FaCheck />
              </button>
            );
          })}
        </div>
      </div>
      <div className='btn-container'>
        <AmountButtons amount={amount} increase={increase} decrease={decrease} />
        <Link to='/cart' className='btn'>
          <FaShoppingCart />
          <span>Add to cart</span>
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    border: none;
    margin-right: 0.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: transparent;
    transition: var(--transition);
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
      opacity: 0;
      transition: var(--transition);
    }
  }
  .active {
    box-shadow: 0px 0px 0px 3px;
    svg {
      opacity: 1;
    }
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: auto;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    svg {
      margin-right: 0.5rem;
    }
  }
`;
export default AddToCart;
