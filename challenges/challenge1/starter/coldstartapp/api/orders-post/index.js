const { getUser } = require('../shared/user-utils');
const { v4: uuidv4 } = require('uuid');

module.exports = async function (context, req) {
  // Get the user details from the request
  const user = getUser(req);

  // Get the pre-order from the request
  
  //add the pre-order JSON document in a queue
  context.bindings.preOrder = {
    Id: uuidv4(),
    User: user.userDetails,
    Date: Date.now,
    IcecreamId: req.body.productId,
    Status: 'New',
    DriverId: null,
    FullAddress: '1 Microsoft Way, Redmond, WA 98052, USA',
    LastPosition: null
  };

  context.res.status(201);
};
