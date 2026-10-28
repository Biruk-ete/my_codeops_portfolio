import Sidebar from '@/components/Sidebar';
import './MenuLayout.css';

export default function MenuLayout({ children }) {
  return (
    <div className="menu-layout-wrapper">
      <Sidebar />

      <div className="menu-content-wrapper">
        {children}
      </div>
    </div>
  );
}