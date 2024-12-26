import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../../../service/GlobalApi'
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';
import { AIChatSession } from '../../../../../service/AIModel';

const prompt = 'Job Title: {jobTitle}, Depends on job title give me for my resume within 4-5 lines in JSON format with field experince Level and Summery with Exprience level for Fresher, Mid-Level , Experienced'
function Summery({ enableNext }) {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState()
  const [loading, setLoading] = useState(false)
  const [aiGeneratedSummeryList, setAiGeneratedSummeryList] = useState()
  useEffect(() => {
    summery && setResumeInfo({
      ...resumeInfo,
      summery: summery
    })
  }, [summery])

  const GernateSummeryFromAi = async () => {
    setLoading(true)
    const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle)
    console.log(PROMPT)
    const result = await AIChatSession.sendMessage(PROMPT)
    console.log(JSON.parse(result.response.text()))
    setAiGeneratedSummeryList(JSON.parse([result.response.text()]))
    setLoading(false)
  }

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true)
    const data = {
      data: {
        summery: summery
      }
    }
    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(resp => {
      console.log(resp)
      enableNext(true)
      setLoading(false)
      toast("Details Updated Successfully")
    }, (error) => {
      setLoading(false)
    })
  }

  return (
    <div>
      <div className='p-5 shadow-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Summery</h2>
        <p>Add Summery for your job title</p>
        <form className='mt-7' onSubmit={onSave}>
          <div className='flex justify-between items-end'>
            <label>Add Summery</label>
            <Button type='button' onClick={() => GernateSummeryFromAi()} variant='outline' size='sm' className='border-primary text-primary'>Generate Summery from AI ✨</Button>
          </div>
          <Textarea onChange={(e) => setSummery(e.target.value)} defaultValue={resumeInfo?.summery} required className='mt-5' placeholder='Add your summery here' />
          <div className='mt-2 flex justify-end'>
            <Button disabled={loading} type='submit'>{
              loading ? <LoaderCircle className='animate-spin' /> : 'Save'
            }</Button>
          </div>
        </form>
      </div>

      {
        aiGeneratedSummeryList && <div>
          <h2 className='font-bold text-lg'>Suggestions</h2>
          {
            aiGeneratedSummeryList.map((item, index) => (
              <div key={index}>
                <h2 className='font-bold my-1'>Level: {item?.experienceLevel}</h2>
                <p>{item?.summery}</p>
              </div>
            ))
          }
        </div>
      }
    </div>
  )
}

export default Summery