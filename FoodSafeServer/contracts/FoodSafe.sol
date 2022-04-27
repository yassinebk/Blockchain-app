// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract FoodSafe {
    struct Location {
        string Name;
        uint256 LocationId;
        uint256 PreviousLocationId;
        uint256 Timestamp;
        string Secret;
    }

    mapping(uint256 => Location) Trail;
    uint8 TrailCount;

    function GetTrailCount() public returns (uint8) {
        return TrailCount;
    }

    function AddNewLocation(
        uint256 LocationId,
        string  Name,
        string  Secret
    ) public {
        Location memory newLocation;
        newLocation.Name = Name;
        newLocation.LocationId = LocationId;
        newLocation.Secret = Secret;
        newLocation.Timestamp = block.timestamp;

        if (TrailCount != 0) {
            newLocation.PreviousLocationId = Trail[TrailCount].LocationId;
        }
        Trail[TrailCount] = newLocation;
        TrailCount++;
    }

    function GetLocation(uint8 TrailNo)
        public
        returns (
            string,
            uint256,
            uint256,
            uint256,
            string
        )
    {
        return (
            Trail[TrailNo].Name,
            Trail[TrailNo].LocationId,
            Trail[TrailNo].PreviousLocationId,
            Trail[TrailNo].Timestamp,
            Trail[TrailNo].Secret
        );
    }
}
