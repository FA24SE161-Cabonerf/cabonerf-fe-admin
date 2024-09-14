import LoginForm from "@/forms/LoginForm";
import LoginLayout from "@/layouts/LoginLayout";



const LoginPage = () => {
  return (
    <div>
       <LoginLayout>
      <LoginForm />
      </LoginLayout>
    </div>
  );
};

export default LoginPage;
