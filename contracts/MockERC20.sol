// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


/**
 * @title Mock ERC20 Token
 */
contract MockERC20 is ERC20 {

    constructor() ERC20("name", "symbol") {}

    function mint(address _account, uint256 _amount) external {
        _mint(_account, _amount);
    }

    // Add to mock taker token
    function transferIncentive(address account, uint256 amount) external {
        _transfer(address(this), account, amount);
    }


}
