// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentRegistry {
    struct Student {
        string name;
        uint age;
        bool isRegistered;
    }

    mapping(address => Student) public students;

    function register(string memory _name, uint _age) public {
        require(!isStudentRegistered(msg.sender), "Student already registered");
        students[msg.sender] = Student(_name, _age, true);
    }

    function getStudent(address user) public view returns (Student memory) {
        return students[user];
    }

    function isStudentRegistered(address user) public view returns (bool) {
        return students[user].isRegistered;
    }
}
