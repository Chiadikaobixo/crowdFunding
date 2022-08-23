const routes = require('next-routes-extended')

                                                   
module.exports = routes()                           
.add('/campaigns/new', 'campaigns/new')
.add('/campaigns/:address', 'campaigns/show')  
.add('/campaigns/:address/request', 'campaigns/request/index')
.add('/campaigns/:address/request/new', 'campaigns/request/new')