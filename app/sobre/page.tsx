import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Heart, Camera, Users } from "lucide-react";

export default function SobrePage() {
  const galleryImages = [
    {
      src: "/S6.JPEG",
      alt: "Carol das Virgens - Retrato Profissional",
    },
    { src: "/S1.JPEG", alt: "Carol com a filha Nina" },
    { src: "/S2.JPEG", alt: "Carol com o marido Diogo" },
    { src: "/S3.JPEG", alt: "Carol em um evento" },
    { src: "/S4.JPEG", alt: "Carol palestrando" },
    { src: "/S5.JPEG", alt: "Momento em família" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {" "}
      {/* Fundo base branco para contraste */}
      <Header />
      <main className="flex-grow">
        {/* Seção Principal */}
        {/* Fundo sutilmente alterado para incluir roxo */}
        <section className="py-24 bg-gradient-to-br from-purple-50/50 via-white to-pink-50/50">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center mb-16 space-y-4">
              {/* Badge com cores roxas */}
              <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 border border-purple-200 shadow-sm">
                <Heart className="w-4 h-4 mr-2 text-purple-600" />{" "}
                {/* Ícone roxo */}
                Quem Sou Eu
              </Badge>
              {/* Título principal com cor roxa escura */}
              <h1 className="text-4xl lg:text-5xl font-bold text-purple-900 text-balance">
                Conheça Carol das Virgens
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Minha jornada na educação consciente e gentil.
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-12 items-start">
              {/* Imagem Principal */}
              <div className="lg:col-span-2 relative">
                <div className="sticky top-28">
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-300 to-pink-300 rounded-3xl blur-2xl opacity-50 animate-pulse-glow"></div>{" "}
                  {/* Glow mais visível */}
                  <Image
                    src="/IA4.jpg"
                    alt="Carol das Virgens - Psicopedagoga e Educadora Parental"
                    width={500}
                    height={600}
                    className="relative rounded-3xl shadow-2xl border-4 border-white/60 object-cover aspect-[4/5]" // Borda branca suave
                  />
                </div>
              </div>

              {/* Texto Sobre Mim */}
              {/* Cor do texto principal mantida para legibilidade, mas citação destacada em roxo mais escuro */}
              <div className="lg:col-span-3 space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Sou <strong>Carol das Virgens</strong>, psicopedagoga,
                  educadora parental na Disciplina Positiva, professora da
                  educação Infantil e mãe de Nina, que é minha maior fonte de
                  aprendizado e inspiração.
                </p>
                <p>
                  Mais do que títulos, o que me define é o{" "}
                  <strong>
                    desejo profundo de contribuir para uma educação mais humana,
                    consciente e gentil
                  </strong>
                  .
                </p>
                <p>
                  Sempre acreditei que educar vai muito além de ensinar
                  conteúdos. É sobre formar pessoas, construir vínculos e
                  oferecer um olhar que acolhe, orienta e encoraja.
                </p>
                <p>
                  Ao longo da minha jornada, descobri que{" "}
                  <strong className="text-purple-700">
                    conhecimento e afeto caminham juntos
                  </strong>{" "}
                  e é {/* Destaque roxo */}
                  nessa união entre ciência e sensibilidade que encontrei meu
                  propósito.
                </p>
                <p>
                  A partir da minha experiência com famílias e escolas,
                  desenvolvi um trabalho voltado para promover o entendimento
                  sobre o comportamento infantil e fortalecer as relações entre
                  adultos e crianças.
                </p>
                <p>
                  Nas palestras, workshops e formações que realizo, busco sempre
                  unir teoria e prática, trazendo reflexões reais, ferramentas
                  aplicáveis e uma dose de esperança — porque acredito que é
                  possível{" "}
                  <strong className="text-purple-700">
                    educar com firmeza e afeto ao mesmo tempo
                  </strong>
                  . {/* Destaque roxo */}
                </p>
                <p>
                  Sou casada com Diogo das Virgens, artista e parceiro de vida,
                  que me ensina todos os dias sobre presença e propósito.
                  Juntos, vivemos a experiência de educar com o coração,
                  errando, aprendendo e celebrando cada conquista da nossa
                  filha.
                </p>
                {/* Citação final com roxo mais escuro e elegante */}
                <blockquote className="border-l-4 border-purple-500 pl-6 italic mt-8">
                  <p className="font-medium text-purple-900 text-xl">
                    {" "}
                    {/* Cor roxa mais escura */}
                    Meu convite é simples: que a gente possa olhar para a
                    educação com mais empatia, paciência e encantamento. Porque,
                    no fim das contas, educar é sobre transformar o mundo.
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Seção Galeria de Fotos */}
        {/* Fundo com gradiente muito sutil para separar da seção anterior */}
        <section className="py-24 bg-gradient-to-b from-white via-purple-50/30 to-white">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center mb-16 space-y-4">
              {/* Badge consistente com a paleta roxa */}
              <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 border border-purple-200 shadow-sm">
                <Camera className="w-4 h-4 mr-2 text-purple-600" />{" "}
                {/* Ícone roxo */}
                Momentos
              </Badge>
              {/* Título da galeria com cor roxa escura */}
              <h2 className="text-4xl lg:text-5xl font-bold text-purple-900 text-balance">
                Um Pouco da Minha História em Imagens
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Registros de momentos especiais.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className={`relative overflow-hidden rounded-xl shadow-lg group transform transition-transform duration-300 hover:scale-105 ${
                    index === 0 || index === 3
                      ? "col-span-2 md:col-span-1 md:row-span-2 aspect-[3/4]"
                      : "aspect-square"
                  } hover:ring-4 hover:ring-purple-300 hover:ring-offset-2`} // Adiciona um anel roxo suave no hover
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    {" "}
                    {/* Overlay mais escuro */}
                    <p className="text-white text-sm opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100 font-medium">
                      {" "}
                      {/* Fonte um pouco mais pesada */}
                      {image.alt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seção Chamada para Ação (Mantida com o gradiente original) */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <Users className="w-12 h-12 mx-auto mb-4 text-white/80" />
            <h2 className="text-3xl font-bold mb-4">Vamos nos conectar?</h2>
            <p className="text-lg mb-8 opacity-90">
              Adoraria saber mais sobre suas necessidades e como posso ajudar
              sua família ou instituição.
            </p>
            <div className="flex justify-center gap-4">
              {/* Botões com estilo consistente */}
              <button className="bg-white text-purple-600 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-purple-50 transition-colors transform hover:scale-105">
                Entre em Contato
              </button>
              <button className="bg-transparent border-2 border-white text-white font-semibold py-3 px-6 rounded-lg hover:bg-white/10 transition-colors transform hover:scale-105">
                Ver Serviços
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
