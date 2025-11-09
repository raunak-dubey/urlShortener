"use client"
import AuthForm from '@/components/auth/AuthForm'

const Register = () => {
  return (
    <AuthForm type="register" onSubmit={(data) => console.log("Register data:", data)} />
  )
}

export default Register