import React, { useEffect, useState } from "react";
import factory from "../../ethereum/factory"
import { Link } from "../../routes"


const CampaignDashboard = () => {
    const [campaigns, setCampaigns] = useState([])

    useEffect(() => {
        const details = async () => {
            const campaigns = await factory.methods.getDeployedCampaign().call()
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
                        <Link route={`/campaigns/${campaign}`}>
                            <a>
                                <h3>View Campaign</h3>
                            </a>
                        </Link>
                    </div>
                })}
            </div>
            <div>
                <Link route="/campaigns/new">
                    <a>
                        <button>Create Campaign</button>
                    </a>
                </Link>
            </div>
        </div>
    )
}

export default CampaignDashboard