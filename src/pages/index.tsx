import Image from "next/image";
import appPreviewImage from "../assets/doisCelulares.png";
import logoImg from "../assets/logo.svg";
import usersAvatarExampleImg from "../assets/avatares.png";
import icon from "../assets/icon.svg";
import { api } from "../lib/axios";
import { FormEvent, useState } from "react";

interface HomeProps {
  poolCount: number;
  guessCount: number;
  usersCount: number;
}

export default function Home(props: HomeProps) {
  const [poolTitle, setpoolTitle] = useState("");

  async function createPool(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post("/pools/", {
        title: poolTitle,
      });

      const { code } = response.data;
      await navigator.clipboard.writeText(code);

      alert(`Codigo do seu bolão:  ${code}`);

      setpoolTitle("");
    } catch (err) {
      console.log(err);
      alert("Falha ao Criar o bolão, tente novamente");
    }
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
      <main>
        <Image src={logoImg} alt="NLW COPA LOGO" quality={100} />
        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie o seu própio bolão da copa e compartilhe entre amigos
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image
            src={usersAvatarExampleImg}
            alt="Avatares exemplos"
            quality={100}
          />
          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+{props.usersCount}</span> pessoas
            já estão usando
          </strong>
        </div>

        <form onSubmit={createPool} className="mt-10 flex gap-2">
          <input
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
            type="text"
            required
            placeholder="Qual nome do seu bolão?"
            onChange={(event) => setpoolTitle(event.target.value)}
            value={poolTitle}
          />
          <button
            className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700 "
            type="submit"
          >
            Criar meu bolão
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>
        <div className="mt-10 pt-10 border-t border-gray-600  flex items-center justify-between text-gray-100">
          <div className="flex items-center gap-6">
            <Image src={icon} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.poolCount}</span>
              <span>Bolões Criados</span>
            </div>
          </div>

          <div className="w-px h-14 bg-gray-600" />

          <div className="flex items-center gap-6">
            <Image src={icon} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.guessCount}</span>
              <span>Palpites enviados.</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={appPreviewImage}
        alt="Dois Celulares exibindo uma previa da aplicacao"
        quality={100}
      />
    </div>
  );
}

export const getServerSideProps = async () => {
  const [poolCountResponse, guessCountResponse, userCountResponse] =
    await Promise.all([
      api.get("pools/count"),
      api.get("guesses/count"),
      api.get("users/count"),
    ]);

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      usersCount: userCountResponse.data.count,
    },
  };
};
