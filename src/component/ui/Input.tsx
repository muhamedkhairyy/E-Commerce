import { InputHTMLAttributes } from "react"

const Input = ({...rest }: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input {...rest} className="border-[1px] border-gray-300 shadow-md focus:border-indigo-500 focus:outline-none focus-ring-1
    focus:ring-indigo-500 rounded-lg p-2 text-md"/>
  )
}
 
export default Input