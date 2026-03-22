import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchOrders } from '../api/mockData';
import type { Order, DeletePayload } from '../types';
import '../style/orders.css';
import formatDateTime from '../utils/formatDate';
import IconProduct from '../assets/product.svg';
import IconArrow from '../assets/arrow.svg';
import IconMonitor from '../assets/monitor.svg';
import formatCurrency from '../utils/formatMoney';

function ConfirmModal({
  onCancel,
  onConfirm,
  title,
  description,
}: {
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="orders__modal" role="dialog" aria-modal="true">
      <div className="orders__modal-content">
        <h2 className="orders__title">{title}</h2>
        <p className="orders__subtitle">{description}</p>
        <div className="orders__modal-buttons">
          <button type="button" className="orders__button" onClick={onCancel}>
            Cancel
          </button>
          <button
            type="button"
            className="orders__button orders__button--danger"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Orders() {
  const queryClient = useQueryClient();
  const { data: orders = [], isLoading: loadingOrders } = useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });
  const [selectTypeDelete, setSelectTypeDelete] = useState<
    'orders' | 'products'
  >('orders');
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const selectedOrder = useMemo(
    () => orders.find((order) => order.id === selectedOrderId) ?? null,
    [orders, selectedOrderId]
  );

  const deleteMutation = useMutation<DeletePayload, Error, DeletePayload>({
    mutationFn: (payload) => {
      return new Promise<DeletePayload>((resolve) => {
        window.setTimeout(() => resolve(payload), 250);
      });
    },
    onSuccess: (payload) => {
      queryClient.setQueryData<Order[] | undefined>(['orders'], (prev) => {
        if (payload.type == 'orders')
          return prev?.filter((o) => o.id !== payload.id);
        if (payload.type === 'products') {
          return prev?.map((o) => {
            if (o.id === selectedOrderId) {
              return {
                ...o,
                products: o.products.filter((p) => p.id !== payload.id),
              };
            }
            return o;
          });
        }
      });
      if (selectedOrderId === Number(payload.id) && payload.type === 'orders') {
        setSelectedOrderId(null);
      }
      setConfirmDeleteId(null);
    },
  });

  const ordersWithTotals = useMemo(() => {
    return orders.map((order) => {
      const totalUsd = order.products.reduce((acc, p) => {
        const usdPrice = p.price.find((pr) => pr.symbol === 'USD');
        return acc + (usdPrice ? usdPrice.value : 0);
      }, 0);
      const totalUah = order.products.reduce((acc, p) => {
        const uahPrice = p.price.find((pr) => pr.symbol === 'UAH');
        return acc + (uahPrice ? uahPrice.value : 0);
      }, 0);
      return {
        ...order,
        productsCount: order.products.length,
        totalUsd,
        totalUah,
      };
    });
  }, [orders]);

  if (loadingOrders) {
    return <div>Loading orders…</div>;
  }

  return (
    <div className="orders">
      <section className="orders__list" aria-label="Orders">
        {ordersWithTotals.map((order) => {
          const formatted = formatDateTime(order.date);
          const isActive = order.id === selectedOrderId;
          return (
            <div
              key={order.id}
              className={`orders__item ${isActive ? 'orders__item--active' : ''}`}
              onClick={() => setSelectedOrderId(order.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  setSelectedOrderId(order.id);
                }
              }}
            >
              {!selectedOrder && (
                <div className="orders__row-left">
                  <h3 className="orders__title" title={order.title}>
                    {order.title}
                  </h3>
                </div>
              )}

              <div className="orders__row-right">
                <div className="orders__count">
                  <img src={IconProduct} alt="Product" />
                  <div className="orders__count-text">
                    <span> {order.productsCount} </span>
                    <span>Products</span>
                  </div>
                </div>

                <div className="orders_date">
                  <span>{formatted.date}</span>
                  <span>{formatted.full}</span>
                </div>
                {!selectedOrder && (
                  <div className="orders__total">
                    <span>{formatCurrency(order.totalUsd, 'USD')}</span>
                    <span>{formatCurrency(order.totalUah, 'UAH')}</span>
                  </div>
                )}
                {!selectedOrder && (
                  <button
                    type="button"
                    className="orders__button orders__button--danger"
                    onClick={(event) => {
                      event.stopPropagation();
                      setConfirmDeleteId(order.id);
                      setSelectTypeDelete('orders');
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
              {isActive && (
                <div className="helper-block">
                  <img src={IconArrow} alt="Arrow" />
                </div>
              )}
            </div>
          );
        })}
      </section>

      {selectedOrder && (
        <section className="orders__details" aria-label="Selected order">
          <div className="orders__details-title">
            <h2 className="orders__title" title={selectedOrder.title}>
              {selectedOrder.title}
            </h2>
            <button
              type="button"
              className="orders__button"
              onClick={() => setSelectedOrderId(null)}
            >
              Close
            </button>
          </div>

          <div>
            {selectedOrder.products.length === 0 ? (
              <p className="orders__subtitle">No products in this order.</p>
            ) : (
              <ul className="orders__products-list">
                {selectedOrder.products.map((product) => {
                  return (
                    <li key={product.id} className="orders__product-item">
                      <div className="product_img">
                        <img src={IconMonitor} alt="Product" />
                        <div className="orders__product-header">
                          <h4 className="orders__product-title">
                            {product.title}
                          </h4>
                          <span className="orders__product-type">
                            {product.type}
                          </span>
                        </div>
                      </div>

                      <div className="orders__product-status">Free</div>
                      <div className="orders__product-delete">
                        <button
                          type="button"
                          className="orders__button orders__button--danger"
                          onClick={(event) => {
                            event.stopPropagation();
                            setConfirmDeleteId(product.id);
                            setSelectTypeDelete('products');
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>
      )}

      {confirmDeleteId ? (
        <ConfirmModal
          title="Delete order"
          description="Are you sure you want to delete this order? This cannot be undone."
          onCancel={() => setConfirmDeleteId(null)}
          onConfirm={() => {
            if (!confirmDeleteId) return;
            deleteMutation.mutate({
              id: confirmDeleteId,
              type: selectTypeDelete,
            });
          }}
        />
      ) : null}
    </div>
  );
}
