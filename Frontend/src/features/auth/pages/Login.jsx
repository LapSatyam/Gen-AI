import { useNavigate, Link } from "react-router";
import "../auth.form.css";

const handleSubmit = (e) => {
  e.preventDefault();
};

const Login = () => {
  const navigate = useNavigate();
  return (
    <main>
      <div className="form-container">
        <div className="top">
          <div className="icon">
            <svg
              aria-hidden="true"
              focusable="false"
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="-translate-x-0.5"
            >
              <path d="M20 11v6" />
              <path d="M20 13h2" />
              <path d="M3 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 2.072.578" />
              <circle cx="10" cy="7" r="4" />
              <circle cx="20" cy="19" r="2" />
            </svg>
          </div>
          <h1 className="text-3xl font-semibold translate-x-0.8">Login</h1>
          <p>Enter your valid details to login.</p>
        </div>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">
              <svg
                aria-hidden="true"
                focusable="false"
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-mail preview-icon"
              >
                <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                <rect x="2" y="4" width="20" height="16" rx="2" />
              </svg>
              <span>
                Email <sup>*</sup>
              </span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="hello@email.com"
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              title="Please enter a valid email address."
              required
            />
            <small>Please enter a valid email</small>
          </div>
          <div className="input-group">
            <label htmlFor="password">
              <svg
                aria-hidden="true"
                focusable="false"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-lock preview-icon"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>
                Password <sup>*</sup>
              </span>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="✶✶✶✶✶✶395"
              minLength={8}
              pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}"
              title="Password must contain uppercase, lowercase, a number, and a special character."
              autoComplete="new-password"
              required
            />
            <small>Please enter a valid password</small>
          </div>

          <button type="submit" className="button primary-button">
            Login
          </button>
        </form>

        <p>
          Don't have an account?&nbsp;
          <Link to="/register">
            Register
            <svg
              aria-hidden="true"
              focusable="false"
              xmlns="http://www.w3.org/2000/svg"
              width="14.5"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="inline-block translate-x-0.5"
            >
              <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
              <path d="m21 3-9 9" />
              <path d="M15 3h6v6" />
            </svg>
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
