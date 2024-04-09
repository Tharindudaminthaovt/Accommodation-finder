import React, { useEffect, useState } from 'react';
import '../styles/Profile.css';
import { Link } from 'react-router-dom';

const CurrentArticles = () => {
    const [articles, setArticles] = useState([]);

    useEffect(()=>{
        fetchArticles()
    }, [])

    const fetchArticles = async () => {
        const response = await fetch("http://127.0.0.1:5000/articles")
        const data = await response.json()
        setArticles(data.articles)
    }

    const handleDelete = async (id) => {
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch(`http://127.0.0.1:5000/delete_article/${id.id}`, options)
            if (response.status === 200){
                fetchArticles()
            } else {
                console.error("Could not delete")
            }
        } catch (error) {
            alert(error)
        }
    }

    const handleForward = (id) => {
        window.location.href = `/article/${id}`;
    }

  return (
    <div className='current-articles'>
        <h1>Current articles</h1>

        <div className='current-article-items'>
            {articles.length != 0 ? 
                articles.map(item => {
                    return (<div className='current-article-item' key={item.id}>
                    <h2>{item.heading}</h2>
                    <p>{item.content.slice(0, 120) + " ..."}</p>
    
                    <div>
                        <button onClick={() => handleForward(item.id)}>Go to article page</button>
                        <button className='delete-article' onClick={() => handleDelete(item)}>Delete</button>
                    </div>
                </div>)
                })
                :
                <h1>No articles</h1>
            }

            

            
        </div>

    </div>
  )
}

export default CurrentArticles