import {useEffect, useState} from "react";
import {spans} from "next/dist/build/webpack/plugins/profiling-plugin";

const Users = () => {
  const [users, setUsers] = useState<{ id: string, name: string}[]>([])
  const fetchUsers = async () => {
    const data = await fetch('/api/users', {
      method: 'GET'
    }).then(data => {
      return data.json()
    }) as unknown as { id: string, name: string}[]
    setUsers(data)
  }
  useEffect( () => {
    fetchUsers()
  }, [])

  return <div>{users.map(user => <li key={user.id}>{user.name}</li>)}</div>
}

export default Users

// export async function getServerSideProps() {
//   const data = await fetch('/api/users', {
//     method: 'GET'
//   })
//   return {
//     props: data,
//   }
// }