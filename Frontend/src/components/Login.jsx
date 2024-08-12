// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Link, useNavigate } from 'react-router-dom';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import BlurFade from './magicui/blur-fade';
// import axios from 'axios';


// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!email || !password) {
//             setError('Please fill in all fields.');
//         } else {
//             try {
//                 const response = await axios.post('http://localhost:8080/api/auth/login', {
//                     email,
//                     password
//                 });

//                 // Assuming the backend returns a JWT token on successful login
//                 localStorage.setItem('token', response.data.token);
//                 setError('');
//                 console.log('Logged in successfully');

//                 // Navigate based on user role if applicable
//                 navigate('/dashboard'); // Replace with '/userdashboard' if user-specific

//             } catch (error) {
//                 setError('Invalid email or password.');
//                 console.error('Login failed', error);
//             }
//         }
//     };

//     return (
//         <div className='h-full w-full flex justify-center items-center pt-1.5'>
//             <Card className="w-1/4">
//                 <BlurFade delay={0.25} inView>
//                     <CardHeader className="space-y-1">
//                         <CardTitle className="text-2xl">Login</CardTitle>
//                         <CardDescription>
//                             Enter your email below to login
//                         </CardDescription>
//                     </CardHeader>
//                     <form onSubmit={handleSubmit}>
//                         <CardContent className="grid gap-4">
//                             <div className="relative">
//                                 <div className="absolute inset-0 flex items-center">
//                                     <span className="w-full border-t" />
//                                 </div>
//                             </div>
//                             <div className="grid gap-2">
//                                 <Label htmlFor="email">Email</Label>
//                                 <Input
//                                     id="email"
//                                     type="email"
//                                     placeholder="Mail"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                             <div className="grid gap-2">
//                                 <Label htmlFor="password">Password</Label>
//                                 <Input
//                                     id="password"
//                                     type="password"
//                                     placeholder="******"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                             {error && <p className="text-red-500">{error}</p>}
//                         </CardContent>
//                         <CardFooter>
//                             <Button type='submit' className="w-full flex-row" >Login</Button>
//                         </CardFooter>
//                     </form>
//                 </BlurFade>
//             </Card>
//         </div>
//     );
// };

// export default Login;




import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import BlurFade from './magicui/blur-fade';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authService } from '@/service/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const formData = {
        email,
        password
    }

    const handleLogin = async (token) => {
        authService.setToken(token);
    
        try {
          const role = authService.getUserRole();
    
          if (role) {
            if (role === 'USER') {
              navigate('/userDashboard');
              
            } else if (role === 'ADMIN') {
              navigate('/dashboard');
             
            } else {
              toast.error('Unknown role.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
              });
            }
          } else {
            toast.error('Role not found in token.', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
            });
          }
        } catch (error) {
          console.error("Error decoding token:", error);
          toast.error('Failed to decode token.', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        }
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            const response = await authService.SignIn(formData.email, formData.password);
            

            const { token } = response.data;
            console.log(formData);

            toast.success('Login successful!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });

            setTimeout(()=>{
                handleLogin(token);

            },2000);

        } catch (error) {
            setError('Invalid email or password.');
            console.error('Login failed', error);
            toast.error('Login failed. Please check your credentials.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
        }
    };

    return (
        <div className='h-full w-full flex justify-center items-center pt-1.5'>
            <Card className="w-1/4">
                <BlurFade delay={0.25} inView>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl">Login</CardTitle>
                        <CardDescription>
                            Enter your email below to login
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="grid gap-4">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder=""
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <p className="text-red-500">{error}</p>}
                        </CardContent>
                        <CardFooter>
                            <Button type='submit' className="w-full flex-row">Login</Button>
                        </CardFooter>
                    </form>
                </BlurFade>
            </Card>
            <ToastContainer />
        </div>
    );
};

export default Login;