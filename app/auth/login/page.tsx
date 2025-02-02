import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const LoginForm = () => {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl text-center">Join Us</CardTitle>
                </CardHeader>
                <form action="">
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" name="email" placeholder="john@mail.com" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">password</Label>
                            <Input id="password" type="password" name="password" placeholder="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Register</Button>
                    </CardFooter>
                </form>
            </Card>
        </>
    )
}

export default LoginForm
