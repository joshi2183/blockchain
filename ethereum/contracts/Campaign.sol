pragma solidity ^0.4.24;


contract CampaignFactory {

    address[] public deployedCampaigns;

    function createCampaign(uint minimumContribution) public {
        address addressOfCampaign = new Campaign(minimumContribution, msg.sender);
        deployedCampaigns.push(addressOfCampaign);

    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}


contract Campaign {

    struct Request {
        string description;
        uint value;
        address recepient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    address public manager;
    uint minimumContribution;

    uint public totalContribution;

    mapping(address => bool) public approvers;
    uint approversCount;

    Request[] public requests;

    modifier onlyManager() {
        require(msg.sender == manager);
        _;
    }

    constructor (uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution); // msg is global variable value contains oney
                                                  // sent along with function call
        approvers[msg.sender] = true;// address is never stored
        approversCount++;
        totalContribution = totalContribution + msg.value;
    }

    function createRequest(string description, uint value, address recepient)
        public onlyManager

    {

        // memory or strage keyword depending where you want to store variales.
        // but here in below newRequest cant be storge as Request is in memory

        Request memory newRequest = Request({
            description: description,
            value: value,
            recepient: recepient,
            complete:false,
            approvalCount:0
        });

        requests.push(newRequest);

    }

    function approveRequest(uint requestIndex) public {
        Request storage requestApproved = requests[requestIndex];

        require(approvers[msg.sender]);
        require(!requestApproved.approvals[msg.sender]);
        requestApproved.approvals[msg.sender] = true;
        requestApproved.approvalCount++;
    }

    function finalize(uint requestIndex) public {
        Request storage request = requests[requestIndex];
        require(!request.complete);
        require(msg.sender == manager);

        require(request.approvalCount > (approversCount/2));

        totalContribution = totalContribution - request.value;
        request.recepient.transfer(request.value);


        request.complete = true;
    }

}
