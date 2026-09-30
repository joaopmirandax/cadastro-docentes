function Welcome({ total }) {
  return (
    <div className="p-4 bg-light rounded">
      <h2>Bem-vindo ao Cadastro de Docentes</h2>
      <p>Há {total} docente(s) cadastrado(s). Use o menu para cadastrar ou listar.</p>
    </div>
  )
}
export default Welcome