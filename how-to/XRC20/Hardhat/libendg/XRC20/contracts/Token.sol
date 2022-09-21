//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Token {
    // name of our token
    string public name;
    // token symbol, like ETH
    string public symbol;
    // how divisable token can be
    uint8 public decimals;

    // total amount of tokens in circulation
    uint256 private _totalSupply;

    // mapping(...) as a key/value map. For each address we store its balance
    mapping(address => uint256) private balances;
    // withdrawal allowance by a delegate
    mapping(address => mapping(address => uint256)) private allowances;

    // log when approval limit is changed
    event Approval(
        address indexed tokenOwner,
        address indexed spender,
        uint256 tokens
    );
    // log when tokens sent from one account to another
    event Transfer(address indexed from, address indexed to, uint256 tokens);

    // Contract initialization.
    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        uint256 _initialSupply
    ) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;

        _totalSupply += _initialSupply * 10**decimals;
        balances[msg.sender] = _totalSupply;
        emit Transfer(address(0), msg.sender, _totalSupply);
    }

    function totalSupply() public view virtual returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view virtual returns (uint256) {
        return balances[account];
    }

    function allowance(address owner, address spender) public view virtual returns (uint256) {
        return allowances[owner][spender];
    }

    function transfer(address recipient, uint amount) external returns (bool) {
        balances[msg.sender] -= amount;
        balances[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    function approve(address spender, uint amount) external returns (bool) {
        allowances[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool) {
        allowances[sender][msg.sender] -= amount;
        balances[sender] -= amount;
        balances[recipient] += amount;
        emit Transfer(sender, recipient, amount);
        return true;
    }
}
