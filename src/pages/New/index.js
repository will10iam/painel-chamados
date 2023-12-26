import './index.css'
import Sidebar from '../../components/Sidebar'
import Title from '../../components/Title'
import { FiPlusCircle } from 'react-icons/fi'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import { db } from '../../services/firebaseConection'
import { collection, getDocs, getDoc, doc, addDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'

const listRef = collection(db, "customers");

export default function New() {
    const { user } = useContext(AuthContext)

    const [customerSelected, setCustomerSelected] = useState(0);

    const [customers, setCustomers] = useState([])
    const [loadCustomer, setLoadCustomer] = useState(true)

    const [complemento, setComplemento] = useState('')
    const [assunto, setAssunto] = useState('Suporte')
    const [status, setStatus] = useState('Aberto')

    useEffect(() => {

        async function loadCustomers() {
            const querySnapshot = await getDocs(listRef)
                .then((snapshot) => {
                    let lista = [];

                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            nomeFantasia: doc.data().nomeFantasia
                        })
                    })

                    if (snapshot.docs.size === 0) {
                        console.log("NENHUMA EMPRESA ENCONTRADA");
                        setCustomers([{ id: '1', nomeFantasia: "FREELA" }])
                        setLoadCustomer(false)
                        return;
                    }

                    setCustomers(lista)
                    setLoadCustomer(false)
                })
                .catch((error) => {
                    console.log("ERRO AO BUSCAR OS CLIENTES", error)
                    setLoadCustomer(false)
                    setCustomers([{ id: '1', nomeFantasia: "FREELA" }])
                })
        }
        loadCustomers();
    }, [])

    function handleOptionChange(e) {
        setStatus(e.target.value);
    }

    function handleChangeSelect(e) {
        setAssunto(e.target.value);
    }

    function handleChangeCustomer(e) {
        setCustomerSelected(e.target.value)
    }

    async function handleRegister(e) {
        e.preventDefault();

        await addDoc(collection(db, "chamados"), {
            created: new Date(),
            cliente: customers[customerSelected].nomeFantasia,
            clienteID: customers[customerSelected].id,
            assunto: assunto,
            complemento: complemento,
            status: status,
            userID: user.uid,
        })
            .then(() => {
                toast.success("CHAMADO REGISTRADO COM SUCESSO")
                setComplemento('')
                setCustomerSelected(0)
            })
            .catch((error) => {
                toast.error("ERRO AO REGISTRAR, VERIFIQUE OS CAMPOS E TENTE NOVAMENTE!")
                console.log(error);
            })
    }

    return (
        <div>
            <Sidebar />

            <div className='content'>
                <Title name="Novo Chamado">
                    <FiPlusCircle size={25} />
                </Title>

                <div className='container'>
                    <form className='form-profile' onSubmit={handleRegister}>
                        <label>Cliente</label>
                        {loadCustomer ? (
                            <input type='text' disabled={true} value="Carregando..." />
                        ) : (
                            <select value={customerSelected} onChange={handleChangeCustomer}>
                                {customers.map((item, index) => {
                                    return (
                                        <option key={index} value={index}>
                                            {item.nomeFantasia}
                                        </option>
                                    )
                                })}
                            </select>
                        )
                        }

                        <label>Assunto</label>
                        <select value={assunto} onChange={handleChangeSelect}>
                            <option value="Suporte">Suporte</option>
                            <option value="Visita Tecnica">Visita Técnica</option>
                            <option value="Financeiro">Financeiro</option>
                        </select>

                        <label>Status</label>
                        <div className='status'>
                            <input
                                type="radio"
                                name='radio'
                                value="Aberto"
                                onChange={handleOptionChange}
                                checked={status === 'Aberto'}
                            />
                            <span>Em Aberto</span>

                            <input
                                type="radio"
                                name='radio'
                                value="Progresso"
                                onChange={handleOptionChange}
                                checked={status === 'Progresso'}
                            />
                            <span>Progresso</span>

                            <input
                                type="radio"
                                name='radio'
                                value="Atendido"
                                onChange={handleOptionChange}
                                checked={status === 'Atendido'}
                            />
                            <span>Atendido</span>

                        </div>

                        <label>Complemento</label>
                        <textarea
                            type="text"
                            placeholder='Descreva seu problema.'
                            value={complemento}
                            onChange={(e) => setComplemento(e.target.value)}
                        />

                        <button type="submit">Registrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}