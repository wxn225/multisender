pragma solidity ^0.8.0;

/**
 * @notice Interface for contracts conforming to ERC-20
 */
interface IERC20 {
    function transferFrom(address _from, address _to, uint256 _value) external returns (bool success);
}

contract MultiSender {

    function ethSend(address payable[] memory _to, uint256[] memory _value) external payable {

        require(_to.length == _value.length);
        require(_to.length <= 255);

        for (uint8 i = 0; i < _to.length; i++) {
            require(_to[i].send(_value[i]), "failed to send ether");
        }
    }

    function erc20Send(address _tokenAddress, address[] memory _to, uint256[] memory _value) external {

        require(_to.length == _value.length);
        require(_to.length <= 255);

        IERC20 token = IERC20(_tokenAddress);

        for (uint8 i = 0; i < _to.length; i++) {
            token.transferFrom(msg.sender, _to[i], _value[i]);
        }
    }
}
