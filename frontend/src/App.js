import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [nodes, setNodes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/nodes')
            .then((response) => setNodes(response.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <h1>GraphDB Nodes</h1>
            <ul>
                {nodes.map((node, index) => (
                    <li key={index}>{JSON.stringify(node)}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;
