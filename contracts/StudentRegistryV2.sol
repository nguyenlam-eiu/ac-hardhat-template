// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentRegistryV2 {
    address public owner;
    mapping(address => Student) public students;

    constructor() {
        owner = msg.sender;
    }

    struct Student {
        string name;
        uint age;
        bool isRegistered;
    }

    event Registered(address studentAddress, string name, uint _age);

    function register(
        address studentAddress,
        string memory _name,
        uint _age
    ) public onlyOwner {
        require(
            !isStudentRegistered(studentAddress),
            "Student already registered"
        );
        students[studentAddress] = Student(_name, _age, true);

        emit Registered(studentAddress, _name, _age);
    }

    function getStudent(address user) public view returns (Student memory) {
        return students[user];
    }

    function isStudentRegistered(address user) public view returns (bool) {
        return students[user].isRegistered;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner allowed!");
        _;
    }
}
