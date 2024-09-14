type Props = {
  children: React.ReactNode;
};

const LoginLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="flex-1 bg-white text-white flex items-center justify-center p-10">
        <div>
          <h1 className="text-4xl font-bold mb-4 text-black ">Welcome to Our Platform</h1>
          <p className="text-lg text-black">
            Discover the amazing features we offer to manage your account
            securely and effortlessly.
          </p>
        </div>
      </div>

      {/* Right Section (Login/Register) */}
      <div className="container mx-auto flex-1 py-10 bg-gray-100">
        {children}
      </div>
    </div>
  );
};

export default LoginLayout;
