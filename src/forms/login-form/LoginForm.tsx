import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useMutation } from '@tanstack/react-query'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ReloadIcon } from "@radix-ui/react-icons"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useAuth } from '@/contexts/auth/AuthContext'
import { useNavigate } from 'react-router-dom'

// Define the form schema with Zod
const loginSchema = z.object({
  email: z.string().min(1, 'Email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

// Infer the type from the schema
export type LoginFormValues = z.infer<typeof loginSchema>

// Mock login function (replace with actual API call)


const LoginForm =() => {
  const { handleLogin } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(null)
  const navigate = useNavigate(); 
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormValues) => handleLogin(data), // Pass the data here
    onSuccess: () => {
      console.log('Login successful');
      navigate('/'); 
    },
    onError: (error: Error) => {
      setLoginError(error.message);
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    setLoginError(null);
    loginMutation.mutate(data); // Pass the form data to the mutation
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-8 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="m@example.com" 
                        {...field} 
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        {...field} 
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  'Log in'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          {loginError && (
            <Alert variant="destructive" className="mt-4 w-full">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{loginError}</AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
export default LoginForm;