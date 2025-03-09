import React from 'react'
import { Badge } from './ui/badge'

export default function TagPills({tags}) {
  return (
    <div className="flex flex-row justify-start align-middle gap-2">
      {tags.map((tag) => (
        <Badge className="" key={tag}>
          {tag}
        </Badge>
      ))}
    </div>
  )
}
