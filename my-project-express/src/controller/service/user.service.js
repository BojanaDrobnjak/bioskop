/*--------------------------------------------------------*/

function generateRandomCode() {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 15; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function confirmAccount(confirmationCode) {
  let user = getUserByConfirmationCode(confirmationCode);
  if (user) {
  } else {
  }
}

exports.generateRandomCode = generateRandomCode;
