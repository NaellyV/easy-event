"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CadastroForm {
  nome: string;
  email: string;
  senha: string;
  confirmaSenha: string;
}

const Cadastro = () => {
  const [formData, setFormData] = useState<CadastroForm>({
    nome: "",
    email: "",
    senha: "",
    confirmaSenha: "",
  });
  console.log(formData)
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.senha !== formData.confirmaSenha) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3333/user", {
        name: formData.nome,
        email: formData.email,
        password: formData.senha,
      });
      router.push("/login");
    } catch (err: any) {
      setError(
        `Erro ao criar conta: ${
          err?.response?.data?.message || "Tente novamente"
        }`
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-xl shadow-xl w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Cadastro</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="nome"
              className="block text-sm font-medium text-gray-700"
            >
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="senha"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmaSenha"
              className="block text-sm font-medium text-gray-700"
            >
              Confirme sua senha
            </label>
            <input
              type="password"
              id="confirmaSenha"
              name="confirmaSenha"
              value={formData.confirmaSenha}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r p-2 from-customRed to-customOrange text-white rounded-lg shadow-md hover:from-customPurple hover:to-customRed"
          >
            Criar conta
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            Já tem uma conta?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
