export type ProductCategory = 'Veg Pickles' | 'Non-Veg Pickles';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  price: number;
  packageSize: string; // e.g. "250 g"
  image: string;
  isAvailable: boolean;
  isFeatured?: boolean;
  spiciness?: 'Mild' | 'Medium' | 'Hot' | 'Extra Hot';
  createdAt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type DemoPaymentMethod = 'Cash on Delivery — Demo' | 'Pay at Store — Demo';

export type DemoOrderStatus = 
  | 'Pending Confirmation' 
  | 'Confirmed' 
  | 'Preparing' 
  | 'Dispatched' 
  | 'Delivered' 
  | 'Cancelled';

export interface OrderStatusHistoryEntry {
  status: DemoOrderStatus;
  timestamp: string;
  note: string;
}

export interface CustomerInfo {
  fullName: string;
  mobileNumber: string;
  deliveryAddress: string;
  city: string;
  postalCode: string;
  orderNotes?: string;
}

export interface DemoOrder {
  orderReference: string;
  customer: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  grandTotal: number;
  paymentMethod: DemoPaymentMethod;
  status: DemoOrderStatus;
  createdAt: string;
  statusHistory: OrderStatusHistoryEntry[];
}

export type ToastType = 'success' | 'info' | 'warning' | 'error';

export interface ToastNotification {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

export type SortOption = 
  | 'price-asc' 
  | 'price-desc' 
  | 'name-asc' 
  | 'name-desc' 
  | 'featured';
