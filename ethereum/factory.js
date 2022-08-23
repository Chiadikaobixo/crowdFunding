import web3 from "./web3";
import campaignFactory from './build/CampaignFactory.json'

const address = "0x42C7b6DdFA1df81AAAE2905Aa4cBe0245124fe70"

const instance = new web3.eth.Contract(campaignFactory.abi, address);

export default instance