import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import React from 'react'

interface ILoadingButtonProps{
isPending:boolean
title:string
loadingTitle:string
}
const LoadingButton:React.FC<ILoadingButtonProps>= ({isPending, title, loadingTitle}) => {
  return (
    <Button className="w-full" type="submit">
                    {isPending ? (
                      <>
                        <span>{loadingTitle} </span>
                        <span>
                          <Loader className="animate-spin" />
                        </span>
                      </>
                    ) : (
                      <span>{title}</span>
                    )}
                  </Button>
  )
}

export default LoadingButton