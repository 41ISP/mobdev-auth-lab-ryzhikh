import { useEffect, useState } from 'react'
import ItemCard from '../components/ItemCard'
import { api } from '../api/api'

const ItemsList = () => {
    const [items, setItems] = useState([])
    const [stats, setStats] = useState(null)

    useEffect(() => {
        const loadData = async () => {
            try {
                const itemsRes = await api.getItems()
                setItems(itemsRes.data)
            } catch (err) {
                console.error('Не удалось загрузить товары', err)
            }

            try {
                const statsRes = await api.getStats()
                setStats(statsRes.data)
            } catch (err) {
                console.error('Не удалось загрузить статистику', err)
            }
        }

        loadData()
    }, [])

    return (
        <div className="container">
            <div className="page-header">
                <h1>Все товары</h1>
            </div>
            <div className="stats">
                <div className="stat-item">
                    <span className="stat-value">{stats?.totalItems ?? 0}</span>
                    <span className="stat-label">Товаров</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{stats?.totalBids ?? 0}</span>
                    <span className="stat-label">Ставок</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{stats?.activeItems ?? 0}</span>
                    <span className="stat-label">Активных</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">
                        {stats?.averageItemPrice ?? 0}₽
                    </span>
                    <span className="stat-label">Средняя цена</span>
                </div>
            </div>

            <div className="items-grid">
                {items.map((item) => (
                    <ItemCard key={item.id} {...item} />
                ))}
            </div>
        </div>
    )
}

export default ItemsList