import { useState } from "react"

import Header from "../../components/Sidebar"
import Title from "../../components/Title"

import { FiUser } from "react-icons/fi"

import { db } from "../../services/firebaseConection"
import { addDoc, collection } from "firebase/firestore"
import { toast } from "react-toastify"





export default function Customers() {
    const [nome, setNome] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [endereco, setEndereco] = useState('')


    async function handleRegister(e) {
        e.preventDefault();

        if (nome !== '' && cnpj !== '' && endereco !== '') {
            await addDoc(collection(db, "customers"), {
                nomeFantasia: nome,
                cnpj: cnpj,
                endereco: endereco
            })
                .then(() => {
                    setNome('')
                    setCnpj('')
                    setEndereco('')
                    toast.success("Cadastrado com sucesso")
                })
                .catch((error) => {
                    console.log(error);
                    toast.error("Erro ao fazer ao cadastro!")
                })
        } else {
            toast.error("Preencha os campos corretamente")
        }
    }


    return (
        <>
            <Header />

            <div className="content">
                <Title name="Clientes">
                    <FiUser size={25} />
                </Title>


                <div className="container">
                    <form className="form-profile" onSubmit={handleRegister}>
                        <label>Nome do Cliente</label>
                        <input
                            type="text"
                            placeholder="insira o nome do cliente"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />

                        <label>CNPJ</label>
                        <input
                            type="number"
                            placeholder="insira o CNPJ do cliente"
                            value={cnpj}
                            onChange={(e) => setCnpj(e.target.value)}
                        />

                        <label>Endereço</label>
                        <input
                            type="text"
                            placeholder="insira o endereço do cliente"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                        />

                        <button type="submit">Salvar</button>
                    </form>
                </div>
            </div>

        </>
    )
}