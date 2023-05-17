//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
interface IERC20 {
    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `to`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `from` to `to` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}

contract GameingApp {
    IERC20 public tokenContract;
    uint tokendecimal;
    uint256 public paymentFee = (2320000 * (10 ** tokendecimal));
    address paymentAddress;
    enum GameState {
        NOTLIVE,
        LIVE,
        PAYMENTPENDING,
        PAYMENTCOMPLETED,
        GAMEENDED
    }

    struct GameOpening {
        uint256 id;
        address gameOwner;
        string gameName;
        uint256 timeFrame;
        uint8 minNumberRange;
        uint8 maxNumberRange;
        uint256 minPaymentAmount;
        uint256 outcome;
        uint256 gameState;
        string image;
        uint creatorEarnings;
        bool creatorPaid;
        string description;
    }

    struct BettedAmount {
        uint256 betid;
        uint256 amount;
        address userBetting;
    }
   
    address public platformAddress = 0x84b1d1f669BA9f479F23AD6D6562Eb89EDDb7741;
    BettedAmount[]  public userBettedAmount;
    mapping(uint256 => GameOpening) public gameCollection;
    GameOpening[] public  gameOpeningCollection;
    uint public usersBettedNumber = 0;
    uint public creatorsNumber = 0;


    struct GameBetting {
        uint256 gameid;
        string gameName;
        address userAddress;
        uint256 userNumber;
        uint256 userAmount;
        uint256 userTimestamp;
    }

    GameBetting[] public usersBetCollection;
     GameBetting[] public winnerCollection;
    modifier onlyOwner() {
        require(paymentAddress == msg.sender, "only owner can call function");
        _;
    }

event CreatedBetEvent(uint gameCreationId); 



    constructor(address tokenAddress, uint _tokendecimal) {
        tokenContract = IERC20(tokenAddress);
        paymentAddress = msg.sender;
        tokendecimal = _tokendecimal;
    }

    function getOwnersGame(uint256 _gameid)
        external
        view
        returns (GameOpening memory)
    {
        GameOpening memory ownersGame = gameCollection[_gameid];
        return ownersGame;
    }

    function resetPaymentAmount(uint256 _amount) public onlyOwner {
        paymentFee = _amount * (10 ** tokendecimal);
    }

    function resetPaymentAddress(address _newOwner) public onlyOwner {
        paymentAddress = _newOwner;
    }

    function generateId() private view returns (uint256) {
        return
            uint256(keccak256(abi.encodePacked(msg.sender, block.timestamp))) /
            1e65;
    }


    function createBet(
        string memory _gameName,
        uint256 _timeframe,
        uint8 _minNumber,
        uint8 _maxNumber,
        uint256 _minPayment,
        string memory _image,
        string memory _description
    ) public payable {
        require(_timeframe > block.timestamp, "timestamp must be in future");
        require(_minPayment > 0, "minPayment must be greater than zero");
        uint256 generatedGameId;
        generatedGameId = generateId();
        gameCollection[generatedGameId] = GameOpening(
            generatedGameId,
            msg.sender,
            _gameName,
            _timeframe,
            _minNumber,
            _maxNumber,
          ( _minPayment * (10 ** tokendecimal)),
            0,
            uint256(GameState.LIVE),
            _image,
            0,
            false,
            _description
        );
          gameOpeningCollection.push(GameOpening(
            generatedGameId,
            msg.sender,
            _gameName,
            _timeframe,
            _minNumber,
            _maxNumber,
            (_minPayment * (10 ** tokendecimal)),
            0,
            uint256(GameState.LIVE),
            _image,
            0,
            false,
            _description
        ));
        creatorsNumber += 1 ;
        emit CreatedBetEvent(generatedGameId);

    }

    function userBetOnGame(
        uint256 _gameId,
        uint256 _betNumber,
        uint256 _betAmount
    ) external {
        GameOpening memory betgame = gameCollection[_gameId];
        require(
            betgame.gameState == uint256(GameState.LIVE),
            "game is not live"
        );
        require(_gameId == betgame.id, "no such game available");
        require(
            (_betNumber >= betgame.minNumberRange) &&
                (_betNumber <= betgame.maxNumberRange),
            "selected number is out of range"
        );
        require(
          (_betAmount * (10 ** tokendecimal)) >= betgame.minPaymentAmount,
            "betting amount is less than minimum bet amount"
        );
        usersBetCollection.push(
            GameBetting(
                betgame.id,
                betgame.gameName,
                msg.sender,
                _betNumber,
               (_betAmount  * (10 ** tokendecimal)),
                block.timestamp
            )
        );
 
            userBettedAmount.push(
                BettedAmount(betgame.id,(_betAmount * (10 ** tokendecimal)), msg.sender)
            );
       usersBettedNumber += 1;
      tokenContract.transferFrom(msg.sender, address(this) , (_betAmount * (10 ** tokendecimal)));    
    }

    function getBetTotalAmount(uint256 _betId)
        internal 
        view
        returns (uint256 totalAmount)
    {
        totalAmount;
        for (uint256 i = 0; i < userBettedAmount.length; i++) {
            if (userBettedAmount[i].betid == _betId) {
                totalAmount += userBettedAmount[i].amount;
            } else {
                totalAmount = 0;
            }
        }
    }

    function generateOutcome(
        uint256 _gameId
    ) external returns (uint256) {
        GameOpening memory betgame = gameCollection[_gameId];
        require(
            betgame.gameState == uint256(GameState.LIVE),
            "game is not Live"
        );
        require(betgame.timeFrame < block.timestamp , "game has not ended");
        uint256 seed = uint256(
            keccak256(
                abi.encodePacked(
                    block.timestamp +
                        block.difficulty +
                        ((
                            uint256(keccak256(abi.encodePacked(block.coinbase)))
                        ) / (block.timestamp)) +
                        block.gaslimit +
                        ((uint256(keccak256(abi.encodePacked(msg.sender)))) /
                            (block.timestamp)) +
                        block.number
                )
            )
        );

        uint256 outCome = (seed % betgame.maxNumberRange);
        outCome = outCome + betgame.minNumberRange;
        GameOpening storage specificGame = gameCollection[_gameId];
        require(specificGame.id == _gameId, "game does not exist");
        require(
            specificGame.timeFrame < block.timestamp,
            "game time not completed"
        );
        specificGame.outcome = outCome;

       for(uint i = 0 ; i < gameOpeningCollection.length;i++){
             if(gameOpeningCollection[i].id == _gameId){

                 gameOpeningCollection[i].outcome = outCome;
                 gameOpeningCollection[i].gameState = uint256(GameState.PAYMENTPENDING);
             }
       }

        specificGame.gameState = uint256(GameState.PAYMENTPENDING);
        return outCome;
    }

    function setCurrentTime(uint256 addTime)
        external
        view
        returns (uint256 currentTime)
    {
        currentTime = block.timestamp + addTime;
    }



function getWinners(uint _gameId)internal{
            GameOpening storage specificPayouts = gameCollection[_gameId];
        //    require(specificPayouts.gameState == uint(GameState.RESULTPUBLISHED) , "game result is not yet published");
            require(specificPayouts.timeFrame < block.timestamp , "game is still on");
            for(uint i = 0 ; i < usersBetCollection.length; i++){
                if((usersBetCollection[i].gameid == _gameId) && (usersBetCollection[i].userNumber == specificPayouts.outcome )){
                     winnerCollection.push(GameBetting(_gameId, usersBetCollection[i].gameName , usersBetCollection[i].userAddress, usersBetCollection[i].userNumber , usersBetCollection[i].userAmount , usersBetCollection[i].userTimestamp ));
                }
            }
            specificPayouts.gameState = uint(GameState.PAYMENTPENDING);
}


function paymentController(uint _gameId)public returns (uint payout , uint totalPayout , uint totalWinners , bool isWinnerAvailable , string memory userStatus){
           GameOpening storage specificPayouts = gameCollection[_gameId];
           (uint totalAmount) = getBetTotalAmount(_gameId);
           uint getWinnersAmount;
           uint getNumberOfWinners;
           require(specificPayouts.gameState == uint(GameState.PAYMENTPENDING) , "game result is not yet published");
            require(specificPayouts.timeFrame < block.timestamp , "game is still on");   
            for(uint i = 0 ; i < usersBetCollection.length ; i++){
                if((usersBetCollection[i].gameid == _gameId)){
                      if(usersBetCollection[i].userNumber == specificPayouts.outcome){
                            getWinnersAmount += usersBetCollection[i].userAmount; 
                            isWinnerAvailable = true;  
                            getNumberOfWinners +=1 ; 
                            
                      }else{

                          usersBetCollection[i].userAmount = 0;
                      }
                }
            } 
            

            getNumberOfWinners = (getNumberOfWinners);
            totalAmount = (totalAmount - getWinnersAmount);

          if(isWinnerAvailable){
            uint shareAmount = ((totalAmount /  getNumberOfWinners ) - (paymentFee / 1e6));
            payout = shareAmount;
            totalPayout = totalAmount;
            totalWinners = getNumberOfWinners;
                 for(uint i = 0 ; i < usersBetCollection.length; i++){
                if((usersBetCollection[i].gameid == _gameId)){
                      if((usersBetCollection[i].userNumber == specificPayouts.outcome) && (usersBetCollection[i].userAddress == msg.sender)){

                      uint totalBalance =   usersBetCollection[i].userAmount + shareAmount;
                        userStatus = "You won, your earnings is currently transfered to your wallet";
                        //   payout winner here if any
                        tokenContract.transfer(usersBetCollection[i].userAddress,totalBalance); 
                        specificPayouts.gameState = uint(GameState.PAYMENTCOMPLETED);

                      }
                }
            } 
          }else{

            // JUST SEND BETTERS BALANCE
              for(uint i = 0 ; i < usersBetCollection.length; i++){
                if((usersBetCollection[i].gameid == _gameId) && (usersBetCollection[i].userAddress == msg.sender)){  
                    // if no winner payout every bet
                    uint paymentAmount = ((usersBetCollection[i].userAmount) - (paymentFee / usersBetCollection.length));
                //   payout += usersBetCollection[i].userAmount;
                 userStatus = "Their is no winner";
                 tokenContract.transfer(usersBetCollection[i].userAddress,paymentAmount);  
                 specificPayouts.gameState = uint(GameState.PAYMENTCOMPLETED);
                }
            } 
            
          }


          specificPayouts.creatorEarnings = (paymentFee / uint(2));
}

function setPlatformAddress(address _newPlatformAddress)public onlyOwner returns(string memory){
    platformAddress = _newPlatformAddress;
    return ("new platform address is set succesfully");
}

function payCreator(uint _gameId) external {
 GameOpening storage specificPayouts = gameCollection[_gameId];   
 require(specificPayouts.gameOwner == msg.sender , "Sorry! you have no created game");
 require(specificPayouts.creatorPaid == false, "you have been paid already");
 tokenContract.transfer(msg.sender, specificPayouts.creatorEarnings);
  specificPayouts.creatorPaid = true ;
}
}
