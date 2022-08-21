import React, { useState } from "react";
import campaign from '../../ethereum/campaign'
import web3 from "../../ethereum/web3";
import ContractModal from "../shared/modal/Modal";
import { Router } from "../../routes"

const ContributeForm = ({ address }) => {
    const [amount, setAmount] = useState('')
    const [error, setError] = useState('')
    const [modalIsOpen, setIsOpen] = useState(false);

    const handleChange = (e) => {
        setAmount(e.target.value)
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsOpen(true);
        setError('')

        try {
            const accounts = await web3.eth.getAccounts()
            const campaigns = campaign(address)
            await campaigns.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(amount, 'ether')
            })
            Router.reload()

        } catch (err) {
            setError(err.message)
        }
        setIsOpen(false);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h4>Contribute to this Campaign!</h4>
                <div>
                    <input
                        placeholder="Ether"
                        onChange={handleChange}
                        value={amount}
                    />
                </div>
                <p>{error}</p>
                <div>
                    <button>Contribute</button>
                </div>
            </form>
            <div>
                <ContractModal modalIsOpen={modalIsOpen} />
            </div>
        </div>
    )
}

export default ContributeForm