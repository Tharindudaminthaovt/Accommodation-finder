import React from 'react';
import '../styles/Articles.css';

const ArticleItem = ({heading, content, handleClick}) => {
  return (
    <div className='article-item' onClick={handleClick}>
        <img src="https://images.ctfassets.net/0gqf8nju6pz6/7aQjGv1XuRdPdvJtK2Oiua/4351ad322c159e51e4bc349dff98bea9/difference-bewteen-lease-rent-hero.jpeg" alt="article cover image" />

        <div className='article-item-details'>
            <h2>{heading}</h2>
            <p>{content}</p>
        </div>
    </div>
  )
}

export default ArticleItem