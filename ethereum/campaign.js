import web3 from "./web3";
import campaign from "./build/Campaign.json"

const instance = (address) => {
    return new web3.eth.Contract(campaign.abi, address)
}
export default instance