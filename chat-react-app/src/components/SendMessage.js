import React, {useState} from 'react';

function SendMessage (props) {
    const [data, setData] = useState({
        text: "",
        from: ""
    });
    const [isInvalid, setIsInvalid] = useState(false)

    const handleChange = (e) => {
        let value = e.target.value;
        setData({
            ...data,
            [e.target.name] : value})
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsInvalid(Object.values(data).some(value => !value.length));

        if (isInvalid === false) {
            props.post();
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input name="from" type="text" className="from" placeholder="from" onChange={handleChange}></input>
                <input name="text" type="text" className="text" placeholder="message" onChange={handleChange}></input>
                <button>Send</button>
            </form>
        </>
    );
};

export default SendMessage;