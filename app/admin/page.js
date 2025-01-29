"use client"
import { useState, useEffect } from 'react'
import Card from '@/components/ui/card'

export default function AdminPage() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/scores')
      .then(res => res.json())
      .then(data => {
        setResults(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching results:', error)
        setLoading(false)
      })
  }, [])

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-4xl mx-auto bg-white p-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-black">Test Results</h1>
        {loading ? (
          <p className="text-lg">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left text-lg font-bold text-black">Name</th>
                  <th className="px-6 py-3 text-left text-lg font-bold text-black">Score</th>
                  <th className="px-6 py-3 text-left text-lg font-bold text-black">Total Questions</th>
                  <th className="px-6 py-3 text-left text-lg font-bold text-black">Date</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result) => (
                  <tr key={result.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-black text-lg">{result.name}</td>
                    <td className="px-6 py-4 text-black text-lg">{result.score}</td>
                    <td className="px-6 py-4 text-black text-lg">{result.totalQuestions}</td>
                    <td className="px-6 py-4 text-black text-lg">
                      {new Date(result.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}