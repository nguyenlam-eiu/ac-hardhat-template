// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingKeccak {

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    struct Candidate {
        string name;
        uint voteCount;
        bool exists;
    }

    mapping(bytes32 => Candidate) public candidates;
    mapping(address => bool) public hasVoted;

    bytes32[] public candidateIds;

    event Voted(address voter, bytes32 candidateId);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner allowed");
        _;
    }

    function addCandidate(string memory _name) public onlyOwner {
        bytes32 candidateId = keccak256(abi.encodePacked(_name, candidateIds.length, block.timestamp));

        require(!candidates[candidateId].exists, "Candidate already exists");

        candidates[candidateId] = Candidate({
            name: _name,
            voteCount: 0,
            exists: true
        });

        candidateIds.push(candidateId);
    }

    function vote(bytes32 candidateId) public {
        require(!hasVoted[msg.sender], "Already voted");
        require(candidates[candidateId].exists, "Invalid candidate ID");

        candidates[candidateId].voteCount++;
        hasVoted[msg.sender] = true;

        emit Voted(msg.sender, candidateId);
    }

    function getVoteCount(bytes32 candidateId)
        public
        view
        returns (uint)
    {
        require(candidates[candidateId].exists, "Candidate does not exist");
        return candidates[candidateId].voteCount;
    }

    // Hàm bổ trợ để lấy danh sách tất cả các ID ứng cử viên
    function getCandidateIds() public view returns (bytes32[] memory) {
        return candidateIds;
    }
}
