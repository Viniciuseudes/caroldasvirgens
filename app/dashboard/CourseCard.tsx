"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Play, Video, Clock, CheckCircle } from "lucide-react";
import { getYouTubeEmbedUrl } from "@/lib/utils";

// Tipo para o curso
type Course = {
  id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  youtube_playlist_url: string | null;
  lessons_count: number | null;
  duration_hours: number | null;
};

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  // Geramos a URL de embed usando nosso helper
  const embedUrl = course.youtube_playlist_url
    ? getYouTubeEmbedUrl(course.youtube_playlist_url)
    : null;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <Image
          src={course.thumbnail_url || "/placeholder.svg"}
          alt={course.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-2 right-2 bg-green-500">
          <CheckCircle className="w-3 h-3 mr-1" />
          Adquirido
        </Badge>
      </div>
      <CardContent className="p-6">
        <h3 className="font-bold text-lg text-gray-800 mb-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-4 h-20 overflow-hidden">
          {course.description}
        </p>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4" />
            {course.lessons_count || 0} aulas
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {course.duration_hours || 0} horas
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              disabled={!embedUrl}
            >
              <Play className="w-4 h-4 mr-2" />
              Assistir Curso
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl p-0">
            <div className="aspect-video">
              {embedUrl ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={embedUrl}
                  title={course.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="rounded-t-lg"
                ></iframe>
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-100 rounded-md">
                  <p className="text-red-500">URL do curso inválida.</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
