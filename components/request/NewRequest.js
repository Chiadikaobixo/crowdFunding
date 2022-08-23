import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import campaign from "../../ethereum/campaign"
import web3 from '../../ethereum/web3'
import { Router } from "../../routes"
import ContractModal from '../shared/modal/Modal'

export default function NewRequest() {
    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState('')
    const [recipient, setRecipient] = useState('')
    const [error, setError] = useState('')
    const [modalIsOpen, setIsOpen] = useState(false)
    const [accounts, setAccounts] = useState([])
    const router = useRouter()
    const path = router.asPath.slice(11)
    const address = path.substring(0, path.length - 12)

    useEffect(() => {
        const chiadi = async () => {
            const res = await web3.eth.getAccounts()
            setAccounts(res)
        }
        chiadi()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsOpen(true)
        setError('')

        try {
            const campaigns = campaign(address)
            await campaigns.methods.createRequest(
                description,
                web3.utils.toWei(amount, 'ether'),
                recipient).send({
                    from: accounts[0]
                })
            Router.pushRoute(`/campaigns/${address}/request`)
        } catch (err) {
            setError(err.message)
        }
        setIsOpen(false)
        setDescription('')
        setAmount('')
        setRecipient('')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h4>New Request</h4>
                <div>
                    <label>Description</label>
                    <input
                        placeholder="purpose"
                        onChange={(e) => { setDescription(e.target.value), setError('') }}
                        value={description}
                    />
                </div>
                <div>
                    <label>Amount in Ether</label>
                    <input
                        placeholder="Ether"
                        onChange={(e) => { setAmount(e.target.value), setError('') }}
                        value={amount}
                    />
                </div>
                <div>
                    <label>Recipient</label>
                    <input
                        placeholder="0x8ca.."
                        onChange={(e) => { setRecipient(e.target.value), setError('') }}
                        value={recipient}
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
