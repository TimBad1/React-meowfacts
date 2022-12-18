import React, { MouseEventHandler } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItemPost, RootState, toggleLikePost } from '../../store';
import { LikeIcon } from '../Icons/LikeIcon';
import './card.css';

export interface ICard {
  id: number;
  descr: string;
  like: boolean;
}

export function Card({descr, like, id}: ICard) {
  const dispatch = useDispatch()

  const toggleLike = () => {
    dispatch(toggleLikePost(id))
  }

  const deleteItem = () => {
    dispatch(deleteItemPost(id))
  }

  return (
    <li className='card-item'>
      {descr} 
    
      <button className='card-close-btn' onClick={() => deleteItem()}></button>
      <button className='card-like-btn' onClick={() => toggleLike()}><LikeIcon like={like}/></button>
    </li>
  );
}
