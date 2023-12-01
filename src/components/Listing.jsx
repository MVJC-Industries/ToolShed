
import React from 'react';

const Listing = ({ searchResults }) => {
  return (
    <div className="listing">
      <h2>Search Results</h2>
      <ul>
        {searchResults.map(tool => (
          <li key={tool.id}>
            <h3>{tool.tool_title}</h3>
            <p>{tool.description}</p>
            <p>Price: {tool.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Listing;