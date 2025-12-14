import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { SWEET_CATEGORIES } from '../../utils/constants';

const SearchFilter = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = {
      ...filters,
      [name]: value,
    };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: '',
      minPrice: '',
      maxPrice: '',
    };
    setFilters(clearedFilters);
    setSearchTerm('');
    onSearch('');
    onFilter(clearedFilters);
  };

  return (
    <div style={styles.container}>
      <div style={styles.searchBar}>
        <div style={styles.searchInput}>
          <Search size={20} color="#6b7280" />
          <input
            type="text"
            placeholder="Search sweets by name..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={styles.input}
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          style={{
            ...styles.filterBtn,
            background: showFilters ? 'linear-gradient(135deg, #ff6b9d, #e85a8a)' : 'white',
            color: showFilters ? 'white' : '#ff6b9d',
          }}
        >
          <Filter size={18} />
          Filters
        </button>
      </div>

      {showFilters && (
        <div style={styles.filterPanel}>
          <div style={styles.filterGrid}>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
              >
                <option value="">All Categories</option>
                {SWEET_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="minPrice">Min Price ($)</label>
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
            <div className="form-group">
              <label htmlFor="maxPrice">Max Price ($)</label>
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="100.00"
                min="0"
                step="0.01"
              />
            </div>
          </div>
          <button onClick={clearFilters} className="btn btn-outline">
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    background: 'white',
    padding: '20px',
    borderRadius: '20px',
    marginBottom: '30px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  },
  searchBar: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 16px',
    border: '2px solid #e5e7eb',
    borderRadius: '10px',
    background: '#f9fafb',
  },
  input: {
    flex: 1,
    border: 'none',
    background: 'transparent',
    fontSize: '14px',
    outline: 'none',
  },
  filterBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    border: '2px solid #ff6b9d',
    borderRadius: '10px',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  filterPanel: {
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '2px solid #e5e7eb',
  },
  filterGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
    marginBottom: '15px',
  },
};

export default SearchFilter;