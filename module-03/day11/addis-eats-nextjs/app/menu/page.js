import Sidebar from '../../components/Sidebar';
import DishList from './DishList';
import './Menu.css';

export default function MenuPage() {
    return (
        <div className="menu-layout">
            <Sidebar />
            <div className="menu-content">
                <h1>Our Menu</h1>
                <p>Select a dish to view details.</p>
                <DishList />
            </div>
        </div>
    );
}