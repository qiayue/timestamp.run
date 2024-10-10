import React, { useState } from 'react'

const TimestampConverter: React.FC = () => {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')

  const convertTimestamp = () => {
    const inputValue = input.trim()
    if (!inputValue) {
      setResult('Please enter a valid timestamp or date')
      return
    }

    try {
      let date: Date

      if (/^\d+$/.test(inputValue)) {
        // Unix timestamp (in seconds)
        date = new Date(parseInt(inputValue) * 1000)
      } else {
        // Human-readable date
        date = new Date(inputValue)
      }

      if (isNaN(date.getTime())) {
        throw new Error('Invalid date')
      }

      const unixTimestamp = Math.floor(date.getTime() / 1000)
      const humanReadable = date.toUTCString()

      setResult(`Unix Timestamp: ${unixTimestamp}\nHuman-readable: ${humanReadable}`)
    } catch (error) {
      setResult('Invalid input. Please enter a valid timestamp or date.')
    }
  }

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter Unix timestamp or date"
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={convertTimestamp}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
      >
        Convert
      </button>
      <pre className="mt-4 p-2 bg-gray-100 rounded whitespace-pre-wrap">{result}</pre>
    </div>
  )
}

export default TimestampConverter