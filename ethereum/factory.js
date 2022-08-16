import web3 from "./web3";
import campaignFactory from './build/CampaignFactory.json'

const address = "0x97191e658187C1E29bEBF6bd2b3cD805F64fE102"

const instance = new web3.eth.Contract(campaignFactory.abi, address);

export default instance