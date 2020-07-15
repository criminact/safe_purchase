window.addEventListener('load', async () => {
  // New web3 provider
  if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
          // ask user for permission
          await ethereum.enable();
          // user approved permission
      } catch (error) {
          // user rejected permission
          console.log('user rejected permission');
      }
  }
  // Old web3 provider
  else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider);
      // no need to ask for permission
  }
  // No web3 provider
  else {
      console.log('No web3 provider detected');
  }
});

console.log(window.web3.currentProvider);

// contractAddress and abi are setted after contract deploy
var abi = JSON.parse('[ { "inputs": [], "payable": true, "stateMutability": "payable", "type": "constructor" }, { "anonymous": false, "inputs": [], "name": "ItemRecieved", "type": "event" }, { "anonymous": false, "inputs": [], "name": "PurchaseConfirmed", "type": "event" }, { "anonymous": false, "inputs": [], "name": "PurchaseDeclined", "type": "event" }, { "constant": false, "inputs": [], "name": "abortPurchase", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "buyer", "outputs": [ { "internalType": "address payable", "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "confirmPurchase", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [], "name": "confirmReceived", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "seller", "outputs": [ { "internalType": "address payable", "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "state", "outputs": [ { "internalType": "enum Purchase.State", "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "value", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" } ]');
var bytecode = '0x608060405233600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550346000819055506000600260146101000a81548160ff0219169083600281111561006b57fe5b02179055506105b08061007f6000396000f3fe6080604052600436106100705760003560e01c80637380b4a71161004e5780637380b4a71461014e57806373fac6f014610165578063c19d93fb1461017c578063d6960697146101b557610070565b806308551a53146100755780633fa4f245146100cc5780637150d8ae146100f7575b600080fd5b34801561008157600080fd5b5061008a6101bf565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156100d857600080fd5b506100e16101e5565b6040518082815260200191505060405180910390f35b34801561010357600080fd5b5061010c6101eb565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561015a57600080fd5b50610163610211565b005b34801561017157600080fd5b5061017a610359565b005b34801561018857600080fd5b506101916104a1565b604051808260028111156101a157fe5b60ff16815260200191505060405180910390f35b6101bd6104b4565b005b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60005481565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080600281111561021f57fe5b600260149054906101000a900460ff16600281111561023a57fe5b1461024457600080fd5b3373ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161461029e57600080fd5b7fad005e400c60c62fb9d4afcdc6704c92b896681f0f35988e071bf968be438c9260405160405180910390a160028060146101000a81548160ff021916908360028111156102e857fe5b0217905550600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc479081150290604051600060405180830381858888f19350505050158015610355573d6000803e3d6000fd5b5050565b600180600281111561036757fe5b600260149054906101000a900460ff16600281111561038257fe5b1461038c57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146103e657600080fd5b7fddb101f17feed7667a6cbdb9ed598053957a877f10ca3eb638deb2a1cc0cc05f60405160405180910390a160028060146101000a81548160ff0219169083600281111561043057fe5b0217905550600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc479081150290604051600060405180830381858888f1935050505015801561049d573d6000803e3d6000fd5b5050565b600260149054906101000a900460ff1681565b60008060028111156104c257fe5b600260149054906101000a900460ff1660028111156104dd57fe5b146104e757600080fd5b7fd5d55c8a68912e9a110618df8d5e2e83b8d83211c57a8ddd1203df92885dc88160405160405180910390a133600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001600260146101000a81548160ff0219169083600281111561057357fe5b02179055505056fea265627a7a723158208ca8dd823b56864a11d5fbbcfc43894604ef3563dcd317df35a306e3191c3c2064736f6c63430005100032';
var deploy_contract = web3.eth.contract(abi);
var searchContract = web3.eth.contract(abi);

var account;

web3.eth.getAccounts(function(err, accounts) {
  if (err != null) {
    alert("Error retrieving accounts.");
    return;
  }
  if (accounts.length == 0) {
    alert("No account found! Make sure the Ethereum client is configured properly.");
    return;
  }
  account = accounts[0];
  console.log('Account: ' + account);
  web3.eth.defaultAccount = account;
});

function overlayON(){
  document.getElementById("overlay").style.display = "block";
}

function overlayOFF(){
  document.getElementById("overlay").style.display = "none";
}

function copyText(){
  var copyText = document.getElementById("contract_address");
  var copiedText = copyText.textContent;
  navigator.clipboard.writeText(copiedText);
  alert("Content Copied - " + copiedText);
}

var useContract;

function searchContractAll(){
  var searchAddress = document.getElementById("search_contract").value;
  useContract = searchContract.at(searchAddress);

  console.log(useContract);

//0x5849c2cf40b3b85bfcd76419b1bd447e98722f12
  doItAll(useContract, setItAll);
}

var price, parameter;

function contractCreation(){

  //text hide
  //document.getElementById("text").style.display = "none";
  //show loading bar
document.getElementById("creating").style.display = "block";

price = document.getElementById("price").value;

console.log(price);

parameter = {
    from: account,
    data: bytecode,
    value: web3.utils.toWei(price, 'ether'), //price
    gas: '4700000',
}

//deploy_contract.new(payload, parameter).then()

deploy_contract.new(parameter, function(err, result){
  if(err) {
            console.error(err);
            return;
        } else{

            myContract = result;
            document.getElementById("contract_address").style.display = "block";
            document.getElementById("address_copy").style.display = "block";
            //clicking button will copy the address to clipboard
            document.getElementById("contract_address").innerHTML = myContract.address;
          
            console.log('address: ' + myContract.address);
            //show loading bar
            document.getElementById("creating").style.display = "none";
            //overlayOFF();
            //get contract details
        }
});

}

var value, buyer, seller, state;

function buyProduct(){
  useContract.confirmPurchase({from: account, value: web3.utils.toWei(value.toString(), 'ether'), gas: '4700000'}, function(err, result){
      console.log(result);
      doItAll(useContract, setItAll);
  });
}

function endContract(){
  useContract.abortPurchase(function(err, result){
      console.log(result);
      doItAll(useContract, setItAll);
  });
}

function reciContract(){
  useContract.confirmReceived(function(err, result){
      console.log(result);
      doItAll(useContract, setItAll);
  })
}


function setItAll(){
      document.getElementById("contract_main").innerHTML = '<h1>Safe Buy Contract</h1><p>This is an example contract between a buyer and a seller.</p><hr><h4>Value</h4><h5 id="value">' + value + ' Ethers</h5><br><h4>Buyer</h4><h5 id="buyer">' + buyer +'</h5><br><h4>Seller</h4><h5 id="seller">' + seller + '</h5><br><h4>State</h4><h5 id="state">' + state + '</h5><br><p>Do you wanna buy this Product?</p><a onclick="buyProduct()" class="btn btn-primary btn-sm" style="color: #ffffff" role="button">Confirm, Buy</a><a onclick="endContract();" class="btn btn-danger btn-sm float-right" style="color: #ffffff" role="button">End Contract</a><hr><p>Already bought, Have you recieved the product yet?</p><a onclick="reciContract()" class="btn btn-primary btn-sm" style="color: #ffffff" role="button">Yes, Recieved</a>';
}

function doItAll(useContract, callback){
    useContract.buyer(function (err, result){
      if(result != undefined){
      buyer = result;
      }else{
        buyer = "No buyer yet";
      }
  });

  useContract.seller(function (err, result){
      seller = result;
  });

  useContract.state(function (err, result){
      state = result.c[0];
      if(state == 0){
        state = "Created";
      }else if(state == 1){
          state = "Locked";
      }else{
          state = "Inactive";
      }
      callback();
  });

  useContract.value(function (err, result){
      value = result.c[0]/10000;
  });

  callback();
}


// Accounts

