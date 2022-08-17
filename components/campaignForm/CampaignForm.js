import React, { useState } from "react";

const CampaignForm = () => {
    const [value, setValue] = useState('')

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    return (
        <div>
            <div>
                <h3>Create a Campaign</h3>
            </div>
            <hr />
            <form >
                <h4>Minimum Contribution (wei)</h4>
                <div>
                    <input
                        placeholder="100 wei"
                        onChange={handleChange}
                        value={value}
                    />
                </div>
                <button>Create</button>
            </form>
        </div>
    )
}

export default CampaignForm