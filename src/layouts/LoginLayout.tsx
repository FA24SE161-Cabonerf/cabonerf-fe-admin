type Props = {
  children: React.ReactNode;
};

const LoginLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Section */}
      <div className="flex-1 bg-white text-white flex items-center justify-center p-6 lg:p-10">
        <div className="max-w-md">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-black">Welcome to Our Platform</h1>
          <p className="text-base lg:text-lg text-black">
            Discover the amazing features we offer to manage your account
            securely and effortlessly.
          </p>
        </div>
      </div>

      {/* Right Section (Login/Register) */}
      <div className="flex-1 bg-gray-100 flex items-center justify-center p-6 lg:p-10">
        {children}
      </div>
    </div>
  );
};

export default LoginLayout;