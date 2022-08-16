import React, { useEffect } from "react";
import factory from "../../ethereum/factory"

const CampaignIndex = () => {

    useEffect(() => {
        const details = async() => {
           const campaigns = await factory.methods.getDeployedCampaign().call()
           console.log(campaigns)
        }
        details()
    })

    return (
        <div>
            <h1>Campaign!!</h1>
        </div>
    )
}

export default CampaignIndex