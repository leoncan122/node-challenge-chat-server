import React, {useState, useEffect} from 'react';

function App() {

    const [data, setData] = useState(null)
    const [update, setUpdate] = useState(false)
    
    useEffect( () => {
        fetch('http://localhost:3001/latest')
        .then(res =>  res.json())
        .then( data => setData(data))
    }, [update])

    const handleDelete = (id) => {
        
        fetch(`http://localhost:3001/messages/${id}`, {
            method: 'DELETE'
        })
    }

    return (
        <div>
            {data && data.map(msg => (
                <h1>{msg.text}<button onclick={handleDelete(msg.id)}>X</button></h1>
            ))}
        </div>
    );
};
export default App;