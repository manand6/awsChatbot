export default function() {
  return Promise.resolve({
    json: () =>
      Promise.resolve(
      {
          "userName": "Chandru Kumar",
          "savingAccount": {
              "accountNumber": "656888",
              "accountBalance": "8000"
          },
          "currentAccount": {
              "accountNumber": "098458725",
              "accountBalance": "35000"
          },
          "validUser": false
      }
          )
 
  })
}
