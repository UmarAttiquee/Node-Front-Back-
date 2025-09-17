import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

function List({ allData, setRerender, setName, setEmail, setId }) {



  const editData = (id) => {
    axios.get(`http://localhost:8000/api/web/user/${id}`).then((res) => {
      console.log(res.data.user)
      setName(res.data.user.name)
      setEmail(res.data.user.email)
      setId(id)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {

    })
  }

  const delData = (id) => {
    axios.delete(`http://localhost:8000/api/web/user/${id}`).then((res) => {
      console.log(res)
      toast.success("User Deleted Successfully")
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setRerender(prev => !prev)

    })
  }



  return (
    <>
      <ToastContainer />
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Edit</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Delete</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allData.map((item, index) => (
              <tr key={item._id}>
                <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{item.name}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{item.email}</td>
                <td className="px-6 py-4">
                  <button onClick={() => { editData(item._id) }} className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">
                    Edit
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => { delData(item._id) }} className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </>
  )
}

export default List