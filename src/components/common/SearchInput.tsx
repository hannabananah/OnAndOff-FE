import React, { useRef, ChangeEvent } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'

interface SearchInputProps {
  searchInputHandler: (e: ChangeEvent<HTMLInputElement>) => void
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
  searchInput: string
}

export default function SearchInput({ handleKeyPress }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = ''
      inputRef.current.focus()
    }
  }

  return (
    <div className='relative'>
      <label htmlFor='default-search' className='sr-only'>
        검색
      </label>
      <i className='absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3'>
        <FaSearch fill='#111' />
      </i>
      <input
        ref={inputRef}
        type='search'
        id='default-search'
        className='w-full p-4 text-sm border-2 h-9 rounded-xl text-black-color border-dark-gray-color ps-10 focus:border-main-color focus:outline-none'
        placeholder='제목이나 태그를 입력해주세요.'
        onKeyDown={handleKeyPress}
      />

      {inputRef.current?.value && (
        <button
          type='button'
          onClick={clearInput}
          className='absolute end-1 bottom-[3px] focus:outline-none font-medium rounded-lg text-sm px-4 py-2 '
        >
          <FaTimes fill='#666' />
        </button>
      )}
    </div>
  )
}
