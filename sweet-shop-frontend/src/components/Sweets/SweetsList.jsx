import React, { useState, useEffect } from 'react';
import { Plus, Candy as CandyIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { showToast } from '../Common/Toast';
import SweetCard from './SweetCard';
import SearchFilter from './SearchFilter';
import AddSweetModal from './AddSweetModal';
import EditSweetModal from './EditSweetModal';
import Loading from '../Common/Loading';

const SweetsList = () => {
  const { user, isAdmin } = useAuth();
  const [sweets, setSweets] = useState([]);
  const [filteredSweets, setFilteredSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSweet, setSelectedSweet] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchSweets();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [sweets, searchTerm, filters]);

  const fetchSweets = async () => {
    try {
      const response = await api.get('/sweets');
      setSweets(response.data.sweets);
      setFilteredSweets(response.data.sweets);
    } catch (error) {
      showToast.error('Failed to fetch sweets');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...sweets];

    if (searchTerm) {
      result = result.filter((sweet) =>
        sweet.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.category) {
      result = result.filter((sweet) => sweet.category === filters.category);
    }

    if (filters.minPrice) {
      result = result.filter((sweet) => sweet.price >= parseFloat(filters.minPrice));
    }

    if (filters.maxPrice) {
      result = result.filter((sweet) => sweet.price <= parseFloat(filters.maxPrice));
    }

    setFilteredSweets(result);
  };

  const handleAddSweet = async (sweetData) => {
    try {
      await api.post('/sweets', sweetData);
      showToast.success('Sweet added successfully!');
      fetchSweets();
    } catch (error) {
      showToast.error(error.response?.data?.message || 'Failed to add sweet');
      throw error;
    }
  };

  const handleUpdateSweet = async (id, sweetData) => {
    try {
      await api.put(`/sweets/${id}`, sweetData);
      showToast.success('Sweet updated successfully!');
      fetchSweets();
    } catch (error) {
      showToast.error(error.response?.data?.message || 'Failed to update sweet');
      throw error;
    }
  };

  const handleDeleteSweet = async (id) => {
    if (!window.confirm('Are you sure you want to delete this sweet?')) return;

    try {
      await api.delete(`/sweets/${id}`);
      showToast.success('Sweet deleted successfully!');
      fetchSweets();
    } catch (error) {
      showToast.error(error.response?.data?.message || 'Failed to delete sweet');
    }
  };

  const handlePurchase = async (sweet) => {
    const quantity = window.prompt(`How many ${sweet.name} would you like to purchase? (Max: ${sweet.quantity})`);
    
    if (!quantity || quantity <= 0) return;
    if (quantity > sweet.quantity) {
      showToast.error('Insufficient stock available');
      return;
    }

    try {
      const response = await api.post(`/sweets/${sweet._id}/purchase`, {
        quantity: parseInt(quantity),
      });
      showToast.success(`Successfully purchased ${quantity} ${sweet.name}! Total: $${response.data.totalCost}`);
      fetchSweets();
    } catch (error) {
      showToast.error(error.response?.data?.message || 'Purchase failed');
    }
  };

  const handleRestock = async (id, quantity) => {
    try {
      await api.post(`/sweets/${id}/restock`, { quantity });
      showToast.success('Sweet restocked successfully!');
      fetchSweets();
    } catch (error) {
      showToast.error(error.response?.data?.message || 'Failed to restock sweet');
      throw error;
    }
  };

  const handleEdit = (sweet) => {
    setSelectedSweet(sweet);
    setShowEditModal(true);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1>Sweet Shop Dashboard</h1>
              <p>
                Welcome back, {user?.username}! 
                {isAdmin() ? ' Manage your sweet inventory.' : ' Browse and purchase delicious sweets.'}
              </p>
            </div>
            {isAdmin() && (
              <button
                onClick={() => setShowAddModal(true)}
                className="btn btn-primary"
              >
                <Plus size={20} />
                Add Sweet
              </button>
            )}
          </div>
        </div>

        <SearchFilter
          onSearch={setSearchTerm}
          onFilter={setFilters}
        />

        {filteredSweets.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <CandyIcon size={64} color="#d1d5db" />
            </div>
            <h3>No sweets found</h3>
            <p>
              {searchTerm || Object.values(filters).some(v => v)
                ? 'Try adjusting your search or filters'
                : isAdmin()
                ? 'Get started by adding your first sweet!'
                : 'Check back soon for new sweets!'}
            </p>
            {isAdmin() && !searchTerm && (
              <button
                onClick={() => setShowAddModal(true)}
                className="btn btn-primary"
              >
                <Plus size={20} />
                Add Your First Sweet
              </button>
            )}
          </div>
        ) : (
          <div className="sweets-grid">
            {filteredSweets.map((sweet) => (
              <SweetCard
                key={sweet._id}
                sweet={sweet}
                onPurchase={handlePurchase}
                onEdit={handleEdit}
                onDelete={handleDeleteSweet}
                isAdmin={isAdmin()}
              />
            ))}
          </div>
        )}
      </div>

      {showAddModal && (
        <AddSweetModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddSweet}
        />
      )}

      {showEditModal && selectedSweet && (
        <EditSweetModal
          sweet={selectedSweet}
          onClose={() => {
            setShowEditModal(false);
            setSelectedSweet(null);
          }}
          onUpdate={handleUpdateSweet}
          onRestock={handleRestock}
        />
      )}
    </div>
  );
};

export default SweetsList;