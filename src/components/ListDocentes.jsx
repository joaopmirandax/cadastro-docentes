function ListDocentes({ docentes, onEdit, onDelete }) {
  if (docentes.length === 0) {
    return <p className="text-muted">Nenhum docente cadastrado.</p>
  }

  return (
    <table className="table table-striped align-middle">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Formação</th>
          <th>Email Institucional</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {docentes.map(d => (
          <tr key={d.id}>
            <td>{d.nome}</td>
            <td>{d.formacao}</td>
            <td>{d.emailInst}</td>
            <td className="d-flex gap-2">
              <button className="btn btn-sm btn-warning" onClick={() => onEdit(d)}>Alterar</button>
              <button className="btn btn-sm btn-danger" onClick={() => onDelete(d.id)}>Remover</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
export default ListDocentes