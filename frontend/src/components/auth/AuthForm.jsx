"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { validateEmail, validatePassword } from "@/utils/validators";
import Link from "next/link";
import { loginUser, registerUser } from "@/api/user.api";
import styles from "@/styles/components/auth/auth.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/slices/authSlice.js";
import { setAuthToken } from "@/utils/cookies";

export default function AuthForm({ type = "login" }) {
  const router = useRouter();
  const isRegister = type === "register";
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // * Basic validation
    if (isRegister && !form.name) return setError("Name is required");
    if (!validateEmail(form.email)) return setError("Invalid email address");
    const result = validatePassword(form.password);
    if (!result.valid) return setError(result.message);
    setLoading(true);

    try {
      let res;
      if (isRegister)
        res = await registerUser(form.name, form.email, form.password);
      else res = await loginUser(form.email, form.password);

      if (res.user && res.token) {
        setAuthToken(res.token);
        const { password, ...safeUser } = res.user;
        dispatch(login(safeUser));
      }

      setMessage(
        res.message ||
          (isRegister ? "Registration successful!" : "Login successful!")
      );
      setForm({ name: "", email: "", password: "", remember: false });

      setTimeout(() => {
        setMessage("");
        router.push("/dashboard");
      }, 1500);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setTimeout(() => setError(""), 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authWrapper}>
      <div className={styles.authCard}>
        <h1>{isRegister ? "Create an account" : "Welcome back"}</h1>
        <p>
          {isRegister
            ? "Fill in the details to register."
            : "Enter your email and password to log in."}
        </p>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <label>
              <span>Full Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>
          )}

          <label>
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            <span>Password</span>
            <div className={styles.passwordField}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button type="button" onClick={() => setShowPassword((s) => !s)}>
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          {error && <p className={styles.error}>{error}</p>}
          {message && <p className={styles.success}>{message}</p>}

          {!isRegister && (
            <div className={styles.formFooter}>
              <label>
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                />
                <span>Remember me</span>
              </label>
              <a href="/forgot">Forgot?</a>
            </div>
          )}

          <button type="submit" disabled={loading} className={styles.btn}>
            {loading ? "Please wait..." : isRegister ? "Register" : "Log in"}
          </button>

          <div className={styles.switch}>
            {isRegister ? (
              <>
                Already have an account? <Link href="/auth/login">Login</Link>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <Link href="/auth/register">Register now</Link>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
