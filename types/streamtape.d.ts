declare module 'streamtape' {
  export function download(videoUrl: string, user: string, pass: string): Promise<string>;
}