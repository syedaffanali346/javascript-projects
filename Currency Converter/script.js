const apiUrl = "https://v6.exchangerate-api.com/v6/3c4d689ee6c1d70ad449708c/pair";
const fromCountry = document.querySelector(".from select");
const toCountry = document.querySelector(".to select");
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");

window.addEventListener("load",()=>{
    updateExchangeRate();
});
for (const select of dropdowns) {
    for (const currCode in countryList) {
        const option = document.createElement("option");
        option.innerText = currCode;
        option.value = currCode;
        if (select.name === "from" && currCode==="USD") {
            option.selected = "selected";
        }else if (select.name === "to" && currCode==="PKR") {
            option.selected = "selected";
        }
        select.append(option);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}
const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})
const updateExchangeRate=async ()=>{
    let amountInp = document.querySelector(".amount input");
    let amountVal = amountInp.value;
    if (amountVal === "" || amountVal < 1) {
        amountVal = 1;
        amountInp.value = "1";
    }
    
    const URL = `${apiUrl}/${fromCountry.value}/${toCountry.value}/${amountVal}`;
    let response = await fetch(URL);
    let data = await response.json();
    const msg = document.querySelector(".msg");
    let fullMsg = `${amountVal} ${fromCountry.value} = ${data.conversion_result} ${toCountry.value}`;
    msg.innerText = fullMsg;
}
