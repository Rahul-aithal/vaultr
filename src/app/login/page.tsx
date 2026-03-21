'use client';
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client"; //import the auth client
import { toast } from "sonner";


const Login = ()=>{
  const githuLogin = async ()=>{
  const  data =  await authClient.signIn.social({
        provider: "github",
        callbackURL: "/dashboard",
    });
  if( data.error ){
    toast.error("Something went wrong with login");
  }
  }
  return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
        </CardHeader>
        <CardFooter className="flex-col gap-2">
          <Button onClick={githuLogin} variant="outline" className="w-full">
            Login with Github
          </Button>
        </CardFooter>
      </Card>
    )
}

export default Login
