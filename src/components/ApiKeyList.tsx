import React from 'react';

interface ApiKeyListProps {
  apiKeys: string[];
}

const ApiKeyList: React.FC<ApiKeyListProps> = ({ apiKeys }) => {
  return (
    <div className="api-key-list">
      <h3>API Keys</h3>
      <ul>
        {apiKeys.map((key) => (
          <li key={key}>{key}</li>
        ))}
      </ul>
    </div>
  );
};

export default ApiKeyList;