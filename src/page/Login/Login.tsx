import React from 'react'
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate("/home")
    }
    return (
        <div>
            <button onClick={handleSubmit}>
                login
            </button>
        </div>
    )
}
