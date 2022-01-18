const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ['Deposit', 'Cash Back'];
  
  console.log(`ATM isDeposit: ${isDeposit}`);
  var showInput = false;
  var element = document.getElementById('mode-select');
  if (element != null && element.value != '') {
    showInput = true;
  }
 
 console.log("isValid " + isValid);
 //need to toggle the disable attribute for the Submit button
 var submitElement = document.getElementById('submit-input');

 if((submitElement != null) && (isValid != false)){
    submitElement.removeAttribute("disabled");
 }
 else if (submitElement != null){
      submitElement.disabled = true;
 }

  return (
     showInput && <div>
      <label className="label huge">
        <h3> {choice[Number(!isDeposit)]}</h3>
        <input id="number-input" type="number" width="200" onChange={onChange}></input>
        <input type="submit" width="200" value="Submit" id="submit-input" disabled></input>
      </label>
    </div>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);

  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    //need to check if the transaction is valid here
    if(event.target.value <= 0) {
      setValidTransaction(false);
      return;
    }
    else if( (event.target.value > totalState) && atmMode == 'Cash Back'){
      setValidTransaction(false);
      return;
    }
    else  
      setValidTransaction(true);

    setDeposit(Number(event.target.value));
  };

  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    event.preventDefault();
  };

  const handleModeSelect = (event) => {
    setAtmMode(event.target.value);
    //check to see if we have Deposit, Cash Back, or ""
    if(event.target.value != null){
      if(event.target.value == 'Deposit')
        setIsDeposit(true);
      else
        setIsDeposit(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <label>Select an action to continue</label>
        <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
          <option id="no-selection" value=""></option>
          <option id="deposit-selection" value="Deposit">Deposit</option>
          <option id="cashback-selection" value="Cash Back">Cash Back</option>
        </select>
      <ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={validTransaction}></ATMDeposit>
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));