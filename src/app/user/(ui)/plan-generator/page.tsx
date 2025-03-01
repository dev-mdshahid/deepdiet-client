'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'

export default function PlanGeneratorPage() {
  const searchParams = useSearchParams();
  const planType = searchParams.get('planType');
  console.log(planType);
  return (
    <div>{planType} PlanGeneratorPage</div>
  )
}
