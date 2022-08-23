import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import campaign from '../../ethereum/campaign'
import RequestRow from './RequestRow'
import { Link } from "../../routes"
import web3 from '../../ethereum/web3'

const RequestDashboard = () => {
    const router = useRouter()
    const path = router.asPath.slice(11)
    const address = path.substring(0, path.length - 8)
    const [request, setRequest] = useState([])
    const [approversCount, setApprovesCount] = useState('')
    const [accounts, setAccounts] = useState([])
    const [manager, setManager] = useState('')


    useEffect(() => {
        const details = async () => {
            const campaigns = campaign(address)
            const requestCount = await campaigns.methods.getRequestCount().call()
           
            const fetchedRequests = await Promise.all(
                Array(requestCount++).fill().map((element, index) => {
                    return campaigns.methods.requests(index).call()
                })
            )

            const approvers = await campaigns.methods.approversCount().call()
            const res = await web3.eth.getAccounts()
            const managerId = await campaigns.methods.manager().call()

            setRequest(fetchedRequests)
            setApprovesCount(approvers)
            setAccounts(res)
            setManager(managerId)
        }
        details()
    }, [])

    return (
        <div>
            <h3>Request</h3>
            {manager === accounts[0] ? (
            <div>
                <Link route={`/campaigns/${address}/request/new`}>
                    <a>
                        <button>Create Request</button>
                    </a>
                </Link>
            </div>

            ) : ('')}
            <div className="App">
                <table>
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Recipient</th>
                            <th>Approval Count</th>
                            <th>Approve</th>
                            <th>Finalize</th>
                        </tr>
                    </tbody>
                </table>
                {
                    request.map((req, index) => (
                        <RequestRow
                            request={req}
                            key={index}
                            id={index}
                            address={address}
                            approversCount={approversCount}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default RequestDashboard 