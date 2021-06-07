import React, {useState, useEffect} from 'react';

function App() {

    const [data, setData] = useState([])

    
    useEffect( () => {
        fetch('http://localhost:3001/latest')
        .then(res =>  res.json())
        .then( data => setData(data))
    }, [data])

    const handleGet = async() => {
        await fetch(`http://localhost:3001/latest`, {
            method: 'get'
        })
        
    }

    const handleDelete = (id) => {
        fetch(`http://localhost:3001/messages/${id}`, {
            method: 'delete'
        })
    }
    

    return (
        <div>
            {data && data.map((msg, i)=> (
                <h1 key={i}>{msg.text}<button onClick={() => {handleDelete(msg.id)}}>X</button></h1>
            ))}
            <button onClick={handleGet}>See latest</button>
        </div>
    );
};
export default App;