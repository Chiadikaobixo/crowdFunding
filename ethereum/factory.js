import web3 from "./web3";
import campaignFactory from './build/CampaignFactory.json'

const address = "0xd345e035EBE32995ffD14292ED1D1630B94d3E26"

const instance = new web3.eth.Contract(campaignFactory.abi, address);

export default instance