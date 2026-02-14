import { useNavigate } from "react-router-dom";
import "../assets/styles/sidebar.scss";

type SidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
};

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const navigate = useNavigate();

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-title">AXIUM</h2>
        <button className="toggle-btn" onClick={onToggle}>
          {collapsed ? "➡" : "⬅"}
        </button>
      </div>

      <nav>
        <ul>
          <li onClick={() => navigate("/dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/suppliers/new")}>Cadastrar Fornecedor</li>
           <li onClick={() => navigate("/suppliers")}>Meus Fornecedores</li>
          <li onClick={() => navigate("/products")}>Produtos</li>
          <li onClick={() => navigate("/quotations")}>Cotações</li>
          <li onClick={() => navigate("/login")}>Sair</li>
        </ul>
      </nav>
    </aside>
  );
}
