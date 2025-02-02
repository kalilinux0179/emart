"use client"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import LoginForm from "./auth/login/page"
import { RegisterAction } from "@/app/actions/register.action"
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
import { useActionState, useEffect } from "react"
import { toast } from "sonner"

const Home = () => {
  const [data, action, isPending] = useActionState(RegisterAction, null)
  console.log(data)
  useEffect(() => {
    if (data?.success) {
      toast.success(data.message);
    } else if (data?.error) {
      toast.error(data.error);
    }
  }, [data]);
  return (
    <>
      <div className="flex w-full h-screen justify-center items-start pt-56">
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-center">Join Us</CardTitle>
              </CardHeader>
              <form action={action}>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="fullname">Full Name</Label>
                    <Input id="fullname" type="text" name="fullname" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" name="email" placeholder="john@mail.com" required />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password">password</Label>
                    <Input id="password" type="password" name="password" placeholder="password" required />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isPending}>
                    {isPending ? "Processing..." : "Register"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div >
    </>
  )
}

export default Home
