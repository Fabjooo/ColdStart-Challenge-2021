const { getUser } = require('../shared/user-utils');
const { v4: uuidv4 } = require('uuid');

module.exports = async function (context, req) {
  // Get the user details from the request
  const user = getUser(req);
  if (!user) {
    context.res.status(401);
    return;
  }

  // Get the pre-order from the request
  
  //add the pre-order JSON document in a queue
  try {
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
  } catch (error) {
    context.res = {
      status: 500,
      body: error
    };
    return;
  }

  context.res.status(201);
};
