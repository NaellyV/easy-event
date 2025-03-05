import Link from "next/link";
import { LogIn, UserPlus } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex fixed w-full p-4 items-center justify-between bg-slate-200 shadow-xl">
      <div className="flex items-center gap-2">
        <img src="/favicon.ico" width={40} alt="" />
        <h2 className="text-xl font-bold text-gray-700">EasyEvent</h2>
      </div>
      <div className="flex gap-3">
        <Link
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-customRed to-customOrange text-white rounded-lg shadow-md hover:from-customPurple hover:to-customRed transition-all duration-300"
          href="/login"
        >
          <LogIn size={20} /> Login
        </Link>
        <Link
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-customRed to-customOrange text-white rounded-lg shadow-md hover:from-customPurple hover:to-customRed transition-all duration-300"
          href="/cadastro"
        >
          <UserPlus size={20} /> Cadastro
        </Link>
      </div>
    </nav>
  );
}
