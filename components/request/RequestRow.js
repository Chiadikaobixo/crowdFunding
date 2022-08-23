import React, { useEffect, useState } from 'react'
import web3 from '../../ethereum/web3'
import campaign from "../../ethereum/campaign"
import ContractModal from '../shared/modal/Modal'
import { Router } from "../../routes"

export default function RequestRow({ id, request, approversCount, address }) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [error, setError] = useState('')
    const [manager, setManager] = useState('')
    const [campaigns, setCampaigns] = useState(null)
    const [accounts, setAccounts] = useState([])

    useEffect(() => {
        const details = async () => {
            const mycampaigns = campaign(address)
            const res = await mycampaigns.methods.manager().call()
            const accountDetails = await web3.eth.getAccounts()
            setManager(res)
            setCampaigns(mycampaigns)
            setAccounts(accountDetails)
        }
        details()
    }, [])

    const handleClick = async () => {
        setIsOpen(true);
        setError('')

        try {
            await campaigns.methods.approveRequest(id).send({
                from: accounts[0]
            })
            Router.reload()

        } catch (err) {
            setError(err.message)
        }
        setIsOpen(false);
    }

    const finalizeClick = async () => {
        setIsOpen(true);
        setError('')

        try {
            await campaigns.methods.finalizeRequest(id).send({
                from: accounts[0]
            })
            Router.reload()

        } catch (err) {
            setError(err.message)
        }
        setIsOpen(false);
    }
    
    return (
        <div>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>{id}</td>
                            <td>{request.description}</td>
                            <td>{web3.utils.fromWei(request.value, 'ether')}</td>
                            <td>{request.recipient}</td>
                            <td>{request.approvalVoteCount}/{approversCount}</td>
                            <td>
                                {request.complete ? (
                                    <button disabled>
                                        Approve
                                    </button>
                                ) : (
                                    <button onClick={handleClick}>
                                        Approve
                                    </button>
                                )}
                            </td>
                            <td>
                                {manager === accounts[0] && !request.complete ? (
                                    <button onClick={finalizeClick}>
                                        Finalize
                                    </button>
                                ) : ('')}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>{error}</p>
            <div>
                <ContractModal modalIsOpen={modalIsOpen} />
            </div>
        </div>
    )
}
