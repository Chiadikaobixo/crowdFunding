import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import campaign from '../../ethereum/campaign'
import RequestRow from './RequestRow'

const RequestDashboard = () => {
    const router = useRouter()
    const path = router.asPath.slice(11)
    const address = path.substring(0, path.length - 8)
    const [request, setRequest] = useState([])
    const [count, setCount] = useState('')
    const [approversCount, setApprovesCount] = useState('')


    useEffect(() => {
        const details = async () => {
            const campaigns = campaign(address)
            const requestCount = await campaigns.methods.getRequestCount().call()

            const fetchedRequests = await Promise.all(
                Array(requestCount).fill().map((element, index) => {
                    return campaigns.methods.requests(index).call()
                })
            )

            const approvers = await campaigns.methods.approversCount().call()

            setCount(requestCount)
            setRequest(fetchedRequests)
            setApprovesCount(approvers)
        }
        details()
    }, [])
    
    return (
        <div>
            <h3>Request</h3>
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