import { ethers } from "./ethersES6.js"
import { abi,contractaddress } from "./constants.js";



const connectbutton= document.getElementById("connectionbutton")
const balance= document.getElementById("balancebutton");
const withdraw= document.getElementById("withdraw");
withdraw.onclick=withdraw;
balance.onclick=getbalance;
const fundbutton= document.getElementById("fund");
connectbutton.onclick=connect;
fundbutton.onclick= fund; 
async function connect() {
            
      
    if(typeof window.ethereum !=="undefined"){
    console.log("i see a metamask")
    await window.ethereum.request({method:"eth_requestAccounts"})
    document.getElementById("connectionbutton").innerHTML="connected"
}else{
    console.log("no metamask")
       document.getElementById("connectionbutton").innerHTML="please install metamask"
}
}

async function fund() {
    const ethamt= document.getElementById("ethamt").value;
console.log(`funding with ${ethamt} ....`)

if(typeof window.ethereum !=="undefined"){
    const provider= new ethers.providers.Web3Provider(window.ethereum)
    const signer= provider.getSigner()
    console.log(signer)
    const contract= new ethers.Contract(contractaddress,abi,signer)
    try{
    const transactionresponse= await contract.fund({
        value: ethers.utils.parseEther(ethamt)
    })
} catch(error){
    console.log(error)
}


}


    
}
async function getbalance() {

    if(typeof window.ethereum !=="undefined"){
        const provider=new ethers.providers.Web3Provider(window.ethereum)
        const balance= await provider.getBalance(contractaddress)
        console.log(ethers.utils.formatEther(balance))
    }
    
}
async function withdraw() {

    if(typeof window.ethereum !=="undefined"){
        const provider= new ethers.providers.Web3Provider(window.ethereum)
        const signer= provider.getSigner()
        console.log(signer)
        const contract= new ethers.Contract(contractaddress,abi,signer)
        try{
        const transactionresponse= await contract.withdraw()
    } catch(error){
        console.log(error)
    }
    
}
