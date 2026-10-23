import React, { createContext, useContext, useState, useEffect } from 'react';

export type OrderStatus = 'pending' | 'processing' | 'dispatched' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: string;
  name: string;
  color: string;
  size: string;
  quantity: number;
  priceUSD: number;
  priceEGP: number;
  image: string;
}

export interface Order {
  id: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  city: string;
  paymentMethod: 'card' | 'cod';
  items: OrderItem[];
  totalUSD: number;
  totalEGP: number;
  status: OrderStatus;
  courierNotes?: string;
}

interface OrdersContextType {
  orders: Order[];
  isOwnerAuthenticated: boolean;
  isOwnerModalOpen: boolean;
  setIsOwnerModalOpen: (open: boolean) => void;
  loginOwner: (input: string) => boolean;
  logoutOwner: () => void;
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, notes?: string) => void;
  deleteOrder: (orderId: string) => void;
  resetDemoOrders: () => void;
  stats: {
    totalRevenueEGP: number;
    totalRevenueUSD: number;
    totalOrdersCount: number;
    pendingCount: number;
    dispatchedCount: number;
    deliveredCount: number;
    codRevenueEGP: number;
    cardRevenueEGP: number;
    averageOrderValueEGP: number;
  };
}

const STORAGE_KEY_ORDERS = 'simple_atelier_orders_v3';
const STORAGE_KEY_AUTH = 'simple_atelier_owner_auth_v2';

const SEED_ORDERS: Order[] = [
  {
    id: 'SMPL-84210',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
    customerName: 'Youssef El-Sayed',
    customerEmail: 'youssef.elsayed@gmail.com',
    customerPhone: '0100 234 5678',
    deliveryAddress: 'Building 14, Gezira St, Zamalek',
    city: 'Cairo',
    paymentMethod: 'cod',
    items: [
      {
        productId: 'simple-star-orbit-crewneck-black',
        name: 'SIMPLE Star Orbit Crewneck — Pitch Black',
        color: 'Pitch Black',
        size: 'L',
        quantity: 1,
        priceUSD: 800 / 49,
        priceEGP: 800,
        image: '/assets/aistudio/WhatsApp_Image_2026-10-23_at_3.57.27_PM_35553796.jpeg'
      },
      {
        productId: 'simple-star-orbit-sweatpants-black',
        name: 'SIMPLE Star Orbit Sweatpants — Pitch Black',
        color: 'Pitch Black',
        size: 'L',
        quantity: 1,
        priceUSD: 850 / 49,
        priceEGP: 850,
        image: '/assets/aistudio/WhatsApp_Image_2026-10-23_at_5.43.42_PM_e5eaa49c.jpeg'
      }
    ],
    totalUSD: 1650 / 49,
    totalEGP: 1650,
    status: 'pending',
    courierNotes: 'Call before delivery in Zamalek'
  },
  {
    id: 'SMPL-83994',
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
    customerName: 'Nouran Mansour',
    customerEmail: 'nouran.m@outlook.com',
    customerPhone: '0122 890 1234',
    deliveryAddress: 'Villa 28, Diplomatic Compound, Road 9, Maadi',
    city: 'Cairo',
    paymentMethod: 'card',
    items: [
      {
        productId: 'simple-crewneck-burgundy',
        name: 'SIMPLE Star Orbit Crewneck — Deep Burgundy',
        color: 'Deep Burgundy',
        size: 'M',
        quantity: 1,
        priceUSD: 800 / 49,
        priceEGP: 800,
        image: '/assets/aistudio/WhatsApp_Image_2026-10-23_at_4.07.40_PM_8b1b3c0a.jpeg'
      },
      {
        productId: 'simple-star-orbit-sweatpants-pink',
        name: 'SIMPLE Star Orbit Sweatpants — Blush Pink',
        color: 'Blush Pink',
        size: 'M',
        quantity: 1,
        priceUSD: 850 / 49,
        priceEGP: 850,
        image: '/assets/aistudio/WhatsApp_Image_2026-10-23_at_5.43.21_PM_9ab54ebf.jpeg'
      }
    ],
    totalUSD: 1650 / 49,
    totalEGP: 1650,
    status: 'processing'
  },
  {
    id: 'SMPL-83672',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
    customerName: 'Kareem Fahmy',
    customerEmail: 'k.fahmy@cairoventures.eg',
    customerPhone: '0111 456 7890',
    deliveryAddress: 'Apartment 4B, Degla Plaza, New Cairo, 5th Settlement',
    city: 'Cairo',
    paymentMethod: 'cod',
    items: [
      {
        productId: 'simple-star-orbit-hoodie-black',
        name: 'SIMPLE Star Orbit Hoodie — Pitch Black',
        color: 'Pitch Black',
        size: 'XL',
        quantity: 1,
        priceUSD: 1000 / 49,
        priceEGP: 1000,
        image: '/assets/aistudio/WhatsApp_Image_2026-10-23_at_5.28.59_PM_fecb7835.jpeg'
      }
    ],
    totalUSD: 1000 / 49,
    totalEGP: 1000,
    status: 'dispatched',
    courierNotes: 'Bosta Courier tracking #BST-99412'
  },
  {
    id: 'SMPL-82915',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    customerName: 'Mariam Sherif',
    customerEmail: 'mariam.sherif@gmail.com',
    customerPhone: '0109 876 5432',
    deliveryAddress: '19 El-Merghany St, Heliopolis',
    city: 'Cairo',
    paymentMethod: 'card',
    items: [
      {
        productId: 'simple-star-orbit-hoodie-navy',
        name: 'SIMPLE Star Orbit Hoodie — Midnight Navy',
        color: 'Midnight Navy',
        size: 'M',
        quantity: 1,
        priceUSD: 1000 / 49,
        priceEGP: 1000,
        image: '/assets/aistudio/WhatsApp_Image_2026-10-23_at_5.36.58_PM_9f2bc598.jpeg'
      },
      {
        productId: 'simple-star-orbit-crewneck',
        name: 'SIMPLE Star Orbit Crewneck — Sky Blue',
        color: 'Sky Blue',
        size: 'L',
        quantity: 1,
        priceUSD: 800 / 49,
        priceEGP: 800,
        image: '/assets/aistudio/simple_baby_blue_crewneck_front.jpg'
      }
    ],
    totalUSD: 1800 / 49,
    totalEGP: 1800,
    status: 'delivered'
  },
  {
    id: 'SMPL-82104',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(), // 1.5 days ago
    customerName: 'Omar Abdel-Rahman',
    customerEmail: 'omar.abdelrahman@gmail.com',
    customerPhone: '0155 123 4567',
    deliveryAddress: 'Building 8, Palm Hills, 6th of October City',
    city: 'Cairo',
    paymentMethod: 'cod',
    items: [
      {
        productId: 'simple-star-orbit-sweatpants-grey',
        name: 'SIMPLE Star Orbit Sweatpants — Heather Grey',
        color: 'Heather Grey',
        size: 'L',
        quantity: 2,
        priceUSD: 850 / 49,
        priceEGP: 850,
        image: '/assets/aistudio/WhatsApp_Image_2026-10-23_at_5.43.31_PM_ea167519.jpeg'
      }
    ],
    totalUSD: 1700 / 49,
    totalEGP: 1700,
    status: 'delivered'
  }
];

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const OrdersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_ORDERS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    return SEED_ORDERS;
  });

  const [isOwnerAuthenticated, setIsOwnerAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_AUTH, isOwnerAuthenticated ? 'true' : 'false');
    } catch (e) {
      console.error('Failed to save auth state', e);
    }
  }, [isOwnerAuthenticated]);

  const loginOwner = (input: string): boolean => {
    const clean = input.trim().toLowerCase();
    // Validated against owner email or standard owner PINs
    const validCodes = ['1925', 'admin', 'simple', 'x2islam19@gmail.com', 'islam', 'owner'];
    if (validCodes.includes(clean)) {
      setIsOwnerAuthenticated(true);
      return true;
    }
    return false;
  };

  const logoutOwner = () => {
    setIsOwnerAuthenticated(false);
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `SMPL-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, courierNotes?: string) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? {
              ...order,
              status,
              ...(courierNotes !== undefined ? { courierNotes } : {})
            }
          : order
      )
    );
  };

  const deleteOrder = (orderId: string) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
  };

  const resetDemoOrders = () => {
    setOrders(SEED_ORDERS);
  };

  // Compute live statistics
  const stats = {
    totalRevenueEGP: orders.reduce((acc, curr) => (curr.status !== 'cancelled' ? acc + curr.totalEGP : acc), 0),
    totalRevenueUSD: orders.reduce((acc, curr) => (curr.status !== 'cancelled' ? acc + curr.totalUSD : acc), 0),
    totalOrdersCount: orders.length,
    pendingCount: orders.filter(o => o.status === 'pending' || o.status === 'processing').length,
    dispatchedCount: orders.filter(o => o.status === 'dispatched').length,
    deliveredCount: orders.filter(o => o.status === 'delivered').length,
    codRevenueEGP: orders
      .filter(o => o.paymentMethod === 'cod' && o.status !== 'cancelled')
      .reduce((acc, curr) => acc + curr.totalEGP, 0),
    cardRevenueEGP: orders
      .filter(o => o.paymentMethod === 'card' && o.status !== 'cancelled')
      .reduce((acc, curr) => acc + curr.totalEGP, 0),
    averageOrderValueEGP: orders.length > 0
      ? Math.round(orders.reduce((acc, curr) => acc + curr.totalEGP, 0) / orders.length)
      : 0
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        isOwnerAuthenticated,
        isOwnerModalOpen,
        setIsOwnerModalOpen,
        loginOwner,
        logoutOwner,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        resetDemoOrders,
        stats
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
};
