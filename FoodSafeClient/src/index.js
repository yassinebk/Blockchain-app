const Web3= require("web3");
CryptoJs= require("crypto-js")

var web3 = new Web3(Web3.givenProvider);
console.log("web3",web3)

var foodSafeABI, foodSafeContract, account;

window.App = {
    start: async function () {
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        web3.eth.defaultAccount = accounts[0];

        const Http = new XMLHttpRequest();
        const url= 'http://localhost:3000'
        Http.open("GET",url);
        Http.send();
        Http.onreadystate = function () {
            var output = JSON.parse(this.response);
            foodSafeCode = output.contracts[":FoodSafe"].bytecode.metadata;
            var metadata = JSON.parse(output.contracts[":FoodSafe"].metadata);
            foodSafeABI = metadata.output.abi;
            foodSafeContract = new web3.eth.Contract(foodSafeABI);
            console.log(foodSafeContract);
        }
    }
,
    createContract: function () {
        foodSafeContract.deploy({ data: foodSafeCode }).send({ from: account, data: FoodSafeCode, gas: 3000000 })
            .on('confirmation', function (confirmationNumber, receipt) { })
            .then(function (newContractInstance) {
                deployedContract = newContractInstance;
                document.getElementById("contractAddress").value = deployedContract.options.address;
        })

    },

    addNewLocation: function () {
        var contractAddress = document.getElementById("contractAddress").value;
        var deployedFoodSafe = new web3.eth.Contract(foodSafeABI, contractAddress, { from: account, gas: 3000000 });
        var locationId = document.getElementById("locationId").value;
        var locationName = document.getElementById("locationName").value;
        var locationSecret = document.getElementById("locationSecret").value;
        var passPhrase= document.getElementById("passPhrase").value;
        var encryptedSecret = CryptoJs.AES.encrypt(locationSecret, passPhrase).toString();
        deployedFoodSafe.methods.AddNewLocation(locationId, locationName, encryptedSecret);
    },

    getCurretnLocation: function () {
        var contractAddress = document.getElementById("contractAddress").value;
        var deployedFoodSafe = new web3.eth.Contract(foodSafeABI, contractAddress, { from:web3.eth.defaultAccount,gas:3000000})
        var passPhrase = document.getElementById("passPhrase").value;
        deployedFoodSafe.methods.GetTrailCount().call.then(function (returnValues) {
            document.getElementById("locationName").value = returnValues[0];
            document.getElementById("locationId").value = returnValues[1];
            var encryptedSecret = returnValues[4];
            var decryptedSecret = CryptoJs.AES.decrypt(encryptedSecret, passPhrase).toString(CrypotJs.enc.utf8);
            document.getElementById("secret").value = decryptedSecret;

        })
    }
}

window.addEventListener("load", () => {
    App.start();
})
