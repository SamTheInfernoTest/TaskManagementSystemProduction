import  useWeb  from '../../context/WebContext';

function Register() {
  const { theme } = useWeb();

  return (
    <div className="flex h-screen bg-lightBg dark:bg-darkBg">
      {/* Left side for image */}
      <div className="w-1/2 bg-cover bg-center sm:flex hidden items-center justify-center">
        {/* Optional: Add any content like a logo or slogan here */}
        <img src={theme === "dark" ? "/whitetms.svg" : "/blacktms.svg"} alt="TMSLogo" />
      </div>

      {/* Right side for form */}
      <div className="sm:w-1/2 w-full flex items-center justify-center p-8 bg-lightHeader dark:bg-darkHeader">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-8 text-center">Register for TMS</h1>

          <form className="space-y-6">
            {/* Dropdown for Mentor/Student */}
            <div>
              <label className="block text-sm font-medium">Register as</label>
              <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lightText">
                <option>Mentor</option>
                <option>Student</option>
              </select>
            </div>

            {/* Username Input */}
            <div>
              <label className="block text-sm font-medium">Username</label>
              <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium">Password</label>
              <input type="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium">Re-type Password</label>
              <input type="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-center">
              <button type="submit" className="dark:bg-darkButton bg-lightButton px-6 py-2 rounded-full dark:text-[#DFF2EB] text-white hover:ring dark:hover:ring-darkHover hover:ring-darkHover font-semibold"
              onClick={(e) => {
                e.preventDefault();
              }}
              >Register</button>
            </div>

            {/* Login Link */}
            <div className="text-center mt-4">
              <a href="/login" className="text-blue-600 hover:text-blue-800 dark:text-darkText hover:dark:text-darkText dark:hover:underline">Already have an account? Log in here</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
