import React, { useState } from 'react';
import useAdminApplications from '../hooks/useAdminApplications';

const AdminSearch = () => {
  const [searchType, setSearchType] = useState('email');
  const [searchValue, setSearchValue] = useState('');
  const [result, setResult] = useState(null);
  const { searchByEmail, searchByPhone, searchByPassport, loading } = useAdminApplications();

  const handleSearch = async () => {
    if (!searchValue.trim()) return;

    let data;
    switch (searchType) {
      case 'email':
        data = await searchByEmail(searchValue);
        break;
      case 'phone':
        data = await searchByPhone(searchValue);
        break;
      case 'passport':
        data = await searchByPassport(searchValue);
        break;
      default:
        return;
    }
    setResult(data);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">🔍 Search Application</h2>
      
      <div className="flex gap-4 flex-wrap">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="email">By Email</option>
          <option value="phone">By Phone</option>
          <option value="passport">By Passport</option>
        </select>

        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={`Enter ${searchType}...`}
          className="flex-1 p-2 border rounded"
        />

        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-[var(--secondary-Color)] text-white px-6 py-2 rounded hover:opacity-90"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {result && (
        <div className="mt-4 p-4 bg-gray-50 rounded">
          <h3 className="font-semibold">Result:</h3>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default AdminSearch;