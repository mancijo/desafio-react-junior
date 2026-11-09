/** Page intro: eyebrow, main title (<h1>) and supporting text. */
export function PageIntro() {
  return (
    <section aria-labelledby="page-title" className="max-w-3xl">
      <p className="text-xs font-semibold tracking-[0.2em] text-primary-dark uppercase dark:text-primary">
        JSONPlaceholder
      </p>
      <h1
        id="page-title"
        className="mt-3 text-3xl leading-[1.08] font-extrabold text-heading uppercase sm:text-5xl dark:text-white"
      >
        Lista de Usuários
      </h1>
      <p className="mt-4 text-body dark:text-white/72">
        Busque pelo nome, filtre por cidade ou empresa e clique em um usuário para ver os detalhes.
      </p>
    </section>
  )
}
