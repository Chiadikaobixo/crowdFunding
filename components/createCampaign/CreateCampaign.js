import React, { useState } from "react";
import factory from "../../ethereum/factory"
import web3 from "../../ethereum/web3";
import Modal from 'react-modal';
import { Router } from "../../routes"


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        color: 'darkblue'
    },
};

Modal.setAppElement('div')


const CreateCampaign = () => {
    const [minimumContribution, setminimumContribution] = useState('')
    const [error, setError] = useState('')
    const [modalIsOpen, setIsOpen] = React.useState(false);

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
            await factory.methods.createCampaign(minimumContribution).send({
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
                <h4>Minimum Contribution (wei)</h4>
                <div>
                    <input
                        placeholder="100 wei"
                        onChange={handleChange}
                        value={minimumContribution}
                    />
                </div>
                <p>{error}</p>
                <div>
                    <button>Create</button>
                </div>
            </form>
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
            >
                <div>Your transaction been processed</div>
                <h4>Please wait</h4>
            </Modal>
        </div>
    )
}

export default CreateCampaign