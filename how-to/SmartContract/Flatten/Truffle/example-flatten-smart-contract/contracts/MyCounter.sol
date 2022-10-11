// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract MyCounter {
    using Counters for Counters.Counter;
    Counters.Counter private _counter;

    function current() public view returns (uint256) {
        return _counter.current();
    }

    function increment() public returns (uint256) {
        _counter.increment();
        return _counter.current();
    }

    function decrement() public returns (uint256) {
        _counter.decrement();
        return _counter.current();
    }
}
