import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import campaign from "../../ethereum/campaign"
import ItemCard from "../shared/card/ItemCard";
import web3 from "../../ethereum/web3";
import ContributeForm from "../form/ContributeForm";

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
        balance: summary[0],
        minimumContribution: summary[1],
        requestCount: summary[2],
        approversCount: summary[3],
        manager: summary[4],
        campaignAddress: address
    }
    const { minimumContribution, balance, requestCount, approversCount, manager, campaignAddress } = fetchedSummary



    const items = [
        {
            headers: manager,
            title: "Address of Manager",
            description: "The manager created this campaign and can create request for withdrawal"
        },
        {
            headers: minimumContribution === undefined ? minimumContribution : web3.utils.fromWei(String(minimumContribution), 'ether'),
            title: "Minimum Contribution",
            description: "You must contribute at least this much Eth to become an approval"
        },
        {
            headers: balance === undefined ? balance : web3.utils.fromWei(String(balance), 'ether'),
            title: "Campaign Balance (ether)",
            description: "Remaining balance of the campaign"
        },
        {
            headers: requestCount,
            title: "Number of Request",
            description: "A request tries to withdraw money from the contract. Request must be approved by approvers"
        },
        {
            headers: approversCount,
            title: "Total Contributor",
            description: "Total number of people who have donated"
        },
    ]

    return (
        <div>
            <h1>Campaign Details</h1>
            <div>
                {
                    items.map((item, index) => (
                        <ItemCard {...item} key={index} />
                    ))
                }
            </div>
            <div>
                <ContributeForm address={campaignAddress} />
            </div>
        </div>
    )
}

export default IndividualCampaign