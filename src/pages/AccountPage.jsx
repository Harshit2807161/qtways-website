import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  Package,
  MapPin,
  LogOut,
  ChevronRight,
  ShoppingBag,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  Phone,
  Edit2,
  Plus,
} from 'lucide-react';
import { cn, formatPrice } from '../utils';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui';

// Tab definitions
const TABS = [
  { id: 'orders', label: 'My Orders', icon: Package },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'profile', label: 'Profile', icon: User },
];

// Order status config
const ORDER_STATUS = {
  confirmed: { label: 'Confirmed', icon: CheckCircle, color: 'text-sage-600 bg-sage-50' },
  processing: { label: 'Processing', icon: Clock, color: 'text-gold-600 bg-gold-50' },
  shipped: { label: 'Shipped', icon: Truck, color: 'text-blue-600 bg-blue-50' },
  delivered: { label: 'Delivered', icon: CheckCircle, color: 'text-sage-600 bg-sage-50' },
  cancelled: { label: 'Cancelled', icon: XCircle, color: 'text-coral-600 bg-coral-50' },
};

export const AccountPage = () => {
  const { tab = 'orders' } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);

  // Load orders from localStorage
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('qtways_orders') || '[]');
    setOrders(storedOrders);

    const storedAddresses = JSON.parse(localStorage.getItem('qtways_addresses') || '[]');
    setAddresses(storedAddresses);
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Handle logout
  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="bg-cream-50 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gold-500 border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="bg-cream-50 min-h-screen">
      <div className="container-custom section-padding">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 mb-8 lg:mb-0">
            <div className="bg-white rounded-lg shadow-soft p-6">
              {/* User Info */}
              <div className="text-center pb-6 border-b border-cream-200">
                <div className="w-16 h-16 mx-auto mb-3 bg-gold-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-gold-600" />
                </div>
                <p className="font-medium text-charcoal-900">
                  {user?.name || 'QTWAYS Customer'}
                </p>
                <p className="text-sm text-charcoal-500">
                  +91 {user?.phone}
                </p>
              </div>

              {/* Navigation */}
              <nav className="py-4 space-y-1">
                {TABS.map((t) => {
                  const Icon = t.icon;
                  const isActive = tab === t.id;
                  return (
                    <Link
                      key={t.id}
                      to={`/account/${t.id}`}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                        isActive
                          ? 'bg-gold-50 text-gold-700'
                          : 'text-charcoal-600 hover:bg-cream-50'
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{t.label}</span>
                      {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                    </Link>
                  );
                })}
              </nav>

              {/* Logout */}
              <div className="pt-4 border-t border-cream-200">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 w-full text-coral-600 hover:bg-coral-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Orders Tab */}
            {tab === 'orders' && (
              <OrdersTab orders={orders} />
            )}

            {/* Addresses Tab */}
            {tab === 'addresses' && (
              <AddressesTab addresses={addresses} setAddresses={setAddresses} />
            )}

            {/* Profile Tab */}
            {tab === 'profile' && (
              <ProfileTab user={user} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Orders Tab Component
const OrdersTab = ({ orders }) => {
  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-soft p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-cream-100 rounded-full flex items-center justify-center">
          <ShoppingBag className="w-8 h-8 text-charcoal-300" />
        </div>
        <h2 className="font-display text-xl text-charcoal-900 mb-2">
          No orders yet
        </h2>
        <p className="text-charcoal-600 mb-6">
          Start shopping to see your orders here.
        </p>
        <Link to="/shop">
          <Button>Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="font-display text-2xl text-charcoal-900 mb-6">
        My Orders
      </h1>

      {orders.map((order) => {
        const status = ORDER_STATUS[order.status] || ORDER_STATUS.confirmed;
        const StatusIcon = status.icon;

        return (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-soft overflow-hidden"
          >
            {/* Order Header */}
            <div className="px-6 py-4 border-b border-cream-200 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-charcoal-500">Order ID</p>
                <p className="font-mono font-medium text-charcoal-900">{order.id}</p>
              </div>
              <div>
                <p className="text-sm text-charcoal-500">Date</p>
                <p className="text-charcoal-900">
                  {new Date(order.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-charcoal-500">Total</p>
                <p className="font-medium text-charcoal-900">{formatPrice(order.total)}</p>
              </div>
              <div className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium',
                status.color
              )}>
                <StatusIcon className="w-4 h-4" />
                {status.label}
              </div>
            </div>

            {/* Order Items */}
            <div className="p-6">
              <div className="flex flex-wrap gap-4">
                {order.items.slice(0, 4).map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <img
                      src={item.image || '/images/placeholder-product.jpg'}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) => {
                        e.target.src = '/images/placeholder-product.jpg';
                      }}
                    />
                    <div>
                      <p className="text-sm font-medium text-charcoal-900 line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-xs text-charcoal-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
                {order.items.length > 4 && (
                  <div className="flex items-center text-sm text-charcoal-500">
                    +{order.items.length - 4} more
                  </div>
                )}
              </div>

              {/* View Details Link */}
              <div className="mt-4 pt-4 border-t border-cream-200">
                <Link
                  to={`/order-confirmation/${order.id}`}
                  className="text-sm text-gold-600 hover:text-gold-700 font-medium flex items-center gap-1"
                >
                  View Order Details
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// Addresses Tab Component
const AddressesTab = ({ addresses, setAddresses }) => {
  const handleDeleteAddress = (index) => {
    const updated = addresses.filter((_, i) => i !== index);
    setAddresses(updated);
    localStorage.setItem('qtways_addresses', JSON.stringify(updated));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl text-charcoal-900">
          Saved Addresses
        </h1>
        <Button
          variant="secondary"
          size="sm"
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add Address
        </Button>
      </div>

      {addresses.length === 0 ? (
        <div className="bg-white rounded-lg shadow-soft p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-cream-100 rounded-full flex items-center justify-center">
            <MapPin className="w-8 h-8 text-charcoal-300" />
          </div>
          <h2 className="font-display text-xl text-charcoal-900 mb-2">
            No saved addresses
          </h2>
          <p className="text-charcoal-600 mb-6">
            Add an address to speed up your checkout.
          </p>
          <Button leftIcon={<Plus className="w-4 h-4" />}>
            Add Address
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {addresses.map((address, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-soft p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <p className="font-medium text-charcoal-900">{address.fullName}</p>
                <div className="flex gap-2">
                  <button className="p-1.5 hover:bg-cream-100 rounded transition-colors">
                    <Edit2 className="w-4 h-4 text-charcoal-500" />
                  </button>
                </div>
              </div>
              <p className="text-charcoal-600 text-sm">
                {address.addressLine1}<br />
                {address.addressLine2 && <>{address.addressLine2}<br /></>}
                {address.city}, {address.state} - {address.pincode}
              </p>
              <p className="text-charcoal-500 text-sm mt-2 flex items-center gap-1">
                <Phone className="w-3 h-3" />
                +91 {address.phone}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Profile Tab Component
const ProfileTab = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement profile update
    alert('Profile update coming soon!');
  };

  return (
    <div>
      <h1 className="font-display text-2xl text-charcoal-900 mb-6">
        Profile Settings
      </h1>

      <div className="bg-white rounded-lg shadow-soft p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-charcoal-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-cream-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-cream-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal-700 mb-1">
              Phone Number
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 border border-r-0 border-cream-200 rounded-l-lg bg-cream-50 text-charcoal-500 text-sm">
                +91
              </span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                disabled
                className="flex-1 px-4 py-2.5 border border-cream-200 rounded-r-lg bg-cream-50 text-charcoal-500 cursor-not-allowed"
              />
            </div>
            <p className="text-xs text-charcoal-500 mt-1">
              Phone number cannot be changed
            </p>
          </div>

          <div className="pt-4">
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountPage;
