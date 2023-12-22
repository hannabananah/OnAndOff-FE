interface TapButton {
  name: string
  numData: number
  isSelected: boolean // isSelected 속성
  onClick: () => void // 클릭 이벤트 핸들러
}

const TapCard = ({ name, numData, isSelected, onClick }: TapButton) => {
  return (
    <>
      <div
        className={`pb-[10px] cursor-pointer flex gap-0.5 mr-[20px] font-bold mt-14 ${
          isSelected
            ? 'opacity-100 border-b-[3px] border-solid border-main-color'
            : 'opacity-60'
        }`}
        onClick={onClick}
      >
        <h4 className='text-[1rem] desktop:text-[1.5rem]'>{name}</h4>
        <div className='w-[42px] h-[33px] bg-main-color rounded-button-radius flex items-center justify-center'>
          <p className='font-normal text-center text-white text-size-body'>
            {numData}
          </p>
        </div>
      </div>
    </>
  )
}

export default TapCard
