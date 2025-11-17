import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const host = urlObj.hostname;
    const params = urlObj.searchParams;

    if (host.includes('youtube.com') || host.includes('youtu.be')) {
      // Caso 1: Link de Playlist (ex: .../playlist?list=...)
      if (params.has('list')) {
        const listId = params.get('list');
        return `https://www.youtube.com/embed/videoseries?list=${listId}`;
      }

      // Caso 2: Link de Vídeo normal (ex: .../watch?v=...)
      if (params.has('v')) {
        const videoId = params.get('v');
        return `https://www.youtube.com/embed/${videoId}`;
      }

      // Caso 3: Link curto (ex: youtu.be/...)
      if (host.includes('youtu.be')) {
        const videoId = urlObj.pathname.split('/')[1];
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
    return null; // URL não é do YouTube ou formato não reconhecido
  } catch (error) {
    console.error("Erro ao parsear URL do YouTube:", error);
    return null;
  }
}