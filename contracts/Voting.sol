// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    struct Candidate {
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public hasVoted;

    uint public candidateCount;

    event Voted(address voter, uint candidateId);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner allowed");
        _;
    }

    function addCandidate(string memory _name) public onlyOwner {
        candidateCount++;

        candidates[candidateCount] = Candidate({
            name: _name,
            voteCount: 0
        });
    }

    function vote(uint candidateId) public {
        require(!hasVoted[msg.sender], "Already voted");
        require(
            candidateId > 0 && candidateId <= candidateCount,
            "Invalid candidate ID"
        );

        candidates[candidateId].voteCount++;
        hasVoted[msg.sender] = true;

        emit Voted(msg.sender, candidateId);
    }

    function getVoteCount(uint candidateId)
        public
        view
        returns (uint)
    {
        return candidates[candidateId].voteCount;
    }
}