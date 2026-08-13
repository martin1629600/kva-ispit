export interface OrderModel {
  toyId: number;
  status: 'reserved' | 'delivered' | 'canceled';
  rating?: number;
  quantity: number;
}
