import React from 'react'

export default function TagPills({tags}) {
  return (
    <div className="flex flex-row justify-start align-middle gap-2">
      {tags.map((tag) => (
        <div className="flex flex-row justify-center align-middle bg-blue-500 text-white text-xs px-2 py-1 rounded-full" key={tag}>
          {tag}
        </div>
      ))}
    </div>
  )
}
