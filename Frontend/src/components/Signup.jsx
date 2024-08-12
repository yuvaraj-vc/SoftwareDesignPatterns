// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { useNavigate } from 'react-router-dom';
// import BlurFade from './magicui/blur-fade';

// const Signup = () => {
//     const [name, setName] = useState('');
//     const [contact, setContact] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const Navigate=useNavigate();

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!name || !contact || !email || !password) {
//             setError('Please fill in all fields.');
//         } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
//             setError('Invalid email address.');
//         } else {
//             setError('');
//             // Proceed with signup
//             console.log('Account created successfully');
            
//             Navigate('/login');
//           }
          
//     };

//     return (
//         <div className='h-full w-full flex justify-center items-center'>
//             <Card className="w-1/4">
//                 <BlurFade delay={0.25} inView>
//                     <CardHeader className="space-y-1">
//                         <CardTitle className="text-2xl">Create an account</CardTitle>
//                         <CardDescription>
//                             Enter your email below to create your account
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
//                                 <Label htmlFor="name">Name</Label>
//                                 <Input
//                                     id="name"
//                                     type="text"
//                                     value={name}
//                                     onChange={(e) => setName(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                             <div className="grid gap-2">
//                                 <Label htmlFor="contact">Contact</Label>
//                                 <Input
//                                     id="contact"
//                                     type="text"
//                                     value={contact}
//                                     onChange={(e) => setContact(e.target.value)}
//                                     required
//                                 />
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
//                             <Button type='submit' className="w-full">Create account</Button>
//                         </CardFooter>
//                     </form>
//                 </BlurFade>
//             </Card>
//         </div>
//     );
// };

// export default Signup;





import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import BlurFade from './magicui/blur-fade';
import { authService } from '@/service/auth'; // Import authService
import axios from 'axios';

const Signup = () => {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Corrected Navigate to navigate

    const formData={
        name,
        email,
        contact,
        password,
        role:"USER"
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
              const response = await axios.post('http://localhost:8080/api/v1/auth/register',formData)
              //  {
              //   name: formData.name,
              //     email: formData.email,
              //     password: formData.password,
              //     role:formData.role
              //     // phoneNumber: formData.phoneNumber
              // });
              console.log("User registered", response.data);
              alert("Registration successful");
              navigate('/login');
          } catch (error) {
              console.error("There was an error registering the user", error);
              // setError(error.response?.data || 'Registration failed');
          }
    };

    return (
        <div className='h-full w-full flex justify-center items-center'>
            <Card className="w-1/4">
                <BlurFade delay={0.25} inView>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl">Create an account</CardTitle>
                        <CardDescription>
                            Enter your email below to create your account
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
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="contact">Contact</Label>
                                <Input
                                    id="contact"
                                    type="text"
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}
                                    required
                                />
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
                            <Button type='submit' className="w-full">Create account</Button>
                        </CardFooter>
                    </form>
                </BlurFade>
            </Card>
        </div>
    );
};

export default Signup;