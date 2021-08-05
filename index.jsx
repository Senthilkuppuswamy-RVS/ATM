const ATMDeposit = ({ onChange, isDeposit, validTransaction }) => {
  const choice = ["Deposit", "Cash Back"];
  var a = "";
  var isValid = validTransaction;
  if (isDeposit === true || isDeposit === false) {
    a = true;
  }
  console.log(`ATM isDeposit: ${isDeposit}`);
  console.log("hi", isValid);
  return (
    <div>
      {a && (
        <label className="label huge">
          <h3> {choice[Number(!isDeposit)]}</h3>
          <input
            id="number-input"
            type="number"
            width="200"
            onChange={onChange}
          ></input>
          <input
            type="submit"
            width="200"
            value="Submit"
            id="submit-input"
            disabled={!isValid}
          ></input>
        </label>
      )}
    </div>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState("");
  const [atmMode, setAtmMode] = React.useState(true);
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);

  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    setDeposit(Number(event.target.value));
    setValidTransaction(false);
    if (event.target.value <= 0) {
      return setValidTransaction(false);
    }

    if (atmMode === "Cash Back" && event.target.value > totalState) {
      return setValidTransaction(false);
    } else {
      return setValidTransaction(true);
    }
  };

  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    event.preventDefault();
    if (isDeposit) 
    alert (`You have succesfully deposited Rs.${deposit} and your Account Balance is Rs.${newTotal}`);
    else
    alert (`You have succesfully withdrawn Rs.${deposit} and your Account Balance is Rs.${newTotal}`);
};

  const handleModeSelect = (event) => {
    let selection = event.target.value;
    setAtmMode(selection);
    if (selection === "") setIsDeposit("");
    if (selection === "Deposit") setIsDeposit(true);
    if (selection === "Cash Back") setIsDeposit(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <label>Select an action below to continue</label>
      <select
        onChange={(e) => handleModeSelect(e)}
        name="mode"
        id="mode-select"
      >
        <option id="no-selection" value=""></option>
        <option id="deposit-selection" value="Deposit">
          Deposit
        </option>
        <option id="cashback-selection" value="Cash Back">
          Cash Back
        </option>
      </select>
      


      <ATMDeposit
        onChange={handleChange}
        isDeposit={isDeposit}
        validTransaction={validTransaction}
      ></ATMDeposit>
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));
