import React, { useState } from "react";
import factory from "../../ethereum/factory"
import web3 from "../../ethereum/web3";
import { Router } from "../../routes"
import ContractModal from "../shared/modal/Modal";


const CreateCampaign = () => {
    const [minimumContribution, setminimumContribution] = useState('')
    const [error, setError] = useState('')
    const [modalIsOpen, setIsOpen] = useState(false);

    const handleChange = (e) => {
        setminimumContribution(e.target.value)
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsOpen(true);
        setError('')
        try {
            const accounts = await web3.eth.getAccounts()
            await factory.methods.createCampaign(web3.utils.toWei(minimumContribution, 'ether')).send({
                from: accounts[0]
            })
            Router.pushRoute('/')
        } catch (err) {
            setError(err.message)
        }
        setIsOpen(false);
    }

    return (
        <div>
            <div>
                <h3>Create a Campaign</h3>
            </div>
            <hr />
            <form onSubmit={handleSubmit}>
                <h4>Minimum Contribution (Eth)</h4>
                <div>
                    <input
                        placeholder="ether"
                        onChange={handleChange}
                        value={minimumContribution}
                    />
                </div>
                <p>{error}</p>
                <div>
                    <button>Create</button>
                </div>
            </form>
            <div>
                <ContractModal modalIsOpen={modalIsOpen} />
            </div>
        </div>
    )
}

export default CreateCampaign