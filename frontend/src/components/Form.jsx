import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import '../styles/Form.css'

const Form = ({route,method}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const name = method === 'login' ? 'Login' : 'Register'

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        try {
            const res = await api.post(route, {username,password})
            if (method==='login'){
                localStorage.setItem(ACCESS_TOKEN,res.data.access)
                localStorage.setItem(REFRESH_TOKEN,res.data.refresh)
                navigate('/')
            } else navigate('/')
        } catch (error) {
            alert(error)
            console.log("error",error);
        }
        finally{
            setLoading(false)
        }
    }

    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>

        {/* Username */}
        <input type="text" className="form-input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />

        {/* Password */}
        <input type="password" className="form-input" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />

        {/* Submit */}
        <button type="submit" className="form-button">{name}</button>
    </form>
}

export default Form