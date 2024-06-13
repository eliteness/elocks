
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


LPABI = ["function balanceOf(address) public view returns(uint)","function getAssetPrice(address) public view returns(uint)","function approve(address,uint)","function allowance(address,address) public view returns(uint)","function earned(address,address) public view returns(uint)","function earnings(address,address) public view returns(uint)","function tvl() public view returns(uint)","function apr() public view returns(uint)","function totalSupply() public view returns(uint)","function deposit(uint)","function withdraw(uint)"]

async function dexstats() {

	$("cl-end").min = (new Date( Date.now() + ( 100e3) )).toISOString().split("T")[0];
	$("cl-end").max = (new Date( Date.now() + (86400e3*365*4) )).toISOString().split("T")[0];
	$("cl-end").value=(new Date( Date.now() + (86400e3) )).toISOString().split("T")[0];

	_ELOCKS = new ethers.Contract(LOCKER_ROOM, LPABI, provider);

	_dsd = await Promise.all([
		_ELOCKS.totalSupply(),
	])

	$("topstat-total").innerHTML = Number(_dsd[0]) + " 🔐 eLOCKS";

	return;
	_BASE = new ethers.Contract(BASE, LPABI, provider);
	_WRAP = new ethers.Contract(WRAP, LPABI, provider);
	_FARM = new ethers.Contract(FARM, LPABI, provider);
	_ds = await Promise.all([
		_BASE.totalSupply(),
		_WRAP.totalSupply(),
		_FARM.getAssetPrice(WRAP),
	])


	$("tvl-usd").innerHTML = `
		<i>
			Current Supply: <b>${(Number(_ds[1])/1e18).toLocaleString(undefined,{maximumFractionDigits:0})}</b> <img src="https://ftm.guru/icons/eliteMorphexMLP.png" style="width:20px;vertical-align:middle"/>
			<br>
			Market Cap: $<b>${(Number(_ds[1])/1e18*Number(_ds[2])/1e18).toLocaleString(undefined,{maximumFractionDigits:2})}</b>
			<br>
			Dominance: <b>${((Number(_ds[1])/1e18)/(Number(_ds[0])/1e18)*100).toLocaleString(undefined,{maximumFractionDigits:4})}</b>%
		</i>
	`;

}

async function gubs() {


	return;
	_BASE = new ethers.Contract(BASE, LPABI, signer);
	_WRAP = new ethers.Contract(WRAP, LPABI, signer);

	_ubs = await Promise.all([
		_BASE.balanceOf(window.ethereum.selectedAddress),
		_WRAP.balanceOf(window.ethereum.selectedAddress)
	]);
	$("ub-mint").innerHTML = (Number(_ubs[0])/1e18).toLocaleString(undefined,{maximumFractionDigits:18});
	$("ub-redeem").innerHTML = (Number(_ubs[1])/1e18).toLocaleString(undefined,{maximumFractionDigits:18});
}

async function quote() {
	return;
}

async function createLock() {
	/// Welcome, anon!
	notice(`Checking wallet..`);
	await cw();


	/// Business end
	_BASE = new ethers.Contract(_LP, LPABI, signer);
	_ELOCKS = new ethers.Contract(LOCKER_ROOM, ["function createLockWithReferralFor(address _lp, uint _amt, uint _exp, address _to, tuple(address agent, uint percent) _ref)"], signer);


	al = await Promise.all([
		_BASE.allowance(window.ethereum.selectedAddress, SMART_MANAGER),
		_BASE.balanceOf(window.ethereum.selectedAddress),
		_BASE.symbol()
	]);

	BASE_NAME =  al[2];

	if(Number(_oamt)>Number(al[1])) {
		notice(`
			<h2>${BASE_NAME}<br>Insufficient Balance!</h2>
			<h3>Desired Amount:</h3>${_oamt/1e18}<br>
			<h3>Actual Balance:</h3>${al[1]/1e18}<br><br>
			<b>Please reduce the amount and retry again, or accumulate some more ${BASE_NAME}.
		`);
		return;
	}

	if(Number(_oamt)>Number(al[0])){
		notice(`
			<h3>Approval required</h3>
			Please grant ${BASE_NAME} allowance.<br><br>
			<h4><u><i>Confirm this transaction in your wallet!</i></u></h4>
		`);
		let _tr = await _BASE.approve(SMART_MANAGER,_oamt);
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
		<b>eLOCKing ${WRAP_NAME}</b><br>

		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> ${BASE_NAME} to Deposit: <b>${fornum(_oamt,18)}</b><br>

		<h4><u><i>Please Confirm this transaction in your wallet!</i></u></h4>
	`);
	let _tr = await _SMART_MANAGER.deposit(_oamt);
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


async function createLock_check() {

	/// Info Validation

	_LP = $("cl-lp").value;
	if(!ethers.utils.isAddress(_LP)){
		notice(`Incorrect LP Address Input!<br>${_LP}`);
		return;
	}

	_oamt = $("cl-amt").value;
	if(!isFinite(_oamt) || _oamt<1/1e18){notice(`Invalid LP amount!`); return;}
	_oamt = BigInt(_oamt * 1e18);

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


async function searchNFT(_NFTID) {
	console.log("looking for ", _NFTID);
}