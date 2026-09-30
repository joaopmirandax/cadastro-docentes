function Menu({ onNavigate, onLogout }) {
  return (
    <nav className="d-flex gap-2 mb-4">
      <button className="btn btn-outline-primary" onClick={() => onNavigate('welcome')}>Início</button>
      <button className="btn btn-outline-primary" onClick={() => onNavigate('form')}>Cadastrar</button>
      <button className="btn btn-outline-primary" onClick={() => onNavigate('list')}>Listar</button>
      <button className="btn btn-outline-danger ms-auto" onClick={onLogout}>Sair</button>
    </nav>
  )
}
export default Menu