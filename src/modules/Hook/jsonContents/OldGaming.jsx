export const G =[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokendecimal",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "gameCreationId",
				"type": "uint256"
			}
		],
		"name": "CreatedBetEvent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_gameName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_timeframe",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "_minNumber",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "_maxNumber",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "_minPayment",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_image",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			}
		],
		"name": "createBet",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "creatorsNumber",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "gameCollection",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "gameOwner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "gameName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "timeFrame",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "minNumberRange",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "maxNumberRange",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "minPaymentAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "outcome",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "gameState",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "image",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "creatorEarnings",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "creatorPaid",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "gameOpeningCollection",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "gameOwner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "gameName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "timeFrame",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "minNumberRange",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "maxNumberRange",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "minPaymentAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "outcome",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "gameState",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "image",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "creatorEarnings",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "creatorPaid",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_gameId",
				"type": "uint256"
			}
		],
		"name": "generateOutcome",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_gameid",
				"type": "uint256"
			}
		],
		"name": "getOwnersGame",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "gameOwner",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "gameName",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "timeFrame",
						"type": "uint256"
					},
					{
						"internalType": "uint8",
						"name": "minNumberRange",
						"type": "uint8"
					},
					{
						"internalType": "uint8",
						"name": "maxNumberRange",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "minPaymentAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "outcome",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "gameState",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "image",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "creatorEarnings",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "creatorPaid",
						"type": "bool"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					}
				],
				"internalType": "struct GameingApp.GameOpening",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_gameId",
				"type": "uint256"
			}
		],
		"name": "payCreator",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_gameId",
				"type": "uint256"
			}
		],
		"name": "paymentController",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "payout",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalPayout",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalWinners",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isWinnerAvailable",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "userStatus",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "paymentFee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "resetPaymentAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "resetPaymentAmount",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "addTime",
				"type": "uint256"
			}
		],
		"name": "setCurrentTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "currentTime",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenContract",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_gameId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_betNumber",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_betAmount",
				"type": "uint256"
			}
		],
		"name": "userBetOnGame",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "userBettedAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "betid",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "userBetting",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "usersBetCollection",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "gameid",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "gameName",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "userNumber",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "userAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "userTimestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "usersBettedNumber",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "winnerCollection",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "gameid",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "gameName",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "userNumber",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "userAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "userTimestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]