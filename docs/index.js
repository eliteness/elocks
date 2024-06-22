
function $(_) {return document.getElementById(_);}
let provider= {};
let signer= {};
window.addEventListener('load',async function()
{
	console.log("waitin for 3 secs..");
	$("cw_m").innerHTML = "Connecting.. Please wait."
	setTimeout(async () => { await basetrip(); }, 3000);
}, false);


function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementsByClassName('tablinks')[0].click();
});


async function basetrip()
{
	if(!(window.ethereum)){$("cw_m").innerHTML = "Wallet wasn't detected!";console.log("Wallet wasn't detected!");notice("<h3>Wallet wasn't detected!</h3>Please make sure that your device and browser have an active Web3 wallet like MetaMask installed and running.<br><br>Visit <a href='https://metamask.io' target='_blank'>metamask.io</a> to install MetaMask wallet.");provider = new ethers.providers.JsonRpcProvider(RPC_URL); await dexstats();return}
	else if(!Number(window.ethereum.chainId)==CHAINID){$("cw_m").innerHTML = "Wrong network! Please Switch to "+CHAINID;provider = new ethers.providers.Web3Provider(window.ethereum);await dexstats();notice("<h3>Wrong network!</h3>Please Switch to Chain #"+CHAINID+"<btr"+ CHAIN_NAME+ "</u> Blockchain.");}
	else if(//typeOf window.ethereum == Object &&Number(window.ethereum.chainId)
		Number(window.ethereum.chainId)==CHAINID)
	{
		console.log("Recognized Ethereum Chain:", window.ethereum.chainId,CHAINID);
		provider = new ethers.providers.Web3Provider(window.ethereum)
		signer = provider.getSigner();
		if(!(window.ethereum.selectedAddress==null)){console.log("Found old wallet:", window.ethereum.selectedAddress);cw();}
		else{console.log("Didnt find a connected wallet!");cw();}
		//chkAppr(tokes[1][0])
	}
	else //if(Number(window.ethereum.chainId)==CHAINID)
	{
		console.log("Couldn't find Ethereum Provider - ",CHAINID,window.ethereum.chainId)
		if((typeof Number(window.ethereum.chainId) == "number")){$("cw_m").innerHTML = "Wrong network! Switch from " + Number(window.ethereum.chainId)+" to "+CHAINID}
		provider = new ethers.providers.JsonRpcProvider(RPC_URL);
		signer = provider.getSigner()
		$("connect").innerHTML=`Wallet not found.<br><br><button onclick="window.location.reload()" id="btn-connect">Retry?</button>`;
	}
	if(Number(window.ethereum.chainId) != null &&(window.ethereum.chainId!=CHAINID))
	{
		await window.ethereum.request({
    		method: "wallet_addEthereumChain",
    		params: [{
        		chainId: "0x"+(CHAINID).toString(16),
        		rpcUrls: [RPC_URL],
        		chainName: CHAIN_NAME,
        		nativeCurrency: {
            		name: CHAIN_GAS,
            		symbol: CHAIN_GAS,
            		decimals: 18
        		},
        		blockExplorerUrls: [EXPLORE]
    		}]
		});
		window.location.reload
	}
	//DrefreshFarm()
	//arf()
	cw()
	dexstats()
}



/*
function fornum(n,d)
{
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(2)+" Qt."}
	else if(_n>1e15){n_=(_n/1e15).toFixed(2)+" Qd."}
	else if(_n>1e12){n_=(_n/1e12).toFixed(2)+" Tn."}
	else if(_n>1e9){n_=(_n/1e9).toFixed(2)+" Bn."}
	else if(_n>1e6){n_=(_n/1e6).toFixed(2)+" Mn."}
	else if(_n>1e3){n_=(_n/1e3).toFixed(2)+" Th."}
	else if(_n>0){n_=(_n/1e0).toFixed(5)+""}
	return(n_);
}
*/
function fornum(n,d)
{
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(3)+"Qt"}
	else if(_n>1e15){n_=(_n/1e15).toFixed(3)+"Qd"}
	else if(_n>1e12){n_=(_n/1e12).toFixed(3)+"T"}
	else if(_n>1e9){n_=(_n/1e9).toFixed(3)+"B"}
	else if(_n>1e6){n_=(_n/1e6).toFixed(3)+"M"}
	else if(_n>1e3){n_=(_n/1e3).toFixed(3)+"K"}
	else if(_n>1e0){n_=(_n/1e0).toFixed(5)+""}
	else if(_n>0.0){n_=(_n/1e0).toFixed(8)+""}
	return(n_);
}

async function cw()
{
	let cs = await cw2(); cs?console.log("Good to Transact"):cw2();
	cw2();
}
async function cw2()
{
	if(!(window.ethereum)){$("cw_m").innerHTML="Metamask not detected! Trying a refresh";console.log("Metamask not found!");window.location.reload();return(0)}
	if(!(Number(window.ethereum.chainId)==CHAINID)){$("cw_m").innerHTML="Wrong network detected! Please switch to chain ID", CHAINID, "and refresh this page.";return(0)}
	if(typeof provider == "undefined"){$("cw_m").innerHTML="Provider not detected! Trying a refresh";console.log("Provider not found!");window.location.reload();return(0)}
	/*
	if(!
		(isFinite(Number(accounts[0])))
		|| (isFinite(Number(window.ethereum.selectedAddress)))
	){console.log("NAAAAAAAAAAAAAAAAA");window.location.reload();}
	*/

	//004
	window.ethereum
	.request({ method: 'eth_requestAccounts' })
	.then(r=>{console.log("004: Success:",r);})	//re-curse to end curse, maybe..
	.catch((error) => {	console.error("004 - Failure", r, error); });


	//005
	const accounts = await window.ethereum.request({ method: 'eth_accounts' });
	if(Number(accounts[0])>0){console.log("005: Success - ", accounts)}
	else{console.log("005: Failure", accounts)}


	/*006
	const en6 = await window.ethereum.enable()
	if(Number(en6[0]) > 0){console.log("006 - Success",en6)}
	else{console.log("006 - Failure", en6)}
	*/


	/*003
	try {
      console.log("attempting cw()")
      const addresses = await provider.request({ method: "eth_requestAccounts" });
      console.log("addresses:",addresses)
    } catch (e) {
      console.log("error in request", e);
      window.location.reload(true);
    }
    */

    //002
    //try{await provider.send("eth_requestAccounts", []);console.log("CWE:",e);}//await window.ethereum.enable();
	//catch(e){console.log("CWE:",e);window.location.reload(true)}
	console.log("doing the paints")
	$("cw").innerHTML= (window.ethereum.selectedAddress).substr(0,10) +"..."+(window.ethereum.selectedAddress).substr(34);
	if(window.ethereum.chainId==250) (new ethers.Contract("0x14ffd1fa75491595c6fd22de8218738525892101",["function getNames(address) public view returns(string[] memory)"],provider)).getNames(window.ethereum.selectedAddress).then(rn=>{if(rn.length>0){$("cw").innerHTML="hi, <span style='/*font-family:bold;font-size:1.337em*/'>"+rn[0]+"</span> 👋"}else{$("cw").innerHTML= (window.ethereum.selectedAddress).substr(0,10) +"..."+(window.ethereum.selectedAddress).substr(34);}})
	$("cw_m").innerHTML=""
	$("connect").style.display="none";
	$("switch").style.display="block";
	//farm_1_f_chappro()
	gubs();
	return(1);
}
function fornum2(n,d)
{
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(2)+" Quintillion"}
	else if(_n>1e15){n_=(_n/1e15).toFixed(2)+" Quadrillion"}
	else if(_n>1e12){n_=(_n/1e12).toFixed(2)+" Trillion"}
	else if(_n>1e9){n_=(_n/1e9).toFixed(2)+" Billion"}
	else if(_n>1e6){n_=(_n/1e6).toFixed(2)+" Million"}
	else if(_n>1e3){n_=(_n/1e3).toFixed(2)+" Thousand"}
	else if(_n>1e0){n_=(_n/1e0).toFixed(4)+""}
	else if(_n>0){n_=(_n).toFixed(8)+""}
	return(n_);
}


function notice(c) {
	window.location = "#note"
	$("content1").innerHTML = c
}


LPABI = ["function balanceOf(address) public view returns(uint)","function getAssetPrice(address) public view returns(uint)","function approve(address,uint)","function allowance(address,address) public view returns(uint)","function earned(address,address) public view returns(uint)","function earnings(address,address) public view returns(uint)","function name() public view returns(string)","function symbol() public view returns(string)","function tvl() public view returns(uint)","function apr() public view returns(uint)","function totalSupply() public view returns(uint)","function deposit(uint)","function withdraw(uint)"]

ELOCKERABI = [{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "owner","type": "address"},{"indexed": true,"internalType": "address","name": "approved","type": "address"},{"indexed": true,"internalType": "uint256","name": "tokenId","type": "uint256"}],"name": "Approval","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "owner","type": "address"},{"indexed": true,"internalType": "address","name": "operator","type": "address"},{"indexed": false,"internalType": "bool","name": "approved","type": "bool"}],"name": "ApprovalForAll","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "by","type": "address"},{"indexed": true,"internalType": "address","name": "to","type": "address"},{"indexed": true,"internalType": "address","name": "pool","type": "address"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "expiry","type": "uint256"},{"indexed": false,"internalType": "address","name": "agent","type": "address"},{"indexed": false,"internalType": "uint256","name": "percent","type": "uint256"}],"name": "LockCreated","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "from","type": "address"},{"indexed": true,"internalType": "address","name": "to","type": "address"},{"indexed": true,"internalType": "uint256","name": "tokenId","type": "uint256"}],"name": "Transfer","type": "event"},{"inputs": [],"name": "AprGuru","outputs": [{"internalType": "contract IAprGuru","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "TvlGuru","outputs": [{"internalType": "contract ITvlGuru","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "admin","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_approved","type": "address"},{"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "approve","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "art","outputs": [{"internalType": "contract IArt","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_owner","type": "address"}],"name": "balanceOf","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract IPair","name": "_lp","type": "address"},{"internalType": "uint256","name": "_amt","type": "uint256"},{"internalType": "uint256","name": "_exp","type": "uint256"}],"name": "createLock","outputs": [{"internalType": "contract IeLocker","name": "_locker","type": "address"},{"internalType": "uint256","name": "_ID","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "contract IPair","name": "_lp","type": "address"},{"internalType": "uint256","name": "_amt","type": "uint256"},{"internalType": "uint256","name": "_exp","type": "uint256"},{"internalType": "address","name": "_to","type": "address"}],"name": "createLockFor","outputs": [{"internalType": "contract IeLocker","name": "_locker","type": "address"},{"internalType": "uint256","name": "_ID","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "contract IPair","name": "_lp","type": "address"},{"internalType": "uint256","name": "_amt","type": "uint256"},{"internalType": "uint256","name": "_exp","type": "uint256"},{"components": [{"internalType": "address","name": "agent","type": "address"},{"internalType": "uint256","name": "percent","type": "uint256"}],"internalType": "struct IeLocker.Referral","name": "_ref","type": "tuple"}],"name": "createLockWithReferral","outputs": [{"internalType": "contract IeLocker","name": "_locker","type": "address"},{"internalType": "uint256","name": "_ID","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "contract IPair","name": "_lp","type": "address"},{"internalType": "uint256","name": "_amt","type": "uint256"},{"internalType": "uint256","name": "_exp","type": "uint256"},{"internalType": "address","name": "_to","type": "address"},{"components": [{"internalType": "address","name": "agent","type": "address"},{"internalType": "uint256","name": "percent","type": "uint256"}],"internalType": "struct IeLocker.Referral","name": "_ref","type": "tuple"}],"name": "createLockWithReferralFor","outputs": [{"internalType": "contract IeLocker","name": "_locker","type": "address"},{"internalType": "uint256","name": "_ID","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "design","outputs": [{"internalType": "contract IeLocker","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "factory","outputs": [{"internalType": "contract IFactory","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "feeSynthesizer","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "getApproved","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract IeLocker","name": "_design","type": "address"},{"internalType": "contract IArt","name": "_art","type": "address"},{"internalType": "contract IVoter","name": "_vtr","type": "address"}],"name": "initialize","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_owner","type": "address"},{"internalType": "address","name": "_operator","type": "address"}],"name": "isApprovedForAll","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_spender","type": "address"},{"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "isApprovedOrOwner","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_lockID","type": "uint256"}],"name": "lockInfo","outputs": [{"internalType": "address[7]","name": "","type": "address[7]"},{"internalType": "uint256[11]","name": "","type": "uint256[11]"},{"internalType": "uint256[]","name": "","type": "uint256[]"},{"internalType": "contract IERC20[]","name": "_rt","type": "address[]"},{"internalType": "uint256[]","name": "_ra","type": "uint256[]"},{"internalType": "uint256[]","name": "_rd","type": "uint256[]"},{"internalType": "string[]","name": "_rs","type": "string[]"},{"components": [{"internalType": "address","name": "agent","type": "address"},{"internalType": "uint256","name": "percent","type": "uint256"}],"internalType": "struct IeLocker.Referral","name": "","type": "tuple"},{"internalType": "string[4]","name": "_str","type": "string[4]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_lockID","type": "uint256"}],"name": "lockedAssets","outputs": [{"internalType": "contract IPair","name": "","type": "address"},{"internalType": "uint256","name": "","type": "uint256"},{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "","type": "uint256"}],"name": "lockers","outputs": [{"internalType": "contract IeLocker","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "name","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "pure","type": "function"},{"inputs": [{"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "ownerOf","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "","type": "uint256"}],"name": "ownership_change","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "","type": "uint256"}],"name": "referrals","outputs": [{"internalType": "address","name": "agent","type": "address"},{"internalType": "uint256","name": "percent","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_from","type": "address"},{"internalType": "address","name": "_to","type": "address"},{"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "safeTransferFrom","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_from","type": "address"},{"internalType": "address","name": "_to","type": "address"},{"internalType": "uint256","name": "_tokenId","type": "uint256"},{"internalType": "bytes","name": "_data","type": "bytes"}],"name": "safeTransferFrom","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_new_admin","type": "address"}],"name": "setAdmin","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_operator","type": "address"},{"internalType": "bool","name": "_approved","type": "bool"}],"name": "setApprovalForAll","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "contract IAprGuru","name": "_a","type": "address"}],"name": "setAprGuru","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "contract IArt","name": "_art","type": "address"}],"name": "setArt","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "contract IeLocker","name": "_design","type": "address"}],"name": "setDesign","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_fs","type": "address"}],"name": "setFeeSynthesizer","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "contract ITvlGuru","name": "_t","type": "address"}],"name": "setTvlGuru","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "bytes4","name": "_interfaceID","type": "bytes4"}],"name": "supportsInterface","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "symbol","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "pure","type": "function"},{"inputs": [{"internalType": "address","name": "_owner","type": "address"},{"internalType": "uint256","name": "_tokenIndex","type": "uint256"}],"name": "tokenOfOwnerByIndex","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "tokenURI","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_usr","type": "address"}],"name": "tokensOfOwner","outputs": [{"internalType": "uint256[]","name": "","type": "uint256[]"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "totalSupply","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_from","type": "address"},{"internalType": "address","name": "_to","type": "address"},{"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "transferFrom","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "voter","outputs": [{"internalType": "contract IVoter","name": "","type": "address"}],"stateMutability": "view","type": "function"}];

ELOCKSABI = [{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "earner","type": "address"},{"indexed": true,"internalType": "contract IERC20","name": "token","type": "address"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"}],"name": "ClaimRewards","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "depositor","type": "address"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "total","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "until","type": "uint256"}],"name": "LockStatus","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "token","type": "address"},{"indexed": true,"internalType": "address","name": "agent","type": "address"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"}],"name": "ReferralPaid","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "from","type": "address"},{"indexed": true,"internalType": "address","name": "to","type": "address"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"}],"name": "Transfer","type": "event"},{"inputs": [],"name": "ID","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "allEarnings","outputs": [{"internalType": "contract IERC20[]","name": "","type": "address[]"},{"internalType": "uint256[]","name": "","type": "uint256[]"},{"internalType": "uint256[]","name": "","type": "uint256[]"},{"internalType": "string[]","name": "","type": "string[]"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "apr","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_who","type": "address"}],"name": "balanceOf","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "claimFees","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_to","type": "address"}],"name": "claimFeesTo","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "contract IERC20[]","name": "_tkns","type": "address[]"}],"name": "claimMultipleRewards","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_to","type": "address"},{"internalType": "contract IERC20[]","name": "_tkns","type": "address[]"}],"name": "claimMultipleRewardsTo","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "claimRewards","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_to","type": "address"}],"name": "claimRewardsTo","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "claimableFees","outputs": [{"internalType": "uint256","name": "_cf0","type": "uint256"},{"internalType": "uint256","name": "_cf1","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "claimableRewards","outputs": [{"internalType": "uint256[]","name": "","type": "uint256[]"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "decimals","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "eLocker","outputs": [{"internalType": "contract IeLockerRoom","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "earner","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract IERC20","name": "","type": "address"}],"name": "earnings","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "expiry","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_date","type": "uint256"}],"name": "extendDate","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "factory","outputs": [{"internalType": "contract IFactory","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "gauge","outputs": [{"internalType": "contract IGauge","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_amt","type": "uint256"}],"name": "increaseAmount","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "contract IPair","name": "_lp","type": "address"},{"internalType": "uint256","name": "_exp","type": "uint256"},{"components": [{"internalType": "address","name": "agent","type": "address"},{"internalType": "uint256","name": "percent","type": "uint256"}],"internalType": "struct eLOCK.Referral","name": "_ref","type": "tuple"}],"name": "initialize","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "name","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "owner","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "pool","outputs": [{"internalType": "contract IPair","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "referral","outputs": [{"internalType": "address","name": "agent","type": "address"},{"internalType": "uint256","name": "percent","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_amt","type": "uint256"},{"internalType": "uint256","name": "_date","type": "uint256"}],"name": "relock","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "","type": "uint256"}],"name": "rewardTokens","outputs": [{"internalType": "contract IERC20","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "rewardsList","outputs": [{"internalType": "contract IERC20[]","name": "","type": "address[]"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "rewardsListLength","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_e","type": "address"}],"name": "setEarner","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "staked","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "symbol","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "token0","outputs": [{"internalType": "contract IERC20","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "token1","outputs": [{"internalType": "contract IERC20","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "totalSupply","outputs": [{"internalType": "uint256","name": "_ts","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "tvl","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "unlockLiquidity","outputs": [{"internalType": "uint256","name": "_ts","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "voter","outputs": [{"internalType": "contract IVoter","name": "","type": "address"}],"stateMutability": "view","type": "function"}];

async function dexstats() {

	$("cl-end").min = (new Date( Date.now() + ( 100e3) )).toISOString().split("T")[0];
	$("cl-end").max = (new Date( Date.now() + (86400e3*365*4) )).toISOString().split("T")[0];
	$("cl-end").value=(new Date( Date.now() + (86400e3) )).toISOString().split("T")[0];

	_ELOCKS = new ethers.Contract(LOCKER_ROOM, LPABI, provider);

	_dsd = await Promise.all([
		_ELOCKS.totalSupply(),
	])
	TOTAL_SUPPLY = Number(_dsd[0]);
	$("topstat-total").innerHTML = TOTAL_SUPPLY + " 🔐 eLOCKS";

	return;

}

async function gubs() {
	_ELOCKS = new ethers.Contract(LOCKER_ROOM, ELOCKERABI, signer);

	_ubs = await Promise.all([
		_ELOCKS.tokensOfOwner(window.ethereum.selectedAddress)
	]);

	$("coll-list").innerHTML = "";
	if(_ubs[0].length==0) {
		$("coll-list").innerHTML = `
            <div class="grayed">
                No locks found!<br><span>🔐</span>
            </div>
        `;
    }
    else {
    	for(i=0;i<_ubs[0].length;i++) {
    		$("coll-list").innerHTML += `
				<div onclick="searchNFT(${_ubs[0][i]})">
					eLOCK 🔐<br><span>${_ubs[0][i]}</span>
				</div>
        	`;
    	}
	}

	return;
}

async function quote() {
	return;
}


async function createLock_check() {

	/// Info Validation

	_LP = $("cl-lp").value;
	if(!ethers.utils.isAddress(_LP)){
		notice(`Incorrect LP Address Input!<br>${_LP}`);
		return;
	}
	else{
		if(await (new ethers.Contract(FACTORY,["function isPair(address) public view returns(bool)"],provider)).isPair(_LP)) {
			notice(`Equalizer Pair detected!`);
		}
		else {
			notice(`Unknown LP Address Input!<br>${_LP} is not an Equalizer Pair!`);
			return;
		}

	}

	_oamt = $("cl-amt").value;
	if(!isFinite(_oamt) || _oamt<1/1e18){notice(`Invalid LP amount!`); return;}
	_oamt = BigInt(Math.floor(_oamt * 1e18));

	;

	_END = new Date($("cl-end").value);


	if(_END.valueOf() > Date.now() + 86400e3 * 180) {
		notice(`
			<h3>Very long Lock period!</h3>
			Your selected unlock date is ${new Date(_END)}, which is more than 6 months into the future!
			<br><br>
			If you wish to take part in the Fantom Sonic Meme Competition, we recommend locking up for a smaller period and tranferring your eLOCKS NFT to the Sonic Community Council so that they can migrate your liquidity to the new Sonic chain when the time comes in the next few month. By transferring to SCC/MemeDAO, you will still continue to Earn all the rewards without any fee if you setup your eLOCKS NFT to allow you to claim your Rewards even after the transfer.
			<br><i>(Note: Only the Current holder of an eLOCK can set the rewards claiming address, which remains intact after transfers unless altered by a Current Holder.)</i>
			<br><br>
			You can always extend your lockup period after the creation of your eLOCKS NFT as well as add more LP tokens to it whenever you like!
			<br><br>
			<button class="submit equal-gradient grayed" onclick="window.location='#'">Cancel</button><br>
			<button class="submit equal-gradient" onclick="createLock()">I Agree, LFG!</button>
		`);
	}

	else if(_END.valueOf() < Date.now() + 100e3 ) {
		notice(`
			<h3>Lock period has passed!</h3>
			Your selected unlock date is ${new Date(_END)}.
			<br>All locks must expire in the future!
			<br><br>
		`);
	}


	else if(_END.valueOf() > Date.now() + 100e3) {
		notice(`
			<h3>Creating a new eLOCK!</h3>
			Your selected unlock date is ${new Date(_END)}. Please make sure this is the desired lockup time. You wont be able to reduce this later!
			<br><br>
			If you wish to take part in the Fantom Sonic Meme Competition, we recommend locking up for smaller periods and tranferring your eLOCKS NFT to the Sonic Community Council so that they can migrate your liquidity to the new Sonic chain when the time comes in the next few month. By transferring to SCC/MemeDAO, you will still continue to Earn all the rewards without any fee if you setup your eLOCKS NFT to allow you to claim your Rewards even after the transfer.
			<br><i>(Note: Only the Current holder of an eLOCK can set the rewards claiming address, which remains intact after transfers unless altered by a Current Holder.)</i>
			<br><br>
			You can always extend your lockup period after the creation of your eLOCKS NFT as well as add more LP tokens to it whenever you like!
			<br><br>
			<button class="submit equal-gradient grayed" onclick="window.location='#'">Cancel</button><br>
			<button class="submit equal-gradient" onclick="createLock()">I Agree, LFG!</button>
		`);
	}


}


async function createLock() {
	/// Welcome, anon!
	/// notice(`Checking wallet..`);
	/// await cw();


	/// Business end
	_BASE = new ethers.Contract(_LP, LPABI, signer);
	_ELOCKS = new ethers.Contract(LOCKER_ROOM, ELOCKERABI, signer);


	al = await Promise.all([
		_BASE.allowance(window.ethereum.selectedAddress, LOCKER_ROOM),
		_BASE.balanceOf(window.ethereum.selectedAddress),
		_BASE.symbol()
	]);

	BASE_NAME =  al[2];

	if(Number(_oamt)>Number(al[1])) {
		notice(`
			<h2>${BASE_NAME}<br>Insufficient Balance!</h2>
			<h3>Desired Amount:</h3>${(Number(_oamt)/1e18).toFixed(18)}<br>
			<h3>Actual Balance:</h3>${(al[1]/1e18).toFixed(18)}<br><br>
			<b>Please reduce the amount and retry again, or accumulate some more ${BASE_NAME}.
		`);
		return;
	}

	if(Number(_oamt)>Number(al[0])){
		notice(`
			<h3>Approval required</h3>
			Please grant ${BASE_NAME} allowance.<br><br>
			<h3>Current Allowance:</h3>${(al[0]/1e18).toFixed(18)}<br><br>
			<h3>Desired Allowance:</h3>${(Number(_oamt)/1e18).toFixed(18)}<br>
			<h4><u><i>Confirm this transaction in your wallet!</i></u></h4>
		`);
		let _tr = await _BASE.approve(LOCKER_ROOM,_oamt);
		console.log(_tr);
		notice(`
			<h3>Submitting Approval Transaction!</h3>
			<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
		`);
		_tw = await _tr.wait()
		console.log(_tw)
		notice(`
			<h3>Approval Completed!</h3>
			<br>Spending rights of ${Number(_oamt)/1e18} ${BASE_NAME} granted.<br>
			<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
			<br><br>
			Please confirm the next step with your wallet provider now.
		`);
	}

	notice(`
		<h3>Order Summary</h3>
		<b>eLOCKing ${BASE_NAME}</b><br>

		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> ${BASE_NAME} to Deposit: <b>${fornum(_oamt,18)}</b><br>

		<h4><u><i>Please Confirm this transaction in your wallet!</i></u></h4>
	`);
	let _tr = await _ELOCKS.createLockWithReferral(_LP,_oamt,Math.floor(_END.valueOf()/1e3),window.ethereum.selectedAddress,{AGENT,PERCENT});
	console.log(_tr);
	notice(`
		<h3>Order Submitted!</h3>
		<br><h4>Minting new eLOCK ...</h4>
		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> ${BASE_NAME} Depositing: <b>${fornum(_oamt,18)}</b><br>
		<br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	_tw = await _tr.wait();
	console.log(_tw)
	notice(`
		<h3>Order Completed!</h3>
		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> ${BASE_NAME} eLOCKed: <b>${fornum(_oamt,18)}</b><br>
		<br><br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	gubs();
}

async function searchNFT(_NFTID) {
	console.log("looking for ", _NFTID);
	if(!isFinite(_NFTID) || _NFTID < 1){notice(`Invalid eLOCKS NFT ID!`); return;}
	_NFTID = Math.floor(_NFTID);

	//if(TOTAL_SUPPLY)

	_ELOCKS = new ethers.Contract(LOCKER_ROOM, ELOCKERABI, provider);

	//try{
		_li = await _ELOCKS.lockInfo(_NFTID);
	//notice(JSON.stringify(_li))
	/*function lockInfo(uint _lockID) public view returns (
		address[5] memory,
		uint[6] memory,
		uint[] memory,
		IERC20[] memory _rt,
		uint[] memory _ra,
		IEqualocker.Referral memory
	) {

		IEqualocker _locker = lockers[_lockID];

		address[5] memory _locker_owner_earner_pool_gauge = [
			address(_locker),
			idToOwner[_lockID],
			_locker.earner(),
			address(_locker.pool()),
			address(_locker.gauge())
		];

		uint[6] memory _total_expiry_apr_tvl_claimf0_claimf1 = [
			_locker.totalSupply(),
			_locker.expiry(),
			_locker.apr(),
			_locker.tvl(),
			0,
			0
		];
		(_total_expiry_apr_tvl_claimf0_claimf1[4], _total_expiry_apr_tvl_claimf0_claimf1[5]) = _locker.claimableFees();

		(_rt, _ra) = _locker.allEarnings();

		return (
			_locker_owner_earner_pool_gauge,
			_total_expiry_apr_tvl_claimf0_claimf1,
			_locker.claimableRewards(),
			_rt,
			_ra,
			_locker.referral()
		);
	}
		*/

		/*
		_ens = await Promise.all([
			(new ethers.Contract(_li[0][0],LPABI,provider)).name(),
			(new ethers.Contract(_li[0][0],LPABI,provider)).symbol(),
		]);
		*/

		LD = {
			locker:		_li[0][0] ,
			owner:		_li[0][1] ,
			earner:		_li[0][2] ,
			pool:		_li[0][3] ,
			gauge:		_li[0][4] ,

			total:		Number(_li[1][0])/1e18 ,
			expiry:		Number(_li[1][1])*1000 ,
			apr:		Number(_li[1][2])/1e18 ,
			tvl:		Number(_li[1][3])/1e18 ,
			cfees0:		Number(_li[1][4])/1e18 ,
			cfees1:		Number(_li[1][5])/1e18 ,
			deci0:		Number(_li[1][6])/1e18 ,
			deci1:		Number(_li[1][7])/1e18 ,
			res0:		Number(_li[1][8])/1e18 ,
			res1:		Number(_li[1][9])/1e18 ,
			pooltotal:	Number(_li[1][10])/1e18 ,

			crewards:	_li[2].map(i=>Number(i)/1e18) ,
			trewards:	_li[3] ,
			arewards:	_li[4].map(i=>Number(i)/1e18) ,
			drewards:	_li[5] ,
			srewards:	_li[6] ,

			refagent:	_li[7][0],
			refpercent:	Number(_li[7][1])/10,
			/*
			name:		_ens[0] ,
			symbol:		_ens[1] ,
			poolType:	_ens[1].split("-")[0] ,
			symbol0:	_ens[1].split("-")[1].split("/")[0] ,
			symbol1:	_ens[1].split("-")[1].split("/")[1] ,
			*/
			name:		_li[8][0] ,
			symbol:		_li[8][1] ,
			poolType:	_li[8][1].split("-")[0] ,
			symbol0:	_li[8][2] ,
			symbol1:	_li[8][3] ,

			/// DERIVED DATA
			amt0:		Number(_li[1][8])/1e18 * (Number(_li[1][0])/1e18) / Number(_li[1][10])/1e18 *  (Number(_li[1][6])/1e18)/1e18 ,
			amt0:		Number(_li[1][9])/1e18 * (Number(_li[1][0])/1e18) / Number(_li[1][10])/1e18 *  (Number(_li[1][7])/1e18)/1e18 ,

			price:		(Number(_li[1][3])/1e18) / Number(_li[1][0])/1e18 ,
		}


		$("spotlight").innerHTML = `
			<h3>${ LD.symbol }</h3>
			${ LD.name }
			<br><br>

			<h3>LP Locked till</h3>
			${ (new Date(LD.expiry)).toISOString().replace("T"," ").split(".")[0] }
			<br><br>

			<h3>Amount Locked</h3>
			${ LD.total } LP
			<br>${ LD.tvl } TVL
			<br>${ LD.total / LD.pooltotal * 100 } % of Pool
			<br>${ LD.symbol0 } : ${ LD.amount0 }
			<br>${ LD.symbol1 } : ${ LD.amount1 }
			<br><br>


			<h3>Claimable Fees Rewards</h3>
			${ LD.symbol0 } : ${ LD.cfees0 }
			<br><br>${ LD.symbol1 } : ${ LD.cfees1 }
			<br><br><button class="submit equal-gradient" onclick="LD_claimFees()"> Claim Fees Rewards </button>
			<br><br>

			<h3>Claimable Farming Rewards</h3>
			${LD.srewards[0]?LD.srewards[0]:"No Rewards"} : ${ LD.crewards[0]?LD.crewards[0]:0 }
			<br><button class="submit equal-gradient" onclick="LD_claimRewards()"> Claim Farming Rewards </button>
			<br><br>

			<h3>Related Addresses</h3>
			Owner : <a href='${ EXPLORE+"address/"+LD.owner }' target="_blank">${ LD.owner.substr(0,10)+"-"+ LD.owner.substr(-8)}</a>
			<br>Earner : <a href='${ EXPLORE+"address/"+LD.earner }' target="_blank">${ LD.earner.substr(0,10)+"-"+ LD.earner.substr(-8)}</a>
			<br>Pool : <a href='${ EXPLORE+"address/"+LD.pool }' target="_blank">${ LD.pool.substr(0,10)+"-"+ LD.pool.substr(-8)}</a>
			<br>Gauge : <a href='${ EXPLORE+"address/"+LD.gauge }' target="_blank">${ LD.gauge.substr(0,10)+"-"+ LD.gauge.substr(-8)}</a>

		`;

		window.location="#spotlight";

		/*
			<br>Quote Token : <a href='${ EXPLORE+"address/"+LD. }' target="_blank">${ LD..substr(0,10)+"-"+ LD..substr(-8)}</a>
			<br>Base Token : <a href='${ EXPLORE+"address/"+LD. }' target="_blank">${ LD..substr(0,10)+"-"+ LD..substr(-8)}</a>
			<br>

			<h3>Amount Locked</h3>
			${ LD.total }
			<br>

			<h3>Amount Locked</h3>
			${ LD.total }
			<br>

			<h3>Amount Locked</h3>
			${ LD.total }
			<br>


	}
	catch(e){
		notice(`
			<h2>An error occured!</h2>
			You entered an invalid eLOCKS NFT ID : ${_NFTID}
			<br><br>${JSON.stringify(e)}
		`);
	}
		*/
}

async function LD_claimFees(_ld) {
	_ld = LD; //JSON.parse(_ld);

	/// Welcome, anon!
	/// notice(`Checking wallet..`);
	/// await cw();

	_ELOCK = new ethers.Contract(_ld.locker, ELOCKSABI, signer);

	notice(`
		<h3>Claiming Trade Fees</h3>
		<b>${_ld.name}</b>

		<br>${ _ld.cfees0 } ${ _ld.symbol0 }
		<br>${ _ld.cfees1 } ${ _ld.symbol1 }


		<h4><u><i>Please Confirm this transaction in your wallet!</i></u></h4>
	`);
	let _tr = await _ELOCK.claimFees();
	console.log(_tr);
	notice(`
		<h3>Claiming Trade Fees</h3>
		<b>${_ld.name}</b>

		<br>${ _ld.cfees0 } ${ _ld.symbol0 }
		<br>${ _ld.cfees1 } ${ _ld.symbol1 }
		<br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	_tw = await _tr.wait();
	console.log(_tw)
	notice(`
		<h3>Trade Fees Claimed!</h3>
		<b>${_ld.name}</b>

		${ _ld.symbol0 }<br>${ _ld.cfees0 }
		${ _ld.symbol1 }<br>${ _ld.cfees1 }

		<br><br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
}

async function LD_claimRewards(_ld) {
	_ld = LD; //JSON.parse(_ld);

	/// Welcome, anon!
	/// notice(`Checking wallet..`);
	/// await cw();

	_ELOCK = new ethers.Contract(_ld.locker, ELOCKSABI, signer);

	notice(`
		<h3>Claiming Gauge Farming Rewards</h3>
		<b>${_ld.name}</b>
		<br><br>${ LD.crewards[0]?LD.crewards[0]:0 } EQUAL
		<h4><u><i>Please Confirm this transaction in your wallet!</i></u></h4>
	`);
	let _tr = await _ELOCK.claimRewards();
	console.log(_tr);
	notice(`

		<h3>Claiming Gauge Farming Rewards</h3>
		<b>${_ld.name}</b>
		<br><br>${ LD.crewards[0]?LD.crewards[0]:0 } EQUAL
		<br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	_tw = await _tr.wait();
	console.log(_tw)
	notice(`
		<h3>Gauge Farming Rewards Claimed!</h3>
		<b>${_ld.name}</b>

		<br><br>${ LD.crewards[0]?LD.crewards[0]:0 } EQUAL
		<br><br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
}