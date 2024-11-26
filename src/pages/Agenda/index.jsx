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
    const [professorId, setProfessorId] = useState(''); // Novo estado para armazenar o ID do professor
    const [aulasAgendadas, setAulasAgendadas] = useState([]);

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

        fetchCategorias();
        fetchAulasAgendadas();
    }, []);

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

    const handleCategoriaChange = async (e) => {
        const selectedCategoriaId = e.target.value;
        setCategoriaId(selectedCategoriaId);

        try {
            const token = localStorage.getItem('token');
            const response = await api.get(`/api/professores/categoria/${selectedCategoriaId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProfessores(response.data);
        } catch (error) {
            console.error("Erro ao buscar professores:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        // Estrutura de dados para a aula
        const aulaData = {
            nome,
            data: new Date(data).toISOString(), // Certifique-se de que a data está no formato correto
            horario,
            categoria: { id: categoriaId },
            professor: { id: professorId } // Inclua o ID do professor
        };

        try {
            await api.post('/api/aulas/agendar', aulaData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Aula agendada com sucesso!');
            fetchAulasAgendadas(); // Atualiza a lista de aulas agendadas
        } catch (error) {
            console.error("Erro ao agendar aula:", error);
            alert('Erro ao agendar aula: ' + (error.response?.data.message || 'Erro desconhecido'));
        }
    };

    return (
        <div className="agendar-aula">
            <h2>Agendar Aula</h2>
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
                    <select value={categoriaId} onChange={handleCategoriaChange} required>
                        <option value="">Selecione uma categoria</option>
                        {categorias.map(categoria => (
                            <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Professor:</label>
                    <select value={professorId} onChange={(e) => setProfessorId(e.target.value)} required>
                        <option value="">Selecione um professor</option>
                        {professores.length > 0 ? (
                            professores.map(professor => (
                                <option key={professor.id} value={professor.id}>{professor.nome}</option>
                            ))
                        ) : (
                            <option value="" disabled>Nenhum professor disponível para esta categoria.</option>
                        )}
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
                                <th>Nome da Aula</th>
                                <th>Data</th>
                                <th>Horário</th>
                                <th>Categoria</th>
                                <th>Professor</th>
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