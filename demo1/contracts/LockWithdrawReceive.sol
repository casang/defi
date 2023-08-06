// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract LockWithdrawReceive {
    address payable public owner;
    uint public unlockTime;

    event Withdraw(uint amount, uint when);

    constructor(uint _unlockTime) payable {
        require(
            _unlockTime > block.timestamp,
            "O tempo de unlock deve estar no futuro"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdrawHalf() public {
        require(
            msg.sender == owner,
            "somente o dono do smartcontrat pode sacar"
        );
        require(block.timestamp > unlockTime, "Fundos ainda nao disponiveis");

        emit Withdraw(address(this).balance / 2, block.timestamp);
        owner.transfer(address(this).balance / 2);
    }

    receive() external payable {
        // no need to write anything here!
    }
}
