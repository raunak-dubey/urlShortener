"use client"
import AuthForm from '@/components/auth/AuthForm'

const Login = () => {
  return (
    <AuthForm type="login" onSubmit={(data) => console.log("Login data:", data)} />
  )
}

export default Login