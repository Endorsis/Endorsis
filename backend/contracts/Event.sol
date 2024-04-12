// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Event is ERC721Enumerable, Ownable {
    string public eventName;
    string public eventDescription;
    uint256 public startDate;
    uint256 public endDate;

    struct User {
        string userName;
        string[] endorsements;
    }

    mapping(address => User) public userRecords;
    mapping(uint256 => string) private _tokenURIs;  // Mapping for token URIs

    error UserAlreadyExists();
    error EventNotStarted();
    error DeadlineExpired();

    constructor(
        string memory _eventName,
        string memory _eventDescription,
        uint256 _startDate,
        uint256 _endDate,
        string memory _userName
    ) ERC721("EventToken", "EVT") {
        eventName = _eventName;
        eventDescription = _eventDescription;
        startDate = _startDate;
        endDate = _endDate;
    }

    function joinEvent(string memory userName) external {
        if (block.timestamp > endDate) {
            revert DeadlineExpired();
        }
        if (bytes(userRecords[msg.sender].userName).length != 0) {
            revert UserAlreadyExists();
        }
        User memory newUser = User(userName, new string );
        userRecords[msg.sender] = newUser;
    }

    function endorse(string memory endorsement) external {
        if (block.timestamp < startDate) {
            revert EventNotStarted();
        }
        if (block.timestamp > endDate) {
            revert DeadlineExpired();
        }
        userRecords[msg.sender].endorsements.push(endorsement);
    }

    function mintNFT(address recipient, string memory tokenURI) public onlyOwner {
        uint256 tokenId = totalSupply() + 1;
        _safeMint(recipient, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return _tokenURIs[tokenId];
    }
}
