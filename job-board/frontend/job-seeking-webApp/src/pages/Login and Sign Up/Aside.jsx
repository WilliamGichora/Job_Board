import logoImage from '../../assets/loginlogo.jpg'

function Aside() {
  return (
      <aside className="bg-specialBlue-100 rounded-l-sm w-1/3">
          <p className=" text-center text-[25px] text-white font-semibold  font-sans sm:mx-10 sm:my-16  ">Are you Seeking for a job? <br />
              Login and Apply for the job of your choice at <br /> <span className="flex justify-center items-center font-bold font-sans text-[30px]">Jobify</span>  </p>
          <div className="w-1/3 mx-auto my-26 rounded-r-3xl">
              <img src={logoImage} alt="" className="rounded-r-3xl" />
          </div>
      </aside>
  )
}

export default Aside