import { useState, useEffect, useRef } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { IoIosArrowDown } from 'react-icons/io'

interface SelectBoxProps {
  options: { label: string; value: number }[]
  bgColor: string
  placeholder?: string
  textSize: 'size-body' | 'size-title' | 'size-subbody'
  register: UseFormRegisterReturn
  onClick?: (value: number) => void
}

export default function SelectBox({
  options,
  bgColor,
  textSize,
  register,
  onClick,
  placeholder = '카테고리를 선택하세요',
}: SelectBoxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState<number | null>(null)
  const selectBoxRef = useRef<HTMLDivElement>(null)

  const selectStyle = (bgColor: string, textSize: string) => {
    return `bg-${bgColor} flex justify-between border-2 cursor-pointer focus:bg-main-light-color text-black-color text-${textSize} rounded-button-radius focus:border-main-color block w-80 p-2.5 px-4 items-center`
  }

  const handleSelect = (value: number) => {
    setSelectedValue(value)
    setIsOpen(false)

    if (onClick) {
      onClick(value)
    }
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectBoxRef.current &&
      !selectBoxRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='relative inline-block' ref={selectBoxRef}>
      <div
        className={`${selectStyle(bgColor, textSize)} ${
          isOpen ? 'border-main-color' : ''
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValue !== null
          ? options.find((option) => option.value === selectedValue)?.label
          : placeholder}
        <IoIosArrowDown />
      </div>
      {isOpen && (
        <ul className='absolute left-0 w-full p-0 m-0 mt-1 overflow-hidden list-none bg-white border-2 border-main-color rounded-button-radius'>
          {options.map((option) => (
            <li
              key={option.value}
              className={`p-2.5 px-4 hover:bg-main-light-color cursor-pointer border-main-color border-b last:border-0 ${
                selectedValue === option.value
                  ? 'font-bold bg-main-light-color'
                  : ''
              }`}
              onClick={() => handleSelect(option.value)}
              {...register}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
