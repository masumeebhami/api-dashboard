import React from 'react';

const ApiKeyForm: React.FC = () => {
  // Basic state management for the input value
  // Placeholder for handling form submission
  return (
    <form>
      <h3>Create New API Key</h3>
      <input
        type="text"
        // Basic state management for the input value
        placeholder="Enter new API key"
        // Placeholder for handling the input change
      />
      <button type="submit">Create API Key</button>
    </form>
  );
};

export default ApiKeyForm;