import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import campaign from "../../ethereum/campaign"

const IndividualCampaign = () => {
    const [summary, setSummary] = useState([])
    const router = useRouter()
    const address = router.asPath.slice(11)

    useEffect(() => {
        const details = async () => {
            const campaigns = campaign(address)
            const fetchedCampaignSummary = await campaigns.methods.campaignDetails().call()
            setSummary(fetchedCampaignSummary)
        }
        details()
    }, [])


    const fetchedSummary = {
        minimumContribution: summary[0],
        balance: summary[1],
        requestCount: summary[2],
        approversCount: summary[3],
        manager: summary[4]
}
    const {minimumContribution, balance, requestCount, approversCount, manager} = fetchedSummary

    return (
        <div>
            <h1>Campaign Show</h1>
        </div>
    )
}

export default IndividualCampaign