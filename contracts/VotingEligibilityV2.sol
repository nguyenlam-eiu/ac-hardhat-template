// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingEligibility {
    address public owner;
    uint public minAge = 18;

    constructor() {
        owner = msg.sender;
    }

    function checkEligibility(uint age) public view returns (bool) {
        if (age < minAge) {
            return false;
        } else {
            return true;
        }
    }

    function updateMinAge(uint newMinAge) public {
        require (msg.sender == owner, "Only the contract holder is permitted to change the value.");
        minAge = newMinAge;
    }
}
