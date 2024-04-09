import React, { useState } from 'react';
import '../styles/Profile.css';

const CreateArticles = () => {
    const [heading, setHeading] = useState("");
    const [content, setContent] = useState("");

    const handleCreate = async (e) => {
        e.preventDefault();

        if(heading != "" && content != "") {

            const data = {
                heading: heading,
                content: content,
            }

            const url = "http://127.0.0.1:5000/create_article"
    
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
    
            const response = await fetch(url, options)
            if (response.status !== 201 && response.status !== 200) {
                const message = await response.json()
                alert(message.message)
            } else {
                alert("Successfully uploaded article")
                setHeading("")
                setContent("")
            }


        } else {
            alert("Fill all data");
        }
    }

  return (
    <div className='create-articles'>
        <h1>Create Article</h1>

        <form action="">
{/*             <div>
                <p>Choose an image for article</p>
                <input type="file" name='image' onChange={handleImageChange}/>
            </div> */}

            <div>
                <p>Add article heading</p>
                <input type="text" name='heading' value={heading} onChange={(e) => {setHeading(e.target.value)}}/>
            </div>

            <div>
                <p>Content (5000 characters left)</p>
                <textarea name="" id="" cols="120" rows="10" value={content} onChange={(e) => {setContent(e.target.value)}}></textarea>
            </div>

            <button onClick={handleCreate}>Post</button>
        </form>
    </div>
  )
}
export default CreateArticles