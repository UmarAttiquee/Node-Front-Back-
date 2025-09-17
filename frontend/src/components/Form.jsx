import React, { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios'
import List from './List';

function Form() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [id, setId] = useState(null)
  const [allData, setAllData] = useState([])
  const [rerender, setRerender] = useState(false)



  function addFormData(e) {
    e.preventDefault()
    let formObj = {
      name: name,
      email: email
    }
    console.log(formObj)

    if (id) {
      axios.put(`http://localhost:8000/api/web/user/${id}`, formObj).then((res) => {
        console.log(res)
        toast.success("User Updated Successfully")
        shwoAllData()
      }).catch((err) => {
        toast.error("Faild To Add user")
        console.log(err)
      }).finally(() => {
        setName("")
        setEmail('')
        setRerender(prev => !prev)
      })
    }
    else {
      axios.post('http://localhost:8000/api/web/user', formObj).then((res) => {
        console.log(res)
        toast.success("User Created Successfully")
        shwoAllData()
      }).catch((err) => {
        toast.error("Faild To Add user")
        console.log(err)
      }).finally(() => {
        setName("")
        setEmail('')
        setRerender(prev => !prev)
      })
    }
  }




  function shwoAllData() {
    axios.get('http://localhost:8000/api/web/user').then((res) => {
      console.log(res.data.user)
      setAllData(res.data.user)
    }).catch((err) => {
      console.log(err)
    })
  }
  useEffect(() => {
    shwoAllData()
  }, [rerender])

  return (
    <>
      <ToastContainer />
      <form
        action=""
        onSubmit={addFormData}
        className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4"
      >
        <input
          type="text"
          value={name}
          name='name'
          onChange={(e) => { setName(e.target.value) }}

          placeholder="Enter Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          value={email}
          name='email'
          onChange={(e) => { setEmail(e.target.value) }}
          placeholder="Enter Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </form>
      <List allData={allData} setRerender={setRerender} setName={setName} setEmail={setEmail} setId={setId} />
    </>
  )
}

export default Form