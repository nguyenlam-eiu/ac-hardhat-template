// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract VotingEligibility {
    function checkEligibility(uint8 _age) public pure returns (string memory) {
        require(_age < 18, "You are not old enough to vote");
        return "You are old enough to vote";
    }
}
