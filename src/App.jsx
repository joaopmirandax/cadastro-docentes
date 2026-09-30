import { useState } from 'react'
import Login from './components/Login'
import Menu from './components/Menu'
import Welcome from './components/Welcome'
import DocenteForm from './components/DocenteForm'
import ListDocentes from './components/ListDocentes'

function App() {
  const [logged, setLogged] = useState(false)
  const [activeScreen, setActiveScreen] = useState('welcome')
  const [docentes, setDocentes] = useState([])
  const [docenteToEdit, setDocenteToEdit] = useState(null)

  function handleLogin() {
    setLogged(true)
    setActiveScreen('welcome')
  }

  function handleNavigate(screen) {
    if (screen === 'form') setDocenteToEdit(null) // "Cadastrar" sempre abre form vazio
    setActiveScreen(screen)
  }

  function handleSubmit(docente) {
    if (docenteToEdit) {
      // UPDATE: troca só o docente editado
      setDocentes(docentes.map(d => (d.id === docenteToEdit.id ? { ...docente, id: d.id } : d)))
    } else {
      // CREATE: adiciona novo objeto ao array
      setDocentes([...docentes, { ...docente, id: Date.now() }])
    }
    setDocenteToEdit(null)
    setActiveScreen('list')
  }

  function handleEditDocente(docente) {
    setDocenteToEdit(docente)
    setActiveScreen('form')
  }

  function handleDeleteDocente(id) {
    // DELETE: novo array sem o docente
    setDocentes(docentes.filter(d => d.id !== id))
  }

  if (!logged) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="container py-4">
      <Menu onNavigate={handleNavigate} onLogout={() => setLogged(false)} />

      {activeScreen === 'welcome' && <Welcome total={docentes.length} />}

      {activeScreen === 'form' && (
        <DocenteForm
          key={docenteToEdit ? docenteToEdit.id : 'novo'}
          docenteToEdit={docenteToEdit}
          onSubmit={handleSubmit}
        />
      )}

      {activeScreen === 'list' && (
        <ListDocentes
          docentes={docentes}
          onEdit={handleEditDocente}
          onDelete={handleDeleteDocente}
        />
      )}
    </div>
  )
}

export default App