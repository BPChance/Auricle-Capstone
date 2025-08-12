interface NotLoggedInProps {
  onLoginClick: () => void;
}

export const NotLoggedIn = ({ onLoginClick }: NotLoggedInProps) => (
  <div className="min-h-screen bg-[#2C2C71] text-white p-8 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">Not Logged In</h1>
      <p className="mb-4">Please log in to view your profile</p>
      <button 
        onClick={onLoginClick}
        className="bg-[#4848A1] border-2 border-[#FFC0CB] rounded-full py-2 px-6 text-[#FFC0CB] hover:bg-[#FFC0CB] hover:text-[#4848A1] transition-colors"
      >
        Go to Login
      </button>
    </div>
  </div>
);