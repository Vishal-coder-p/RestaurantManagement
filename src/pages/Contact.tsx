import React, { useState } from 'react'

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you for contacting us!')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className='page-container'>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} className='contact-form'>
        <div className='form-group'>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='message'>Message:</label>
          <textarea
            id='message'
            name='message'
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type='submit' className='submit-btn'>Send Message</button>
      </form>
    </div>
  )
}

export default Contact
