import React, { useState } from 'react';
import {
  X,
  Lock,
  Unlock,
  ShieldCheck,
  TrendingUp,
  Package,
  Clock,
  Truck,
  CheckCircle2,
  AlertCircle,
  Download,
  Search,
  Plus,
  RefreshCw,
  LogOut,
  MapPin,
  Mail,
  User,
  CreditCard,
  Banknote,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useOrders, Order, OrderStatus } from '../context/OrdersContext';
import { PRODUCTS } from '../data/products';

export const OwnerPortalModal: React.FC = () => {
  const {
    orders,
    isOwnerAuthenticated,
    isOwnerModalOpen,
    setIsOwnerModalOpen,
    loginOwner,
    logoutOwner,
    updateOrderStatus,
    deleteOrder,
    resetDemoOrders,
    addOrder,
    stats
  } = useOrders();

  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'dispatched' | 'delivered' | 'cod'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  if (!isOwnerModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginOwner(pinInput);
    if (success) {
      setPinError(false);
      setPinInput('');
    } else {
      setPinError(true);
    }
  };

  const handleQuickOwnerLogin = () => {
    loginOwner('x2islam19@gmail.com');
  };

  // Export orders to CSV for courier shipping in Cairo
  const handleExportCSV = () => {
    const headers = ['Order ID', 'Date', 'Customer Name', 'Email', 'Delivery Address', 'City', 'Payment Method', 'Items', 'Total (EGP)', 'Status'];
    const rows = orders.map(o => [
      o.id,
      new Date(o.createdAt).toLocaleString(),
      `"${o.customerName}"`,
      `"${o.customerEmail}"`,
      `"${o.deliveryAddress}"`,
      o.city,
      o.paymentMethod.toUpperCase(),
      `"${o.items.map(i => `${i.quantity}x ${i.name} (${i.size})`).join('; ')}"`,
      o.totalEGP,
      o.status.toUpperCase()
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SIMPLE_Atelier_Orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Quick simulation tool to test order receiving
  const handleSimulateOrder = () => {
    const randomProduct = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
    const cairoZones = [
      'Zamalek, 26th July St, Apt 5',
      'Maadi, Degla St 218, Villa 12',
      'New Cairo, Golden Square, Phase 2',
      'Heliopolis, Baghdad St, Bldg 4',
      '6th of October City, Palm Hills'
    ];
    const customerNames = ['Ahmed Tarek', 'Layla Hassan', 'Mostafa Radwan', 'Farida Zaki', 'Karim El-Ganzoury'];
    const randomIndex = Math.floor(Math.random() * customerNames.length);

    addOrder({
      customerName: customerNames[randomIndex],
      customerEmail: `${customerNames[randomIndex].toLowerCase().replace(' ', '.')}@gmail.com`,
      deliveryAddress: cairoZones[randomIndex],
      city: 'Cairo',
      paymentMethod: Math.random() > 0.4 ? 'cod' : 'card',
      items: [
        {
          productId: randomProduct.id,
          name: randomProduct.name,
          color: randomProduct.colorways[0]?.name || 'Standard',
          size: ['M', 'L', 'XL'][Math.floor(Math.random() * 3)],
          quantity: 1,
          priceUSD: randomProduct.priceUSD,
          priceEGP: Math.round(randomProduct.priceUSD * 49),
          image: randomProduct.image
        }
      ],
      totalUSD: randomProduct.priceUSD,
      totalEGP: Math.round(randomProduct.priceUSD * 49),
      courierNotes: 'Quick test order generated from Owner Panel'
    });
  };

  // Filter orders
  const filteredOrders = orders.filter(o => {
    // Tab filter
    if (activeTab === 'pending' && !(o.status === 'pending' || o.status === 'processing')) return false;
    if (activeTab === 'dispatched' && o.status !== 'dispatched') return false;
    if (activeTab === 'delivered' && o.status !== 'delivered') return false;
    if (activeTab === 'cod' && o.paymentMethod !== 'cod') return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = o.customerName.toLowerCase().includes(q);
      const matchEmail = o.customerEmail.toLowerCase().includes(q);
      const matchId = o.id.toLowerCase().includes(q);
      const matchAddr = o.deliveryAddress.toLowerCase().includes(q);
      const matchItem = o.items.some(i => i.name.toLowerCase().includes(q));
      return matchName || matchEmail || matchId || matchAddr || matchItem;
    }

    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* AUTH SCREEN (if not logged in) */}
      {!isOwnerAuthenticated ? (
        <div className="relative w-full max-w-md bg-[#FAF9F5] border border-[#DDD8CD] shadow-2xl p-8 space-y-6 text-center">
          <button
            onClick={() => setIsOwnerModalOpen(false)}
            className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-black cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 mx-auto rounded-full bg-[#191919] text-white flex items-center justify-center shadow-md">
            <Lock className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500">
              Restricted Security Gate
            </div>
            <h2 className="text-2xl font-light tracking-tight text-neutral-900" style={{ fontFamily: 'var(--font-display)' }}>
              Owner Portal
            </h2>
            <p className="text-xs text-neutral-600 max-w-xs mx-auto">
              Sales, order manifest, and live revenue analytics reserved exclusively for the atelier owner.
            </p>
          </div>

          {/* Owner Identity Badge */}
          <div className="p-3 bg-white border border-[#E2DED5] text-left text-xs space-y-1">
            <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Authorized Account</div>
            <div className="font-mono text-neutral-900 font-medium flex items-center justify-between">
              <span>x2islam19@gmail.com</span>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Owner</span>
            </div>
          </div>

          {/* Quick Sign-In Option for Owner */}
          <button
            type="button"
            onClick={handleQuickOwnerLogin}
            className="w-full py-2.5 px-4 bg-[#191919] text-[#FAF9F5] text-xs uppercase tracking-widest font-medium hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Verify &amp; Unlock as Store Owner</span>
          </button>

          <div className="flex items-center gap-3 text-neutral-300">
            <div className="flex-1 h-px bg-neutral-200" />
            <span className="text-[11px] font-mono uppercase text-neutral-400">or enter PIN</span>
            <div className="flex-1 h-px bg-neutral-200" />
          </div>

          {/* Passcode Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-3">
            <div className="space-y-1 text-left">
              <input
                type="password"
                placeholder="Enter PIN (Default: 1925)"
                value={pinInput}
                onChange={e => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                className={`w-full p-2.5 text-center bg-white border text-neutral-900 text-sm font-mono tracking-widest focus:outline-none ${
                  pinError ? 'border-red-500 ring-1 ring-red-500' : 'border-[#DDD8CD] focus:border-black'
                }`}
                autoFocus
              />
              {pinError && (
                <p className="text-[11px] font-mono text-red-600 text-center">
                  Invalid PIN. Try 1925 or unlock with your owner email above.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 border border-[#DDD8CD] text-neutral-700 text-xs font-mono uppercase tracking-wider hover:bg-white hover:text-black transition-colors cursor-pointer"
            >
              Submit PIN
            </button>
          </form>

          <div className="text-[10px] font-mono text-neutral-400">
            SIMPLE Atelier Security · Cairo, Egypt
          </div>
        </div>
      ) : (

        /* AUTHENTICATED OWNER DASHBOARD */
        <div className="relative w-full max-w-6xl max-h-[92vh] bg-[#FAF9F5] border border-[#DDD8CD] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          
          {/* Top Bar Header */}
          <div className="px-6 py-4 bg-white border-b border-[#E6E2D8] flex items-center justify-between gap-4 shrink-0">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/simple_logo_cropped.jpg"
                alt="SIMPLE"
                className="h-6 w-auto object-contain"
              />
              <div className="h-4 w-px bg-neutral-300" />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base font-medium text-neutral-900 tracking-tight">
                    Owner Sales &amp; Orders Hub
                  </h1>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-neutral-900 text-white font-medium">
                    Owner Access
                  </span>
                </div>
                <div className="text-[11px] font-mono text-neutral-500">
                  x2islam19@gmail.com · Live Cairo Order Stream
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={handleSimulateOrder}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-[#DDD8CD] bg-[#FAF9F5] hover:bg-white text-xs font-mono text-neutral-700 hover:text-black transition-colors cursor-pointer"
                title="Add a test order to test fulfillment"
              >
                <Plus className="w-3.5 h-3.5 text-emerald-600" />
                <span>Simulate Order</span>
              </button>

              <button
                onClick={handleExportCSV}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#191919] hover:bg-neutral-800 text-white text-xs font-mono tracking-wider transition-colors cursor-pointer"
                title="Download spreadsheet for Cairo courier delivery"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export Courier Manifest</span>
                <span className="sm:hidden">Export</span>
              </button>

              <button
                onClick={logoutOwner}
                className="p-2 text-neutral-400 hover:text-red-700 hover:bg-neutral-100 rounded transition-colors cursor-pointer"
                title="Lock Session / Logout"
                aria-label="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsOwnerModalOpen(false)}
                className="p-2 text-neutral-400 hover:text-black hover:bg-neutral-100 rounded transition-colors cursor-pointer"
                title="Close"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Dashboard Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* 4 KPI Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Card 1: Total Sales */}
              <div className="p-4 bg-white border border-[#E6E2D8] shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-neutral-500 text-xs font-mono">
                  <span className="uppercase">Total Revenue</span>
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <div className="text-2xl font-light text-neutral-900 tracking-tight font-mono">
                    {stats.totalRevenueEGP.toLocaleString()} <span className="text-sm font-sans text-neutral-500">EGP</span>
                  </div>
                  <div className="text-[11px] font-mono text-neutral-400">
                    ≈ ${Math.round(stats.totalRevenueUSD).toLocaleString()} USD
                  </div>
                </div>
              </div>

              {/* Card 2: Total Orders */}
              <div className="p-4 bg-white border border-[#E6E2D8] shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-neutral-500 text-xs font-mono">
                  <span className="uppercase">Orders Received</span>
                  <Package className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-light text-neutral-900 tracking-tight font-mono">
                    {stats.totalOrdersCount}
                  </div>
                  <div className="text-[11px] font-mono text-emerald-700 font-medium">
                    {stats.pendingCount} pending fulfillment
                  </div>
                </div>
              </div>

              {/* Card 3: COD to Collect */}
              <div className="p-4 bg-white border border-[#E6E2D8] shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-neutral-500 text-xs font-mono">
                  <span className="uppercase">Cash on Delivery</span>
                  <Banknote className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <div className="text-2xl font-light text-neutral-900 tracking-tight font-mono">
                    {stats.codRevenueEGP.toLocaleString()} <span className="text-sm font-sans text-neutral-500">EGP</span>
                  </div>
                  <div className="text-[11px] font-mono text-neutral-400">
                    Prepaid Card: {stats.cardRevenueEGP.toLocaleString()} EGP
                  </div>
                </div>
              </div>

              {/* Card 4: Average Order Value */}
              <div className="p-4 bg-white border border-[#E6E2D8] shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-neutral-500 text-xs font-mono">
                  <span className="uppercase">Average Order</span>
                  <span className="text-[11px] font-mono text-neutral-400">AOV</span>
                </div>
                <div>
                  <div className="text-2xl font-light text-neutral-900 tracking-tight font-mono">
                    {stats.averageOrderValueEGP.toLocaleString()} <span className="text-sm font-sans text-neutral-500">EGP</span>
                  </div>
                  <div className="text-[11px] font-mono text-neutral-400">
                    Delivery in Cairo only
                  </div>
                </div>
              </div>

            </div>

            {/* Filter Tabs & Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-[#E6E2D8] pb-3">
              <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono uppercase tracking-wider pb-1 sm:pb-0">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 rounded-xs transition-colors cursor-pointer ${
                    activeTab === 'all' ? 'bg-[#191919] text-white' : 'bg-white text-neutral-600 hover:text-black border border-[#E2DED5]'
                  }`}
                >
                  All ({orders.length})
                </button>
                <button
                  onClick={() => setActiveTab('pending')}
                  className={`px-3 py-1.5 rounded-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'pending' ? 'bg-[#191919] text-white' : 'bg-white text-neutral-600 hover:text-black border border-[#E2DED5]'
                  }`}
                >
                  <span>Pending</span>
                  {stats.pendingCount > 0 && (
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('dispatched')}
                  className={`px-3 py-1.5 rounded-xs transition-colors cursor-pointer ${
                    activeTab === 'dispatched' ? 'bg-[#191919] text-white' : 'bg-white text-neutral-600 hover:text-black border border-[#E2DED5]'
                  }`}
                >
                  Dispatched ({stats.dispatchedCount})
                </button>
                <button
                  onClick={() => setActiveTab('delivered')}
                  className={`px-3 py-1.5 rounded-xs transition-colors cursor-pointer ${
                    activeTab === 'delivered' ? 'bg-[#191919] text-white' : 'bg-white text-neutral-600 hover:text-black border border-[#E2DED5]'
                  }`}
                >
                  Delivered ({stats.deliveredCount})
                </button>
                <button
                  onClick={() => setActiveTab('cod')}
                  className={`px-3 py-1.5 rounded-xs transition-colors cursor-pointer ${
                    activeTab === 'cod' ? 'bg-[#191919] text-white' : 'bg-white text-neutral-600 hover:text-black border border-[#E2DED5]'
                  }`}
                >
                  COD ({orders.filter(o => o.paymentMethod === 'cod').length})
                </button>
              </div>

              {/* Search Box */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search customer, ID, or zone..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-white border border-[#DDD8CD] text-xs font-mono text-neutral-900 focus:outline-none focus:border-black"
                />
              </div>
            </div>

            {/* Orders Feed */}
            {filteredOrders.length === 0 ? (
              <div className="p-12 text-center bg-white border border-[#E6E2D8] space-y-3">
                <Package className="w-10 h-10 mx-auto text-neutral-300" />
                <p className="text-sm font-mono text-neutral-500">No orders match the current filter.</p>
                <button
                  onClick={() => {
                    setActiveTab('all');
                    setSearchQuery('');
                  }}
                  className="text-xs font-mono text-neutral-900 underline cursor-pointer"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredOrders.map(order => (
                  <div
                    key={order.id}
                    className="p-5 bg-white border border-[#E6E2D8] hover:border-black transition-all space-y-4"
                  >
                    {/* Order Row Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-semibold text-neutral-900">
                          {order.id}
                        </span>
                        <span className="text-xs font-mono text-neutral-400">
                          {new Date(order.createdAt).toLocaleDateString()} at{' '}
                          {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        {/* Payment Pill */}
                        {order.paymentMethod === 'cod' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono bg-amber-50 text-amber-800 border border-amber-200">
                            <Banknote className="w-3.5 h-3.5" />
                            <span>COD: Collect {order.totalEGP.toLocaleString()} EGP</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200">
                            <CreditCard className="w-3.5 h-3.5" />
                            <span>Paid via Card</span>
                          </span>
                        )}

                        {/* Status Dropdown */}
                        <select
                          value={order.status}
                          onChange={e => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className={`text-xs font-mono uppercase tracking-wider px-2.5 py-1 border cursor-pointer font-medium ${
                            order.status === 'pending'
                              ? 'bg-amber-100 text-amber-900 border-amber-300'
                              : order.status === 'processing'
                              ? 'bg-blue-50 text-blue-800 border-blue-200'
                              : order.status === 'dispatched'
                              ? 'bg-purple-50 text-purple-800 border-purple-200'
                              : order.status === 'delivered'
                              ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                              : 'bg-neutral-100 text-neutral-600 border-neutral-300'
                          }`}
                        >
                          <option value="pending">Pending Review</option>
                          <option value="processing">Preparing Garments</option>
                          <option value="dispatched">Dispatched with Courier</option>
                          <option value="delivered">Delivered to Client</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    {/* Order Details Body */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                      
                      {/* Customer & Address */}
                      <div className="md:col-span-5 space-y-1.5 text-xs font-mono">
                        <div className="flex items-center gap-2 text-neutral-900 font-medium">
                          <User className="w-3.5 h-3.5 text-neutral-400" />
                          <span>{order.customerName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-600">
                          <Mail className="w-3.5 h-3.5 text-neutral-400" />
                          <span className="truncate">{order.customerEmail}</span>
                        </div>
                        <div className="flex items-start gap-2 text-neutral-700 pt-1">
                          <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                          <div>
                            <div>{order.deliveryAddress}</div>
                            <div className="text-[11px] text-neutral-400">{order.city}, Egypt</div>
                          </div>
                        </div>

                        {order.courierNotes && (
                          <div className="mt-2 text-[11px] p-2 bg-neutral-50 border border-neutral-200 text-neutral-600">
                            <strong>Note:</strong> {order.courierNotes}
                          </div>
                        )}
                      </div>

                      {/* Items Ordered List */}
                      <div className="md:col-span-7 space-y-2">
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between gap-3 p-2 bg-[#FAF9F5] border border-[#EAE6DC]"
                          >
                            <div className="flex items-center gap-2.5">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-10 h-10 object-contain bg-white border border-[#E2DED5] p-0.5 shrink-0"
                              />
                              <div className="text-xs">
                                <div className="font-medium text-neutral-900 line-clamp-1">{item.name}</div>
                                <div className="text-[11px] font-mono text-neutral-500">
                                  Size: <strong className="text-neutral-800">{item.size}</strong> · Qty: {item.quantity}
                                </div>
                              </div>
                            </div>

                            <div className="text-xs font-mono font-medium text-neutral-900 shrink-0">
                              {(item.priceEGP * item.quantity).toLocaleString()} EGP
                            </div>
                          </div>
                        ))}

                        <div className="pt-2 flex items-center justify-between text-xs font-mono border-t border-neutral-100">
                          <span className="text-neutral-500 uppercase tracking-wider">Total Order Value:</span>
                          <span className="text-sm font-semibold text-neutral-900">
                            {order.totalEGP.toLocaleString()} EGP
                          </span>
                        </div>
                      </div>

                    </div>

                    {/* Quick Courier Action Bar */}
                    <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs font-mono text-neutral-500">
                      <div className="flex items-center gap-2">
                        {order.status === 'pending' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'dispatched', 'Courier assigned')}
                            className="px-2.5 py-1 bg-neutral-900 text-white hover:bg-neutral-800 text-[11px] uppercase tracking-wider cursor-pointer"
                          >
                            Dispatch Order
                          </button>
                        )}
                        {order.status === 'dispatched' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'delivered')}
                            className="px-2.5 py-1 bg-emerald-700 text-white hover:bg-emerald-800 text-[11px] uppercase tracking-wider cursor-pointer"
                          >
                            Confirm Delivered
                          </button>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          if (confirm(`Remove order ${order.id}?`)) {
                            deleteOrder(order.id);
                          }
                        }}
                        className="text-[11px] text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
                      >
                        Delete Record
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}

            {/* Atelier Inventory & Product Performance */}
            <div className="p-5 bg-white border border-[#E6E2D8] space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
                <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-800 font-semibold">
                  SIMPLE Garments in Catalog ({PRODUCTS.length} Total Pieces)
                </h3>
                <span className="text-[11px] font-mono text-neutral-400">All prices synced to Egyptian Pound</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {PRODUCTS.map(p => (
                  <div key={p.id} className="p-3 bg-[#FAF9F5] border border-[#ECE8DE] flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="w-12 h-12 object-contain bg-white border border-[#E2DED5] p-1 shrink-0" />
                    <div className="text-xs overflow-hidden">
                      <div className="font-medium text-neutral-900 truncate">{p.name}</div>
                      <div className="text-[11px] font-mono text-neutral-500 uppercase">{p.category} · {Math.round(p.priceUSD * 49)} EGP</div>
                      <div className="text-[10px] text-emerald-700 font-mono">In Stock</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reset to Default Demo Orders */}
            <div className="pt-2 flex items-center justify-between text-xs font-mono text-neutral-400">
              <span>Owner Panel Session Active</span>
              <button
                onClick={() => {
                  if (confirm('Reset orders to sample Egyptian customer orders?')) {
                    resetDemoOrders();
                  }
                }}
                className="hover:text-black underline cursor-pointer"
              >
                Reset Demo Cairo Orders
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
