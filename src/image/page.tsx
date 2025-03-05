import Image from "next/image";
import inicio from "./inicio.svg";

export default function Inicio() {
  return (
    <Image src={inicio} width={500} height={500} alt="Picture of the author" />
  );
}
