// // hooks/useProjects.js
// import { publicApi } from '@/libs/api/axios'
// import { useState, useEffect } from 'react'

// export const useProjects = (count = null) => {
//   const [projects, setProjects] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         // Replace with your actual API endpoint
//         const response = await publicApi.get('/project')
//         const data = response.data
//         if (!data || !Array.isArray(data)) {
//           throw new Error('Invalid data format received from API')
//         }
//         // If count is specified, return only that many projects
//         setProjects(count ? data.slice(0, count) : data)
//       } catch (err) {
//         setError(err.message)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchProjects()
//   }, [count])

//   return { projects, loading, error }
// }