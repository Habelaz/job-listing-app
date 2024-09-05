import Image from "next/image";
import RegisterForm from "./api/auth/signup/page";
import LoginPage from "./api/auth/signin/page";
import HomePage from "./api/auth/components/Home";

export default function Home() {
  return (
    <div>
      <HomePage />
    </div>
  );
}
