const assert = require('assert')
const ganache = require("ganache");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json')
const compiledCampaign = require('../ethereum/build/Campaign.json')


beforeEach(async () => {
    // Get a list of all account
    accounts = await web3.eth.getAccounts()

    // use one of those account to deploy the contract
    factory = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({ data: compiledFactory.evm.bytecode.object })
        .send({ from: accounts[0], gas: '10000000' })
    
    await factory.methods.createCampaign('100').send({
        from: accounts[0],
        gas: '10000000'
    })    

    const [campaignAddress] = await factory.methods.getDeployedCampaign().call()
    
    campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress)

})

describe('Campaign', () => {
    it('deploys factory and a campaign', () => {
        assert.ok(factory.options.address)
        assert.ok(campaign.options.address)
    })

    it('marks caller as the campaign manager', async() => {
        const manager = await campaign.methods.manager().call()
        assert.equal(accounts[0], manager)
    })

    it('allows people to contribute money and mark them as contributor', async() => {
        await campaign.methods.contribute().send({
            value: '150',
            from: accounts[1]
        })
        const isContributor = await campaign.methods.approvers(accounts[1]).call()
        assert(isContributor)
    })

    it('requires minimum contribution', async() => {
        try {
            await campaign.methods.contribute().send({
                value: '10',
                from: accounts[1]
            })
            assert(false)
        } catch (error) {
            assert(error)
        }
    })

    it('allows a manager to make a payment request', async() => {
        await campaign.methods
        .createRequest('building a fintech company', '150', accounts[1])
        .send({
            from: accounts[0],
            gas: '10000000'
        })
        const request = await campaign.methods.requests(0).call()
        assert.ok('building a fintech company', request.description)
    })

    it('process requests', async() => {
        await campaign.methods.contribute().send({
            value: web3.utils.toWei('10', 'ether'),
            from: accounts[0]
        })

        await campaign.methods
        .createRequest('fintech company', web3.utils.toWei('5', 'ether'), accounts[1])
        .send({
            from: accounts[0],
            gas: '10000000'
        })

        await campaign.methods.approveRequest(0).send({
            from: accounts[0],
            gas: '10000000'
        })

        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas: '10000000'
        })

        let balance = await web3.eth.getBalance(accounts[1])
        balance = web3.utils.fromWei(balance, 'ether')
        balance = parseFloat(balance)
        assert(balance > 1003)
    })
})