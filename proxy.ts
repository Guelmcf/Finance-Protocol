import { createServerClient} from "@supabase/ssr"; //importa o cliente do supabase para o lado do servidor
import { NextResponse, type NextRequest } from "next/server"; //importa o NextResponse e o tipo NextRequest do Next.js para lidar com as requisições e respostas

export async function proxy(request: NextRequest) { //exporta uma função middleware que recebe uma requisição do tipo NextRequest
 console.log("middleware rodando:", request.nextUrl.pathname);

 let supabaseResponse = NextResponse.next({ request }); //inicializa a resposta do middleware como a resposta padrão do Next.js

 const supabase = createServerClient(   //cria uma instância do cliente do Supabase usando as variáveis de ambiente para a URL e a chave anônima
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
 {
   cookies: {
     getAll() {
       return request.cookies.getAll(); //retorna todos os cookies da requisição usando o método getAll do objeto cookies do NextRequest
     },
     setAll(cookiesToSet) { //define o método setAll para configurar os cookies na resposta do middleware
       cookiesToSet.forEach(({ name, value }) =>
         request.cookies.set(name, value)
       );
       supabaseResponse = NextResponse.next({ request }); //atualiza a resposta do middleware para incluir os cookies configurados usando o método cookiesTo
       cookiesToSet.forEach(({ name, value, options }) =>
         supabaseResponse.cookies.set(name, value, options)
       );
     },
   },
 }
);

 const { data: { user } } = await supabase.auth.getUser(); //obtém o usuário autenticado usando o método getUser do objeto auth do cliente do Supabase

 if (!user && !request.nextUrl.pathname.startsWith("/login") && !request.nextUrl.pathname.startsWith("/register")) { //verifica se o usuário não está autenticado e se a rota atual não é a página de login ou cadastro
   const url = request.nextUrl.clone();
   url.pathname = "/login";
   return NextResponse.redirect(url);
 }
else if (user && (request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/register") || request.nextUrl.pathname === "/")) { //verifica se o usuário está autenticado e se a rota atual é a página de login ou cadastro
   const url = request.nextUrl.clone();
   url.pathname = "/dashboard";
   return NextResponse.redirect(url);
 }
 return supabaseResponse;
}

export const config = { //configura o middleware para ser aplicado a todas as rotas, exceto as que correspondem aos padrões especificados no matcher
 matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

