import {useState} from "react";
import {useRouter} from "next/router";
import {use} from "ast-types";

export default function Login() {
  const [email, setEmail] = useState('a@a')
  const [password, setPassword] = useState('a')
  const [isError, setIsError] = useState(false)
  const router = useRouter()

  return (
    <>
      {isError && <p role='alert'>IDまたはパスワードが間違っています</p>}
      <form onSubmit={(e) => {
        e.preventDefault()
        fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({email, password})
        }).then((res) => {
          if (res.status === 200) {
            console.log('success')
            console.log(res.body)
            router.push('/mypage')
          } else {
            // エラーメッセージの表示
            console.log('failure')
            setIsError(true)
          }
        })
        // api送信
      }} >
        <label>email<input type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label>パスワード<input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
        <button>ログイン</button>
      </form>
    </>
  )
}