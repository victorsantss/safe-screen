import { useLoginController } from "./useLoginController";

export function Login() {
  const { inputRef } = useLoginController();

  function handleSubmit() {
    alert(inputRef.current?.value)
  }

  return (
    <main className="h-full flex flex-col justify-center items-center gap-5">
      <h1 className="font-bold text-3xl text-teal-800">
        Página Segura 🔒
      </h1>

      <div className="flex flex-col gap-5 items-center">
        <p>Digite um nome para acessar a sala de espera da sala segura:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 mr-2"
            placeholder="Victor Santos"
            ref={inputRef}
            required
          />
          <button
            type="submit"
            className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 disabled:bg-gray-400 disabled:cursor-not-allowed">
            Entrar
          </button>
        </form>
      </div>
    </main>
  )
}
