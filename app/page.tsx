import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { BookOpen, Users, Heart, Star, ArrowRight, Play, Download, Sparkles, GraduationCap, Video } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 text-white py-32 px-4">
        <div className="absolute inset-0 bg-[url('/abstract-pattern.png')] opacity-10"></div>
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <Badge className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border-white/30">
                <Sparkles className="w-4 h-4 mr-2" />
                Disciplina Positiva
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-balance">
                Transforme a educação dos seus filhos
              </h1>
              <p className="text-xl lg:text-2xl text-purple-50 leading-relaxed">
                Descubra estratégias práticas da Disciplina Positiva através de e-books, cursos e conteúdos exclusivos.
                Crie conexões mais fortes e um ambiente familiar saudável.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-purple-50 text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                  asChild
                >
                  <Link href="#ebooks">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Explorar E-books
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 bg-transparent backdrop-blur-sm text-lg px-8 py-6"
                  asChild
                >
                  <Link href="#cursos">
                    <Video className="w-5 h-5 mr-2" />
                    Ver Cursos
                  </Link>
                </Button>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-sm text-purple-100">Famílias Atendidas</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">15+</div>
                  <div className="text-sm text-purple-100">Anos de Experiência</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">50+</div>
                  <div className="text-sm text-purple-100">Workshops</div>
                </div>
              </div>
            </div>
            <div className="relative animate-float">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-3xl transform rotate-6 blur-2xl opacity-50"></div>
              <Image
                src="/images/carol-profile.png"
                alt="Carol das Virgens - Psicopedagoga"
                width={600}
                height={600}
                className="relative rounded-3xl shadow-2xl border-4 border-white/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-24 bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Sobre Mim</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 text-balance">Carol das Virgens</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Pedagoga, Psicopedagoga e Educadora Parental na Disciplina Positiva
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-200 to-pink-200 rounded-3xl blur-2xl opacity-30"></div>
              <Image
                src="/images/work-benefits.png"
                alt="Carol das Virgens com criança"
                width={600}
                height={600}
                className="relative rounded-3xl shadow-xl"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">Minha Missão</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Sou Pedagoga, Psicopedagoga e Educadora Parental na Disciplina Positiva, criando conexões através da
                gentileza e o encorajamento de forma afetiva na vida das pessoas.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Na Psicopedagogia, investigo se as competências e habilidades necessárias para aquisição da aprendizagem
                estão desenvolvidas corretamente. Utilizo materiais da INEPpsin (Instituto Internacional de Estudos e
                Pesquisa em Psicopedagogia e Neurociências).
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Como Educadora Parental na Disciplina Positiva, proporciono aos pais e cuidadores ferramentas e
                estratégias práticas para criar um ambiente familiar saudável e positivo, promovendo o desenvolvimento
                emocional e social saudável dos filhos.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                asChild
              >
                <Link href="/sobre">
                  Saiba Mais Sobre Mim
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-2 border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all hover:scale-105">
              <CardContent className="space-y-4 pt-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto">
                  <Users className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-purple-800">Crianças</h3>
                <p className="text-gray-600 leading-relaxed">
                  Desenvolvimento de habilidades socioemocionais, autorregulação e resolução saudável de conflitos.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-2 border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all hover:scale-105">
              <CardContent className="space-y-4 pt-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto">
                  <Heart className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-purple-800">Famílias</h3>
                <p className="text-gray-600 leading-relaxed">
                  Ferramentas para criar ambiente de respeito, cooperação e vínculos mais fortes e saudáveis.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-2 border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all hover:scale-105">
              <CardContent className="space-y-4 pt-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto">
                  <GraduationCap className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-purple-800">Educadores</h3>
                <p className="text-gray-600 leading-relaxed">
                  Estratégias para lidar com comportamentos desafiadores e criar ambiente escolar acolhedor.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* E-books Section */}
      <section id="ebooks" className="py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">E-books</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 text-balance">Conteúdo Transformador</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              E-books especializados baseados na Disciplina Positiva para revolucionar sua abordagem educacional
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Disciplina Positiva na Prática",
                description:
                  "Guia completo com estratégias práticas para implementar a disciplina positiva no dia a dia.",
                price: "R$ 47,00",
                image: "/ebook-disciplina-positiva.jpg",
                bestseller: true,
              },
              {
                title: "Criando Vínculos Saudáveis",
                description: "Como fortalecer a conexão com seus filhos através da comunicação empática.",
                price: "R$ 37,00",
                image: "/ebook-vinculos-familiares.jpg",
              },
              {
                title: "Educação Emocional Infantil",
                description: "Desenvolva a inteligência emocional das crianças com técnicas comprovadas.",
                price: "R$ 42,00",
                image: "/ebook-educacao-emocional.jpg",
              },
            ].map((ebook, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-2xl transition-all hover:scale-105 border-2 border-purple-50"
              >
                {ebook.bestseller && (
                  <Badge className="absolute top-4 right-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
                    <Star className="w-3 h-3 mr-1" />
                    Mais Vendido
                  </Badge>
                )}
                <div className="relative h-64 bg-gradient-to-br from-purple-100 to-pink-100">
                  <Image src={ebook.image || "/placeholder.svg"} alt={ebook.title} fill className="object-cover" />
                </div>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-bold text-xl text-gray-900">{ebook.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{ebook.description}</p>
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {ebook.price}
                    </span>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg">
                      <Download className="w-4 h-4 mr-2" />
                      Comprar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="cursos" className="py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
              <Video className="w-4 h-4 mr-2" />
              Cursos Online
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 text-balance">Aprenda no Seu Ritmo</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Cursos em vídeo com acesso vitalício após a compra. Aprenda com aulas práticas e transforme sua educação
              parental.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Fundamentos da Disciplina Positiva",
                description:
                  "Curso completo sobre os princípios e práticas da Disciplina Positiva para pais e educadores.",
                duration: "8 horas",
                lessons: 24,
                price: "R$ 197,00",
                thumbnail: "/curso-disciplina-positiva.jpg",
                featured: true,
              },
              {
                title: "Comunicação Não-Violenta com Crianças",
                description: "Aprenda técnicas de comunicação empática para fortalecer vínculos e resolver conflitos.",
                duration: "6 horas",
                lessons: 18,
                price: "R$ 147,00",
                thumbnail: "/curso-comunicacao-nao-violenta.jpg",
              },
            ].map((course, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-2xl transition-all hover:scale-105 border-2 border-purple-100"
              >
                {course.featured && (
                  <Badge className="absolute top-4 left-4 z-10 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Destaque
                  </Badge>
                )}
                <div className="relative h-64 bg-gradient-to-br from-purple-200 to-pink-200 group cursor-pointer">
                  <Image
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-all">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                      <Play className="w-10 h-10 text-purple-600 ml-1" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-bold text-2xl text-gray-900">{course.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{course.description}</p>
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4" />
                      {course.lessons} aulas
                    </div>
                    <div className="flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      {course.duration}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {course.price}
                    </span>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg">
                      Acessar Curso
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Carol na Mídia Section */}
      <section id="midia" className="py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
              <Sparkles className="w-4 h-4 mr-2" />
              Carol na Mídia
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 text-balance">Palestras e Participações</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Participações em congressos, palestras motivacionais e workshops sobre Educação Parental
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card className="overflow-hidden hover:shadow-xl transition-all hover:scale-105">
              <div className="relative h-64">
                <Image src="/images/projects.png" alt="Palestra motivacional" fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <Badge className="mb-3 bg-purple-100 text-purple-800">Palestra</Badge>
                <h3 className="font-bold text-xl text-gray-900 mb-2">Workshop Educação Parental</h3>
                <p className="text-gray-600">Grande evento com centenas de participantes sobre Disciplina Positiva.</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-all hover:scale-105">
              <div className="relative h-64 bg-gradient-to-br from-purple-200 to-pink-200">
                <Image src="/congresso-educacao.jpg" alt="Congresso de Educação" fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <Badge className="mb-3 bg-pink-100 text-pink-800">Congresso</Badge>
                <h3 className="font-bold text-xl text-gray-900 mb-2">Congresso Nacional de Psicopedagogia</h3>
                <p className="text-gray-600">Participação como palestrante sobre desenvolvimento infantil.</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-all hover:scale-105">
              <div className="relative h-64 bg-gradient-to-br from-purple-200 to-pink-200">
                <Image src="/entrevista-podcast.jpg" alt="Podcast" fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <Badge className="mb-3 bg-purple-100 text-purple-800">Podcast</Badge>
                <h3 className="font-bold text-xl text-gray-900 mb-2">Podcast Educação Positiva</h3>
                <p className="text-gray-600">Entrevista sobre os desafios da educação moderna.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="depoimentos" className="py-24 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Depoimentos</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 text-balance">O Que Dizem as Famílias</h2>
            <p className="text-xl text-gray-600">Histórias reais de transformação através da Disciplina Positiva</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Maria Silva",
                role: "Mãe de 2 filhos",
                content:
                  "Os e-books da Carol transformaram completamente nossa dinâmica familiar. Agora temos mais harmonia e conexão em casa. As técnicas são práticas e realmente funcionam!",
                rating: 5,
                image: "/mulher-sorrindo.jpg",
              },
              {
                name: "João Santos",
                role: "Pai e Educador",
                content:
                  "Conteúdo prático e de qualidade. Aplico as técnicas tanto em casa quanto na escola com resultados incríveis. Meus alunos estão mais engajados e colaborativos.",
                rating: 5,
                image: "/homem-sorrindo.jpg",
              },
              {
                name: "Ana Costa",
                role: "Mãe solo",
                content:
                  "A disciplina positiva mudou minha perspectiva sobre educação. Meu filho está mais colaborativo e feliz. Sinto que finalmente encontrei o caminho certo.",
                rating: 5,
                image: "/mulher-feliz.jpg",
              },
              {
                name: "Pedro Oliveira",
                role: "Pai de 3 filhos",
                content:
                  "O curso foi transformador! Aprendi a me comunicar melhor com meus filhos e os conflitos diminuíram drasticamente. Vale cada centavo investido.",
                rating: 5,
                image: "/homem-feliz.jpg",
              },
              {
                name: "Juliana Mendes",
                role: "Professora",
                content:
                  "Como educadora, os ensinamentos da Carol revolucionaram minha sala de aula. As crianças estão mais respeitosas e o ambiente ficou muito mais positivo.",
                rating: 5,
                image: "/professora.jpg",
              },
              {
                name: "Carlos Ferreira",
                role: "Pai e Psicólogo",
                content:
                  "Mesmo sendo da área, aprendi muito com o conteúdo da Carol. A abordagem prática e acessível faz toda a diferença na aplicação do dia a dia.",
                rating: 5,
                image: "/psicologo.jpg",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="p-6 border-2 border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all hover:scale-105"
              >
                <CardContent className="space-y-4 pt-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center gap-4 pt-4 border-t">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 overflow-hidden">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/abstract-waves.jpg')] opacity-10"></div>
        <div className="container mx-auto max-w-4xl px-4 text-center relative z-10">
          <Sparkles className="w-16 h-16 mx-auto mb-6 animate-pulse" />
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Comece Sua Jornada na Disciplina Positiva
          </h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            Junte-se a centenas de famílias que já transformaram sua educação parental
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-purple-50 text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all hover:scale-105"
              asChild
            >
              <Link href="#ebooks">
                <BookOpen className="w-5 h-5 mr-2" />
                Explorar E-books
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 bg-transparent backdrop-blur-sm text-lg px-8 py-6"
              asChild
            >
              <Link href="/login">Criar Conta Gratuita</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
