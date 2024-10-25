import { FC } from 'react'
import { Link } from 'react-router-dom'

interface buttonProps{
    link:string,
    title:string
}
const Button1:FC<buttonProps> = ({link,title}) => {
  return (
        <Link
          to={link}
          className="relative px-5 py-2 font-medium text-white group mt-24 cursor-pointer"
        >
          <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-green-500 group-hover:bg-green-700 group-hover:skew-x-12"></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-green-700 group-hover:bg-green-500 group-hover:-skew-x-12"></span>
          <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-green-600 -rotate-12"></span>
          <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-green-400 -rotate-12"></span>
          <span className="relative">{title}</span>
        </Link>
  )
}

export default Button1
