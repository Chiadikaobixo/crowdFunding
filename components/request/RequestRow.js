import React from 'react'
import web3 from '../../ethereum/web3'

export default function RequestRow({id, request, approversCount}) {
console.log(approversCount)
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
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
