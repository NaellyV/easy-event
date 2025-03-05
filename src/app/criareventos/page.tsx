"use client";

import Navbarsub from "../navbarsub/page";
import { useState } from "react";
import Map from "../map";


export default function CreateEvent() {

  const userId = localStorage.getItem("id");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    location: "",
    userId,
  });
  const [participants, setParticipants] = useState<string[]>([]);
  const [newParticipant, setNewParticipant] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddParticipant = () => {
    if (newParticipant.trim() !== "") {
      setParticipants([...participants, newParticipant.trim()]);
      setNewParticipant("");
    }
  };

  const handleRemoveParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const requestData = { ...formData, userId, participants };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3333/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        alert("Evento criado e convites enviados!");
        setFormData({
          name: "",
          description: "",
          date: "",
          time: "",
          location: "",
          userId,
        });
        setParticipants([]);
      } else {
        const error = await response.json();
        alert(`Erro ao criar evento: ${error.error || "Erro desconhecido"}`);
      }
    } catch (error) {
      alert("Erro na requisição: " + error);
    }
  };

  const setDefaultLocation = () => {
    setFormData({
      ...formData,
      location: "IFMA - Instituto Federal do Maranhão - Timon,MA",
    });
  };

  return (
    <div className="h-screen bg-slate-100 flex flex-col items-center">
      <Navbarsub />
      <div className="w-full max-w-2xl bg-white p-6 mt-20 shadow-lg rounded-xl">
        <h2 className="text-3xl font-semibold text-center mb-6">Criar Evento</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 border rounded-md"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea
              name="description"
              className="w-full h-32 border rounded-md p-2"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Data</label>
              <input
                type="date"
                name="date"
                className="w-full px-4 py-2 border rounded-md"
                required
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Hora</label>
              <input
                type="time"
                name="time"
                className="w-full px-4 py-2 border rounded-md"
                required
                value={formData.time}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Localização</label>
            <input
              type="text"
              name="location"
              className="w-full px-4 py-2 border rounded-md"
              required
              value={formData.location}
              onChange={handleChange}
            />
            <button type="button" onClick={setDefaultLocation} className="mt-2 text-blue-500">Usar Local Padrão</button>
          </div>
        

          <div>
            <Map address={formData.location} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Participantes</label>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 px-4 py-2 border rounded-md"
                placeholder="E-mail, telefone ou ID"
                value={newParticipant}
                onChange={(e) => setNewParticipant(e.target.value)}
              />
              <button type="button" onClick={handleAddParticipant} className="bg-green-500 text-white px-4 rounded-md">+</button>
            </div>
            <ul className="mt-2 space-y-1">
              {participants.map((participant, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-100 px-2 py-1 rounded-md">
                  {participant}
                  <button type="button" onClick={() => handleRemoveParticipant(index)} className="text-red-500">❌</button>
                </li>
              ))}
            </ul>
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-customRed to-customOrange text-white p-2 rounded-lg shadow-md hover:from-customPurple hover:to-customRed">
            Criar Evento
          </button>
        </form>
      </div>
    </div>
  );
}