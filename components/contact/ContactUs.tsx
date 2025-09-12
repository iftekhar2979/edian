'use client'

import React, { useState } from 'react'
import { Button } from '../Resuable/Button/Button'

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: send formData to backend
    alert('Message sent!')
  }

  return (
    <div className=" p-6 w-full max-w-2xl mx-auto mt-20 text-black bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4  text-black tracking-widest">Email Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-black font-medium mb-1" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block  text-black font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-black font-medium mb-1" htmlFor="message">
            Message
          </label>
          <textarea
            name="message"
            rows={4}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>
        <Button/>
      </form>
    </div>
  )
}

export default ContactForm
