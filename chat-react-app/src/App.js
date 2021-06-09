import React, {useState, useEffect} from 'react';
import SendMessage from './components/SendMessage'

function App() {

    const [data, setData] = useState([])

    
    useEffect( () => {
        fetch('http://localhost:3001/latest')
        .then(res =>  res.json())
        .then( data => setData(data))
    }, [data])

    const handleGet =  () => {
        const x = { method: 'get'}

        fetch(`http://localhost:3001/latest`, x)
        .then( res => res.json())
        .then(data => setData(data))
    }

    const handleDelete = (id) => {
        fetch(`http://localhost:3001/messages/${id}`, {
            method: 'delete'
        })
    }
    const handlePost = (data) => {
        fetch(`http://localhost:3001/messages`, {
            method: 'post',
            body: JSON.stringify(data)
        })
    }

    return (
        <div>
            {data && data.map((msg, i)=> (
                <h1 key={i}>{msg.text}<button onClick={() => {handleDelete(msg.id)}}>X</button></h1>
            ))}
            <button onClick={handleGet}>See latest</button>
            <SendMessage post={handlePost}/>
        </div>
    );
};
export default App;