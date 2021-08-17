export default function Login() {
  const handleSubmit = () => {

  }
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      console.log("form")
      // api送信
    }} >
      <label>email<input type="email" autoComplete="username" /></label>
      <label>パスワード<input type="password" autoComplete="current-password" /></label>
      <button>ログイン</button>
    </form>
  )
}