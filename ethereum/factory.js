import web3 from "./web3";
import campaignFactory from './build/CampaignFactory.json'

const address = "0x968189168194976F6AF6D5616aa7642026Ca659B"

const instance = new web3.eth.Contract(campaignFactory.abi, address);

export default instance