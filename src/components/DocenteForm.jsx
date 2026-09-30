import { useState } from 'react'

const UFS = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']

// ---------- máscaras ----------
function maskCPF(v) {
  return v.replace(/\D/g, '').slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}
function maskTelefone(v) {
  return v.replace(/\D/g, '').slice(0, 11)
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{1,4})$/, '$1-$2')
}
function maskCEP(v) {
  return v.replace(/\D/g, '').slice(0, 8).replace(/(\d{5})(\d{1,3})$/, '$1-$2')
}

// ---------- CPF válido (dígitos verificadores) ----------
function cpfValido(cpf) {
  const n = cpf.replace(/\D/g, '')
  if (n.length !== 11 || /^(\d)\1+$/.test(n)) return false
  for (let t = 9; t < 11; t++) {
    let soma = 0
    for (let i = 0; i < t; i++) soma += Number(n[i]) * (t + 1 - i)
    const dig = ((soma * 10) % 11) % 10
    if (dig !== Number(n[t])) return false
  }
  return true
}

function DocenteForm({ docenteToEdit, onSubmit }) {
  // um useState por campo; se estiver editando, já começa preenchido
  const [nome, setNome] = useState(docenteToEdit ? docenteToEdit.nome : '')
  const [cpf, setCpf] = useState(docenteToEdit ? docenteToEdit.cpf : '')
  const [formacao, setFormacao] = useState(docenteToEdit ? docenteToEdit.formacao : '')
  const [emailInst, setEmailInst] = useState(docenteToEdit ? docenteToEdit.emailInst : '')
  const [emailPart, setEmailPart] = useState(docenteToEdit ? docenteToEdit.emailPart : '')
  const [telefone, setTelefone] = useState(docenteToEdit ? docenteToEdit.telefone : '')
  const [endereco, setEndereco] = useState(docenteToEdit ? docenteToEdit.endereco : '')
  const [numero, setNumero] = useState(docenteToEdit ? docenteToEdit.numero : '')
  const [cidade, setCidade] = useState(docenteToEdit ? docenteToEdit.cidade : '')
  const [cep, setCep] = useState(docenteToEdit ? docenteToEdit.cep : '')
  const [uf, setUf] = useState(docenteToEdit ? docenteToEdit.uf : '')
  const [erros, setErros] = useState({})

  function validar() {
    const e = {}
    if (nome.trim().length < 3) e.nome = 'Nome deve ter no mínimo 3 caracteres'
    if (!cpf) e.cpf = 'CPF é obrigatório'
    else if (!cpfValido(cpf)) e.cpf = 'CPF inválido'
    if (!formacao.trim()) e.formacao = 'Formação é obrigatória'
    if (!emailInst.trim()) e.emailInst = 'Email institucional é obrigatório'
    else if (!emailInst.includes('@')) e.emailInst = 'Email deve conter @'
    if (emailPart.trim() && !emailPart.includes('@')) e.emailPart = 'Email deve conter @'
    if (telefone.replace(/\D/g, '').length !== 11) e.telefone = 'Telefone inválido: (00) 00000-0000'
    if (!endereco.trim()) e.endereco = 'Endereço é obrigatório'
    if (!String(numero).trim()) e.numero = 'Número é obrigatório'
    if (!cidade.trim()) e.cidade = 'Cidade é obrigatória'
    if (cep.replace(/\D/g, '').length !== 8) e.cep = 'CEP inválido: 00000-000'
    if (!uf) e.uf = 'Selecione um estado'
    return e
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    const e = validar()
    setErros(e)
    if (Object.keys(e).length > 0) return
    onSubmit({ nome, cpf, formacao, emailInst, emailPart, telefone, endereco, numero, cidade, cep, uf })
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className="mb-3">{docenteToEdit ? 'Alterar Docente' : 'Cadastrar Novo Docente'}</h2>

      <fieldset className="mb-4">
        <h3>Dados Pessoais</h3>
        <div className="mb-2">
          <label className="form-label">Nome Completo</label>
          <input type="text" className="form-control" value={nome} onChange={e => setNome(e.target.value)} />
          {erros.nome && <div className="text-danger">{erros.nome}</div>}
        </div>
        <div className="mb-2">
          <label className="form-label">CPF</label>
          <input type="text" className="form-control" placeholder="000.000.000-00" value={cpf}
            onChange={e => setCpf(maskCPF(e.target.value))} />
          {erros.cpf && <div className="text-danger">{erros.cpf}</div>}
        </div>
        <div className="mb-2">
          <label className="form-label">Formação/Área de Atuação</label>
          <input type="text" className="form-control" value={formacao} onChange={e => setFormacao(e.target.value)} />
          {erros.formacao && <div className="text-danger">{erros.formacao}</div>}
        </div>
      </fieldset>

      <fieldset className="mb-4">
        <h3>Contatos</h3>
        <div className="mb-2">
          <label className="form-label">Email Institucional</label>
          <input type="email" className="form-control" value={emailInst} onChange={e => setEmailInst(e.target.value)} />
          {erros.emailInst && <div className="text-danger">{erros.emailInst}</div>}
        </div>
        <div className="mb-2">
          <label className="form-label">Email Particular (opcional)</label>
          <input type="email" className="form-control" value={emailPart} onChange={e => setEmailPart(e.target.value)} />
          {erros.emailPart && <div className="text-danger">{erros.emailPart}</div>}
        </div>
        <div className="mb-2">
          <label className="form-label">Telefone Celular</label>
          <input type="tel" className="form-control" placeholder="(00) 00000-0000" value={telefone}
            onChange={e => setTelefone(maskTelefone(e.target.value))} />
          {erros.telefone && <div className="text-danger">{erros.telefone}</div>}
        </div>
      </fieldset>

      <fieldset className="mb-4">
        <h3>Endereço</h3>
        <div className="mb-2">
          <label className="form-label">Endereço Residencial</label>
          <input type="text" className="form-control" value={endereco} onChange={e => setEndereco(e.target.value)} />
          {erros.endereco && <div className="text-danger">{erros.endereco}</div>}
        </div>
        <div className="mb-2">
          <label className="form-label">Número</label>
          <input type="text" className="form-control" value={numero} onChange={e => setNumero(e.target.value)} />
          {erros.numero && <div className="text-danger">{erros.numero}</div>}
        </div>
        <div className="mb-2">
          <label className="form-label">Cidade</label>
          <input type="text" className="form-control" value={cidade} onChange={e => setCidade(e.target.value)} />
          {erros.cidade && <div className="text-danger">{erros.cidade}</div>}
        </div>
        <div className="mb-2">
          <label className="form-label">CEP</label>
          <input type="text" className="form-control" placeholder="00000-000" value={cep}
            onChange={e => setCep(maskCEP(e.target.value))} />
          {erros.cep && <div className="text-danger">{erros.cep}</div>}
        </div>
        <div className="mb-2">
          <label className="form-label">UF (Estado)</label>
          <select className="form-select" value={uf} onChange={e => setUf(e.target.value)}>
            <option value="">Selecione...</option>
            {UFS.map(sigla => <option key={sigla} value={sigla}>{sigla}</option>)}
          </select>
          {erros.uf && <div className="text-danger">{erros.uf}</div>}
        </div>
      </fieldset>

      <button className="btn btn-primary">{docenteToEdit ? 'Salvar Alterações' : 'Cadastrar'}</button>
    </form>
  )
}

export default DocenteForm