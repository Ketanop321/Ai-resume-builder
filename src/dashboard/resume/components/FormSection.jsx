import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'
import Summery from './forms/Summery'
import Experience from './forms/Experience'

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1)
  const [enableNext, setEnableNext] = useState(false)
  return (
    <div>
      <div className='flex justify-between items-center'>
        <Button className='flex gap-2' variant='outline' size='sm'> <LayoutGrid/> Theme</Button>
        <div className='flex gap-2'>
          {
            activeFormIndex>1&&<Button onClick={() => setActiveFormIndex(activeFormIndex-1)} size='sm'> <ArrowLeft/> </Button>
          }
          <Button disabled={!enableNext} onClick={() => setActiveFormIndex(activeFormIndex+1)} className='flex gap-2' size='sm'>Next <ArrowRight/></Button>
        </div>
      </div>
      {/* Personal Detail */}
        {activeFormIndex == 1 ? <PersonalDetail enableNext ={(v) => setEnableNext(v)}/>
         : activeFormIndex == 2 ? <Summery enableNext ={(v) => setEnableNext(v)}/>
          : activeFormIndex == 3 ? <Experience enableNext ={(v) => setEnableNext(v)}/> : null}
      {/* Educational Detail  */}
        
      {/* Skill */}
        
    </div>
  )
}

export default FormSection