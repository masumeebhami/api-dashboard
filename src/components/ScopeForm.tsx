import React, { useState } from 'react';

interface Endpoint {
  path: string;
  cost: number;
}

interface Scope {
  id: string;
  endpoints: Endpoint[];
}

interface ScopeFormProps {
  onSubmit: (newScope: Scope) => void;
}

const ScopeForm: React.FC<ScopeFormProps> = ({ onSubmit }) => {
  const [scopeId, setScopeId] = useState('');
  const [endpoints, setEndpoints] = useState<Endpoint[]>([{ path: '', cost: 0 }]);

  const handleEndpointChange = (index: number, field: keyof Endpoint, value: string | number) => {
    const newEndpoints = [...endpoints];
    newEndpoints[index][field] = field === 'cost' ? parseFloat(value as string) || 0 : value;
    setEndpoints(newEndpoints);
  };

  const addEndpoint = () => {
    setEndpoints([...endpoints, { path: '', cost: 0 }]);
  };

  const removeEndpoint = (index: number) => {
    const newEndpoints = endpoints.filter((_, i) => i !== index);
    setEndpoints(newEndpoints);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newScope: Scope = {
      id: scopeId,
      endpoints: endpoints.filter(endpoint => endpoint.path !== ''), // Filter out empty endpoints
    };
    onSubmit(newScope);
    // Reset form
    setScopeId('');
    setEndpoints([{ path: '', cost: 0 }]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="scopeId">Scope ID:</label>
        <input
          type="text"
          id="scopeId"
          value={scopeId}
          onChange={(e) => setScopeId(e.target.value)}
          required
        />
      </div>
      <div>
        <h3>Endpoints:</h3>
        {endpoints.map((endpoint, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <div>
              <label htmlFor={`endpointPath-${index}`}>Path:</label>
              <input
                type="text"
                id={`endpointPath-${index}`}
                value={endpoint.path}
                onChange={(e) => handleEndpointChange(index, 'path', e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor={`endpointCost-${index}`}>Cost:</label>
              <input
                type="number"
                id={`endpointCost-${index}`}
                value={endpoint.cost}
                onChange={(e) => handleEndpointChange(index, 'cost', parseFloat(e.target.value) || 0)}
                required
              />
            </div>
            {endpoints.length > 1 && (
              <button type="button" onClick={() => removeEndpoint(index)}>
                Remove Endpoint
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addEndpoint}>
          Add Endpoint
        </button>
      </div>
      <button type="submit">Create Scope</button>
    </form>
  );
};

export default ScopeForm;