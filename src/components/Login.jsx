import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link ,useNavigate} from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import BlurFade from './magicui/blur-fade';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please fill in all fields.');
        } else if (email === 'admin@gmail.com' && password === '12345') {
            setError('');
            // Proceed with login
            console.log('Logged in successfully');
            navigate('/dashboard');
        } else if (email === 'user@gmail.com' && password === '123') {
            setError('');
            // Proceed with login
            console.log('Logged in successfully');
            navigate('/userdashboard');
        } else {
            setError('Invalid email or password.');
            
           
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
                                    placeholder="******"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <p className="text-red-500">{error}</p>}
                        </CardContent>
                        <CardFooter>
                            <Button type='submit' className="w-full flex-row" >Login</Button>
                        </CardFooter>
                    </form>
                </BlurFade>
            </Card>
        </div>
    );
};

export default Login;
