import React from 'react';

interface Endpoint {
  path: string;
  cost: number;
}

interface Scope {
  id: string;
  endpoints: Endpoint[];
}

interface ScopeListProps {
  scopes: Scope[];
}

const ScopeList: React.FC<ScopeListProps> = ({ scopes }) => {
  return (
    <ul>
      {scopes.map((scope) => (
        <li key={scope.id}>
          <strong>{scope.id}</strong>
          <ul style={{ marginLeft: '20px' }}> {/* Added some basic inline style for indentation */}
            {scope.endpoints.map((endpoint) => (
              <li key={endpoint.path}>
                {endpoint.path} - Cost: {endpoint.cost}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default ScopeList;