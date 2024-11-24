/*import React, { useState, useEffect } from "react";
import api from "../../services/api";
//import ScheduleForm from "./ScheduleForm";
//import ScheduleList from "./ScheduleList";
import './agenda.css';

const DataManagement = () => {
  const [data, setData] = useState([]); // Armazena a lista de categorias
  const [loading, setLoading] = useState(true); // Controla o estado de carregamento
  const [error, setError] = useState(null); // Armazena mensagens de erro, caso ocorram
  const [formData, setFormData] = useState({ nome: "", descricao: "" }); // Armazena os dados do formulário
  const [isEditing, setIsEditing] = useState(false); // Define se estamos no modo de edição
  const [editingId, setEditingId] = useState(null); // Armazena o ID do item sendo editado
  //const [appointments, setAppointments] = useState([]); // Estado para armazenar os agendamentos

  // Carregar os dados da API ao montar o componente
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    api.get('categoria') // Substitua '/usuario' com o endpoint correto da sua API
      .then(response => {
        console.log("Dados recebidos:", response.data); // Verifique o retorno da API
        setData(response.data.data); // Atualiza a lista com os dados retornados
        setLoading(false); // Desativa o carregamento
      })
      .catch(error => {
        console.error("Erro ao buscar dados:", error); // Exibe erro no console
        setError(error.message); // Armazena a mensagem de erro
        setLoading(false);
      });
  };

  // Função para lidar com mudanças nos inputs do formulário
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Atualiza o valor do campo modificado
  };

  // Função para cadastrar ou atualizar um item
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Atualiza o item existente
      api.put(`categoria/${editingId}`, formData) // Substitua `/usuario/${editingId}` com o endpoint correto
        .then(() => {
          fetchData(); // Recarregar a lista após edição
          resetForm(); // Limpar o formulário
        })
        .catch(error => setError(error.message));
    } else {
      // Cadastra um novo item
      api.post('categoria', formData) // Substitua '/usuario' com o endpoint correto
        .then(() => {
          fetchData(); // Recarregar a lista após cadastro
          resetForm(); // Limpar o formulário
        })
        .catch(error => setError(error.message));
    }
  };

  // Função para adicionar um agendamento
  //const addAppointment = (appointment) => {
   //setAppointments([...appointments, appointment]); // Atualiza o estado de agendamentos
//};

  // Função para habilitar a edição de um item
  const handleEdit = (item) => {
    setIsEditing(true); // Ativa o modo de edição
    setEditingId(item.id); // Define o ID do item a ser editado
    setFormData({ nome: item.nome, descricao: item.descricao }); // Preenche o formulário com os dados do item
  };

  // Função para resetar o formulário
  const resetForm = () => {
    setFormData({ nome: "", descricao: "" }); // Limpa os campos do formulário
    setIsEditing(false); // Desativa o modo de edição
    setEditingId(null); // Reseta o ID de edição
  };

  // Função para deletar um item
  const handleDelete = (id) => {
    api.delete(`categoria/${id}`) // Substitua `/usuario/${id}` com o endpoint correto
      .then(() => fetchData()) // Recarrega a lista após a exclusão
      .catch(error => setError(error.message));
  };

  // Se a API estiver carregando ou se houver erro, mostra mensagens apropriadas
  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  // Exibe os dados e o agendador
  return (
    <div className="app-container">
      {/* Seção do formulário de cadastro }/*
      <div className="cadastro-container">
        <h1>{isEditing ? "Atualizar Categoria" : "Cadastrar Nova Categoria"}</h1>

        <form onSubmit={handleSubmit} className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Nome da categoria"
            required
          />
          
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            placeholder="Descrição da categoria"
            required
          />

          <button type="submit">{isEditing ? "Atualizar" : "Cadastrar"}</button> {/* Botão para cadastrar ou atualizar }
 /*       </form>
      </div>

      {/* Separador visual }/*
      <hr style={{ margin: "40px 0", border: "1px solid #ddd" }} />

      {/* Seção da lista de categorias }/*
      <div className="consulta-container">
        <h2>Lista de Categorias</h2>
        <ul>
          {data.map(item => (
            <li key={item.id} style={{ marginBottom: "10px" }}>
              {item.id} - {item.nome} - {item.descricao}
              
              {/* Botão de editar }
              <button onClick={() => handleEdit(item)} style={{ marginLeft: "10px" }}>
                Editar
              </button>

              {/* Botão de deletar }
              <button onClick={() => handleDelete(item.id)} style={{ marginLeft: "10px", color: "red" }}>
                Deletar
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Seção do agendador }
      {/*<div>
        <br />
        <h1>Agendador de Aulas</h1>
        <ScheduleForm addAppointment={addAppointment} />
        <ScheduleList appointments={appointments} />
      </div>
      }
    </div>
    
  );
};

export default DataManagement;/*

/*

ver o último código no chat do teams, para implementar o novo código com 
a funcao de agendamento

*/

/*import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './listausuario.css';
import api from "../../services/api";

const DataList = () => {
  const [data, setData] = useState([]);  // Inicia como array vazio
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Chamada à API para obter os dados
    api.get('categoria')
      .then(response => {
        console.log(response.data);  // Verificar a estrutura dos dados retornados
        setData(response.data.data);  // Acessar corretamente a propriedade "data" que contém o array
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Exibir "Carregando..." enquanto a requisição está sendo feita
  if (loading) return <p>Carregando...</p>;

  // Exibir a mensagem de erro, se ocorrer
  if (error) return <p>Erro: {error}</p>;

  return (
    <ul>
      {/* Verifica se 'data' é um array antes de usar map /}
      {Array.isArray(data) ? (
        data.map(item => (
          <li key={item.id}>
            {item.id} - {item.nome} - {item.descricao}
            <button onClick={() => alert(`Atualizar item ${item.id}`)}>Atualizar</button>
          </li>
        ))
      ) : (
        <p>Dados indisponíveis</p>
      )}
    </ul>
  );
};

export default DataList;

*/

{/*


import React from "react";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from "react";

import './listausuario.css';
import api from "../../services/api";

const DataLista = () =>{ //lista de dados

    const [ data, setData] = useState([]); //muda de vazio para preenchido
    const [ loading, setLoading] = useState([]);
    const [ error, setError] = useState(null);

    useEffect(() => {
      //'Jack/obterUsuariosFieb'
        api.get('http://localhost:8080').then(response =>{
            console.log(response)
            setData(response.data);
            setLoading(false);
        })
        .catch(error =>{
            setError(error.message);
            setLoading(false);
        });
    },[]);

if (loading) return <p>Carregando...</p>
if (error) return <p>Erro; {error}</p>

return(
    <ul>
        {data.map(item => ( // map é o for; ou foreache
            <li key={item.id}>{item.codigo}-{item.nome}-{item.email}-{item.senha}</li>


        ))} 
        
    </ul>
);
};



export default DataLista;
/*}

{ /*

    import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username.trim() === '' || password.trim() === '') {
      setError('Preencha todos os campos');
    } else if (username!== 'admin' || password!== 'password') {
      setError('Usuário ou senha inválidos');
    } else {
      // Autenticação bem-sucedida, redirecionar para a página principal
      console.log('Login successful!');
      // window.location.href = '/';
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Usuário:
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        </label>
        <br />
        <label>
          Senha:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <br />
        {error && <div style={{ color: 'ed' }}>{error}</div>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
*/}

import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './agenda.css';

const Agenda = () => {
    const [nome, setNome] = useState('');
    const [data, setData] = useState('');
    const [horario, setHorario] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [professores, setProfessores] = useState([]);
    const [categoriaId, setCategoriaId] = useState('');
    const [professorId, setProfessorId] = useState('');
    const [aulasAgendadas, setAulasAgendadas] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchCategorias = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await api.get('/api/categorias', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCategorias(response.data);
            } catch (error) {
                console.error("Erro ao buscar categorias:", error);
            }
        };

        const fetchProfessores = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await api.get('/api/professores', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProfessores(response.data);
            } catch (error) {
                console.error("Erro ao buscar professores:", error);
            }
        };

        const fetchAulasAgendadas = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await api.get('/api/aulas', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setAulasAgendadas(response.data);
            } catch (error) {
                console.error("Erro ao buscar aulas agendadas:", error);
            }
        };

        fetchCategorias();
        fetchProfessores();
        fetchAulasAgendadas();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        // Validação
        if (!nome || !data || !horario || !categoriaId || !professorId) {
            setErrorMessage('Por favor, preencha todos os campos!');
            return;
        }

        const token = localStorage.getItem('token');

        try {
            await api.post('/api/aulas/agendar', {
                nome,
                data,
                horario,
                categoria: { id: categoriaId },
                professor: { id: professorId }
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSuccessMessage('Aula agendada com sucesso!');
            // Limpar os campos após o agendamento
            setNome('');
            setData('');
            setHorario('');
            setCategoriaId('');
            setProfessorId('');
            // Recarregar aulas agendadas
            const response = await api.get('/api/aulas', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAulasAgendadas(response.data);
        } catch (error) {
            console.error("Erro ao agendar aula:", error);
            setErrorMessage('Erro ao agendar aula: ' + (error.response?.data.message || 'Erro desconhecido'));
        }
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        if (window.confirm("Tem certeza que deseja excluir esta aula?")) {
            try {
                await api.delete(`/api/aulas/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setSuccessMessage('Aula excluída com sucesso!');
                // Recarregar aulas agendadas
                const response = await api.get('/api/aulas', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setAulasAgendadas(response.data);
            } catch (error) {
                console.error("Erro ao excluir aula:", error);
                setErrorMessage('Erro ao excluir aula: ' + (error.response?.data.message || 'Erro desconhecido'));
            }
        }
    };

    return (
        <div className="agendar-aula">
            <h2>Agendar Aula</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome da Aula:</label>
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
                </div>
                <div>
                    <label>Data:</label>
                    <input type="date" value={data} onChange={(e) => setData(e.target.value)} required />
                </div>
                <div>
                    <label>Horário:</label>
                    <input type="time" value={horario} onChange={(e) => setHorario(e.target.value)} required />
                </div>
                <div>
                    <label>Categoria:</label>
                    <select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)} required>
                      <option value="">Selecione uma categoria</option>
                      {Array.isArray(categorias) && categorias.map(categoria => (
                        <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                         ))}
                    </select>
                </div>
                <div>
                    <label>Professor:</label>
                    <select value={professorId} onChange={(e) => setProfessorId(e.target.value)} required>
                        <option value="">Selecione um professor</option>
                        {professores.map(professor => (
                            <option key={professor.id} value={professor.id}>{professor.nome}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Agendar Aula</button>
            </form>

            <h3>Aulas Agendadas</h3>
            <div className="aulas-agendadas">
                {aulasAgendadas.length === 0 ? (
                    <p>Nenhuma aula agendada.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Data</th>
                                <th>Horário</th>
                                <th>Categoria</th>
                                <th>Professor</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {aulasAgendadas.map(aula => (
                                <tr key={aula.id}>
                                    <td>{aula.nome}</td>
                                    <td>{new Date(aula.data).toLocaleDateString()}</td>
                                    <td>{aula.horario}</td>
                                    <td>{aula.categoria.nome}</td>
                                    <td>{aula.professor.nome}</td>
                                    <td>
                                        <button onClick={() => handleDelete(aula.id)}>Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Agenda;