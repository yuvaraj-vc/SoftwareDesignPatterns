import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { DollarSign, ShoppingBag, User, Users } from 'lucide-react'
import BlurFade from '../magicui/blur-fade'
const Dashboard = () => {
    return (
        <div className="bg-opacity-90 backdrop-blur-3xl  flex flex-row p-4 gap-4">
            <Card className='w-1/4 border border-primary'>
          <BlurFade delay={0.25} >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Users
                    </CardTitle>
                    <Users className="h-6 w-6 text-primary" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">10000</div>
                </CardContent>
            </BlurFade>
            </Card>
            <Card className='w-1/4 border border-primary'>
            <BlurFade delay={0.25} >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Active Users
                    </CardTitle>
                    <Users className="h-6 w-6 text-primary" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">9999</div>
                </CardContent>
                </BlurFade>
            </Card>
            <Card className='w-1/4 border border-primary'>
            <BlurFade delay={0.25} >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Universities
                    </CardTitle>
                    <ShoppingBag className="h-6 w-6 text-primary" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">10,000</div>
                </CardContent>
                </BlurFade>
            </Card>
            <Card className='w-1/4 border border-primary'>
            <BlurFade delay={0.25} >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Students
                    </CardTitle>
                    <DollarSign className="h-6 w-6 text-primary" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">10,000,00</div>
                </CardContent>
                </BlurFade>
            </Card>
            
        </div>
    )
}

export default Dashboard