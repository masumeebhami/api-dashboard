// pages/dashboard.tsx
import React, { useState } from 'react';

interface Endpoint {
  path: string;
  cost: number;
}

interface Scope {
  id: string;
  endpoints: Endpoint[];
}

interface ApiKey {
  id: string;
  key: string;
  scopes: Scope[];
}

const Dashboard: React.FC = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [scopes, setScopes] = useState<Scope[]>([]);
  const [newApiKey, setNewApiKey] = useState('');
  const [selectedScopes, setSelectedScopes] = useState<string[]>([]);
  const [newScopeId, setNewScopeId] = useState('');
  const [newScopeEndpoints, setNewScopeEndpoints] = useState<Endpoint[]>([]);
  const [editingApiKey, setEditingApiKey] = useState<ApiKey | null>(null);
  const [editingScope, setEditingScope] = useState<Scope | null>(null);

  const handleCreateApiKey = () => {
    const newKey: ApiKey = {
      id: `apikey-${Date.now()}`,
      key: newApiKey,
      scopes: scopes.filter(scope => selectedScopes.includes(scope.id)),
    };
    setApiKeys([...apiKeys, newKey]);
    setNewApiKey('');
    setSelectedScopes([]);
  };

  const handleUpdateApiKey = () => {
    if (!editingApiKey) return;
    setApiKeys(apiKeys.map(key =>
      key.id === editingApiKey.id ? { ...key, key: newApiKey, scopes: scopes.filter(scope => selectedScopes.includes(scope.id)) } : key
    ));
    setEditingApiKey(null);
    setNewApiKey('');
    setSelectedScopes([]);
  };

  const handleDeleteApiKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
  };

  const handleCreateScope = () => {
    const newScope: Scope = {
      id: newScopeId,
      endpoints: newScopeEndpoints,
    };
    setScopes([...scopes, newScope]);
    setNewScopeId('');
    setNewScopeEndpoints([]);
  };

  const handleUpdateScope = () => {
    if (!editingScope) return;
    setScopes(scopes.map(scope =>
      scope.id === editingScope.id ? { ...scope, id: newScopeId, endpoints: newScopeEndpoints } : scope
    ));
    setEditingScope(null);
    setNewScopeId('');
    setNewScopeEndpoints([]);
  };

  const handleDeleteScope = (id: string) => {
    setScopes(scopes.filter(scope => scope.id !== id));
  };

  const handleAddEndpointToNewScope = () => {
    setNewScopeEndpoints([...newScopeEndpoints, { path: '', cost: 0 }]);
  };

  const handleUpdateNewScopeEndpoint = (index: number, field: keyof Endpoint, value: string | number) => {
    const updatedEndpoints = [...newScopeEndpoints];
    updatedEndpoints[index][field] = value;
    setNewScopeEndpoints(updatedEndpoints);
  };

  const handleRemoveEndpointFromNewScope = (index: number) => {
    setNewScopeEndpoints(newScopeEndpoints.filter((_, i) => i !== index));
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">API Key and Scope Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">API Keys</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="New API Key"
              value={newApiKey}
              onChange={(e) => setNewApiKey(e.target.value)}
              className="border p-2 mr-2"
            />
            <select
              multiple
              value={selectedScopes}
              onChange={(e) => setSelectedScopes(Array.from(e.target.selectedOptions, option => option.value))}
              className="border p-2 mr-2"
            >
              {scopes.map(scope => (
                <option key={scope.id} value={scope.id}>
                  {scope.id}
                </option>
              ))}
            </select>
            {editingApiKey ? (
              <button onClick={handleUpdateApiKey} className="bg-blue-500 text-white p-2 rounded">
                Update API Key
              </button>
            ) : (
              <button onClick={handleCreateApiKey} className="bg-green-500 text-white p-2 rounded">
                Create API Key
              </button>
            )}
          </div>

          <ul className="list-disc pl-5">
            {apiKeys.map(apiKey => (
              <li key={apiKey.id} className="mb-2">
                <strong>ID:</strong> {apiKey.id}, <strong>Key:</strong> {apiKey.key}, <strong>Scopes:</strong> {apiKey.scopes.map(s => s.id).join(', ')}
                <button onClick={() => { setEditingApiKey(apiKey); setNewApiKey(apiKey.key); setSelectedScopes(apiKey.scopes.map(s => s.id)); }} className="ml-2 bg-yellow-500 text-white p-1 rounded text-sm">Edit</button>
                <button onClick={() => handleDeleteApiKey(apiKey.id)} className="ml-2 bg-red-500 text-white p-1 rounded text-sm">Delete</button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Scopes</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="New Scope ID"
              value={newScopeId}
              onChange={(e) => setNewScopeId(e.target.value)}
              className="border p-2 mr-2"
            />
            <div>
              <h3 className="font-medium mt-2 mb-1">Endpoints:</h3>
              {newScopeEndpoints.map((endpoint, index) => (
                <div key={index} className="flex items-center mb-1">
                  <input
                    type="text"
                    placeholder="Path"
                    value={endpoint.path}
                    onChange={(e) => handleUpdateNewScopeEndpoint(index, 'path', e.target.value)}
                    className="border p-1 mr-2 text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Cost"
                    value={endpoint.cost}
                    onChange={(e) => handleUpdateNewScopeEndpoint(index, 'cost', parseFloat(e.target.value))}
                    className="border p-1 mr-2 text-sm w-20"
                  />
                  <button onClick={() => handleRemoveEndpointFromNewScope(index)} className="bg-red-500 text-white p-1 rounded text-sm">Remove</button>
                </div>
              ))}
              <button onClick={handleAddEndpointToNewScope} className="bg-blue-500 text-white p-1 rounded text-sm mt-1">Add Endpoint</button>
            </div>
            {editingScope ? (
              <button onClick={handleUpdateScope} className="bg-blue-500 text-white p-2 rounded mt-2">
                Update Scope
              </button>
            ) : (
              <button onClick={handleCreateScope} className="bg-green-500 text-white p-2 rounded mt-2">
                Create Scope
              </button>
            )}
          </div>

          <ul className="list-disc pl-5">
            {scopes.map(scope => (
              <li key={scope.id} className="mb-2">
                <strong>ID:</strong> {scope.id}
                <div>
                  <strong>Endpoints:</strong>
                  <ul className="list-disc pl-5 text-sm">
                    {scope.endpoints.map((endpoint, index) => (
                      <li key={index}>Path: {endpoint.path}, Cost: {endpoint.cost}</li>
                    ))}
                  </ul>
                </div>
                <button onClick={() => { setEditingScope(scope); setNewScopeId(scope.id); setNewScopeEndpoints(scope.endpoints); }} className="ml-2 bg-yellow-500 text-white p-1 rounded text-sm">Edit</button>
                <button onClick={() => handleDeleteScope(scope.id)} className="ml-2 bg-red-500 text-white p-1 rounded text-sm">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;