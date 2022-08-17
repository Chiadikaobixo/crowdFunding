import React, { useEffect, useState } from "react";
import factory from "../../ethereum/factory"


const CampaignIndex = () => {
    const [campaigns, setCampaigns] = useState([])

    useEffect(() => {
        const details = async () => {
            const campaigns = await factory.methods.getDeployedCampaign().call()
            console.log(campaigns)
            setCampaigns(campaigns)
        }
        details()
    }, [])

    return (
        <div>
            <div>
                <h1>Open Campaigns</h1>
            </div>
            <div>
                {campaigns.map((campaign, index) => {
                    return <div key={index}>
                        <p>{campaign}</p>
                        <h3>View Campaign</h3>
                    </div>
                })}
            </div>
            <div>
                <button>Create Campaign</button>
            </div>
        </div>
    )
}

export default CampaignIndex