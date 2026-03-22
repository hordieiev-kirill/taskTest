import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchOrders } from '../api/mockData';
import formatDateTime from '../utils/formatDate';
import '../style/products.css';
import IconMonitor from '../assets/monitor.svg';
import formatCurrency from '../utils/formatMoney';

export default function Products() {
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });

  const [typeFilter, setTypeFilter] = useState('all');

  const allProducts = useMemo(() => {
    return orders.flatMap((order) =>
      order.products.map((p) => ({
        ...p,
        orderTitle: order.title,
      }))
    );
  }, [orders]);

  const types = useMemo(() => {
    const set = new Set(allProducts.map((p) => p.type));
    return ['all', ...Array.from(set)];
  }, [allProducts]);

  const filtered = useMemo(() => {
    if (typeFilter === 'all') return allProducts;
    return allProducts.filter((p) => p.type === typeFilter);
  }, [allProducts, typeFilter]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="products">
      <div className="products__header">
        <h2>Products / {filtered.length}</h2>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="products__select"
        >
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="products__scroll">
        <div className="products__list">
          {filtered.map((product) => {
            const usd =
              product.price.find((p) => p.symbol === 'USD')?.value || 0;
            const uah =
              product.price.find((p) => p.symbol === 'UAH')?.value || 0;

            return (
              <div key={product.id} className="product-row">
                <div className="product-row__status" />

                <img src={IconMonitor} alt="" className="product-row__image" />

                <div className="product-row__title">
                  <div>{product.title}</div>
                  <span>SN-{product.serialNumber}</span>
                </div>

                <div className="product-row__status-text">
                  {product.isNew ? 'free ' : 'under repair'}
                </div>

                <div className="product-row__block">
                  <span>с {formatDateTime(product.guarantee.start).full}</span>
                  <span>по {formatDateTime(product.guarantee.end).full}</span>
                </div>

                <div className="product-row__block">
                  {product.isNew ? 'new' : 'used'}
                </div>

                <div className="product-row__block">
                  <span>{formatCurrency(usd, 'USD')}</span>
                  <span>{formatCurrency(uah, 'UAH')}</span>
                </div>

                <div className="product-row__block long">
                  Long, long, long band name
                </div>

                <div className="product-row__block long">
                  {product.orderTitle}
                </div>

                <div className="product-row__block">
                  {formatDateTime(product.date).full}
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
