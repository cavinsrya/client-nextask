"use client";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-pink-50 -z-10">
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-blob" />
      <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-blob-2" />
      <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-float-blob-3" />
    </div>
  );
}
