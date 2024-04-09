import React, { useState, useEffect } from 'react';
import "../styles/Articles.css";
import Nav from '../components/Nav';
import { useParams } from 'react-router-dom';

const ArticlePage = () => {
    const { id } = useParams();

    const [articles, setArticles] = useState([]);
    const [currentArticle, setCurrentArticle] = useState();

    useEffect(()=>{
      fetchArticles()
    }, [])

    useEffect(() => {
        setData()
    }, [articles])
  
    const fetchArticles = async () => {
        const response = await fetch("http://127.0.0.1:5000/articles")
        const data = await response.json()
        setArticles(data.articles)
    }

    const setData = () => {
        for(let i = 0; i < articles.length; i++) {
            if(articles[i].id == id) {
                setCurrentArticle(articles[i])
            }
        }
    }


  return (
    <div className='article-page'>
        <Nav />

        <img src="https://images.ctfassets.net/0gqf8nju6pz6/7aQjGv1XuRdPdvJtK2Oiua/4351ad322c159e51e4bc349dff98bea9/difference-bewteen-lease-rent-hero.jpeg" alt="article cover image" />

        <div>
            <h1>{currentArticle ? currentArticle.heading: ""}</h1>

            <p>{currentArticle ? currentArticle.content : ""}</p>
        </div>
    </div>
  )
}

export default ArticlePage