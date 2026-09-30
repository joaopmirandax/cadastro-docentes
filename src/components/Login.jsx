import { useState } from 'react'

function Login({ onLogin }) {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (usuario === 'admin' && senha === '123') {
      onLogin()
    } else {
      setErro('Usuário ou senha inválidos')
    }
  }

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <form className="card p-4 w-100 login-card" onSubmit={handleSubmit}>
        <h3 className="mb-3 text-center">Login</h3>
        <input className="form-control mb-2" placeholder="Usuário" value={usuario}
          onChange={e => setUsuario(e.target.value)} />
        <input className="form-control mb-2" type="password" placeholder="Senha" value={senha}
          onChange={e => setSenha(e.target.value)} />
        {erro && <div className="text-danger mb-2">{erro}</div>}
        <button className="btn btn-primary w-100">Entrar</button>
      </form>
    </div>
  )
}

export default Login