pragma solidity ^0.5.16;

contract Purchase{
    
    uint256 public value;
    address payable public buyer;
    address payable public seller;
    
    event PurchaseConfirmed();
    event PurchaseDeclined();
    event ItemRecieved();
    
    enum State { Created, Locked, Inactive }
    
    State public state;
 
    modifier onlyBuyer(){
        require(buyer == msg.sender);
        _;
    }
    
    modifier onlySeller(){
        require(seller == msg.sender);
        _;
    }
    
    modifier inState(State _state){
        require(state == _state);
        _;
    }

    constructor() public payable {
        seller = msg.sender;
        value = msg.value;
        state = State.Created;
    }
    
    function confirmPurchase() public inState(State.Created) payable {
        emit PurchaseConfirmed();
        buyer = msg.sender;
        state = State.Locked;
    }
    
    function abortPurchase() public inState(State.Created) onlySeller {
        emit PurchaseDeclined();
        state = State.Inactive;
        seller.transfer(address(this).balance);
    }
    
    function confirmReceived() public inState(State.Locked) onlyBuyer {
        emit ItemRecieved();
        state = State.Inactive;
        buyer.transfer(value);
        seller.transfer(address(this).balance);
    }
    
}
