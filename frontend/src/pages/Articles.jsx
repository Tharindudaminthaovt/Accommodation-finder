import React, {useEffect, useState} from 'react';
import '../styles/Articles.css';
import Nav from '../components/Nav'
import ArticleItem from '../components/ArticleItem';

const Articles = () => {

  const [articles, setArticles] = useState([]);

  useEffect(()=>{
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
      const response = await fetch("http://127.0.0.1:5000/articles")
      const data = await response.json()
      setArticles(data.articles)
  }

  const directToMain = (id) => {
    window.location.href = `/article/${id}`;
  }


  return (
    <div>
        <Nav/>

        <div className='article-items'>

          {articles.map(item => {
            return <ArticleItem 
              key={item.id}
              heading={item.heading}
              content={item.content.slice(0, 300) + " ... see more"}
              handleClick={() => directToMain(item.id)}
            />
          })}
          
        </div>
    </div>
  )
}

export default Articles